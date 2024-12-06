const bcrypt = require("bcrypt");

// Função para gerar o hash da senha
async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Erro ao gerar hash:", error);
    throw new Error("Erro ao gerar hash.");
  }
}

// Função para verificar se a senha corresponde ao hash
async function verifyPassword(password, hash) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error("Erro ao verificar a senha:", error);
    throw new Error("Erro ao verificar a senha.");
  }
}

module.exports = { hashPassword, verifyPassword };
