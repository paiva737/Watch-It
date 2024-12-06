const bcrypt = require("bcrypt");

const senha = "eduarda10";
const hash = "$2b$10$ss6j8EgGd.1nZ4.qisnUz.OduCQA/zVbXWMLX2CD5qwnkxkU6ehsG"; // Atualize com o hash salvo no banco

bcrypt.compare(senha, hash, (err, result) => {
  if (err) {
    console.error("Erro ao comparar senha e hash:", err);
  } else {
    console.log("A senha é válida?", result);
  }
});
