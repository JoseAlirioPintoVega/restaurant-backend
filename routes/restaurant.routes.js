const { Router } = require('express');
const {
  createRestaurant,
  getRestaurantsActive,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/restaurant.controller');
const {
  validRestauranId,
  validReviewWithId,
} = require('../middlewares/restaurant.middleware');
const {
  protect,
  protectAccountOwner,
  restrictTo,
} = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');
const {
  createRestaurantValidator,
} = require('../middlewares/validations.middleware');

const router = Router();

router.post(
  '/',
  protect,
  createRestaurantValidator,
  validateFields,
  restrictTo('admin'),
  createRestaurant
);

router.get('/', getRestaurantsActive);

router.get('/:id', validRestauranId, getRestaurantById);

router.patch(
  '/:id',
  validRestauranId,
  protect,
  restrictTo('admin'),
  updateRestaurant
);

router.delete(
  '/:id',
  validRestauranId,
  protect,
  restrictTo('admin'),
  deleteRestaurant
);

router.use(protect);

router.post('/reviews/:id', validRestauranId, createReview);

router.patch(
  '/reviews/:restaurantId/:id',
  validRestauranId,
  validReviewWithId,
  updateReview
);

router.delete(
  '/reviews/:restaurantId/:id',
  validRestauranId,
  validReviewWithId,
  deleteReview
);

module.exports = {
  restaurantsRouter: router,
};
