const express = require('express');
const {home,search, NewsLatter} = require('../controllers/mainController');

const router = express.Router();
const newslettrsvalidator = require('../validations/newslettrsvalidator');

router.get('/', home);

router.get('/search', search);

router.post("/", newslettrsvalidator,NewsLatter);

module.exports = router;
