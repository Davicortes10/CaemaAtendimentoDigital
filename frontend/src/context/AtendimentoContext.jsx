import React, { createContext, useState, useContext } from 'react';

// 1. CRIAÇÃO DO CONTEXTO
const AtendimentoContext = createContext();

// 2. O COMPONENTE PROVIDER
export const AtendimentoProvider = ({ children }) => {
    // Variáveis de estado focadas no fluxo
    const [tipoAtendimento, setTipoAtendimento] = useState(null); // 'Normal' | 'Preferencial'
    const [origemFluxo, setOrigemFluxo] = useState(null); 
    const [servicoEscolhido, setServicoEscolhido] = useState(null); 

    // MATRÍCULAS
    const [documentoDoCliente, setDocumentoDoCliente] = useState(''); // CPF ou Matrícula
    const [isGrandeCliente, setIsGrandeCliente] = useState(false);
    // Armazena a lista de objetos { numero, endereco, isGrandeCliente } da API
    const [matriculasDoCliente, setMatriculasDoCliente] = useState([]);

    // Função para limpar a sessão (resetar estados)
    const limparSessao = () => {
        setTipoAtendimento(null);
        setOrigemFluxo(null);
        setServicoEscolhido(null);
        setDocumentoDoCliente('');
        setIsGrandeCliente(false);
        setMatriculasDoCliente([])
    };

    return (
        <AtendimentoContext.Provider 
            value={{ 
                // Apenas as propriedades que você precisa agora
                tipoAtendimento,
                origemFluxo,
                servicoEscolhido,
                setTipoAtendimento,
                setOrigemFluxo,
                setServicoEscolhido,
                limparSessao,
                documentoDoCliente,
                setDocumentoDoCliente,
                isGrandeCliente,
                setIsGrandeCliente,
                matriculasDoCliente,
                setMatriculasDoCliente
            }}
        >
            {children}
        </AtendimentoContext.Provider>
    );
};

// 3. O CUSTOM HOOK (useAtendimento)
export const useAtendimento = () => useContext(AtendimentoContext);