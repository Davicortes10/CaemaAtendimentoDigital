import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import Layout from "../components/layout/Layout";
import Logo from "../components/ui/Logo";
import Box from "../components/ui/Box";

const Atendimento = () => {
    const navigate = useNavigate();
    const [protocolo, setProtocolo] = useState(null);
    
    const gerarProtocolo = () => {
        const timestamp = Date.now();
        const numeroAleatorio = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const novoProtocolo = `CAEMA-${timestamp}-${numeroAleatorio}`;
        setProtocolo(novoProtocolo);
        return novoProtocolo;
    };
    
    const handleSelectAtendimento = (tipoAtendimento) => {
        const protocoloGerado = gerarProtocolo();
        // Salva o protocolo no localStorage
        localStorage.setItem('protocoloAtendimento', protocoloGerado);
        localStorage.setItem('tipoAtendimento', tipoAtendimento);
    };
    
    const handleContinuar = () => {
        navigate('/entrada');
    };
    return (
        <Layout>
            <Logo/>
            <h2 className="text-white text-5xl font-semibold pt-1 pb-7">
                Escolha uma opção
            </h2>

            
            <div className="flex flex-row w-1/2 justify-between px-20">
                <Box
                    className = "py-24 text-4xl"
                    label={"Atendimento Normal"}
                    onClick={() => handleSelectAtendimento("Normal")}
                />
                
                <Box
                    className = "py-24 text-4xl"
                    label={"Atendimento Preferencial"}
                    onClick={() => handleSelectAtendimento("Preferencial")}
                />
            </div>

            {protocolo && (
                <div className="fixed bottom-4 right-4 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg max-w-xs border-2 border-blue-300">
                    <h3 className="text-blue-900 text-lg font-bold mb-2">✅ Protocolo:</h3>
                    <p className="text-blue-700 text-base font-mono bg-blue-50 p-2 rounded border text-center font-bold">
                        {protocolo}
                    </p>
                    <p className="text-blue-600 text-xs mt-2 text-center">
                        Guarde este número
                    </p>
                    <button 
                        onClick={handleContinuar}
                        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded transition-colors"
                    >
                        Continuar
                    </button>
                </div>
            )}

        </Layout>
    );
}

export default Atendimento;
