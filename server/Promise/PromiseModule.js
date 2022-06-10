const db = require("../config/db");
const PromiseModule = {
  createUpdateDelete,
  readData,
  readDataWithId,
};

async function readData(sqlQuery) {
  return new Promise((resolve, reject) => {
    db.query(sqlQuery, (error, rows, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}
async function readDataWithId(sqlQuery, sqlValue) {
  return new Promise((resolve, reject) => {
    db.query(sqlQuery, sqlValue, (error, rows, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

async function createUpdateDelete(sqlQuery, sqlValue) {
  return new Promise((resolve, reject) => {
    db.query(sqlQuery, sqlValue, (error, rows, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = PromiseModule;
