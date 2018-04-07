const faker = require('faker');
const toonavatar = require('cartoon-avatar');
const { conn, Student, Campus } = require('./server/db');

const create = (n, func) => {
  while(n--) {
    func();
  }
};

const createCampus = () => {
  const campusNames = ['Functions', 'Objects', 'Semicolons', 'Math.random', 'Arrays', 'Loops', 'Prototypes', 'Node', 'Constructors', 'Recursion', 'Nested Loops', 'Array.splice', 'JSX', 'Sequelize', 'JSON', 'String.slice', 'Fat Arrows', 'Parameters', 'Horizontal Rules'];
  const randomIndex = Math.floor(Math.random() * (campusNames.length - 1) + 1);
  const name = `${faker.name.findName()} School of ${campusNames[randomIndex]}`;
  const address = faker.address.streetAddress();
  const description = faker.lorem.paragraphs(2);
  const city = faker.address.city();
  const state = faker.address.stateAbbr();
  const zip = faker.address.zipCode();
  Campus.create({
    name,
    description,
    address,
    city,
    state,
    zip
  });
};

const associate = (student) => {
  return Campus.findAll()
    .then(campuses => {
      const index = (Math.random() * campuses.length).toFixed(0);
      return campuses[index];
    })
    .then(campus => {
      student.setCampus(campus);
    });
};

const createStudent = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const gpa = Number((Math.random() * (4.0)).toFixed(2));
  const imageUrl = toonavatar.generate_avatar();

  return Student.create({
    firstName,
    lastName,
    email,
    gpa,
    imageUrl
  })
    .then(student => associate(student));
};

conn.sync({ force: true })
  .then(() => create(6, createCampus))
  .then(() => create(100, createStudent))
  .catch(error => console.error(error));
