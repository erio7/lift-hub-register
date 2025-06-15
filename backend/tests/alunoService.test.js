const alunoService = require('../services/alunoService');
const Aluno = require('../models/Aluno');

// Mock do modelo Aluno
jest.mock('../models/Aluno');

describe('AlunoService', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('cadastrarAluno', () => {
    test('deve cadastrar aluno com CPF válido', async () => {
      const cpf = '11144477735';
      const mockAluno = { cpf, _id: 'mockId', createdAt: new Date() };
      
      Aluno.findOne.mockResolvedValue(null);
      Aluno.prototype.save = jest.fn().mockResolvedValue(mockAluno);
      
      const resultado = await alunoService.cadastrarAluno(cpf);
      
      expect(Aluno.findOne).toHaveBeenCalledWith({ cpf });
      expect(resultado).toEqual(mockAluno);
    });
    
    test('deve rejeitar CPF inválido', async () => {
      const cpf = '11144477734';
      
      await expect(alunoService.cadastrarAluno(cpf))
        .rejects.toThrow('CPF inválido');
    });
    
    test('deve rejeitar CPF já cadastrado', async () => {
      const cpf = '11144477735';
      const alunoExistente = { cpf, _id: 'existingId' };
      
      Aluno.findOne.mockResolvedValue(alunoExistente);
      
      await expect(alunoService.cadastrarAluno(cpf))
        .rejects.toThrow('CPF já cadastrado');
    });
  });
  
  describe('listarAlunos', () => {
    test('deve listar todos os alunos', async () => {
      const mockAlunos = [
        { cpf: '11144477735', _id: 'id1' },
        { cpf: '22255588846', _id: 'id2' }
      ];
      
      const mockSort = jest.fn().mockResolvedValue(mockAlunos);
      Aluno.find.mockReturnValue({ sort: mockSort });
      
      const resultado = await alunoService.listarAlunos();
      
      expect(Aluno.find).toHaveBeenCalled();
      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(resultado).toEqual(mockAlunos);
    });
  });
  
  describe('buscarAlunoPorCPF', () => {
    test('deve encontrar aluno por CPF válido', async () => {
      const cpf = '11144477735';
      const mockAluno = { cpf, _id: 'mockId' };
      
      Aluno.findOne.mockResolvedValue(mockAluno);
      
      const resultado = await alunoService.buscarAlunoPorCPF(cpf);
      
      expect(Aluno.findOne).toHaveBeenCalledWith({ cpf });
      expect(resultado).toEqual(mockAluno);
    });
    
    test('deve rejeitar CPF inválido', async () => {
      const cpf = '11144477734';
      
      await expect(alunoService.buscarAlunoPorCPF(cpf))
        .rejects.toThrow('CPF inválido');
    });
    
    test('deve rejeitar quando aluno não encontrado', async () => {
      const cpf = '11144477735';
      
      Aluno.findOne.mockResolvedValue(null);
      
      await expect(alunoService.buscarAlunoPorCPF(cpf))
        .rejects.toThrow('Aluno não encontrado');
    });
  });
  
  describe('removerAluno', () => {
    test('deve remover aluno existente', async () => {
      const cpf = '11144477735';
      
      Aluno.deleteOne.mockResolvedValue({ deletedCount: 1 });
      
      const resultado = await alunoService.removerAluno(cpf);
      
      expect(Aluno.deleteOne).toHaveBeenCalledWith({ cpf });
      expect(resultado).toEqual({ message: 'Aluno removido com sucesso' });
    });
    
    test('deve rejeitar quando aluno não encontrado', async () => {
      const cpf = '11144477735';
      
      Aluno.deleteOne.mockResolvedValue({ deletedCount: 0 });
      
      await expect(alunoService.removerAluno(cpf))
        .rejects.toThrow('Aluno não encontrado');
    });
  });
});

