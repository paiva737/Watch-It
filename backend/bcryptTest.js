const bcrypt = require("bcrypt");

// Substitua pela senha original e pelo hash armazenado no banco
const senhaOriginal = "lost0211";
const hashArmazenado = "$2b$10$K9wWhTkdJ89fmD2TKfN69udsLfhcTJqSVguo70QXHNrjz2YJkb9IO";

// Compara a senha com o hash armazenado
bcrypt.compare(senhaOriginal, hashArmazenado, (err, resultado) => {
  if (err) {
    console.error("Erro ao comparar:", err);
  } else {
    console.log("Resultado da comparação:", resultado ? "Senha válida" : "Senha inválida");
  }
});
