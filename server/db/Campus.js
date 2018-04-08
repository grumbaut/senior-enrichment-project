const conn = require('./conn');
const Sequelize = require('sequelize');

const done = (error) => { return error; };

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
    defaultValue: '/images/database/default.jpg'
  },
  description: Sequelize.TEXT('long')
});

module.exports = Campus;
