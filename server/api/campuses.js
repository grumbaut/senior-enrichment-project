const router = require('express').Router();
const { Campus, Student } = require('../db');

module.exports = router;

// get /api/campuses

router.get('/', (req, res, next) => {
  Campus.findAll()
    .then(campuses => res.send(campuses))
    .catch(next);
});

// post /api/campuses

router.post('/', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => res.send(campus))
    .catch(next);
});

// delete /api/campuses/:id

router.delete('/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => campus.destroy())
    .then(() => Student.update({
      campusId: null
    }, {
      where: { campusId: req.params.id }
    }))
    .then(() => res.sendStatus(200))
    .catch(next);
});

// put /api/campuses/:id

router.put('/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => campus.update(req.body))
    .then(campus => res.send(campus))
    .catch(next);
});

// Put /api/campuses/transfer
router.put('/transfer/:id', (req, res, next) => {
  const promiseArray = req.body.students.map(student => Student.findById(student));
  Promise.all(promiseArray)
    .then(students => Promise.all(students.map(student => student.update({
      campusId: req.body.id
    }))))
    .then(students => res.send(students));
});
