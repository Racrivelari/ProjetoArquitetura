const express = require('express');
const router = express.Router();
require('dotenv').config();

const nodemailer = require('nodemailer');

const PedidoController = require('../controller/pedidoController');
const pedido = new PedidoController();

const ProdutoController = require('../controller/produtoController');
const produto = new ProdutoController();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  tls:{
    rejectUnauthorized: false
  }
});


router.post('/email', (req, res) => {   
    
    const { email, nome, assunto, mensagem } = req.body;
    
    const options = {
        from: email, 
        to: process.env.EMAIL, 
        subject: assunto,
        text: `Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`,
    };

    transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Erro ao enviar o e-mail.');
      } else {
        console.log('E-mail enviado: ' + info.response);
        res.send('E-mail enviado com sucesso!');
      }
    });
});

//

router.get('/', (req, res) => {
  res.render('home')
});

router.get('/sobre', (req, res) => {
  res.render('sobre')
});

router.get('/negocio', (req, res) => {
  res.render('negocio')
});

router.get('/somos', (req, res) => {
  res.render('somos')
});

router.get('/login', (req, res) => {
  res.render('login')
});

router.get('/novaConta', (req, res) => {
  res.render('novaConta')
});

router.get('/contato', (req, res) => {
  res.render('contato');
});

router.get('/pedidos', (req, res) => {
  pedido.readPedidos()
    .then((pedidos) => {
      res.render('pedidos', { pedidos });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de pedidos.' });
    });
});

router.get('/produtos', (req, res) => {
  produto.readProdutos()
    .then((produtos) => {
      // Renderizar a página de listagem de produtos com os dados recebidos
      res.render('produtos', { produtos });
    })
    .catch((error) => {
      // Ocorreu um erro ao obter a lista de produtos
      res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de produtos.' });
    });
});

module.exports = router;
