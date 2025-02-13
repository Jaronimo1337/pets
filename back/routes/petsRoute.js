const express = require('express');
const {createPet, getAllPets, updatePet, deletePet, getFilteredPets} = require('../controlers/petsControler');
const router = express.Router();
const { protect } = require('../controlers/authControler')

router.route('/').post(createPet).get(getAllPets)
router.route('/:id').put(updatePet).delete(deletePet)
router.route('/filter').get(getFilteredPets)

module.exports = router;