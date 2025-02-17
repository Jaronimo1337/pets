const { createPet, getAllPets, getPetById, updatePet, deletePet, getFilteredPets } = require("../models/petsModel");
const AppError = require('../utils/appError')
exports.createPet = async (req, res, next) => {
  try {
    const pet = await createPet(req.body);
    res.status(201).json({
      status: "success",
      data: pet,
    });
  } catch (error) {
    next(error)
  }
}


exports.getPetById = async (req, res, next) => {
    try {
      const pet = await getPetById(req.params.id);
      res.status(200).json(pet);
    } catch (error) {
      next(error)
    }
}

exports.updatePet = async (req, res, next) => {
    try {
      const pet = await updatePet(req.body);
      res.status(200).json(pet);
    } catch (error) {
      next(error)
    }
  }

exports.deletePet = async (req, res, next) => {
    try {
      const pet = await deletePet(req.params.id);
      res.status(200).json(pet);
    } catch (error) {
      next(error)
    }
}
exports.getAllPets = async (req, res, next) => {
  try {
    const { page, limit, search, owner } = req.query;
    const { pets, total } = await getAllPets({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      search: search || '',
      owner
    });

    res.status(200).json({
      status: 'success',
      total,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      data: pets,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFilteredPets = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', owner, sort = 'date', order = 'desc' } = req.query;

    const filter = {
      name: `%${search}%`,
      owner: `%${owner || ''}%`,
      sort,
      order
    };

    const { pets, total } = await getFilteredPets(filter);  

    res.status(200).json({
      status: 'success',
      total: Number(total),
      data: pets,
    });
  } catch (error) {
    next(error);  
  }
};