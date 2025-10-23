const express = require('express');
const router = express.Router();
const {
  obtenerTodas,
  obtenerPorId,
  obtenerPorParametro,
  obtenerBalanceTotal
} = require('../Controladores/Cuentas_Controlador');

router.get('/cuentas', (req, res) => {
  // Si hay algún parámetro de consulta, filtra; si no, devuelve todas
  if (Object.keys(req.query).length > 0) {
    obtenerPorParametro(req, res);
  } else {
    obtenerTodas(req, res);
  }
});

router.get('/cuenta/:id', obtenerPorId);
router.get('/cuentasBalance', obtenerBalanceTotal);

module.exports = router;