const bcrypt = require("bcrypt");

const senha = "lost0211"; 

bcrypt.hash(senha, 10, (err, hash) => {
  if (err) {
    console.error("Erro ao gerar hash:", err);
  } else {
    console.log("Novo hash gerado:", hash);
  }
});
