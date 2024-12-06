const bcrypt = require("bcrypt");

// Função para gerar o hash da senha
async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Erro ao gerar hash:", error);
    throw error;
  }
}

// Função para comparar senha com o hash
async function comparePassword(password, hash) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.error("Erro ao comparar senha e hash:", error);
    throw error;
  }
}

module.exports = {
  hashPassword,
  comparePassword,
};
