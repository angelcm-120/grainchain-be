const express = require('express');
const matrizController = require('../../controllers/bombillos.matriz.controller');
const iluminacionController = require('../../controllers/bombillos.iluminacion.controller');
const router = express.Router();

router.route('/get-matriz').post(matrizController.getMatriz); 
router.route('/get-iluminacion').post(iluminacionController.getIluminacion); 


module.exports = router;
