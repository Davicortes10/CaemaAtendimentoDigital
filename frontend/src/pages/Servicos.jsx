import React from 'react';
import {useNavigate} from 'react-router-dom';
import Layout from '../components/layout/Layout';
import User from '../components/ui/User';
import Logo from '../components/ui/Logo';
import Box from '../components/ui/Box';
import ButtonWhite from '../components/ui/ButtonWhite';

import { IoDocumentText } from "react-icons/io5";
import { FaFaucet, FaUserPen, FaTriangleExclamation, FaRightToBracket} from "react-icons/fa6";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight  } from "react-icons/fa";


const Servicos = () => {
  const navigate = useNavigate();
  const handleSelectFatura = () => {
    navigate('/fatura');
  };

  const handleSelectAlterCad = () => {
    navigate('/alterCad');
  };

  const handleSelectInfFaltaWater = () => {
    navigate('/infFaltaWater');
  };

  const handleSair = () => {
        // Lógica para deslogar e voltar para a tela inicial/CPF
        console.log("Ação: Sair/Logout");
        navigate('/'); 
  };

  return (
    <Layout>
      <Logo />
      <h2 className='text-white text-5xl font-semibold pt-1'>
        Selecão de serviços
      </h2>
      <User />
      <div className='flex flex-row w-full justify-between px-70'>
        <Box 
            className='text-2xl'
            IconComponent={IoDocumentText}
            label={"2ª Via da Conta"}
            onClick={handleSelectFatura}/>
        <Box 
            className='text-2xl'
            IconComponent={FaFaucet}
            label={"Informar Falta de Água"}
            onClick={handleSelectInfFaltaWater}/>
        <Box 
            className='text-2xl'
            IconComponent={FaUserPen}
            label={"Alterar Dados Cadastrais"}
            onClick={handleSelectAlterCad}/>
      </div>
      <div className='flex flex-row w-full justify-between px-70'>
        <ButtonWhite
            className='text-2xl'
            IconComponent={FaArrowAltCircleLeft}
            label={"Voltar"}
            onClick={() => {}}
        />
        <ButtonWhite
            className='text-2xl'
            IconComponent={FaArrowAltCircleRight}
            label={"Avançar"}
            onClick={() => {}}
        />
      </div>
      <div className='flex flex-row w-full justify-center px-70'>
        <ButtonWhite
            className='text-2xl'
            IconComponent={FaRightToBracket}
            label={"Sair"}
            onClick={handleSair}
        />
      </div>
    </Layout>
  );
};

export default Servicos;