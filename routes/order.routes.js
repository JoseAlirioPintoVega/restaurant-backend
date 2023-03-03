const { Router } = require('express');
const {
  createOrder,
  getOrdersById,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller');
const {
  validMealIdByBody,
  findOrderById,
  protectAccountOwnerByOrder,
} = require('../middlewares/order.middleware');
const { protect } = require('../middlewares/user.middleware');

const router = Router();

router.use(protect);

router.post('/', validMealIdByBody, createOrder);

router.get('/me', getOrdersById);

router.patch('/:id', findOrderById, protectAccountOwnerByOrder, updateOrder);

router.delete('/:id', findOrderById, protectAccountOwnerByOrder, deleteOrder);

module.exports = {
  ordersRouter: router,
};
