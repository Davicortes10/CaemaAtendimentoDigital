// src/api/apiMock.js

// --- Dados Mockados ---

// 💡 MANTER COMO OBJETO ÚNICO, MAS VAMOS ADICIONAR MAIS ENDEREÇOS GRANDES ABAIXO.
const MATRICULA_GRANDE_CLIENTE_MOCK = 
 { numero: '9999999-1', endereco: 'Av. Industrial, 500 - Galpão 1', isGrandeCliente: true };

// 💡 NOVO: Lista adicional de Matrículas Grande Cliente para forçar o carrossel a rolar.
const MATRICULAS_GRANDE_CLIENTE_ADICIONAIS_MOCK = [
    { numero: '9999999-2', endereco: 'Av. Industrial, 500 - Galpão 2', isGrandeCliente: true },
    { numero: '9999999-3', endereco: 'Av. Industrial, 500 - Galpão 3', isGrandeCliente: true },
];

// 💡 AUMENTADO: Adicionamos mais um item Normal aqui. Total 3 Normais.
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
 MATRICULA_GRANDE_CLIENTE_MOCK, // Objeto Único (1)
                // 💡 ADICIONADO: Matrículas Grande Cliente adicionais (2)
                ...MATRICULAS_GRANDE_CLIENTE_ADICIONAIS_MOCK, 
 ...MATRICULAS_NORMAL_MOCK // Array de 3
 ],
 };
        // Total de Matrículas no mix: 1 + 2 + 3 = 6 (Isso garante que o carrossel role!)
 }

 // CPF SÓ COM MATRÍCULAS NORMAIS (Exemplo de teste: '11111111111')
 if (documento.length === 11 && documento === '11111111111') {
 return {
 // Agora retorna 3, o que ainda mantém o carrossel desabilitado (3 itens = 1 página de 3)
 matrículas: MATRICULAS_NORMAL_MOCK, 
 };
}
 
 // MATRÍCULA ÚNICA - GRANDE CLIENTE
if (documento.length < 11 && documento.startsWith('999')) {
return {
 matrículas: [{ ...MATRICULA_GRANDE_CLIENTE_MOCK, numero: documento }],
 };
 }

 // MATRÍCULA ÚNICA - CLIENTE NORMAL
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