const User = require("../models/userModel");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Verifica o usuário pelo ID decodificado do token
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({
      id: user._id,
      nome: user.nome,
      email: user.email,
    });
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

module.exports = { getProfile };
