const express = require('express');
const path = require('path');
const controller = require('./controllers/controller.js')
const db = require('../database/connection.js');

const bodyParser = require('body-parser')

const PORT = 3004

const app = express()
app.use(express.json())

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  

app.use(express.static(path.join(__dirname, '../public')));

app.get('/reviews',(req, res)=>{
    controller.getAll(req, res);
});


app.listen(PORT, ()=> console.log(`Movie list app listening on port ${PORT}`))