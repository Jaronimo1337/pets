const {sql} = require('../dbConnection');
const uuid = require('uuid');
exports.generateInvoiceCode = () => {
    const id = uuid.v4();
    const code = `#${id.substring(0, 2).toUpperCase()}${id.substring(2, 6)}`;
    return code;
  };
  
  exports.createInvoice = async (data) => {
    const hash = `#${Math.random().toString(36).substr(2, 2).toUpperCase()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    data.hash = hash;
    const [invoice] = await sql`
      INSERT INTO invoice ${sql(data, 'date', 'fullname', 'sum', 'status', 'hash')}
      RETURNING *`
    return invoice
  }
exports.getAllInvoices = async (limit, offset) => { 
    const invoice = await sql`
    SELECT * FROM invoice
    ORDER BY invoice.id ASC
    ${
      !isNaN(limit) && !isNaN(offset)
        ? sql`LIMIT ${limit} OFFSET ${offset}`
        : sql``
    }  `
    const total = await sql`
    SELECT COUNT(*)::int AS count 
        FROM invoice`

    return {invoice, totalCount: total[0].count}
}
exports.getInvoiceById = async (id) => { 
    const [invoice] = await sql`
    SELECT * FROM invoice WHERE id = ${id}`
    return invoice
}
exports.updateInvoice = async (data) => { 
    const id = data.id;
    const [invoice] = await sql`
    UPDATE invoice SET ${sql(data,'date', 'fullname', 'sum', 'status')} WHERE id = ${id}
    RETURNING *`
    return invoice
  }
exports.deleteInvoice = async (id) => { 
    const [invoice] = await sql`
    DELETE FROM invoice WHERE id = ${id}
    RETURNING *`
    return invoice
}
exports.filterInvoice = async (filter) => {
  const [invoice] = await sql`
    SELECT * FROM invoice
    WHERE status = ${sql(filter.status)}
  `;
  return invoice;
};