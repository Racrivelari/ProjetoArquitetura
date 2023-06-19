const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ClienteController = require('../controller/clienteController');
const clienteController = new ClienteController();

router.get('/novoCliente', (req, res) => {
  res.render('novoCliente');
});

router.post('/novoCliente', (req, res) => {
  const { nome, email, senha } = req.body;

  const novoCliente = {
    nome,
    email,
    senha,
    timestamp: new Date().getTime(),
  };

  clienteController.createCliente(novoCliente)
    .then(() => {
      res.render('login');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o cliente.' });
    });
});


router.post('/loginCliente', async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  try {
    const user = await clienteController.findOne({ email, senha });
    console.log(user);

    if (user) {
      const token = jwt.sign({ clienteId: user.clienteId }, process.env.JWT_SENHA, { expiresIn: '1h' });
      console.log(token);
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/pedidos');
    } else {
      res.status(400).json({ error: 'Email ou senha inválidos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


module.exports = router;
