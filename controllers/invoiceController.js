import Invoice from "../models/invoice.js";

export const createInvoice = async (req, res, next) => {
  try {
    const {
      customersName,
      customersEmail,
      phoneNumber,
      customersAdress,
      invoiceDate,
      invoiceDescription,
      invoiceItemList,
      invoicePaymentDate,
    } = req.body;

    const newInvoice = await Invoice.create({
      customersName,
      customersEmail,
      phoneNumber,
      customersAdress,
      invoiceDate,
      invoiceDescription,
      invoiceItemList,
      invoicePaymentDate,
    });

    return res.status(200).json({
      status: "success",
      newInvoice,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

export const getAllInvoices = async (req, res, next) => {
  const allInvoices = await Invoice.find();
  return res.status(200).json({
    status: "success",
    allInvoices,
  });
};

export const getInvoice = async (req, res, next) => {
  try {
    const invoiceId = req.params.invoiceId;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      throw new Error(`invoice with the id ${invoiceId} not found`);
    }

    return res.status(200).json({
      status: "success",
      invoice,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

export const deleteInvoice = async (req, res, next) => {
  try {
    const invoiceId = req.params.invoiceId;
    const user = await Invoice.findByIdAndUpdate(invoiceId);
    if (!invoice) {
      throw new Error(`Invoice with id ${userId} not found`);
    }
    return res.status(204).json({
      status: "success",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

export const updateInvoice = async (req, res, next) => {
  try {
    const invoiceId = req.params.invoiceId;

    const {
      customersName,
      customersEmail,
      phoneNumber,
      customersAdress,
      invoiceDate,
      invoiceDescription,
      invoiceItemList,
      invoicePaymentDate
    } = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId, 
      {
        customersName,
        customersEmail,
        phoneNumber,
        customersAdress,
        invoiceDate,
        invoiceDescription,
        invoiceItemList,
        invoicePaymentDate,
      },

      {
        runValidators: true,
        new: true,
      }
    );
    if (!updateInvoice) {
      throw new Error(` invoice with id ${invoiceId} not found`);
    }

    return res.status(200).json({
      status: "success",
      updatedInvoice,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};
