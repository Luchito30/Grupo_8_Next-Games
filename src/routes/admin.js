const express = require('express');
const {dashboardProduct,dashboardUser} = require("../controllers/adminController");
const checkAdmin = require('../middlewares/checkAdmin');

const router = express.Router();

router.get("/dashboardProduct", checkAdmin , dashboardProduct);
router.get("/dashboardUser", checkAdmin, dashboardUser);


module.exports = router;
