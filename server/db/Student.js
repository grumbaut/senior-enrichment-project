const Sequelize = require('sequelize');
const conn = require('./conn');

const Student = conn.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter a first name.'
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter a last name.'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter an email.'
      },
      isEmail: {
        args: true,
        msg: 'Please provide a valid email.'
      }
    }
  },
  gpa: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [0.0],
        msg: 'Minimum GPA is 0.0.'
      },
      max: {
        args: [4.0],
        msg: 'Maximum GPA is 4.0.'
      },
      notEmpty: {
        args: true,
        msg: 'Please enter a GPA.'}
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/database/defaultStudent.jpg'
  }
}, {
  getterMethods: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});

module.exports = Student;
