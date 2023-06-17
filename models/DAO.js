const { MongoClient } = require('mongodb');

class DBConnection {
  constructor() {
    const uri = "mongodb+srv://lucasmartinstanaka:oAouDarfYIVr6MHq@arquitetura-de-software.1x4a9tc.mongodb.net/?retryWrites=true&w=majority";
    this.client = new MongoClient(uri);
    this.database = null;
    this.collection = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.database = this.client.db("Arquitetura-de-Software");
      this.collection = this.database.collection("sua-colecao");
      console.log("Conexão estabelecida com o MongoDB");
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
    }
  }

  close() {
    this.client.close();
    console.log("Conexão fechada com o MongoDB");
  }
}

module.exports = DBConnection;
