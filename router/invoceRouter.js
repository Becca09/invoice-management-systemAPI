import express from 'express'; 
import { createInvoice, getAllInvoices, getUserInvoices, getInvoice, deleteInvoice, updateInvoice, paymentStatus } from '../controllers/invoiceController.js';
import { requireAuth } from '../controllers/userController.js';


const invoiceRouter = express();


invoiceRouter.route("/create/:creatorId").post(requireAuth,createInvoice)
invoiceRouter.route("/:invoiceId").get(getInvoice).delete(requireAuth, deleteInvoice).patch(requireAuth, updateInvoice)
invoiceRouter.route("/all").get(requireAuth, getAllInvoices)
invoiceRouter.route("/user/:userId").get(requireAuth, getUserInvoices)
invoiceRouter.route("/status/:invoiceId").patch(requireAuth, paymentStatus)


export default invoiceRouter;                       