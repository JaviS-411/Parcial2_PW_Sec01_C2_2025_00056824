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
  const query = req.query;
  let resultados = cuentas;

  if (query._id) {
    resultados = resultados.filter(c => c._id === query._id);
  }
  if (query.client) {
    resultados = resultados.filter(c => c.client.toLowerCase().includes(query.client.toLowerCase()));
  }
  if (query.gender) {
    resultados = resultados.filter(c => c.gender.toLowerCase() === query.gender.toLowerCase());
  }
  if (query.isActive) {
    resultados = resultados.filter(c => c.isActive === (query.isActive === 'true'));
  }
  if (query.balance) {
    // Normalizar el formato del balance recibido y el de la cuenta para comparar correctamente
    const balanceParam = parseFloat(query.balance.replace(/[^0-9.-]+/g, ""));
    resultados = resultados.filter(c => {
      const cuentaBalance = parseFloat(c.balance.replace(/[^0-9.-]+/g, ""));
      return cuentaBalance === balanceParam;
    });
  }

  if (resultados.length === 0) {
    return res.json({
      finded: false,
      message: 'No se ha encontrado ninguna cuenta con ese valor.'
    });
  }
  res.json({
    finded: true,
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