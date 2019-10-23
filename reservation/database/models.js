const Sequelize = require('sequelize');
const config = require('../config.js');

const pw = config.sqlPW || '';

const db = new Sequelize('air6n6', 'root', pw, {
  dialect: 'mysql'
});

const Listing = db.define('listing', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  basePrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cleaningFee: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  serviceFee: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  taxes: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  minStayWeekday: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  minStayWeekend: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  discount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  instantBooked: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  maxGuest: {
    type: Sequelize.INTEGER
  }
});

const Reservation = db.define('reservation', {
  id: {
    type: Sequelize.BOOLEAN,
    autoIncrement: true,
    primaryKey: true
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false
  },
  checkIn: {
    type: Sequelize.DATE,
    allowNull: false
  },
  totalNights: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  guests: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Listing.hasMany(Reservation, { foreignKey: 'listingId', sourceKey: 'id' });
Reservation.belongsTo(Listing, { foreignKey: 'listingId', sourceKey: 'id ' });

module.exports = { Listing, Reservation };
