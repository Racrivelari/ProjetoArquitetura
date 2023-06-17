const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/pedidoController');
const pedidoController = new PedidoController();

router.get('/', (req, res) => {
  res.sendFile('home.html', { root: 'views' });
});

router.get('/sobre', (req, res) => {
  res.sendFile('sobre.html', { root: 'views' });
});

router.get('/negocio', (req, res) => {
  res.sendFile('negocio.html', { root: 'views' });
});

router.get('/somos', (req, res) => {
  res.sendFile('somos.html', { root: 'views' });
});

router.get('/cliente', (req, res) => {
  res.sendFile('cliente.html', { root: 'views' });
});

router.get('/contato', (req, res) => {
  res.sendFile('contato.html', { root: 'views' });
});

router.post('/pedidos', (req, res) => {
  // Extrair os dados do corpo da requisição
  const { usina, produto, quantidade, preco, destino } = req.body;

  // Criar o objeto de pedido com os dados recebidos
  const novoPedido = {
    usina,
    produto,
    quantidade,
    preco,
    destino,
    timestamp: new Date().getTime(), // Adicionar o timestamp
  };

  // Chamar o método de criação de pedido no controlador
  pedidoController.createPedido(novoPedido)
    .then(() => {
      // Pedido cadastrado com sucesso
      res.status(201).json({ message: 'Pedido cadastrado com sucesso.' });
    })
    .catch((error) => {
      // Ocorreu um erro ao cadastrar o pedido
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o pedido.' });
    });
});


module.exports = router;
