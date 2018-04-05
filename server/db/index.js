const conn = require('./conn');
const Campus = require('./Campus');
const Student = require('./Student');

Student.belongsTo(Campus /*, { foreignKey: { allowNull: false }}*/);
Campus.hasMany(Student);

module.exports = {
  conn,
  Campus,
  Student
};
