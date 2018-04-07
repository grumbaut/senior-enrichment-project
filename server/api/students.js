const router = require('express').Router();
const { Student } = require('../db');

module.exports = router;

// Get /api/students
router.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students));
});

// Post /api/students
router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next);
});

// Delete /api/students/:id
router.delete('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(200))
    .catch(next);
});

// Put /api/students/:id
router.put('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .then(student => res.send(student))
    .catch(next);
});
