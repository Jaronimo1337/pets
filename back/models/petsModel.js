const {sql} = require('../dbConnection');

exports.getAllPets = async () => { 
    const pets = await sql`
    SELECT * FROM pets`
    return pets
}
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
exports.getFilteredPets = async (filter) => {
  const { sort, order } = filter;
  const query = {
    text: `SELECT * FROM pets ORDER BY ${sort} ${order}`,
  };
  const result = await sql(query);
  return result.rows;
};
exports.createPet = async (data) => { 
    const [pets] = await sql`
    INSERT INTO pets ${sql(data,'name','owner', 'date', 'time','notes')}
    RETURNING *`
    return pets
  }