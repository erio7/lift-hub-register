const mongoose = require('mongoose');

/**
 * Script para inicializar o banco de dados
 */
const initializeDatabase = async () => {
  try {
    // Conecta ao MongoDB
    await mongoose.connect('mongodb://localhost:27017/lifthub', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Conectado ao MongoDB');
    
    // Verifica se a coleção de alunos existe
    const collections = await mongoose.connection.db.listCollections().toArray();
    const alunosCollection = collections.find(col => col.name === 'alunos');
    
    if (!alunosCollection) {
      console.log('Criando coleção de alunos...');
      await mongoose.connection.db.createCollection('alunos');
    }
    
    // Cria índice único para CPF se não existir
    const Aluno = require('../models/Aluno');
    await Aluno.createIndexes();
    
    console.log('Banco de dados inicializado com sucesso!');
    console.log('Índices criados para garantir unicidade do CPF');
    
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
  } finally {
    await mongoose.connection.close();
  }
};

// Executa apenas se chamado diretamente
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;

