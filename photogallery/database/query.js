const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');
const model = require('./models.js');

const ListingImages = model.ListingImages;
const ListingID = model.ListingID;

function retrieveAll(callback) {
    ListingImages.findAll()
        .then((result) => callback(null, result))
        .catch((error) => callback(error, null));
}

function retrieveById(id, callback) {
    ListingImages.findAll({ where: { list_id: id }})
        .then((result) => callback(null, result))
        .catch((error) => callback(error, null));
}

module.exports.retrieveAll = retrieveAll;
module.exports.retrieveById = retrieveById;

