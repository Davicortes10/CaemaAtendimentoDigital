import React, { createContext, useState, useContext } from 'react';

// 1. CRIAÇÃO DO CONTEXTO
const AtendimentoContext = createContext();

// 2. O COMPONENTE PROVIDER
export const AtendimentoProvider = ({ children }) => {
    // Variáveis de estado focadas no fluxo
    const [tipoAtendimento, setTipoAtendimento] = useState(null); // 'Normal' | 'Preferencial'
    const [origemFluxo, setOrigemFluxo] = useState(null); 
    const [servicoEscolhido, setServicoEscolhido] = useState(null); 

    const limparSessao = () => {
        setTipoAtendimento(null);
        setOrigemFluxo(null);
        setServicoEscolhido(null);
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
                limparSessao
            }}
        >
            {children}
        </AtendimentoContext.Provider>
    );
};

// 3. O CUSTOM HOOK (useAtendimento)
export const useAtendimento = () => useContext(AtendimentoContext);