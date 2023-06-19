const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const PedidoController = require('../controller/pedidoController');
const pedidoController = new PedidoController();

const auth = require('../middleware/auth')
router.use(auth);
router.get('/', (req, res) => {

});

router.get('/novoPedido', (req, res) => {
  res.render('novoPedido');
});

router.get('/editarPedido/:id', (req, res) => {
  const pedidoId = req.params.id;
  const teste = new ObjectId(pedidoId);
  pedidoController.findOne(teste)
    .then((pedidos) => {
      res.render('editarPedido', { pedidos });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar o pedido.' });
    });
});

router.post('/editarPedido', (req, res) => {
  const { id, usina, produto, quantidade, preco, destino } = req.body;
  console.log(id)
  const novoPedido = {
    usina,
    produto,
    quantidade,
    preco,
    destino,
    timestamp: new Date().getTime(), // Adicionar o timestamp
  };

  pedidoController.updatePedido(id, novoPedido)
    .then(() => {
      res.redirect('/pedidos');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao atualizar o pedido.' });
    });
});

router.delete('/:id', (req, res) => {
  const pedidoId = req.params.id;
  const teste = new ObjectId(pedidoId);

  pedidoController.deletePedido(teste)
    .then((result) => {
      res.status(200).json({ result: result + "Pedido deletado." });
    })
    .catch((error) => {
      res.status(500).json({ error: error + 'Ocorreu um erro ao excluir o pedido.' });
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
      res.redirect('/pedidos');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o pedido.' });
    });
});

module.exports = router;
