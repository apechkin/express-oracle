const Promise = require('bluebird');
const oracledb = require('oracledb');
const dbConfig = require('../../config/dbconfig.js');
let db = {};
oracledb.outFormat = oracledb.OBJECT;

/**
* Get Async connetcion
* @return {object} Promise
*/
db.getConnect = function() {
  return new Promise((resolve, reject) => {
    oracledb.getConnection({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString,
    }, (err, conn) => {
      if(err) {
        reject(err);
      }
      resolve(conn);
    });
  });
};

/**
* Execute Asyn query
*
* @param {object} sql Request object
* @param {object} bindParams Request object
* @param {object} options Request object
* @param {object} connection Request object
* @return {object} Promise
*/
db.executeAsync = function(sql, bindParams, options, connection) {
  return new Promise((resolve, reject) => {
      connection.execute(sql, bindParams, (err, result) => {
          if (err) {
              console.error(err.message);
              reject(err);
          }
          resolve(result.rows);
      });
  });
};

/**
* Close connection after fetch
*
* @param {object} connection Request object
* @return {object} Callback
*/
db.doRelease = function(connection) {
  return connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
};

module.exports = db;
