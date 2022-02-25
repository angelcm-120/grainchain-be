const express = require('express');
const bombilloRoute = require('./bombillo.route');
const statusRoute = require('./status.route'); 
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/bombillo',
    route: bombilloRoute,
  },
  {
    path: '/status',
    route: statusRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
