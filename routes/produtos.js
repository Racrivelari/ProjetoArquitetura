const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const ProdutoController = require('../controller/produtoController');
const produtoController = new ProdutoController();

router.get('/', (req, res) => {

});

router.get('/novoProduto', (req, res) => {
  res.render('novoProduto');
});

router.delete('/:id', (req, res) => {
  const produtoId = req.params.id;
  const teste = new ObjectId(produtoId); 
  console.log(teste)

  produtoController.deleteProduto(teste)
    .then(() => {
      produtoController.readProdutos()
      res.render('produtos', { produtos });
      console.log("excluiuuuuuuuu")
    })
    .catch((error) => {
      // Ocorreu um erro ao excluir o produto
      res.status(500).json({ error: 'Ocorreu um erro ao excluir o produto.' });
    });
});

router.post('/', (req, res) => {
  // Extrair os dados do corpo da requisição
  const { nome, medida} = req.body;

  // Criar o objeto de produto com os dados recebidos
  const novoProduto = {
    nome,
    medida,
    timestamp: new Date().getTime(), // Adicionar o timestamp
  };

  // Chamar o método de criação de produto no controlador
  produtoController.createProduto(novoProduto)
    .then(() => {
      produtoController.readProdutos()
        .then((produtos) => {
          // Renderizar a página de listagem de produtos com os dados recebidos
          res.render('produtos', { produtos });
        })
        .catch((error) => {
          // Ocorreu um erro ao obter a lista de produtos
          res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de produtos.' });
        });
    })
    .catch((error) => {
      // Ocorreu um erro ao cadastrar o produto
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o produto.' });
    });
});
module.exports = router;
