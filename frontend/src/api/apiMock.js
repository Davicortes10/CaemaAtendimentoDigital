// src/api/apiMock.js

// --- Dados Mockados ---
const MATRICULA_GRANDE_CLIENTE_MOCK = 
    { numero: '9999999-1', endereco: 'Av. Industrial, 500 - Galpão 1', isGrandeCliente: true };

const MATRICULAS_NORMAL_MOCK = [
    { numero: '1234567-8', endereco: 'Rua Onze, 17, São Raimundo', isGrandeCliente: false },
    { numero: '9876543-2', endereco: 'Av. Principal, 789, Cohab', isGrandeCliente: false },
];

// --- Função Principal de Consulta ---
export const fetchClienteData = async (documento) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay
    
    // CPF MIXTO (Puxa Matrícula Grande e Normais - Exemplo: '12345678901')
    if (documento.length === 11 && documento === '12345678901') {
        return {
            matrículas: [
                MATRICULA_GRANDE_CLIENTE_MOCK, 
                ...MATRICULAS_NORMAL_MOCK
            ],
        };
    }
    
    // CPF SÓ COM MATRÍCULAS NORMAIS (Exemplo de teste: '11111111111')
    if (documento.length === 11 && documento === '11111111111') {
        return {
            matrículas: MATRICULAS_NORMAL_MOCK,
        };
    }
    
    // MATRÍCULA ÚNICA - GRANDE CLIENTE (Exemplo de teste: '99999991' ou qualquer um que comece com 999)
    if (documento.length < 11 && documento.startsWith('999')) {
        return {
            matrículas: [{ ...MATRICULA_GRANDE_CLIENTE_MOCK, numero: documento }],
        };
    }

    // MATRÍCULA ÚNICA - CLIENTE NORMAL (Qualquer outra)
    if (documento.length < 11 && documento.length > 5) {
        return {
            matrículas: [{ numero: documento, endereco: 'Endereço Padrão', isGrandeCliente: false }],
        };
    }
    
    // Caso não encontrado ou inválido
    return {
        matrículas: [],
    };
};