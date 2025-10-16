import React from 'react';

// O Protocolo será recebido como uma prop
const Protocol = ({ numeroProtocolo }) => {
    // Se o protocolo for nulo/vazio, não renderiza nada ou renderiza uma versão mínima
    if (!numeroProtocolo) {
        return null; 
    }

    return (
        <div className="absolute top-4 right-4 bg-white/10 text-white text-sm px-4 py-1 rounded-full opacity-70">
            Protocolo: {numeroProtocolo}
        </div>
    );
};

export default Protocol;