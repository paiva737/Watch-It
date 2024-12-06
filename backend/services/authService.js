const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Função para registrar um novo usuário
const registerUser = async (nome, email, senha, cpf) => {
  console.log("Dados recebidos no serviço de registro:", { nome, email, senha, cpf });

  try {
    // Verificar se todos os campos obrigatórios estão presentes
    if (!nome || !email || !senha || !cpf) {
      console.log("Campos obrigatórios ausentes.");
      return { status: 400, message: "Todos os campos obrigatórios devem ser preenchidos." };
    }

    // Verificar se o e-mail já está em uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("E-mail já está em uso:", email);
      return { status: 400, message: "E-mail já está em uso." };
    }

    // Verificar se o CPF já está em uso
    const existingCpf = await User.findOne({ cpf });
    if (existingCpf) {
      console.log("CPF já está em uso:", cpf);
      return { status: 400, message: "CPF já está em uso." };
    }

    // Criar e salvar o novo usuário
    const newUser = new User({ nome, email, senha, cpf });
    console.log("Usuário a ser salvo:", newUser);

    await newUser.save();
    console.log("Usuário salvo com sucesso!");
    return { status: 201, message: "Usuário cadastrado com sucesso!" };
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return { status: 500, message: "Erro ao registrar usuário." };
  }
};

// Função para realizar login
const loginUser = async (email, senha) => {
  console.log("Dados recebidos no serviço de login:", { email, senha });

  try {
    // Verificar se todos os campos obrigatórios estão presentes
    if (!email || !senha) {
      console.log("Campos obrigatórios ausentes para login.");
      return { status: 400, message: "E-mail e senha são obrigatórios." };
    }

    // Buscar o usuário pelo e-mail
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Usuário não encontrado com o e-mail fornecido:", email);
      return { status: 404, message: "Usuário não encontrado." };
    }

    // Comparar a senha com o hash armazenado
    const isPasswordValid = await user.comparePassword(senha);
    console.log("Senha válida?", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Senha inválida para o e-mail:", email);
      return { status: 401, message: "Senha inválida." };
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user._id, nome: user.nome },
      process.env.JWT_SECRET || "seu-segredo-jwt",
      { expiresIn: "1h" }
    );
    console.log("Token gerado com sucesso para o usuário:", user.email);

    return { status: 200, data: { token, message: "Login realizado com sucesso!" } };
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return { status: 500, message: "Erro ao realizar login." };
  }
};

module.exports = { registerUser, loginUser };
