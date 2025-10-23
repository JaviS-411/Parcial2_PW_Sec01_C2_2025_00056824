const express = require('express');
const router = express.Router();
const {
  obtenerTodas,
  obtenerPorId,
  obtenerPorParametro,
  obtenerPorBalance
} = require('../Controladores/Cuentas_Controlador');

// Ruta combinada para /cuentas (lista completa y búsqueda por queryParam)
router.get('/cuentas', (req, res) => {
  if (req.query.queryParam) {
    obtenerPorParametro(req, res);
  } else {
    obtenerTodas(req, res);
  }
});

// Ruta para obtener cuenta por ID
router.get('/cuenta/:id', obtenerPorId);

// Ruta para buscar por balance
router.get('/cuentasBalance', obtenerPorBalance);

module.exports = router;
