const Meal = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');

exports.validMealId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  req.meal = meal;
  next();
});
