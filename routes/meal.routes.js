const { Router } = require('express');
const {
  createMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} = require('../controllers/meal.controller');
const { validMealId } = require('../middlewares/meal.middleware');
const { protect } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');
const {
  createMealValidator,
} = require('../middlewares/validations.middleware');

const router = Router();

router.get('/', getMeals);

router.get('/:id', validMealId, getMealById);

router.use(protect);

router.post('/:id', createMealValidator, validateFields, createMeal);

router.patch('/:id', validMealId, updateMeal);

router.delete('/:id', validMealId, deleteMeal);

module.exports = {
  mealsRouter: router,
};
