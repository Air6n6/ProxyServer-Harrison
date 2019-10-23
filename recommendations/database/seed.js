const db = require('./index.js');
const faker = require('faker');


const homeGenerator = () => {
  for (var i = 0; i < 100; i++) {
    let home = [faker.lorem.word(), faker.lorem.words(5), faker.commerce.price(), faker.random.number(), faker.finance.amount(0,5,2)];
    // db.query(`insert into homes (homeType, title, price, reviewCount, rating) values(${faker.lorem.word()}, ${faker.lorem.words(5)}, ${faker.commerce.price()}, ${faker.random.number()}, ${faker.finance.amount(0,5,2)});`, (err, results) => {
      // db.query(`insert into homes (homeType, title, price, reviewCount, rating) values(homeuiuu, rentme, 50, 90, 5.00);`, (err, results) => {  
    db.query(`insert into homes (homeType, title, price, reviewCount, rating) values(?,?,?,?,?);`, home, (err, results) => { 
    if (err) {
        console.log(err, "could not add to homes table")
      } else {
        console.log('home added')
      }
    });
  }
};

homeGenerator();

const picGenerator = () => {
  for (var i = 0; i < 100; i++) {
  
    db.query(`insert into pictures (url) values("${faker.image.imageUrl(500,500,"room")}");`,  (err, results) => { 
    if (err) {
        console.log(err, "could not add to pictures table")
      } else {
        console.log('pic added')
      }
    });
  }
};

picGenerator();



const userGenerator = () => {
  for (var i = 0; i < 100; i++) {
    db.query(`insert into users (userName) values("${faker.internet.userName()}");`, (err, results) => { 
    if (err) {
        console.log(err, "could not add to users table")
      } else {
        console.log('username added')
      }
    });
  }
};

userGenerator();

const cityGenerator = () => {
  for (var i = 0; i < 10; i++) { 
    db.query(`insert into cities (cityName, stateName, country) values("Boston", "MA", "US");`, (err, results) => { 
    if (err) {
        console.log(err, "could not add Boston to cities table")
      } else {
        console.log('home Boston')
      }
    });
  }
  for (var i = 0; i < 10; i++) { 
    db.query(`insert into cities (cityName, stateName, country) values("Cupertino", "CA", "US");`, (err, results) => { 
    if (err) {
        console.log(err, "could not add Cupertino to cities table")
      } else {
        console.log('home cupertino')
      }
    });
  }
  for (var i = 0; i < 10; i++) { 
    db.query(`insert into cities (cityName, stateName, country) values("Miami", "FL", "US");`, (err, results) => { 
    if (err) {
        console.log(err, "could not add Miami to cities table")
      } else {
        console.log('home Miami')
      }
    });
  }
  for (var i = 0; i < 10; i++) { 
    db.query(`insert into cities (cityName, stateName, country) values("Denver", "CO", "US");`, (err, results) => { 
    if (err) {
        console.log(err, "could not add Denver to cities table")
      } else {
        console.log('home Denver')
      }
    });
  }
  for (var i = 0; i < 10; i++) { 
    db.query(`insert into cities (cityName, stateName, country) values("San Francisco", "CA", "US");`, (err, results) => { 
    if (err) {
        console.log(err, "could not add SF to cities table")
      } else {
        console.log('home SF')
      }
    });
  }
  for (var i = 0; i < 10; i++) { 
    db.query(`insert into cities (cityName, stateName, country) values("Honolulu", "HI", "US");`, (err, results) => { 
    if (err) {
        console.log(err, "could not add Honolulu to cities table")
      } else {
        console.log('home Honolulu')
      }
    });
  }
  for (var i = 0; i < 10; i++) { 
    db.query(`insert into cities (cityName, stateName, country) values("Seattle", "WA", "US");`, (err, results) => { 
    if (err) {
        console.log(err, "could not add Seattle to cities table")
      } else {
        console.log('home Seattle')
      }
    });
  }
  for (var i = 0; i < 10; i++) { 
    db.query(`insert into cities (cityName, stateName, country) values("San Jose", "CA", "US");`, (err, results) => { 
    if (err) {
        console.log(err, "could not add San Jose to cities table")
      } else {
        console.log('home San Jose')
      }
    });
  }
  for (var i = 0; i < 10; i++) { 
    db.query(`insert into cities (cityName, stateName, country) values("New York", "NY", "US");`, (err, results) => { 
    if (err) {
        console.log(err, "could not add New York to cities table")
      } else {
        console.log('ahome New York')
      }
    });
  }
  for (var i = 0; i < 10; i++) { 
    db.query(`insert into cities (cityName, stateName, country) values ("Los Angeles", "CA", "US");`, (err, results) => { 
    if (err) {
        console.log(err, "could not add Los Angeles to cities table")
      } else {
        console.log('added home Los Angeles')
      }
    });
  }



};

cityGenerator();



