const express = require('express');
const {home,newslletter,search,admin} = require('../controllers/mainController');

const router = express.Router();
const mainController = require('../controllers/mainController')

router.get('/', home);
router.get('/search', search);
router.post("/newslletter", newslletter);
router.get("/admin",admin)


module.exports = router;
