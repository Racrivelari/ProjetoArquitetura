const express = require('express');
const router = express.Router();
//envio de email
require('dotenv').config();

const nodemailer = require('nodemailer');
const PedidoController = require('../controller/pedidoController');
const pedido = new PedidoController();
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
      // Renderizar a página de listagem de pedidos com os dados recebidos
      res.render('pedidos', { pedidos });
    })
    .catch((error) => {
      // Ocorreu um erro ao obter a lista de pedidos
      res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de pedidos.' });
    });
});


module.exports = router;
