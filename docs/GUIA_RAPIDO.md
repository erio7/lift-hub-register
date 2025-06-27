# Guia de Execução Rápida - LiftHub

## 🚀 Início Rápido

### 1. Pré-requisitos
- Node.js 14+
- MongoDB rodando localmente
- Terminal/CMD

### 2. Instalação e Execução

#### Backend (Terminal 1)
```bash
cd lifthub/backend
npm install
node scripts/initDB.js
npm start
```
✅ Backend rodando em: http://localhost:3001

#### Frontend (Terminal 2)
```bash
cd lifthub/frontend/lifthub-frontend
npm install
npm run dev
```
✅ Frontend rodando em: http://localhost:5173

### 3. Teste Rápido
1. Abra http://localhost:5173
2. Digite um CPF válido: `11144477735`
3. Clique em "Cadastrar Aluno"
4. Teste edição e exclusão

### 4. Executar Testes
```bash
cd lifthub/backend
npm test
```

## 📁 Estrutura do Projeto
```
lifthub/
├── backend/           # API Node.js + Express
├── frontend/          # React App
├── README.md          # Documentação completa
├── DOCUMENTACAO_TECNICA.md  # Docs técnicas
└── teste_integracao.md      # Resultados dos testes
```

## 🔧 Comandos Úteis

### Backend
- `npm start` - Inicia servidor
- `npm test` - Executa testes
- `npm run dev` - Modo desenvolvimento

### Frontend
- `npm run dev` - Servidor desenvolvimento
- `npm run build` - Build para produção

## 📡 Endpoints da API
- POST `/alunos` - Cadastrar aluno
- GET `/alunos` - Listar alunos
- GET `/alunos/:cpf` - Buscar por CPF
- PUT `/alunos/:cpf` - Atualizar CPF
- DELETE `/alunos/:cpf` - Remover aluno

## ✅ Funcionalidades Implementadas
- ✅ CRUD completo de alunos
- ✅ Validação de CPF brasileiro
- ✅ Interface React responsiva
- ✅ Testes automatizados (Jest)
- ✅ Arquitetura modular
- ✅ Clean Code
- ✅ Tratamento de erros
- ✅ Feedback visual

## 🎯 CPFs para Teste
- **Válidos**: 11144477735, 22255588846, 33366699957
- **Inválidos**: 12345678901, 11111111111, 00000000000

---
**Projeto completo e funcional!** 🎉

