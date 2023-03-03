const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurat.model');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;
  const { meal } = req;
  const totalPrice = meal.price * quantity;

  const newOrder = Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice,
    quantity,
  });
  res.status(200).json({
    status: 'success',
    message: 'The order was create',
    newOrder,
  });
});

exports.getOrdersById = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const orders = await Order.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
    where: {
      userId: sessionUser.id,
    },
    include: [
      {
        model: Meal,
        attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
        include: [{ model: Restaurant }],
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'The orders was find',
    orders,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  const updatedOrder = await order.update({ status: 'completed' });
  res.status(200).json({
    status: 'success',
    message: 'The orders was  update',
    updatedOrder,
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  const updatedOrder = await order.update({ status: 'cancelled' });
  res.status(200).json({
    status: 'success',
    message: 'The orders was  update',
    updatedOrder,
  });
});
