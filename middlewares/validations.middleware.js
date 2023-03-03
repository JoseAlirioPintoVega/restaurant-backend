const { check } = require('express-validator');

exports.createUserValidator = [
  check('name', 'The username must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email has been a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
  check(
    'password',
    'The password need min 6 caracters and max 10 caracters'
  ).isLength({
    min: 6,
    max: 10,
  }),
];

exports.createRestaurantValidator = [
  check('name', 'The username must be mandatory').not().isEmpty(),
  check('address', 'The address must be mandatory').not().isEmpty(),
  check('rating', 'The rating need are be between 1 and 5 ').isLength({
    min: 0,
    max: 1,
  }),
];
exports.createMealValidator = [
  check('name', 'The username must be mandatory').not().isEmpty(),
  check('price', 'The address must be mandatory').not().isEmpty(),
];
