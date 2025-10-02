import React from 'react';
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Box from '../components/ui/Box';
import ButtonWhite from '../components/ui/ButtonWhite';

import { FaHome } from "react-icons/fa"; 
import {FaRightToBracket} from "react-icons/fa6";

const Endereco = () => {
  return (
    <Layout>
      <Logo />
      <h2 className='text-white text-5xl font-semibold pt-1'>
        Selecione um Endereco para atendimento
      </h2>
      <div className='flex flex-row w-full justify-between px-64 mt-4 opacity-60'>
        <h3 className='text-white text-2xl font-semibold'>
          Olá, Wesley Morais
        </h3>
      </div>
      <div className='flex flex-row w-full justify-between px-64'>
        <Box 
            IconComponent={FaHome}
            className = "w-80"
            label={"2ª Via da Conta"}
            onClick={() => {}}/>
        <Box 
            IconComponent={FaHome}
            className = "w-80"
            label={"Informar Falta de Água"}
            onClick={() => {}}/>
        <Box 
            IconComponent={FaHome}
            className = "w-80"
            label={"Alterar Dados Cadastrais"}
            onClick={() => {}}/>
      </div>
      <div className='flex flex-row w-full justify-end px-64'>
        <ButtonWhite
            IconComponent={FaRightToBracket}
            className = "w-80"
            label={"Sair"}
            onClick={() => {}}
        />
      </div>
    </Layout>
  );
};

export default Endereco;