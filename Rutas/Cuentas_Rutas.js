const express = require('express');
const router = express.Router();
const {
  obtenerTodas,
  obtenerPorId,
  obtenerPorParametro,
  obtenerBalanceTotal
} = require('../Controladores/Cuentas_Controlador');

router.get('/cuentas', (req, res) => {
  if (req.query.queryParam) {
    obtenerPorParametro(req, res);
  } else {
    obtenerTodas(req, res);
  }
});

router.get('/cuenta/:id', obtenerPorId);
router.get('/cuentasBalance', obtenerBalanceTotal);

module.exports = router;
