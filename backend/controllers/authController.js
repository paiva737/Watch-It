const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { registerUser } = require("../services/authService");

// Função para registro de usuário
const register = async (req, res) => {
  console.log("Dados recebidos no controlador:", req.body);
  const { nome, email, senha, cpf } = req.body;

  try {
    // Verificar se todos os campos obrigatórios estão presentes
    if (!nome || !email || !senha || !cpf) {
      console.error("Campos obrigatórios ausentes:", { nome, email, senha, cpf });
      return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    console.log("Dados recebidos para registro:", { nome, email, senha, cpf });

    // Chamar o serviço para registrar o usuário
    const response = await registerUser(nome, email, senha, cpf);
    console.log("Resposta do serviço de registro:", response);

    return res.status(response.status).json({ message: response.message });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

// Função para login de usuário
const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se todos os campos obrigatórios estão presentes
    if (!email || !senha) {
      console.error("Campos obrigatórios ausentes para login:", { email, senha });
      return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    console.log("Dados recebidos para login:", { email, senha });

    // Buscar usuário pelo email
    const user = await User.findOne({ email });
    if (!user) {
      console.error("Usuário não encontrado com o e-mail fornecido:", email);
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    console.log("Usuário encontrado:", user);

    // Comparar a senha recebida com o hash armazenado
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    console.log("Senha válida?", isPasswordValid);

    if (!isPasswordValid) {
      console.error("Senha inválida para o usuário:", email);
      return res.status(401).json({ message: "Senha inválida." });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );

    console.log("Token JWT gerado com sucesso para o usuário:", user.email);

    return res.status(200).json({ token, message: "Login realizado com sucesso!" });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

module.exports = { register, login };
