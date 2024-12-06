const bcrypt = require("bcrypt");

const hash = "$2b$10$onafjn84LDhLC4doumNbPeBBjIyTc8wwMI65KQyII1z/3oH7qoPVC"; // Copie o hash diretamente do banco
const password = "eduarda10"; // A senha usada no cadastro

(async () => {
  const isMatch = await bcrypt.compare(password, hash);
  console.log("Senha válida?", isMatch);
})();
