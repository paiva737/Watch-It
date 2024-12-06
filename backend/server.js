require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // Rotas de autenticação (login e registro)
const movieRoutes = require("./routes/movieRoutes"); // Rotas para filmes
const errorHandler = require("./utils/errorHandle");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;
const mongoURI = process.env.MONGO_URI || "sua-string-de-conexao";

console.log("Mongo URI:", mongoURI);

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de erro personalizado
app.use(errorHandler);

// Rotas organizadas
app.use("/api/auth", authRoutes); // Rotas de autenticação
app.use("/movies", movieRoutes); // Rotas de filmes

// Conexão com o MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err.message));

// Rota de teste para verificar funcionamento
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
