import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtendimento } from "../context/AtendimentoContext"; 

import Layout from "../components/layout/Layout";
import Logo from "../components/ui/Logo";
import Box from "../components/ui/Box";

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
            <h2 className="text-white text-5xl font-semibold pt-1 pb-7">
                Escolha uma opção
            </h2>
            <div className="flex flex-row w-1/2 justify-between px-20">
                <Box
                    className = "py-24 text-4xl w-90 h-80"
                    label={"Atendimento Normal"}
                    onClick={() => handleSelectAtendimento('Normal')}

                />
                <Box
                    className = "py-24 text-4xl w-90 h-80"
                    label={"Atendimento Preferencial"}
                    onClick={() => handleSelectAtendimento('Preferencial')}
                />
            </div>
        </Layout>
    );
}

export default Atendimento;
