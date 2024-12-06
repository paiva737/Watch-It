const bcrypt = require("bcrypt");

const storedHash = "$2b$10$jUCOZz7kENedhG8D91hfJ.w3p4By81b2poldNCIFq8/mKnNyPUZuu"; // Substitua pelo hash armazenado no banco
const plainPassword = "eduarda10"; // Substitua pela senha enviada no login

(async () => {
  try {
    console.log("Hash armazenado:", storedHash);
    console.log("Senha recebida:", plainPassword);

    const isValid = await bcrypt.compare(plainPassword, storedHash);
    console.log("Senha válida?", isValid);
  } catch (error) {
    console.error("Erro ao verificar a senha:", error);
  }
})();
