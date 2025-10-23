const cuentas = require('../Datos/Cuentas.json');

const obtenerTodas = (req, res) => {
  res.json({
    count: cuentas.length,
    data: cuentas
  });
};

const obtenerPorId = (req, res) => {
  const cuenta = cuentas.find(c => c._id === req.params.id);
  console.log('Buscando ID:', req.params.id);
  console.log('Cuenta encontrada:', cuenta);
  res.json({
    finded: !!cuenta,
    account: cuenta || null,
    data: undefined
  });
};

const obtenerPorParametro = (req, res) => {
  const { queryParam } = req.query;
  
  if (!queryParam) {
    return res.json({
      finded: false,
      account: null
    });
  }

  const resultados = cuentas.filter(cuenta => 
    cuenta._id === queryParam ||
    cuenta.client.toLowerCase().includes(queryParam.toLowerCase()) ||
    cuenta.gender.toLowerCase() === queryParam.toLowerCase()
  );

  res.json({
    finded: resultados.length > 0,
    account: resultados.length === 1 ? resultados[0] : undefined,
    data: resultados.length > 1 ? resultados : undefined
  });
};

const obtenerPorBalance = (req, res) => {
  const balanceBuscado = req.query.balance;
  
  if (!balanceBuscado) {
    return res.json({
      finded: false,
      account: null
    });
  }

  // Limpiar el balance buscado (quitar $ y comas)
  const balanceLimpio = parseFloat(balanceBuscado.replace(/[$,]/g, '')).toFixed(2);
  console.log('Balance buscado limpio:', balanceLimpio);
  
  const cuentasEncontradas = cuentas.filter(cuenta => {
    const balanceCuenta = parseFloat(cuenta.balance.replace(/[$,]/g, '')).toFixed(2);
    console.log('Comparando con balance:', balanceCuenta);
    return balanceCuenta === balanceLimpio;
  });

  res.json({
    finded: cuentasEncontradas.length > 0,
    account: cuentasEncontradas.length === 1 ? cuentasEncontradas[0] : null,
    data: cuentasEncontradas.length > 1 ? cuentasEncontradas : undefined
  });
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  obtenerPorParametro,
  obtenerPorBalance
};
