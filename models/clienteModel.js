class ClienteDAO {
    constructor(connection) {
        this.connection = connection;
    }

    async createCliente(cliente) {
        try {
            const result = await this.connection.collection.insertOne(cliente);
            console.log('Cliente criado:', result.insertedId);
        } catch (error) {
            console.error('Erro ao criar o cliente:', error);
        }
    }

    async readClientes() {
        try {
            const clientes = await this.connection.collection.find().toArray();
            console.log('Clientes encontrados:', clientes);
        } catch (error) {
            console.error('Erro ao ler os clientes:', error);
        }
    }

    async updateCliente(filter, update) {
        try {
            const result = await this.connection.collection.updateOne(filter, update);
            console.log('Cliente atualizado:', result.modifiedCount);
        } catch (error) {
            console.error('Erro ao atualizar o cliente:', error);
        }
    }

    async deleteCliente(filter) {
        try {
            const result = await this.connection.collection.deleteOne(filter);
            console.log('Cliente removido:', result.deletedCount);
        } catch (error) {
            console.error('Erro ao remover o cliente:', error);
        }
    }
}

module.exports = ClienteDAO;
