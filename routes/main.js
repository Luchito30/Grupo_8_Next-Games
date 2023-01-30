const express = require('express');
const {home} = require('../controllers/mainController');
const router = express.Router();

/* GET home page. */
router.get('/', home);

module.exports = router;
