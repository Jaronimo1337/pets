const express = require('express');
const {createInvoice, getAllInvoices, updateInvoice, deleteInvoice} = require('../controlers/invoiceControler');
const paginationValidator = require('../validators/pagination');
const router = express.Router();
const { protect } = require('../controlers/authControler')

router.route('/').post(createInvoice).get(paginationValidator,getAllInvoices)
router.route('/:id').put(updateInvoice).delete(deleteInvoice);

module.exports = router;