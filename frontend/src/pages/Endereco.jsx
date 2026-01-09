import React, { useState, useEffect, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAtendimento } from "../context/AtendimentoContext";
// Components
import Layout from '../components/layout/Layout';
import User from '../components/ui/User';
import Logo from '../components/ui/Logo';
import Box from '../components/ui/Box';
import ButtonWhite from '../components/ui/ButtonWhite';
import Protocolo from '../components/ui/Protocolo';
import Direitos from '../components/ui/Direitos';

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
    const [setProtocolo] = useState(null);

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

  // Logica do Carrossel 
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const visibleCount = 3; 
  // Usa matriculasDoCliente.length
  const maxIndex = Math.max(0, Math.ceil(matriculasDoCliente.length / visibleCount) - 1);
  // Voltar
  const prev = () => {
    if (scrollRef.current && currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      // Rola para trás o equivalente a uma página (largura total da viewport)
      const scrollAmount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };
 // Avançar
 const next = () => {
  if (scrollRef.current && currentIndex < maxIndex) {
    setCurrentIndex(i => i + 1);
    // Rola para frente o equivalente a uma página
    const scrollAmount = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
 };

  return (
    <Layout>
      <Logo />
      <h2 className='text-white text-5xl font-semibold pt-1'>
        Selecione um Endereco para atendimento
      </h2>
      <User />
      <div className='w-full max-w-5xl mx-auto flex flex-col items-center'>
        <div ref={scrollRef} className={`w-full flex overflow-x-hidden snap-x snap-mandatory scrollbar-hide ${matriculasDoCliente.length < 3 ? 'justify-center' : ''}`}>
          {matriculasDoCliente.map((item, index) => (
            <div 
              key={index} 
              className='flex-shrink-0 w-1/3 flex justify-center items-center p-3 snap-start' 
              >
              <Box 
                className='py-10 text-xl'
                IconComponent={FaHome}
                label={`${item.endereco} Matrícula: ${item.numero} ${item.isGrandeCliente ? ' (GRANDE CLIENTE)' : ''}`}
                onClick={() => handleSelectAddress(item)}
                  />
            </div>
          ))}
        </div>
      </div>
      <div className='w-full max-w-5xl flex flex-row items-center'>
          <ButtonWhite
              className='text-2xl'
              IconComponent={FaArrowAltCircleLeft}
              label={"Voltar"}
              onClick={prev}
              disabled={currentIndex === 0}
          />
  
            <ButtonWhite
                          className='text-2xl'
                          IconComponent={FaRightToBracket}
                          label={"Sair"}
                          onClick={handleSair}
                      />
          
          <ButtonWhite
              className='text-2xl'
              IconComponent={FaArrowAltCircleRight}
              label={"Avançar"}
              onClick={next}
              disabled={currentIndex === maxIndex}
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
};

export default Endereco;