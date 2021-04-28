const express = require('express');
const { PORT } = require('./src/config');
const routingAPI = require('./src/handlers');

const app = express();

app.use(express.json());

app.use(routingAPI);

app.listen(PORT, () => {
  console.info(`Escuchando en puerto ${PORT}`);
});
