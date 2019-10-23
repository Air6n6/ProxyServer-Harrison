const Sequelize = require('sequelize');
const faker = require('faker');
const moment = require('moment');
const model = require('./models.js');

const { Listing } = model;
const { Reservation } = model;

const createRecords = mockList => {
  Listing.sync()
    .then(() => Listing.create(mockList))
    .then(() => Listing.findOne({ where: { location: mockList.location } }))
    .then(listing => {
      const minStay = listing.minStayWeekend;
      const key = listing.id;
      const { maxGuest } = listing;
      return Reservation.sync().then(() => {
        let currentDate = moment();

        for (let k = 0; k < 3; k++) {
          const totalNights = minStay + Math.floor(Math.random() * 5) + 1;
          Reservation.create({
            user: faker.name.findName(),
            checkIn: currentDate,
            totalNights: totalNights,
            guests: Math.floor(Math.random() * maxGuest) + 1,
            listingId: key
          });
          const days = Math.floor(Math.random() * 7) + 1;
          currentDate = currentDate.add(totalNights + days, 'd');
        }
      });
    })
    .catch(err => {
      console.error(err);
    });
};

for (let k = 0; k < 3; k++) {
  const listing = {
    location: faker.address.streetAddress(),
    basePrice: 90 + k,
    cleaningFee: 10,
    serviceFee: 5,
    taxes: 0.09,
    discount: Math.floor(Math.random() * 10) / 100,
    minStayWeekday: Math.floor(Math.random() * 4),
    minStayWeekend: Math.floor(Math.random() * 2),
    instantBooked: !!Math.round(Math.random()),
    maxGuest: Math.floor(Math.random() * 5) + 4
  };
  createRecords(listing);
}
