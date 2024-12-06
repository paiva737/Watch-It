const bcrypt = require("bcrypt");

const senhaOriginal = "eduarda10"; 
const senhaErrada = "senhaIncorreta";

async function testarHash() {
  try {
    // Gerar hash da senha
    const hash = await bcrypt.hash(senhaOriginal, 10);
    console.log("Hash gerado:", hash);

    // Comparar senha correta
    const senhaValida = await bcrypt.compare(senhaOriginal, hash);
    console.log("Senha válida?", senhaValida);

    // Comparar senha errada
    const senhaInvalida = await bcrypt.compare(senhaErrada, hash);
    console.log("Senha válida com senha errada?", senhaInvalida);
  } catch (error) {
    console.error("Erro ao testar hash:", error);
  }
}

testarHash();
