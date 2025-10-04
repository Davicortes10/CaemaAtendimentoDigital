import React from 'react';
import {useNavigate} from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Box from '../components/ui/Box';
import ButtonWhite from '../components/ui/ButtonWhite';

import { IoDocumentText } from "react-icons/io5";
import { FaFaucet, FaUserPen, FaTriangleExclamation} from "react-icons/fa6";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight  } from "react-icons/fa";


const Servicos = () => {
  const navigate = useNavigate();
  const handleSelectFatura = () => {
    navigate('/fatura');
  };

  return (
    <Layout>
      <Logo />
      <h2 className='text-white text-5xl font-semibold pt-1'>
        Selecão de serviços
      </h2>
      <div className='flex flex-row w-full justify-between px-40 mt-4 opacity-60'>
        <h3 className='text-white text-2xl font-semibold'>
          Olá, Wesley Morais
        </h3>
      </div>
      <div className='flex flex-row w-full justify-between px-40'>
        <Box 
            IconComponent={IoDocumentText}
            label={"2ª Via da Conta"}
            onClick={handleSelectFatura}/>
        <Box 
            IconComponent={FaFaucet}
            label={"Informar Falta de Água"}
            onClick={() => {}}/>
        <Box 
            IconComponent={FaUserPen}
            label={"Alterar Dados Cadastrais"}
            onClick={() => {}}/>
        <Box 
            IconComponent={FaTriangleExclamation}
            label={"Comunicar Vazamento"}
            onClick={() => {}}/>
      </div>
      <div className='flex flex-row w-full justify-between px-40'>
        <ButtonWhite
            IconComponent={FaArrowAltCircleLeft}
            label={"Voltar"}
            onClick={() => {}}
        />
        <ButtonWhite
            IconComponent={FaArrowAltCircleRight}
            label={"Avançar"}
            onClick={() => {}}
        />
      </div>
    </Layout>
  );
};

export default Servicos;