const { Router } = require('express');
const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getOrders,
  getOrderById,
} = require('../controllers/user.controller');
const {
  protect,
  validIfExistUser,
  protectAccountOwner,
  validIfExistUserEmail,
} = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');
const {
  createUserValidator,
} = require('../middlewares/validations.middleware');

const router = Router();

router.post(
  '/signup',
  createUserValidator,
  validateFields,
  validIfExistUserEmail,
  createUser
);

router.post('/login', loginUser);

router.use(protect);

router.patch('/:id', validIfExistUser, protectAccountOwner, updateUser);

router.delete('/:id', validIfExistUser, protectAccountOwner, deleteUser);

router.get('/orders', getOrders);

router.get('/orders/:id', getOrderById);

module.exports = { usersRouter: router };
