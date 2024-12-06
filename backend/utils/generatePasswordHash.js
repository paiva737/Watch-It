const bcrypt = require("bcrypt");

const password = "eduarda10"; 

(async () => {
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log("Novo hash gerado para a senha:", hash);
  } catch (error) {
    console.error("Erro ao gerar o hash:", error);
  }
})();
