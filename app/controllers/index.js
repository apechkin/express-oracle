module.exports = function(app) {
  return {
    brand: require('./brand')(app),
  };
};
