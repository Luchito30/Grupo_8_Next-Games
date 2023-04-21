const express = require('express');
const {home,newslletter,search} = require('../controllers/mainController');

const router = express.Router();
const newslettrsvalidator = require('../validations/newslettrsvalidator');

router.get('/', home);

router.get('/search', search);

router.post("/newslletter", newslettrsvalidator,newslletter);

module.exports = router;
