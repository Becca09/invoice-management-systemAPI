import express from 'express';
import { createInvoice, getAllInvoices, getUserInvoices } from '../controllers/invoiceController.js';

const invoiceRouter = express();


invoiceRouter.route("/create/:creatorId").post(createInvoice)
invoiceRouter.route("/all").get(getAllInvoices)
invoiceRouter.route("/user/:userId").get(getUserInvoices )


export default invoiceRouter;                       