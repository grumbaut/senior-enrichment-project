const conn = require('./conn');
const Sequelize = require('sequelize');

const Campus = conn.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please provide a campus name.'
      }
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please provide a city.'
      }
    }
  },
  planet: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please provide a homeworld.'
      }
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/database/Earth.jpg'
  },
  description: {
    type: Sequelize.TEXT('long'),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please provide a description.'
      }
    }
  }
});

module.exports = Campus;
