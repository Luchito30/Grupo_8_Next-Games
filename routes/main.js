const express = require('express');
const {home} = require('../controllers/mainController');

const router = express.Router();

router.get('/', home);

module.exports = router;
