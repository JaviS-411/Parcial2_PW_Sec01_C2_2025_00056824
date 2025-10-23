const cuentas = require('../Datos/Cuentas.json');

const obtenerTodas = (req, res) => {
  res.json({
    count: cuentas.length,
    data: cuentas
  });
};

const obtenerPorId = (req, res) => {
  const cuenta = cuentas.find(c => c._id === req.params.id);
  res.json({
    finded: !!cuenta,
    account: cuenta || null
  });
};

const obtenerPorParametro = (req, res) => {
  const { queryParam } = req.query;
  const resultados = cuentas.filter(c =>
    c._id === queryParam ||
    c.client.toLowerCase().includes(queryParam.toLowerCase()) ||
    c.gender.toLowerCase() === queryParam.toLowerCase()
  );

  res.json({
    finded: resultados.length > 0,
    account: resultados.length === 1 ? resultados[0] : undefined,
    data: resultados.length > 1 ? resultados : undefined
  });
};

const obtenerBalanceTotal = (req, res) => {
  const activos = cuentas.filter(c => c.isActive);
  const total = activos.reduce((acc, c) => {
    const monto = parseFloat(c.balance.replace(/[^0-9.-]+/g, ""));
    return acc + monto;
  }, 0);

  res.json({
    status: activos.length > 0,
    accountBalance: `$${total.toFixed(2)}`
  });
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  obtenerPorParametro,
  obtenerBalanceTotal
};
