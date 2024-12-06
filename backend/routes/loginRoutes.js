const express = require("express");
const jwt = require("jsonwebtoken");
const { verifyPassword } = require("../utils/passwordUtils");
const User = require("../models/userModel");
const router = express.Router();
const secret = process.env.JWT_SECRET || "seu-segredo-jwt";

router.post("/", async (req, res) => {
  const { email, senha } = req.body;
  console.log("Tentativa de login com email:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }

    console.log("Hash armazenado no banco:", user.senha);
    console.log("Senha recebida para login:", senha);

    const isPasswordValid = await verifyPassword(senha, user.senha);
    console.log("Senha válida?", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha inválida." });
    }

    const token = jwt.sign({ userId: user._id, nome: user.nome }, secret, { expiresIn: "1h" });
    res.status(200).json({ token, message: "Login realizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

module.exports = router;
