import React from "react";
import { useNavigate } from "react-router-dom";
import { useAtendimento } from "../context/AtendimentoContext"; 

import Layout from "../components/layout/Layout";
import Logo from "../components/ui/Logo";
import Box from "../components/ui/Box";
import Protocolo from '../components/ui/Protocolo';
import Direitos from "../components/ui/Direitos";

const Atendimento = () => {
    const navigate = useNavigate();
    const { setTipoAtendimento } = useAtendimento();

    const handleSelectAtendimento = (tipo) => {
        setTipoAtendimento(tipo);
        navigate('/entrada'); 
    };

    return (
        <Layout>
            {/* Logo com menos margem inferior se necessário */}
            <Logo />
                <h2 className="text-white text-7xl font-semibold mb-16">
                    Escolha uma opção
                </h2>
                
                {/* Reduzi mb-32 para mb-16 para aproximar o rodapé dos cards */}
                <div className="flex flex-row w-1/2 justify-between mb-16">
                    <Box
                        className="text-4xl w-[420px] h-96 shadow-2xl"
                        label={"Atendimento Normal"}
                        onClick={() => handleSelectAtendimento('Normal')}
                    />
                    <Box
                        className="text-4xl w-[420px] h-96 shadow-2xl"
                        label={"Atendimento Preferencial"}
                        onClick={() => handleSelectAtendimento('Preferencial')}
                    />
                </div>

                {/* Rodapé: Extremidades da tela (Canto a Canto) */}
                <div className="w-full flex flex-row justify-between items-end px-16 mt-auto">
                    <div className="text-left">
                        <Direitos />
                    </div>
                    <div className="text-right">
                        <Protocolo />
                    </div>
                </div>
        </Layout>
    );
}

export default Atendimento;