const { validarCPF, formatarCPF, limparCPF } = require('../utils/cpfValidator');

describe('CPF Validator', () => {
  
  describe('validarCPF', () => {
    test('deve validar CPF válido', () => {
      expect(validarCPF('11144477735')).toBe(true);
      expect(validarCPF('111.444.777-35')).toBe(true);
    });
    
    test('deve rejeitar CPF inválido', () => {
      expect(validarCPF('11144477734')).toBe(false);
      expect(validarCPF('111.444.777-34')).toBe(false);
    });
    
    test('deve rejeitar CPF com todos os dígitos iguais', () => {
      expect(validarCPF('11111111111')).toBe(false);
      expect(validarCPF('000.000.000-00')).toBe(false);
    });
    
    test('deve rejeitar CPF com menos de 11 dígitos', () => {
      expect(validarCPF('1114447773')).toBe(false);
      expect(validarCPF('111.444.777-3')).toBe(false);
    });
    
    test('deve rejeitar CPF com mais de 11 dígitos', () => {
      expect(validarCPF('111444777355')).toBe(false);
      expect(validarCPF('111.444.777-355')).toBe(false);
    });
    
    test('deve rejeitar CPF vazio ou null', () => {
      expect(validarCPF('')).toBe(false);
      expect(validarCPF(null)).toBe(false);
      expect(validarCPF(undefined)).toBe(false);
    });
  });
  
  describe('formatarCPF', () => {
    test('deve formatar CPF corretamente', () => {
      expect(formatarCPF('11144477735')).toBe('111.444.777-35');
    });
    
    test('deve formatar CPF já formatado', () => {
      expect(formatarCPF('111.444.777-35')).toBe('111.444.777-35');
    });
  });
  
  describe('limparCPF', () => {
    test('deve remover formatação do CPF', () => {
      expect(limparCPF('111.444.777-35')).toBe('11144477735');
    });
    
    test('deve manter CPF sem formatação', () => {
      expect(limparCPF('11144477735')).toBe('11144477735');
    });
  });
});

