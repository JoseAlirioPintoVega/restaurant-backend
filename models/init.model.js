const Meal = require('./meal.model');
const Order = require('./order.model');
const Restaurant = require('./restaurat.model');
const Review = require('./review.model');
const User = require('./user.model');

const initModel = () => {
  User.hasMany(Review);
  Review.belongsTo(User);

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Meal.hasOne(Order);
  Order.belongsTo(Meal);

  User.hasMany(Order);
  Order.belongsTo(User);
};
module.exports = initModel;
