const mongoose = require ('mongoose');



var reviewsSchema = new mongoose.Schema ({
    listingID: String,
    host: {
        hostID: String,
        hostName: String,
        hostPhoto: String,
    },
    avgRating: Number,
    ratings:{
        communication: Number,
        checkIn: Number,
        location: Number,
        accuracy: Number,
        cleanliness: Number,
        value: Number,
    },
    reviews:[{
        customer:{
            customerID: String,
            customerName: String,
            customerPhoto: String,
        },
        ratings:{
            communication: Number,
            checkIn: Number,
            location: Number,
            accuracy: Number,
            cleanliness: Number,
            value: Number,
        },
        body: String,
        bodyDate: Date,
        response: String,
        responseDate: Date,
    }]
})

var Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports.Reviews = Reviews;