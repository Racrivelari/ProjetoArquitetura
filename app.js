const express = require('express');
const app = express();
require('dotenv').config();
var path = require('path');
const port = process.env.PORT || 3000;

const mustacheExpress = require('mustache-express');

const routes = require('./routes/routes.js');
const clientesRoute = require ('./routes/clientes.js');
const pedidosRoute = require ('./routes/pedidos.js');
const produtosRoute = require ('./routes/produtos.js');

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Associar o roteador às rotas principais
// app.use('/', routes);

app.use('/', routes);
app.use('/produtos', produtosRoute);
app.use('/pedidos', pedidosRoute);
app.use('/login', clientesRoute);


app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
