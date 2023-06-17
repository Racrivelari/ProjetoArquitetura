const express = require('express');
const router = express.Router();
const PedidoController = require('../controller/pedidoController');
const pedidoController = new PedidoController();

//envio de email
require('dotenv').config();
const nodemailer = require('nodemailer');

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
        to: 'petronakatanaka@gmail.com', 
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

router.get('/cliente', (req, res) => {
  res.render('cliente')
});

router.get('/contato', (req, res) => {
  res.render('contato');
});

router.get('/pedidos', (req, res) => {
  res.render('pedidos');
});

router.get('/novoPedido', (req, res) => {
  res.render('novoPedido');
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
      res.render('pedidos');
    })
    .catch((error) => {
      // Ocorreu um erro ao cadastrar o pedido
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o pedido.' });
    });
});


module.exports = router;
