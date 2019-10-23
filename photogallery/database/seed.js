const Sequelize = require('sequelize');
const model = require('./models.js');
const faker = require('faker');

const ListingImages = model.ListingImages;
const ListingID = model.ListingID;

let createRecord = (table, mockData) => {
    table.sync()
        .then(() => table.create(mockData));
};

for (var i = 1; i < 4; i++) {
    let mockData = {
        id: i
    }

    createRecord(ListingID, mockData);
}

for (var i = 1; i < 4; i++) {
    for (var n = 0; n < 15; n++) {
        let mockData = {
            url: faker.image.image(),
            description: faker.lorem.sentence(),
            list_id: i
        }
    
        createRecord(ListingImages, mockData);
    }
}