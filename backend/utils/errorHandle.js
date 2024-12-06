// Função para lidar com erros no servidor
const errorHandler = (error, req, res, next) => {
    console.error("Erro detectado:", error.message);
    res.status(error.status || 500).json({
      message: error.message || "Erro interno no servidor.",
    });
  };
  
  module.exports = errorHandler;
  