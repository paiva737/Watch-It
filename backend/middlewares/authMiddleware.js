const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extrai o token do cabeçalho Authorization

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido, acesso negado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    req.user = decoded; // Adiciona os dados decodificados do token ao objeto da requisição
    next();
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return res.status(403).json({ message: "Token inválido." });
  }
};

module.exports = { authenticateToken };
