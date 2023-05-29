const express = require('express');
const {consulta,contactanos,nosotros,questions} = require("../controllers/infoController");
const consultaValidator = require('../validations/consultaValidator');
const router = express.Router();


router.get('/questions',questions);

router.get('/nosotros',nosotros);

router.get('/contactanos',contactanos);

router.post('/contactanos',consultaValidator,consulta);

module.exports = router;