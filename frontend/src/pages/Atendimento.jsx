import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtendimento } from "../context/AtendimentoContext"; 

import Layout from "../components/layout/Layout";
import Logo from "../components/ui/Logo";
import Box from "../components/ui/Box";
import Protocolo from '../components/ui/Protocolo';

const Atendimento = () => {
    const navigate = useNavigate();
    const { setTipoAtendimento } = useAtendimento();

    const handleSelectAtendimento = (tipo) => {
        setTipoAtendimento(tipo);
        navigate('/entrada'); 
    };
    return (
        <Layout>
            <Logo/>
            <h2 className="text-white text-5xl font-semibold pt-1 pb-24">
                Escolha uma opção
            </h2>
            <div className="flex flex-row w-1/2 justify-between">
                <Box
                    className = "py-12 text-4xl w-xl h-96"
                    label={"Atendimento Normal"}
                    onClick={() => handleSelectAtendimento('Normal')}

                />
                <Box
                    className = "py-12 text-4xl w-xl h-96"
                    label={"Atendimento Preferencial"}
                    onClick={() => handleSelectAtendimento('Preferencial')}
                />
            </div>
            <Protocolo/>
        </Layout>
    );
}

export default Atendimento;
