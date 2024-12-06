const express = require("express");
const { hashPassword } = require("../../utils/passwordUtils");
const User = require("../../models/userModel");

const router = express.Router();

router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;
  console.log("Dados recebidos para cadastro:", req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já está em uso." });
    }

    const hashedPassword = await hashPassword(senha);
    console.log("Senha original recebida:", senha);
    console.log("Hash gerado antes de salvar no banco:", hashedPassword);

    const newUser = new User({
      nome,
      email,
      senha: hashedPassword,
    });

    await newUser.save();
    console.log("Usuário salvo no banco:", newUser);

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

module.exports = router;
