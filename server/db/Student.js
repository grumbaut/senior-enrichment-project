const Sequelize = require('sequelize');
const conn = require('./conn');

const Student = conn.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'First name must not be blank.'}
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Last name must not be blank.'}
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Email must not be blank.'},
      isEmail: { args: true, msg: 'Please provide a valid email.'}
    }
  },
  gpa: {
    type: Sequelize.FLOAT,
    validate: {
      min: {
        args: [0.0],
        msg: 'Minimum GPA is 0.0.'
      },
      max: {
        args: [4.0],
        msg: 'Maximum GPA is 4.0.'
      }
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '/images/74.png'
  }
}, {
  getterMethods: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});

module.exports = Student;
