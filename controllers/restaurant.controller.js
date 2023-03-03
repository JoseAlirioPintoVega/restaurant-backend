const Restaurant = require('../models/restaurat.model');
const Review = require('../models/review.model');
const catchAsync = require('../utils/catchAsync');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = new Restaurant({
    name,
    address,
    rating,
  });

  await restaurant.save();

  res.status(201).json({
    status: 'success',
    message: ' Restaurant created successfully',
    restaurant: {
      name: restaurant.name,
      id: restaurant.id,
      address: restaurant.address,
      rating: restaurant.rating,
    },
  });
});

exports.getRestaurantsActive = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
  });
  res.status(201).json({
    status: 'success',
    message: 'The restaurans was find successfully',
    restaurants,
  });
});

exports.getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(201).json({
    status: 'success',
    message: 'The restaurans was find successfully',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const { name, address } = req.body;

  const updatedRestaurant = await restaurant.update({
    name: name.toLowerCase(),
    address,
  });

  res.status(200).json({
    status: 'success',
    message: 'The restauran has been updated successfully',
    updatedRestaurant,
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const updatedRestaurant = await restaurant.update({ status: 'deleted' });
  //6. ENVIO LA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'The restauran has been updated successfully',
    updatedRestaurant,
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { restaurant, sessionUser } = req;
  const { comment, rating } = req.body;

  const newReview = await Review.create({
    userId: sessionUser.id,
    comment: comment.toLowerCase(),
    restaurantId: restaurant.id,
    rating,
  });
  res.status(201).json({
    status: 'success',
    message: 'Review created successfully',
    newReview,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  console.log('dasdasdasdasd', review);
  const { comment, rating } = req.body;

  const updatedReview = await review.update({
    comment: comment.toLowerCase(),
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'The restauran has been updated successfully',
    updatedReview,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  const deletedReview = await review.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been updated successfully',
    deletedReview,
  });
});
