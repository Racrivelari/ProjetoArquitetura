const DBConnection = require('../models/DAO');
const ProdutoModel = require('../models/produtoModel.js');

class ProdutoController {
  constructor() {
    this.connection = new DBConnection();
    this.model = null;
  }

  async createProduto(produto) {
    try {
      await this.connection.connect();
      this.model = new ProdutoModel(this.connection);
      await this.model.createProduto(produto);
    } finally {
      this.connection.close();
    }
  }

  async readProdutos() {
    try {
      await this.connection.connect();
      this.model = new ProdutoModel(this.connection);
      return(await this.model.readProdutos());
    } finally {
      this.connection.close();
    }
  }

  async updateProduto(filter, update) {
    try {
      await this.connection.connect();
      this.model = new ProdutoModel(this.connection);
      await this.model.updateProduto(filter, update);
    } finally {
      this.connection.close();
    }
  }

  async deleteProduto(filter) {
    try {
      await this.connection.connect();
      this.model = new ProdutoModel(this.connection);
      await this.model.deleteProduto(filter);
    } finally {
      this.connection.close();
    }
  }
}

module.exports = ProdutoController;
