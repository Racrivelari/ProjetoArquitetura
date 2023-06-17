class PedidoModel {
    constructor(connection) {
        this.connection = connection;
        this.collection = this.connection.database.collection("pedidos");
    }

    async createPedido(pedido) {
        try {
            pedido.timestamp = new Date(); // Adiciona o timestamp atual
            const result = await this.collection.insertOne(pedido);
            console.log('Pedido criado:', result.insertedId);
        } catch (error) {
            console.error('Erro ao criar o pedido:', error);
        }
    }

    async readPedidos() {
        try {
            const pedidos = await this.collection.find().toArray();
            console.log('Pedidos encontrados:', pedidos);
        } catch (error) {
            console.error('Erro ao ler os pedidos:', error);
        }
    }

    async updatePedido(filter, update) {
        try {
            const result = await this.collection.updateOne(filter, update);
            console.log('Pedido atualizado:', result.modifiedCount);
        } catch (error) {
            console.error('Erro ao atualizar o pedido:', error);
        }
    }

    async deletePedido(filter) {
        try {
            const result = await this.collection.deleteOne(filter);
            console.log('Pedido removido:', result.deletedCount);
        } catch (error) {
            console.error('Erro ao remover o pedido:', error);
        }
    }
}

module.exports = PedidoModel;