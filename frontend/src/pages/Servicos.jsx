import React, { useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAtendimento } from '../context/AtendimentoContext'; 
import Layout from '../components/layout/Layout';
import User from '../components/ui/User';
import Logo from '../components/ui/Logo';
import Box from '../components/ui/Box';
import ButtonWhite from '../components/ui/ButtonWhite';

import { IoDocumentText } from "react-icons/io5";
import { FaFaucet, FaUserPen, FaTriangleExclamation, FaRightToBracket} from "react-icons/fa6";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight  } from "react-icons/fa";

const servicesList = [
    { 
        label: "2ª Via da Conta", 
        icon: IoDocumentText, 
        isPresencial: false, // ONLINE (Segue a rota)
        route: '/fatura',
        onlyGrandeCliente: false
    },
    { 
        label: "Informar Falta de Água", 
        icon: FaFaucet, 
        isPresencial: true, // PRESENCIAL (Gera Senha)
        serviceName: "Informar Falta de Água",
        onlyGrandeCliente: false
    },
    { 
        label: "Alterar Dados Cadastrais", 
        icon: FaUserPen, 
        isPresencial: false, // ONLINE
        route: '/alterCad',
        onlyGrandeCliente: false
    },
    { 
        label: "Mudança de Titularidade", 
        icon: FaUserPen, 
        isPresencial: true, // PRESENCIAL (Gera Senha)
        serviceName: "Mudança de Titularidade",
        onlyGrandeCliente: false
    },
    

];

const Servicos = () => {
  const navigate = useNavigate();
  const { 
        tipoAtendimento, 
        setOrigemFluxo, 
        setServicoEscolhido,
        limparSessao // Para o botão Sair
  } = useAtendimento();
    
  // Ações para cada serviço
  const handleServiceSelection = (service) => {
    setServicoEscolhido(service.label);
    if (service.isPresencial) {
    // A. SERVIÇO PRESENCIAL (Gera Senha)     
      setOrigemFluxo('SelecaoDeServico'); 
      const tipoLetra = tipoAtendimento === 'Preferencial' ? 'P' : 'N';
      // Substituir por API no futuro
      const numeroSenha = tipoLetra + Math.floor(Math.random() * 900) + 100;
      const dadosParaSenha = {
        numero: numeroSenha,
      };
      // Navega para a tela de Senha
      navigate('/senha', { state: dadosParaSenha });
    } else {
      // B. SERVIÇO ONLINE (Navegação Direta)
      setOrigemFluxo('Online'); 
        // Navega para a rota online do serviço
        navigate(service.route);
    }
  };
    
  // Ação Sair (Limpa o Context e volta para a tela inicial)
  const handleSair = () => {
      limparSessao(); // Limpa todas as variáveis da sessão no Context
      navigate('/'); 
  };

  // Logica Carrossel 
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const visibleCount = 3; 
  const maxIndex = Math.max(0, Math.ceil(servicesList.length / visibleCount) - 1);
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
      <h2 className='text-white text-4xl font-semibold pt-1'>
        Selecão de serviços
      </h2>
      <User />
      <div className='w-full max-w-5xl flex flex-col items-center'>
      
        <div ref={scrollRef} className='w-full flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide'>
          {/* 💡 Renderiza servicesList (a lista filtrada) */}
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className='flex-shrink-0 w-1/3 flex justify-center items-center p-3 snap-start' 
              >
                <Box 
                  key={index}
                  className='text-2xl'
                  IconComponent={service.icon}
                  label={service.label}
                  onClick={() => handleServiceSelection(service)}
              />
            </div>
          ))}
            
        </div>
        </div>
        <div className='flex flex-row w-full justify-between px-74'>
          <ButtonWhite
              className='text-2xl'
              IconComponent={FaArrowAltCircleLeft}
              label={"Voltar"}
              onClick={prev}
              disabled={currentIndex === 0}
          />
          <ButtonWhite
              className='text-2xl'
              IconComponent={FaArrowAltCircleRight}
              label={"Avançar"}
              onClick={next}
              disabled={currentIndex === maxIndex}
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

export default Servicos;