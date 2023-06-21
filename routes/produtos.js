const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const ProdutoController = require('../controller/produtoController');
const produtoController = new ProdutoController();
const PedidoController = require('../controller/pedidoController');
const pedidoController = new PedidoController();
const auth = require('../middleware/auth')
router.use(auth);
router.get('/', (req, res) => {

});

router.get('/novoProduto', (req, res) => {
  res.render('novoProduto');
});

router.get('/editarProduto/:id', (req, res) => {
  const produtoId = req.params.id;

  const teste = new ObjectId(produtoId);
  produtoController.findOne(teste)
    .then((produtos) => {
      res.render('editarProduto', { produtos });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar o produto.' });
    });
});

router.post('/editarProduto', (req, res) => {
  const { id, nome, medida, produtoAntigo } = req.body;
  const novoProduto = {
    nome,
    medida,
    timestamp: new Date().getTime(), // Adicionar o timestamp
  };
  const produto = req.params.produto;

  produtoController.updateProduto(id, novoProduto)
    .then(() => {
      pedidoController.updatePedidoProduto(produtoAntigo, nome)
        .then(() => {
          res.redirect('/produtos');
        }).catch((error) => {
          res.status(500).json({ error: 'Ocorreu um erro ao atualizar o produto123.' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao atualizar o produto.' });
    });
});

router.delete('/:id/:nome', (req, res) => {
  const produtoId = req.params.id;
  const produto = req.params.nome;
  const teste = new ObjectId(produtoId);
  console.log(produto)
  produtoController.deleteProduto(teste)
    .then((result) => {
      pedidoController.deletePedidoProduto(produto)
        .then(() => {
          res.status(200).json({ result: result + "Produto deletado." });
        }).catch((error) => {
          res.status(500).json({ error: error + 'Ocorreu um erro ao excluir o produto.' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error + 'Ocorreu um erro ao excluir o produto.' });
    });
});

router.post('/', (req, res) => {
  const { nome, medida } = req.body;

  const novoProduto = {
    nome,
    medida,
    timestamp: new Date().getTime(), // Adicionar o timestamp
  };

  produtoController.createProduto(novoProduto)
    .then(() => {
      res.redirect('/produtos')
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o produto.' });
    });
});
module.exports = router;
