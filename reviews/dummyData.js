const faker = require('faker');

const dummyReviews = []

for(var i = 0; i < 35; i++){
    var obj = {};
    obj.customer = {};
    obj.ratings = {};
    obj.customer.customerID = faker.random.uuid();
    obj.customer.customerName = faker.name.findName();
    obj.customer.customerPhoto = faker.internet.avatar();
    obj.ratings.communication = Math.floor(Math.random()*Math.floor(5));
    obj.ratings.checkIn = Math.floor(Math.random()*Math.floor(5));
    obj.ratings.location = Math.floor(Math.random()*Math.floor(5));
    obj.ratings.accuracy = Math.floor(Math.random()*Math.floor(5));
    obj.ratings.cleanliness = Math.floor(Math.random()*Math.floor(5));
    obj.ratings.value = Math.floor(Math.random()*Math.floor(5));
    obj.body = faker.lorem.paragraph();
    obj.bodyDate = faker.date.past();
    obj.response = faker.lorem.paragraph();
    obj.responseDate = faker.date.past();
    dummyReviews.push(obj)
}

module.exports = dummyReviews

