/**
 * Valida se um CPF é válido
 * @param {string} cpf - CPF a ser validado
 * @returns {boolean} - true se válido, false caso contrário
 */
const validarCPF = (cpf) => {
  // Verifica se CPF é válido antes de processar
  if (!cpf || typeof cpf !== 'string') return false;
  
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digito1 = resto < 2 ? 0 : resto;
  
  if (parseInt(cpf.charAt(9)) !== digito1) return false;
  
  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digito2 = resto < 2 ? 0 : resto;
  
  return parseInt(cpf.charAt(10)) === digito2;
};

/**
 * Formata um CPF para exibição
 * @param {string} cpf - CPF a ser formatado
 * @returns {string} - CPF formatado (xxx.xxx.xxx-xx)
 */
const formatarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Remove formatação do CPF
 * @param {string} cpf - CPF formatado
 * @returns {string} - CPF apenas com números
 */
const limparCPF = (cpf) => {
  return cpf.replace(/\D/g, '');
};

module.exports = {
  validarCPF,
  formatarCPF,
  limparCPF
};

