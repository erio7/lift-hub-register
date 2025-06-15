const alunoService = require('../services/alunoService');

/**
 * Controller para operações relacionadas aos alunos
 */
class AlunoController {
  
  /**
   * Cadastra um novo aluno
   * POST /alunos
   */
  async cadastrarAluno(req, res) {
    try {
      const { cpf } = req.body;
      
      if (!cpf) {
        return res.status(400).json({
          success: false,
          message: 'CPF é obrigatório'
        });
      }
      
      const aluno = await alunoService.cadastrarAluno(cpf);
      
      res.status(201).json({
        success: true,
        message: 'Aluno cadastrado com sucesso',
        data: aluno
      });
      
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
  
  /**
   * Lista todos os alunos
   * GET /alunos
   */
  async listarAlunos(req, res) {
    try {
      const alunos = await alunoService.listarAlunos();
      
      res.status(200).json({
        success: true,
        data: alunos
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
  
  /**
   * Busca um aluno pelo CPF
   * GET /alunos/:cpf
   */
  async buscarAlunoPorCPF(req, res) {
    try {
      const { cpf } = req.params;
      const aluno = await alunoService.buscarAlunoPorCPF(cpf);
      
      res.status(200).json({
        success: true,
        data: aluno
      });
      
    } catch (error) {
      const status = error.message === 'Aluno não encontrado' ? 404 : 400;
      res.status(status).json({
        success: false,
        message: error.message
      });
    }
  }
  
  /**
   * Atualiza o CPF de um aluno
   * PUT /alunos/:cpf
   */
  async atualizarAluno(req, res) {
    try {
      const { cpf } = req.params;
      const { novoCpf } = req.body;
      
      if (!novoCpf) {
        return res.status(400).json({
          success: false,
          message: 'Novo CPF é obrigatório'
        });
      }
      
      const aluno = await alunoService.atualizarAluno(cpf, novoCpf);
      
      res.status(200).json({
        success: true,
        message: 'Aluno atualizado com sucesso',
        data: aluno
      });
      
    } catch (error) {
      const status = error.message === 'Aluno não encontrado' ? 404 : 400;
      res.status(status).json({
        success: false,
        message: error.message
      });
    }
  }
  
  /**
   * Remove um aluno
   * DELETE /alunos/:cpf
   */
  async removerAluno(req, res) {
    try {
      const { cpf } = req.params;
      const resultado = await alunoService.removerAluno(cpf);
      
      res.status(200).json({
        success: true,
        message: resultado.message
      });
      
    } catch (error) {
      const status = error.message === 'Aluno não encontrado' ? 404 : 400;
      res.status(status).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new AlunoController();

