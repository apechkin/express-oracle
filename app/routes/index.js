module.exports = function(app) {
  const express = require('express');
  const router = express.Router(); // eslint-disable-line new-cap
  const controllers = require('../controllers')(app);

  router.get('/', controllers.brand.selectBrand);

  return router;
};
