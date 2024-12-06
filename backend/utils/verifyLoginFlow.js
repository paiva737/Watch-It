require("dotenv").config(); 
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// Conectar ao MongoDB usando a variável do .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  const email = "mariaeduarda@gmail.com";
  const senha = "eduarda10";

  try {
    console.log("Tentando login com email:", email);

    // Procurar o usuário no banco
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Usuário não encontrado.");
      process.exit();
    }

    console.log("Hash armazenado no banco:", user.senha);

    // Comparar a senha com o hash armazenado
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    console.log("Senha válida?", isPasswordValid);

    process.exit();
  } catch (error) {
    console.error("Erro ao verificar login:", error);
    process.exit(1);
  }
})();
