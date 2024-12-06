const bcrypt = require("bcrypt");

(async () => {
  const hash = "$2b$10$sVBpZoE.vbFkyhaWYwRVnuTxMYWads5Vj1TuQ6Q/6iE1D9shHTTGm"; // Substitua pelo hash gerado no cadastro
  const senha = "eduarda10";

  const isPasswordValid = await bcrypt.compare(senha, hash);
  console.log("Senha válida?", isPasswordValid); // Deve retornar true
})();
