const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/userModel");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("Erro: MONGO_URI não foi definido no arquivo .env!");
    process.exit(1); // Encerra o programa se a variável estiver ausente
  }
async function debugVerifyPassword() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Conectado ao MongoDB para depuração!");

    // Procurar o usuário pelo email
    const email = "rafaelpaiva3@gmail.com"; // Substitua pelo email desejado
    const password = "lost0211"; // Substitua pela senha desejada

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Usuário não encontrado!");
      return;
    }

    console.log("Hash armazenado no banco:", user.senha);

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.senha);
    console.log("Senha correta é válida?", isPasswordValid);
  } catch (error) {
    console.error("Erro durante a depuração:", error);
  } finally {
    mongoose.connection.close();
  }
}

debugVerifyPassword();
