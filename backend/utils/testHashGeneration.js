const bcrypt = require("bcrypt");

const plainPassword = "eduarda10"; // Substitua pela senha usada no cadastro
const storedHash = "$2b$10$jUCOZz7kENedhG8D91hfJ.w3p4By81b2poldNCIFq8/mKnNyPUZuu"; // Substitua pelo hash do banco

(async () => {
  try {
    const generatedHash = await bcrypt.hash(plainPassword, 10);
    console.log("Hash gerado agora:", generatedHash);

    const isMatch = await bcrypt.compare(plainPassword, storedHash);
    console.log("Senha válida ao comparar com hash armazenado?", isMatch);
  } catch (error) {
    console.error("Erro ao verificar hash:", error);
  }
})();
