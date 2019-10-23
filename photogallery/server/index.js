const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const query = require('../database/query.js');
const PORT = 3001;

app.use(express.static(__dirname + '/../public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/test', (req, res) => {
    query.retrieveAll((err, data) => {
        res.send(data);
    });
});

app.get('/listing/:listingid', (req, res) => {
    let id = req.params.listingid;
    query.retrieveById(id, (err, data) => {
        res.send(data);
    });
})

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });