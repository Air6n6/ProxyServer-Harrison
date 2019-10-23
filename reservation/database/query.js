const Sequelize = require('sequelize');
const moment = require('moment');
const model = require('./models.js');

const { Op } = Sequelize;

const { Listing } = model;
const { Reservation } = model;

const getTwoMonth = (listingId, month, callback) => {
  const start = moment()
    .date(1)
    .hour(0);
  const end = moment()
    .month(month)
    .date(31)
    .hour(0);
  Listing.findAll({
    where: { id: listingId },
    include: [
      {
        model: Reservation,
        where: {
          checkIn: {
            [Op.between]: [start, end],
          },
        },
      },
    ],
  })
    .then(data => {
      const results = [];
      data.forEach(ele => {
        results.push(ele.toJSON());
      });
      callback(results);
    })
    .catch(err => {
      callback(err);
    });
};

module.exports = { getTwoMonth };
