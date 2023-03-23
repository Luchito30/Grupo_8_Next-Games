const express = require('express');
const {home,newslletter,search,admin} = require('../controllers/mainController');

const router = express.Router();
const mainController = require('../controllers/mainController');
const checkAdmin = require('../middlewares/checkAdmin');

router.get('/', home);
router.get('/search', search);
router.post("/newslletter", newslletter);
router.get("/admin", checkAdmin ,admin)


module.exports = router;
