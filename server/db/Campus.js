const conn = require('./conn');
const Sequelize = require('sequelize');

const done = (error) => { return error; };

const Campus = conn.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Please provide a campus name.' },
      // isUnique: (name, done) => {
      //   Campus.findOne({ where: { name: name }})
      //     .then(campus => {
      //       if(campus) {
      //         return done(new Error('Campus name must be unique.'));
      //       }
      //     });
      // }
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://img.buzzfeed.com/buzzfeed-static/static/2017-05/17/14/asset/buzzfeed-prod-fastlane-03/sub-buzz-2246-1495046068-1.jpg?downsize=715:*&output-format=auto&output-quality=auto'
  },
  description: Sequelize.TEXT('long')
});

module.exports = Campus;