const router = require('express').Router();
const path = require('path');

router.use('/campuses', require('./campuses'));
router.use('/students', require('./students'));

module.exports = router;
