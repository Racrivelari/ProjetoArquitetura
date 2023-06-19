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

router.get('/editarPedido/:id', (req, res) => {
  const pedidoId = req.params.id;
  const teste = new ObjectId(pedidoId); 
  pedidoController.findOne(teste)
  .then((pedido) => {
    console.log(pedido);
    res.render('editarPedido', { pedido });
  })
  .catch((error) => {
    res.status(500).json({ error: 'Ocorreu um erro ao excluir o pedido.' });
  });
});

router.put('/editarPedido', (req, res) => {
  const { usina, produto, quantidade, preco, destino } = req.body;

  const novoPedido = {
    usina,
    produto,
    quantidade,
    preco,
    destino,
    timestamp: new Date().getTime(), // Adicionar o timestamp
  };

  pedidoController.updatePedido(novoPedido)
    .then(() => {
     
      pedidoController.readPedidos()
        .then((pedidos) => {
          res.render('pedidos', { pedidos });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de pedidos.' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o pedido.' });
    });
});

router.delete('/:id', (req, res) => {
  const pedidoId = req.params.id;
  const teste = new ObjectId(pedidoId); 

  pedidoController.deletePedido(teste)
    .then((result) => {
      res.status(200).json({result: result + "Pedido deletado."});
    })
    .catch((error) => {
      res.status(500).json({ error: error +'Ocorreu um erro ao excluir o pedido.' });
    });
});

router.post('/', (req, res) => {
  const { usina, produto, quantidade, preco, destino } = req.body;

  const novoPedido = {
    usina,
    produto,
    quantidade,
    preco,
    destino,
    timestamp: new Date().getTime(), // Adicionar o timestamp
  };

  pedidoController.createPedido(novoPedido)
    .then(() => {
      pedidoController.readPedidos()
        .then((pedidos) => {
          res.render('pedidos', { pedidos });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de pedidos.' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o pedido.' });
    });
});

module.exports = router;
