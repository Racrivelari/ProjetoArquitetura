const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000; 

const routes = require('./routes/routes.js');
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
