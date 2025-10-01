import React from 'react';
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Box from '../components/ui/Box';
import ButtonWhite from '../components/ui/ButtonWhite';


const Servicos = () => {
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
            label={"2ª Via da Conta"}
            onClick={() => {}}/>
        <Box 
            label={"Informar Falta de Água"}
            onClick={() => {}}/>
        <Box 
            label={"Alterar Dados Cadastrais"}
            onClick={() => {}}/>
        <Box 
            label={"Comunicar Vazamento"}
            onClick={() => {}}/>
      </div>
      <div className='flex flex-row w-full justify-between px-40'>
        <ButtonWhite
            label={"Voltar"}
            onClick={() => {}}
        />
        <ButtonWhite
            label={"Outros serviços"}
            onClick={() => {}}
        />
      </div>
    </Layout>
  );
};

export default Servicos;