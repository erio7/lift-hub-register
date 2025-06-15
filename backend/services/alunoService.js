const Aluno = require('../models/Aluno');
const { validarCPF, limparCPF } = require('../utils/cpfValidator');

/**
 * Service para operações relacionadas aos alunos
 */
class AlunoService {
  
  /**
   * Cadastra um novo aluno
   * @param {string} cpf - CPF do aluno
   * @returns {Object} - Aluno cadastrado
   */
  async cadastrarAluno(cpf) {
    const cpfLimpo = limparCPF(cpf);
    
    if (!validarCPF(cpfLimpo)) {
      throw new Error('CPF inválido');
    }
    
    // Verifica se o CPF já existe
    const alunoExistente = await Aluno.findOne({ cpf: cpfLimpo });
    if (alunoExistente) {
      throw new Error('CPF já cadastrado');
    }
    
    const novoAluno = new Aluno({ cpf: cpfLimpo });
    return await novoAluno.save();
  }
  
  /**
   * Lista todos os alunos
   * @returns {Array} - Lista de alunos
   */
  async listarAlunos() {
    return await Aluno.find().sort({ createdAt: -1 });
  }
  
  /**
   * Busca um aluno pelo CPF
   * @param {string} cpf - CPF do aluno
   * @returns {Object} - Aluno encontrado
   */
  async buscarAlunoPorCPF(cpf) {
    const cpfLimpo = limparCPF(cpf);
    
    if (!validarCPF(cpfLimpo)) {
      throw new Error('CPF inválido');
    }
    
    const aluno = await Aluno.findOne({ cpf: cpfLimpo });
    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }
    
    return aluno;
  }
  
  /**
   * Atualiza o CPF de um aluno
   * @param {string} cpfAtual - CPF atual do aluno
   * @param {string} novoCpf - Novo CPF do aluno
   * @returns {Object} - Aluno atualizado
   */
  async atualizarAluno(cpfAtual, novoCpf) {
    const cpfAtualLimpo = limparCPF(cpfAtual);
    const novoCpfLimpo = limparCPF(novoCpf);
    
    if (!validarCPF(cpfAtualLimpo) || !validarCPF(novoCpfLimpo)) {
      throw new Error('CPF inválido');
    }
    
    // Verifica se o aluno existe
    const aluno = await Aluno.findOne({ cpf: cpfAtualLimpo });
    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }
    
    // Verifica se o novo CPF já existe (se for diferente do atual)
    if (cpfAtualLimpo !== novoCpfLimpo) {
      const cpfExistente = await Aluno.findOne({ cpf: novoCpfLimpo });
      if (cpfExistente) {
        throw new Error('Novo CPF já cadastrado');
      }
    }
    
    aluno.cpf = novoCpfLimpo;
    return await aluno.save();
  }
  
  /**
   * Remove um aluno
   * @param {string} cpf - CPF do aluno
   * @returns {Object} - Resultado da operação
   */
  async removerAluno(cpf) {
    const cpfLimpo = limparCPF(cpf);
    
    if (!validarCPF(cpfLimpo)) {
      throw new Error('CPF inválido');
    }
    
    const resultado = await Aluno.deleteOne({ cpf: cpfLimpo });
    if (resultado.deletedCount === 0) {
      throw new Error('Aluno não encontrado');
    }
    
    return { message: 'Aluno removido com sucesso' };
  }
}

module.exports = new AlunoService();

