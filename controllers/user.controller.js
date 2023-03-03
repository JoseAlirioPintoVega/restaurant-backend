const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role = 'normal' } = req.body;

  const user = new User({
    name,
    email,
    password,
    role,
  });
  console.log(user);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();
  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
    },
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  const token = await generateJWT(user.id);
  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const { name, email } = req.body;

  const updateUser = await user.update({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
  });
  res.status(200).json({
    status: 'success',
    message: 'The User has been updated successfully',
    updateUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const deleteUser = await user.update({ status: false });
  res.status(200).json({
    status: 'success',
    message: 'The User has been updated successfully',
    deleteUser,
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const orders = await User.findOne({ id: sessionUser.id });
  // falta hacer la logica  de las  relaciones  del order
  res.status(200).json({
    status: 'success',
    message: 'The orders was find',
    orders,
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const OrdersbyId = await User.findOne({ id: sessionUser.id });
  // falta hacer la logica  de las  relaciones  del order
  res.status(200).json({
    status: 'success',
    message: 'The orders was find',
    OrdersbyId,
  });
});
