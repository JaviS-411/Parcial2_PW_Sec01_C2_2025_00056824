const express = require('express');
const app = express();
const rutasCuentas = require('./Rutas/Cuentas_Rutas');

app.use(express.json());
app.use('/', rutasCuentas);

const PORT = 3130;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
