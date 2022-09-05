import express from 'express';
import { createInvoice, getAllInvoices, getUserInvoices,getInvoice, deleteInvoice, updateInvoice } from '../controllers/invoiceController.js';
import Invoice from '../models/invoice.js';

const invoiceRouter = express();


invoiceRouter.route("/create/:creatorId").post(createInvoice)
invoiceRouter.route("/:invoiceId").get(getInvoice).delete(deleteInvoice).patch(updateInvoice)
invoiceRouter.route("/all").get(getAllInvoices)
invoiceRouter.route("/user/:userId").get(getUserInvoices)


export default invoiceRouter;                       