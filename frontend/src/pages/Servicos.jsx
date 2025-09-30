import React from 'react';
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Box from '../components/ui/Box';


const Servicos = () => {
  return (
    <Layout>
      <Logo />
      <div className='flex flex-row'>
      <div >
        <Box 
            label={"2ª Via da Conta"}
            onClick={() => {}}
            type="submit"/>
      </div>
      <div >
        <Box 
            label={"Informar Falta de Água"}
            onClick={() => {}}
            type="submit"/>
      </div>
      <div >
        <Box 
            label={"Alterar Dados Cadastrais"}
            onClick={() => {}}
            type="submit"/>
      </div>
      <div>
        <Box 
            label={"Comunicar Vazamento"}
            onClick={() => {}}
            type="submit"/>
      </div>
      </div>
    </Layout>
  );
};

export default Servicos;