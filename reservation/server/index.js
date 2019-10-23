const express = require('express');
const moment = require('moment');
const path = require('path');
const query = require('../database/query.js');

const app = express();
const port = 3003;

app.use(express.static(path.join(__dirname, '/../public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/now', (req, res) => {
  const month = moment(req.query.date).month() + 1;
  query.getTwoMonth(1, month, res.send.bind(res));
});

app.listen(port, () =>
  console.log(`Reservation Component listening on port ${port}!`)
);
