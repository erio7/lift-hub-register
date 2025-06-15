const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// POST /alunos - Cadastra um aluno
router.post('/', alunoController.cadastrarAluno);

// GET /alunos - Lista todos os alunos
router.get('/', alunoController.listarAlunos);

// GET /alunos/:cpf - Busca um aluno pelo CPF
router.get('/:cpf', alunoController.buscarAlunoPorCPF);

// PUT /alunos/:cpf - Atualiza o CPF do aluno
router.put('/:cpf', alunoController.atualizarAluno);

// DELETE /alunos/:cpf - Remove um aluno
router.delete('/:cpf', alunoController.removerAluno);

module.exports = router;

