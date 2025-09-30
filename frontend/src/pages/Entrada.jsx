import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';


const Entrada = () => {
  return (
    <Layout>
      <Logo />
      <div className="w-full text-center p-20">
        <h1 className="text-white text-5xl font-extrabold">
          Tela de Entrada - Em Construção! 
        </h1>
        <p className="text-gray-400 text-2xl mt-4">
          Aguardando o conteúdo.
        </p>
      </div>
    </Layout>
  );
};

export default Entrada;