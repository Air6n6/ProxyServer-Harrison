const db = require('./index.js') 

// Data is req.body
// req.body.title
//   const queryString = 
  

const getAllFromHomes = (cb) => {
  const queryString = `SELECT * FROM cities;`   
  db.query(queryString, (err, dbResObj) => {
    if (err) {
      cb(err);
    } else {
      cb(null, dbResObj);
    }
  })
}

module.exports={getAllFromHomes: getAllFromHomes}

