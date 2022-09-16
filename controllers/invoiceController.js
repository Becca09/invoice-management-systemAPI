import Invoice from "../models/invoice.js";
import User from "../models/user.js";


export const createInvoice = async (req, res, next) => {
  const creatorId = req.params.creatorId;
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
        status,
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
      creator: creatorId,
      status
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

export const getUserInvoices = async(req,res,next)=> {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if(!user){
        throw new Error("No user found with id " + userId);
    }
    const userInvoices = await Invoice.find({creator: user._id});   
    return res.status(200).json({
      status: 'success',
      userInvoices
    }) 
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
}

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
    const invoice = await Invoice.findByIdAndDelete(invoiceId);
    if (!invoice) {
      throw new Error(`Invoice with id ${invoiceId} not found`);
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

export const paymentStatus = async(req, res, next) => {
try {
  const invoiceId = req.params.invoiceId
  const invoice = await Invoice.findById(invoiceId)
  if (!invoice) {
    throw new Error(`Invoice with id ${invoiceId} not found`);
  }

   if(invoice.status === true){
     invoice.status = false;
   }

   else{
        invoice.status = true;
   }
 
    await invoice.save()
    
    return res.status(200).json({
      status: "success",
      message: "payment has been updated successfully"
    
    })
  }
  
catch (error) {
  return res.status(400).json({
    status: "fail",
    message: error.message,
    error,
  });


}

}
