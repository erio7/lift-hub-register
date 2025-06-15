import { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:3001';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [cpf, setCpf] = useState('');
  const [editandoCpf, setEditandoCpf] = useState('');
  const [novoCpf, setNovoCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  // Carrega a lista de alunos ao inicializar
  useEffect(() => {
    carregarAlunos();
  }, []);

  // Função para carregar todos os alunos
  const carregarAlunos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/alunos`);
      const data = await response.json();
      
      if (data.success) {
        setAlunos(data.data);
      } else {
        mostrarMensagem('erro', 'Erro ao carregar alunos');
      }
    } catch (error) {
      mostrarMensagem('erro', 'Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  // Função para cadastrar um novo aluno
  const cadastrarAluno = async (e) => {
    e.preventDefault();
    
    if (!cpf.trim()) {
      mostrarMensagem('erro', 'CPF é obrigatório');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/alunos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf: cpf.trim() }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        mostrarMensagem('sucesso', 'Aluno cadastrado com sucesso!');
        setCpf('');
        carregarAlunos();
      } else {
        mostrarMensagem('erro', data.message);
      }
    } catch (error) {
      mostrarMensagem('erro', 'Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar um aluno
  const atualizarAluno = async (cpfAtual) => {
    if (!novoCpf.trim()) {
      mostrarMensagem('erro', 'Novo CPF é obrigatório');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/alunos/${cpfAtual}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ novoCpf: novoCpf.trim() }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        mostrarMensagem('sucesso', 'Aluno atualizado com sucesso!');
        setEditandoCpf('');
        setNovoCpf('');
        carregarAlunos();
      } else {
        mostrarMensagem('erro', data.message);
      }
    } catch (error) {
      mostrarMensagem('erro', 'Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  // Função para remover um aluno
  const removerAluno = async (cpf) => {
    if (!confirm('Tem certeza que deseja remover este aluno?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/alunos/${cpf}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        mostrarMensagem('sucesso', 'Aluno removido com sucesso!');
        carregarAlunos();
      } else {
        mostrarMensagem('erro', data.message);
      }
    } catch (error) {
      mostrarMensagem('erro', 'Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  // Função para mostrar mensagens
  const mostrarMensagem = (tipo, texto) => {
    setMensagem({ tipo, texto });
    setTimeout(() => {
      setMensagem({ tipo: '', texto: '' });
    }, 5000);
  };

  // Função para formatar CPF
  const formatarCPF = (cpf) => {
    const apenasNumeros = cpf.replace(/\D/g, '');
    return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Função para iniciar edição
  const iniciarEdicao = (cpf) => {
    setEditandoCpf(cpf);
    setNovoCpf(cpf);
  };

  // Função para cancelar edição
  const cancelarEdicao = () => {
    setEditandoCpf('');
    setNovoCpf('');
  };

  return (
    <div className="lifthub-container">
      <header className="lifthub-header">
        <h1>LiftHub - Gerenciamento de Alunos</h1>
        <p>Sistema de cadastro e gerenciamento de alunos para personal trainers</p>
      </header>

      {/* Mensagens de feedback */}
      {mensagem.texto && (
        <div className={`lifthub-mensagem lifthub-mensagem--${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}

      {/* Formulário de cadastro */}
      <section className="lifthub-section">
        <h2>Cadastrar Novo Aluno</h2>
        <form onSubmit={cadastrarAluno} className="lifthub-form">
          <div className="lifthub-input-group">
            <label htmlFor="cpf">CPF do Aluno:</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite o CPF (apenas números)"
              maxLength="11"
              className="lifthub-input"
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="lifthub-button lifthub-button--primary"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Aluno'}
          </button>
        </form>
      </section>

      {/* Lista de alunos */}
      <section className="lifthub-section">
        <h2>Alunos Cadastrados</h2>
        
        {loading && <div className="lifthub-loading">Carregando...</div>}
        
        {alunos.length === 0 && !loading ? (
          <div className="lifthub-empty">
            <p>Nenhum aluno cadastrado ainda.</p>
          </div>
        ) : (
          <div className="lifthub-alunos-grid">
            {alunos.map((aluno) => (
              <div key={aluno._id} className="lifthub-aluno-card">
                {editandoCpf === aluno.cpf ? (
                  // Modo de edição
                  <div className="lifthub-edit-form">
                    <div className="lifthub-input-group">
                      <label>Novo CPF:</label>
                      <input
                        type="text"
                        value={novoCpf}
                        onChange={(e) => setNovoCpf(e.target.value)}
                        maxLength="11"
                        className="lifthub-input"
                        disabled={loading}
                      />
                    </div>
                    <div className="lifthub-button-group">
                      <button
                        onClick={() => atualizarAluno(aluno.cpf)}
                        className="lifthub-button lifthub-button--success"
                        disabled={loading}
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelarEdicao}
                        className="lifthub-button lifthub-button--secondary"
                        disabled={loading}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  // Modo de visualização
                  <>
                    <div className="lifthub-aluno-info">
                      <strong>CPF:</strong> {formatarCPF(aluno.cpf)}
                    </div>
                    <div className="lifthub-aluno-data">
                      <small>Cadastrado em: {new Date(aluno.createdAt).toLocaleDateString('pt-BR')}</small>
                    </div>
                    <div className="lifthub-button-group">
                      <button
                        onClick={() => iniciarEdicao(aluno.cpf)}
                        className="lifthub-button lifthub-button--warning"
                        disabled={loading}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => removerAluno(aluno.cpf)}
                        className="lifthub-button lifthub-button--danger"
                        disabled={loading}
                      >
                        Excluir
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;

