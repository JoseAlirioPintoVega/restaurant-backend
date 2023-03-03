const Restaurant = require('../models/restaurat.model');
const Review = require('../models/review.model');
const catchAsync = require('../utils/catchAsync');

exports.validRestauranId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
    },
  });
  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: 'Restaurant not found',
    });
  }
  req.restaurant = restaurant;
  next();
});

exports.validReviewWithId = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { restaurantId, id } = req.params;

  const review = await Review.findOne({
    where: {
      userId: sessionUser.id,
      restaurantId,
      status: 'active',
    },
  });

  if (!review) {
    return res.status(404).json({
      status: 'error',
      message: 'Review not found',
    });
  }

  req.review = review;
  next();
});
