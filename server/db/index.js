const conn = require('./conn');
const Campus = require('./Campus');
const Student = require('./Student');

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = {
  conn,
  Campus,
  Student
};
