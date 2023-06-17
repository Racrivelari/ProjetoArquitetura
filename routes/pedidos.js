const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const PedidoController = require('../controller/pedidoController');
const pedidoController = new PedidoController();

router.get('/', (req, res) => {

});

router.get('/novoPedido', (req, res) => {
  res.render('novoPedido');
});

router.delete('/:id', (req, res) => {
  const pedidoId = req.params.id;
  const teste = new ObjectId(pedidoId); 
  console.log(teste)
  // Realize as ações necessárias para excluir o pedido com o ID fornecido
  // Por exemplo, você pode chamar uma função que lida com a exclusão do pedido no banco de dados
  // Substitua o trecho abaixo com a lógica adequada para a exclusão do pedido

  pedidoController.deletePedido(teste)
    .then(() => {
      // Pedido excluído com sucesso
      console.log("excluiuuuuuuuu")
    })
    .catch((error) => {
      // Ocorreu um erro ao excluir o pedido
      res.status(500).json({ error: 'Ocorreu um erro ao excluir o pedido.' });
    });
});

router.post('/', (req, res) => {
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
      pedidoController.readPedidos()
        .then((pedidos) => {
          // Renderizar a página de listagem de pedidos com os dados recebidos
          res.render('pedidos', { pedidos });
        })
        .catch((error) => {
          // Ocorreu um erro ao obter a lista de pedidos
          res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de pedidos.' });
        });
    })
    .catch((error) => {
      // Ocorreu um erro ao cadastrar o pedido
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o pedido.' });
    });
});

module.exports = router;
