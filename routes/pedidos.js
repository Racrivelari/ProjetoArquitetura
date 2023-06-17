const express = require('express');
const router = express.Router();

const PedidoController = require('../controller/pedidoController');
const pedidoController = new PedidoController();

router.get('/', (req, res) => {
    res.render('pedidos');
  });
  
  router.get('/novoPedido', (req, res) => {
    res.render('novoPedido');
  });
  
  
  router.post('/novoPedido', (req, res) => {
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
        // res.status(201).json({ message: 'Pedido cadastrado com sucesso.' });
        res.render('/pedidos');
      })
      .catch((error) => {
        // Ocorreu um erro ao cadastrar o pedido
        res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o pedido.' });
      });
  });

  module.exports = router;
