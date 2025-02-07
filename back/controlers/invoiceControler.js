const { createInvoice, getAllInvoices, getInvoiceById, updateInvoice, deleteInvoice, filterInvoice } = require("../models/invoiceModel");
const AppError = require('../utils/appError')
exports.createInvoice = async (req, re, next) => {
  try {
    const invoice = await createInvoice(req.body);
    res.status(201).json({
      status: "success",
      data: invoice,
    });
  } catch (error) {
    next(error)
  }
}

exports.getAllInvoices = async (req, res, next) => {
    try {
      let {page, limit } = req.query
      page = parseInt(page)
      limit = parseInt(limit)

      const offset = (page - 1) * limit

      const {invoice, totalCount} = await getAllInvoices(limit, offset);
      if (!invoice.length === 0) {
        throw new AppError('No invoices found', 404);
      }
      res.status(200).json(invoice);
    } catch (error) {
      next(error)
    }
}

exports.getInvoiceById = async (req, res, next) => {
    try {
      const invoice = await getInvoiceById(req.params.id);
      res.status(200).json(invoice);
    } catch (error) {
      next(error)
    }
}

exports.updateInvoice = async (req, res, next) => {
    try {
      const invoice = await updateInvoice(req.body);
      res.status(200).json(invoice);
    } catch (error) {
      next(error)
    }
  }

exports.deleteInvoice = async (req, res, next) => {
    try {
      const invoice = await deleteInvoice(req.params.id);
      res.status(200).json(invoice);
    } catch (error) {
      next(error)
    }
}
exports.getFilteredInvoices = async (req, res, next) => {
  try {
    const filter = req.query;
    const invoices = await filterInvoice(filter);
    res.status(200).json({
      status: "success",
      data: invoices
    });
  } catch (error) {
    next(error)
  }
};