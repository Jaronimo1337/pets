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

exports.getAllPets = async (req, res, next) => {
    try {
      const pets = await getAllPets();
      res.status(200).json({
        status: "success",
        data: pets,
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
exports.getFilteredPets = async (req, res, next) => {
  try {
    const filter = req.query;
    const pets = await getFilteredPets(filter);
    res.status(200).json({
      status: "success",
      data: pets
    });
  } catch (error) {
    next(error)
  }
};