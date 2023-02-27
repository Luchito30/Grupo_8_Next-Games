const express = require('express');
const {home,newslletter,search} = require('../controllers/mainController');

const router = express.Router();

router.get('/', home);
router.get('/search', search);
router.post("/newslletter", newslletter);



module.exports = router;
