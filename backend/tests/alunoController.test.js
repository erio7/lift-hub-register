const request = require('supertest');
const express = require('express');
const alunoController = require('../controllers/alunoController');
const alunoService = require('../services/alunoService');

// Mock do service
jest.mock('../services/alunoService');

const app = express();
app.use(express.json());

// Configurar rotas para teste
app.post('/alunos', alunoController.cadastrarAluno);
app.get('/alunos', alunoController.listarAlunos);
app.get('/alunos/:cpf', alunoController.buscarAlunoPorCPF);
app.put('/alunos/:cpf', alunoController.atualizarAluno);
app.delete('/alunos/:cpf', alunoController.removerAluno);

describe('AlunoController', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('POST /alunos', () => {
    test('deve cadastrar aluno com sucesso', async () => {
      const cpf = '11144477735';
      const mockAluno = { cpf, _id: 'mockId', createdAt: '2025-06-15T20:41:20.945Z' };
      
      alunoService.cadastrarAluno.mockResolvedValue(mockAluno);
      
      const response = await request(app)
        .post('/alunos')
        .send({ cpf });
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Aluno cadastrado com sucesso');
      expect(response.body.data).toEqual(mockAluno);
    });
    
    test('deve retornar erro quando CPF não fornecido', async () => {
      const response = await request(app)
        .post('/alunos')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('CPF é obrigatório');
    });
    
    test('deve retornar erro quando CPF inválido', async () => {
      const cpf = '11144477734';
      
      alunoService.cadastrarAluno.mockRejectedValue(new Error('CPF inválido'));
      
      const response = await request(app)
        .post('/alunos')
        .send({ cpf });
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('CPF inválido');
    });
  });
  
  describe('GET /alunos', () => {
    test('deve listar todos os alunos', async () => {
      const mockAlunos = [
        { cpf: '11144477735', _id: 'id1' },
        { cpf: '22255588846', _id: 'id2' }
      ];
      
      alunoService.listarAlunos.mockResolvedValue(mockAlunos);
      
      const response = await request(app).get('/alunos');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockAlunos);
    });
  });
  
  describe('GET /alunos/:cpf', () => {
    test('deve buscar aluno por CPF', async () => {
      const cpf = '11144477735';
      const mockAluno = { cpf, _id: 'mockId' };
      
      alunoService.buscarAlunoPorCPF.mockResolvedValue(mockAluno);
      
      const response = await request(app).get(`/alunos/${cpf}`);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockAluno);
    });
    
    test('deve retornar 404 quando aluno não encontrado', async () => {
      const cpf = '11144477735';
      
      alunoService.buscarAlunoPorCPF.mockRejectedValue(new Error('Aluno não encontrado'));
      
      const response = await request(app).get(`/alunos/${cpf}`);
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Aluno não encontrado');
    });
  });
  
  describe('DELETE /alunos/:cpf', () => {
    test('deve remover aluno com sucesso', async () => {
      const cpf = '11144477735';
      
      alunoService.removerAluno.mockResolvedValue({ message: 'Aluno removido com sucesso' });
      
      const response = await request(app).delete(`/alunos/${cpf}`);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Aluno removido com sucesso');
    });
    
    test('deve retornar 404 quando aluno não encontrado', async () => {
      const cpf = '11144477735';
      
      alunoService.removerAluno.mockRejectedValue(new Error('Aluno não encontrado'));
      
      const response = await request(app).delete(`/alunos/${cpf}`);
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Aluno não encontrado');
    });
  });
});

