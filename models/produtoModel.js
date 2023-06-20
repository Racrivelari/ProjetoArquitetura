const { ObjectId } = require('mongodb');
class ProdutoModel {
    constructor(connection) {
        this.connection = connection;
        this.collection = this.connection.database.collection("produtos");
    }

    async createProduto(produto) {
        try {
            produto.timestamp = new Date(); // Adiciona o timestamp atual
            const result = await this.collection.insertOne(produto);
            console.log('Produto criado:', result.insertedId);
        } catch (error) {
            console.error('Erro ao criar o produto:', error);
        }
    }

    async readProdutos() {
        try {
            const produtos = await this.collection.find().toArray();
            console.log('Produtos encontrados:', produtos);
            return(produtos)
        } catch (error) {
            console.error('Erro ao ler os produtos:', error);
        }
    }

   async updateProduto(produtoId, novoProduto) {
        try {
            
            const query = { _id: new ObjectId(produtoId) };
            const update = { $set: novoProduto };
            console.log(query)
            const result = await this.collection.updateOne(query, update);
            console.log('Produto atualizado :', result.modifiedCount);
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
            throw error;
        }
    }

    async deleteProduto(produtoId) {
        try {
            const result = await this.collection.deleteOne({ _id: produtoId });
            console.log('Produto removido:', result.deletedCount);
        } catch (error) {
            console.error('Erro ao remover o produto:', error);
        }
    }

    async findOne(query) {
        try {
            const result = await this.collection.findOne(query);
            return (result);
        } catch (error) {
            console.error('Erro ao buscar', error);
        }
    }
}

module.exports = ProdutoModel;
