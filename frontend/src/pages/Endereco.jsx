import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAtendimento } from "../context/AtendimentoContext";
// Components
import Layout from '../components/layout/Layout';
import User from '../components/ui/User';
import Logo from '../components/ui/Logo';
import Box from '../components/ui/Box';
import ButtonWhite from '../components/ui/ButtonWhite';

import { FaHome, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa"; 
import {FaRightToBracket} from "react-icons/fa6";


const Endereco = () => {
  const navigate = useNavigate();

  const { 
        matriculasDoCliente,      
        setDocumentoDoCliente,    
        setIsGrandeCliente,       
        limparSessao             
  } = useAtendimento();

    // 💡 Dados Receiver
    const [protocolo, setProtocolo] = useState(null);

    // 💡 Recupera protocolo do localStorage
    useEffect(() => {
        const protocoloSalvo = localStorage.getItem('protocoloAtendimento');
        if (protocoloSalvo) {
            setProtocolo(protocoloSalvo);
        }
    }, []);

    //Mock de Endereços - Substituir pela API
    const handleSelectAddress = (matriculaObjeto) => {
        
        // Salva a Matrícula escolhida 
        setDocumentoDoCliente(matriculaObjeto.numero); 
        
        // Salva o status do Cliente no Context
        setIsGrandeCliente(matriculaObjeto.isGrandeCliente); 
        
       navigate('/servicos'); 
  };

    const handleSair = () => {
        limparSessao();
        navigate('/'); 
    };

  return (
    <Layout>
      <Logo />
      <h2 className='text-white text-5xl font-semibold pt-1'>
        Selecione um Endereco para atendimento
      </h2>
      <User />
      <div className='flex flex-row w-full justify-between px-70'>
        {matriculasDoCliente.map((item) => (
        <Box 
          className='py-10 text-xl'
          key={item.numero} 
          IconComponent={FaHome}
          label={`${item.endereco} Matrícula: ${item.numero} ${item.isGrandeCliente ? ' (GRANDE CLIENTE)' : ''}`}
          onClick={() => handleSelectAddress(item)}
            />
        ))}
      </div>
      <div className='flex flex-row w-full justify-between px-70'>
        <ButtonWhite
            className='text-xl'
            IconComponent={FaArrowAltCircleLeft}
            label={"Voltar"}
            onClick={() => {}}
        />
        <ButtonWhite
            className='text-xl'
            IconComponent={FaArrowAltCircleRight}
            label={"Avançar"}
            onClick={() => {}}
        />
      </div>
      <div className='flex flex-row w-full justify-center px-70'>
        <ButtonWhite
            className='text-xl'
            IconComponent={FaRightToBracket}
            label={"Sair"}
            onClick={handleSair}
        />
      </div>
      
      <div className="fixed bottom-4 right-4 px-4 bg-white bg-opacity-95 rounded-lg shadow-lg max-w-xs border-2 border-blue-300">
          <h3 className="text-blue-900 text-lg font-bold mb-2">📋 Protocolo:</h3>
          <p className="text-blue-700 text-base font-mono bg-blue-50 p-2 rounded border text-center font-bold">
            Variavel de protocolo aqui
          </p>
          <p className="text-blue-600 text-xs mt-2 text-center">
            Guarde este número
          </p>
        </div>
    </Layout>
  );
};

export default Endereco;