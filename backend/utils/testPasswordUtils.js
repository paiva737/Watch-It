const { hashPassword, verifyPassword } = require("./passwordUtils");


const runTests = async () => {
  const senhaOriginal = "eduarda10";

  // Gerar o hash
  const hash = await hashPassword(senhaOriginal);
  console.log("Hash gerado:", hash);

  // Testar a validação da senha correta
  const senhaValida = await verifyPassword(senhaOriginal, hash);
  console.log("Senha válida?", senhaValida);

  // Testar a validação de uma senha incorreta
  const senhaInvalida = await verifyPassword("senhaErrada", hash);
  console.log("Senha válida com senha errada?", senhaInvalida);
};

runTests().catch((err) => console.error("Erro nos testes:", err));
