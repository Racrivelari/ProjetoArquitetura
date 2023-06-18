const { MongoClient } = require('mongodb');
require('dotenv').config();

class DBConnection {
  constructor() {
    const uri = process.env.MONGODB_URI;
    this.client = new MongoClient(uri);
    this.database = null;
    this.collection = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.database = this.client.db(""+ process.env.DATABASE_NAME);
      this.collection = this.database.collection("" + process.env.COLLECTION);
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
