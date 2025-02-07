const {query} = require('express-validator');

const paginationValidator = [
    query('page').optional().isInt().withMessage('Page must be an integer').toInt(),
    query('limit').optional().isInt().withMessage('Limit must be an integer').toInt()
]
module.exports = paginationValidator