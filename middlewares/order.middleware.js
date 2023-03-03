const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.findOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      id,
    },
  });
  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: 'Order not was find',
    });
  }
  req.order = order;
  next();
});

exports.protectAccountOwnerByOrder = catchAsync(async (req, res, next) => {
  const { order, sessionUser } = req;
  console.log(order.userId, sessionUser.id);
  if (order.userId !== sessionUser.id) {
    return next(new AppError('You do not owner this Order', 401));
  }
  next();
});

exports.validMealIdByBody = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });
  if (!meal) {
    return res.status(404).json({
      status: 'fail',
      message: 'The Meal not was find',
    });
  }
  req.meal = meal;
  next();
});
