const express = require('express');
const {home,newslletter} = require('../controllers/mainController');

const router = express.Router();

router.get('/', home);
router.post("/newslletter", newslletter)

module.exports = router;
