const express = require('express');
const {home} = require('../controllers/mainController');

const router = express.Router();
const mainController = require('../controllers/mainController')

router.get('/', home);
router.get('/search', mainController.search);

module.exports = router;
