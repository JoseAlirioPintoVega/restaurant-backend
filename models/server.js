const express = require('express');
const cors = require('cors');

const { mealsRouter } = require('../routes/meal.routes');
const { usersRouter } = require('../routes/user.routes');
const { restaurantsRouter } = require('../routes/restaurant.routes');
const { ordersRouter } = require('../routes/order.routes');

const { db } = require('../database/db');
const morgan = require('morgan');
const initModel = require('./init.model');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../utils/appError');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.paths = {
      user: '/api/v1/users',
      restaurant: '/api/v1/restaurants',
      meal: '/api/v1/meals',
      order: '/api/v1/orders',
    };
    this.database();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      console.log('HOLA ESTOY EN DESARROLLO');
    }
    if (process.env.NODE_ENV === 'production') {
      console.log('HOLA ESTOY EN PRODUCCIÓN');
    }
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.paths.user, usersRouter);
    this.app.use(this.paths.restaurant, restaurantsRouter);
    this.app.use(this.paths.meal, mealsRouter);
    this.app.use(this.paths.order, ordersRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server`, 404)
      );
    });
    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    initModel();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

module.exports = Server;
