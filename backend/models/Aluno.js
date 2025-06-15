const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  cpf: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Validação básica de CPF (11 dígitos)
        return /^\d{11}$/.test(v.replace(/\D/g, ''));
      },
      message: 'CPF deve conter 11 dígitos'
    }
  }
}, {
  timestamps: true
});

// Índice único para CPF
alunoSchema.index({ cpf: 1 }, { unique: true });

module.exports = mongoose.model('Aluno', alunoSchema);

