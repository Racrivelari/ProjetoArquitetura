const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('home.html', { root: 'views' });
});

router.get('/sobre', (req, res) => {
  res.sendFile('sobre.html', { root: 'views' });
});

router.get('/negocio', (req, res) => {
  res.sendFile('negocio.html', { root: 'views' });
});

router.get('/somos', (req, res) => {
  res.sendFile('somos.html', { root: 'views' });
});

router.get('/cliente', (req, res) => {
  res.sendFile('cliente.html', { root: 'views' });
});

router.get('/contato', (req, res) => {
  res.sendFile('contato.html', { root: 'views' });
});

module.exports = router;
