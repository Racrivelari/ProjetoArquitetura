const express = require('express');
const app = express();
require('dotenv').config();
var path = require('path');
const port = process.env.PORT || 3000;

// Configurar o diretório estático para servir arquivos HTML
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
// Importar o arquivo de rotas
const routes = require('./routes/routes.js');

// Associar o roteador às rotas principais
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
