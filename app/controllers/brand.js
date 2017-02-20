module.exports = function(app) {
  const db = require('../helper/db.js');

/**
  * Select from brand
  *
  * @param {object} req Request object
  * @param {object} res Request object
  * @param {function} next Next function
  * @return {object} Promise
  *
  */
  function selectBrand(req, res, next) {
    let sql = 'SELECT * FROM brand WHERE bndnum < :id';
    return db.getConnect()
    .then((conn) => {
      return db.executeAsync(sql, [4], null, conn)
      .then((result) => {
        return res.json({
          status: 'OK',
          result: result,
        });
        db.doRelease(conn);
      })
      .catch((err) => {
        console.log(err);
        db.doRelease(conn);
        next(err);
      });
    })
    .catch((err) => {
      console.log(err);
      db.doRelease(conn);
      next(err);
    });
  }

  return {
    selectBrand: selectBrand,
  };
};
