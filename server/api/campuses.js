const router = require('express').Router();
const { Campus } = require('../db');

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

//delete /api/campuses/:id

router.delete('/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => campus.destroy())
    .then(() => res.sendStatus(200))
    .catch(next);
});
