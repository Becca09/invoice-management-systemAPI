import express from 'express';
import { createInvoice, getAllInvoices } from '../controllers/invoiceController.js';

const invoiceRouter = express();


invoiceRouter.route("/create").post(createInvoice)
invoiceRouter.route("/all").get(getAllInvoices)


export default invoiceRouter;