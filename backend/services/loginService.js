const { verifyPassword } = require("../utils/passwordUtils");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const loginService = async (email, senha) => {
  console.log("Iniciando serviço de login");

  const user = await User.findOne({ email });
  if (!user) {
    console.log("Usuário não encontrado:", email);
    return { status: 404, message: "Usuário não encontrado" };
  }

  console.log("Usuário encontrado:", user.email);
  console.log("Senha enviada:", senha);
  console.log("Senha armazenada:", user.senha);

  const isPasswordValid = await verifyPassword(senha, user.senha);
  console.log("Resultado da comparação da senha:", isPasswordValid);

  if (!isPasswordValid) {
    return { status: 401, message: "Senha inválida" };
  }

  const token = jwt.sign(
    { userId: user._id, nome: user.nome },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  console.log("Token gerado com sucesso");
  return { status: 200, token, message: "Login realizado com sucesso!" };
};

module.exports = loginService;
