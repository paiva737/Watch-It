const bcrypt = require("bcrypt");

const hash = "$2b$10$jUCOZz7kENedhG8D91hfJ.w3p4By81b2poldNCIFq8/mKnNyPUZuu"; // Substitua pelo hash do banco
const senhaCorreta = "eduarda10";
const senhaErrada = "senhaIncorreta";

(async () => {
  try {
    console.log("Testando bcrypt.compare diretamente...");

    const isSenhaCorreta = await bcrypt.compare(senhaCorreta, hash);
    console.log("Senha correta é válida?", isSenhaCorreta);

    const isSenhaErrada = await bcrypt.compare(senhaErrada, hash);
    console.log("Senha incorreta é válida?", isSenhaErrada);
  } catch (error) {
    console.error("Erro durante o teste do bcrypt.compare:", error);
  }
})();
