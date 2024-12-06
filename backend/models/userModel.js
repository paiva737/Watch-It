const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  nome: { type: String, required: [true, "O nome é obrigatório."] },
  email: { 
    type: String, 
    required: [true, "O e-mail é obrigatório."], 
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "E-mail inválido.",
    },
  },
  senha: { type: String, required: [true, "A senha é obrigatória."] },
  cpf: { 
    type: String, 
    required: [true, "O CPF é obrigatório."], 
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{11}$/.test(v); // CPF deve conter 11 dígitos numéricos
      },
      message: "CPF inválido.",
    },
  },
  nascimento: { type: Date },
  cidade: { type: String },
  genero: { type: String },
  telefone: { 
    type: String,
    validate: {
      validator: function (v) {
        return /^\+?\d{10,15}$/.test(v); // Validação para telefones com 10 a 15 dígitos, com ou sem "+"
      },
      message: "Telefone inválido.",
    },
  },
});

// Hash da senha antes de salvar
userSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next(); // Evita rehash em edição
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    console.log("Senha hash gerada antes de salvar no banco:", this.senha);
    next();
  } catch (err) {
    console.error("Erro ao gerar hash da senha:", err);
    next(err);
  }
});

// Método para comparar senha
userSchema.methods.comparePassword = async function (senhaDigitada) {
  try {
    console.log("Comparando senha:", senhaDigitada);
    console.log("Hash armazenado no banco:", this.senha);
    return await bcrypt.compare(senhaDigitada, this.senha);
  } catch (err) {
    console.error("Erro ao comparar senha:", err);
    return false;
  }
};

// Log adicional para debugar validações
userSchema.post("validate", (doc) => {
  console.log("Validação do usuário bem-sucedida:", doc);
});

userSchema.post("save", (doc) => {
  console.log("Usuário salvo no banco com sucesso:", doc);
});

module.exports = mongoose.model("User", userSchema);
