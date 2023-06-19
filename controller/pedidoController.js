const DBConnection = require('../models/DAO');
const PedidoModel = require('../models/pedidoModel.js');

class PedidoController {
    constructor() {
        this.connection = new DBConnection();
        this.model = null;
    }

    async createPedido(pedido) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.createPedido(pedido);
        } finally {
            this.connection.close();
        }
    }

    async readPedidos() {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            return(await this.model.readPedidos());
        } finally {
            this.connection.close();
        }
    }

    async updatePedido(filter, update) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.updatePedido(filter, update);
        } finally {
            this.connection.close();
        }
    }

    async deletePedido(filter) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.deletePedido(filter);
        } finally {
            this.connection.close();
        }
    }

    async findOne(query) {
        try {
          await this.connection.connect();
          this.model = new PedidoModel(this.connection);
          return await this.model.findOne(query);
        } finally {
          this.connection.close();
        }
      }
}

module.exports = PedidoController;
