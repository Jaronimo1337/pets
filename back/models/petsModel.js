const {sql} = require('../dbConnection');

exports.getAllPets = async ({ page = 1, limit = 10, search = '', owner, sort = 'date', order = 'asc' }) => {
  const offset = (page - 1) * limit;

  const validSortFields = ['name', 'date', 'owner'];
  const sortBy = validSortFields.includes(sort) ? sort : 'date';
  const pets = await sql`
    SELECT * FROM pets
    WHERE 
      (name ILIKE ${'%' + search + '%'} OR notes ILIKE ${'%' + search + '%'})
      ${owner ? sql`AND owner = ${owner}` : sql``}
    ORDER BY ${sortBy} ${sql.unsafe(order)} 
    LIMIT ${limit} OFFSET ${offset}
  `;

  const [{ count }] = await sql`
    SELECT COUNT(*) FROM pets
    WHERE 
      (name ILIKE ${'%' + search + '%'} OR notes ILIKE ${'%' + search + '%'})
      ${owner ? sql`AND owner = ${owner}` : sql``}
  `;

  return { pets, total: Number(count) };
};
exports.getPetById = async (id) => { 
    const [pets] = await sql`
    SELECT * FROM pets WHERE id = ${id}`
    return pets
}
exports.updatePet = async (data) => { 
    const id = data.id;
    const [pets] = await sql`
    UPDATE pets SET ${sql(data,'date', 'fullname', 'sum', 'status')} WHERE id = ${id}
    RETURNING *`
    return pets
  }
exports.deletePet = async (id) => { 
    const [pets] = await sql`
    DELETE FROM pets WHERE id = ${id}
    RETURNING *`
    return pets
}
exports.getFilteredPets = async ({ name, owner, sort, order, limit, offset }) => {
  const validSortFields = ['name', 'date', 'owner'];
  const sortBy = validSortFields.includes(sort) ? sort : 'date';

  const pets = await sql`
    SELECT * FROM pets
    WHERE 
      name ILIKE ${name} AND owner ILIKE ${owner}
    ORDER BY ${sortBy} ${sql.unsafe(order)} 
    LIMIT ${limit} OFFSET ${offset}
  `;

  const [{ count }] = await sql`
    SELECT COUNT(*) FROM pets
    WHERE 
      name ILIKE ${name} AND owner ILIKE ${owner}
  `;

  return { pets, total: count };
};
exports.createPet = async (data) => { 
    const [pets] = await sql`
    INSERT INTO pets ${sql(data,'name','owner', 'date', 'time','notes')}
    RETURNING *`
    return pets
  }