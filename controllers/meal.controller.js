const Meal = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });
  res.status(201).json({
    status: 'success',
    message: 'Review created successfully',
    newMeal,
  });
});

exports.getMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
  });
  // falta hacer la logica  de las  relaciones  del order
  res.status(200).json({
    status: 'success',
    message: 'The orders was find',
    meals,
  });
});

exports.getMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  if (!meal) {
    return res.status(404).json({
      status: 'fail',
      message: 'The meal was not find',
    });
  }
  res.status(200).json({
    status: 'success',
    message: 'The orders was find',
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req;
  const mealUpdate = await meal.update({ name, price });

  res.status(200).json({
    status: 'success',
    message: 'The orders was find',
    mealUpdate,
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  const mealDelete = await meal.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
    message: 'The orders was find',
    mealDelete,
  });
});
