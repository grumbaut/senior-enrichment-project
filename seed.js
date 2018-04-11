const toonavatar = require('cartoon-avatar');
const Chance = require('chance');
const chance = new Chance();
const faker = require('faker');
const { conn, Student, Campus } = require('./server/db');

//returns array of promises for use in Promise.all below
const create = (n, func) => {
  const results = [];
  while(n--) {
    results.push(func());
  }
  return results;
};

const createCampus = () => {
  const campusNames = ['Functions', 'Objects', 'Semicolons', 'Math.random', 'Arrays', 'Loops', 'Prototypes', 'Node', 'Constructors', 'Recursion', 'Nested Loops', 'Array.splice', 'JSX', 'Sequelize', 'JSON', 'String.slice', 'Fat Arrows', 'Parameters', 'Horizontal Rules'];
  const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  const name = `${chance.name()} School of ${campusNames[chance.integer({min: 0, max: campusNames.length - 1})]}`;
  const city = chance.city();
  const state = chance.state();
  const description = faker.lorem.paragraph(6);
  const planet = planets[chance.integer({ min: 0, max: planets.length - 1})];
  const imageUrl = `/images/database/${planet}.jpg`;
  return Campus.create({
    name,
    city,
    state,
    description,
    planet,
    imageUrl
  });
};

const createStudent = () => {
  const gender = chance.gender();
  const firstName = chance.first({ gender });
  const lastName = chance.last({ gender });
  const email = chance.email();
  const gpa = chance.floating({ min: 0, max: 4, fixed: 2 });
  const imageUrl = toonavatar.generate_avatar({ "gender": gender });

  return Student.create({
    firstName,
    lastName,
    email,
    gpa,
    imageUrl
  })
    .then(student => associate(student));
};

const associate = (student) => {
  return Campus.findAll()
    .then(campuses => {
      const index = chance.integer({ min: 0, max: campuses.length - 1 });
      return campuses[index];
    })
    .then(campus => {
      student.setCampus(campus);
    });
};

conn.sync({ force: true })
  .then(() => {
    return Promise.all(create(4, createCampus));
  })
  .then(() => {
    return Promise.all(create(50, createStudent));
  })
  .finally(() => {
    conn.close();
    return null;
  });
