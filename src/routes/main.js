const express = require('express');
const {home,search} = require('../controllers/mainController');

const router = express.Router();
const newslettrsvalidator = require('../validations/newslettrsvalidator');

router.get('/', home);

router.get('/search', search);

router.post("/", newslettrsvalidator,home);

module.exports = router;
