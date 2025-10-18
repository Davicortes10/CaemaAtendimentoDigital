import React, { useState } from 'react';
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
        isPresencial: true, // ONLINE
        route: '/alterCad',
        onlyGrandeCliente: false
    },

    { 
        label: "Alterar Dados Cadastrais", 
        icon: FaUserPen, 
        isPresencial: true, // ONLINE
        route: '/alterCad',
        onlyGrandeCliente: false
    },
    { 
        label: "Alterar Dados Cadastrais", 
        icon: FaUserPen, 
        isPresencial: true, // ONLINE
        route: '/alterCad',
        onlyGrandeCliente: false
    },
    { 
        label: "Solicitar Religação", 
        icon: FaUserPen, 
        isPresencial: true, // ONLINE
        route: '/alterCad',
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
            
      // Determina a letra da senha (N=Normal, P=Preferencial)
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
  // Carrossel: estado para índice atual
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3; // quantos itens aparecem na viewport

  const maxIndex = Math.max(0, servicesList.length - visibleCount);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  const goTo = (idx) => setCurrentIndex(Math.min(maxIndex, Math.max(0, idx)));

  return (
    <Layout>
      <Logo />
      <h2 className='text-white text-5xl font-semibold pt-1'>
        Selecão de serviços
      </h2>
      <User />
      {/* Carrossel: mostra um serviço por vez (alinhado com User/Logo) */}
      <div className='w-full flex flex-col items-start my-6'>
        <div className='w-full flex flex-row items-start'>
          <div className='w-full max-w-5xl mx-auto flex justify-start overflow-hidden' style={{ height: '14rem' }}>
            {/* Track com largura flex e translate para mostrar 3 itens */}
            <div 
              className='flex transition-transform duration-300 ease-in-out gap-4 h-full items-stretch'
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
              }}
            >
              {servicesList.map((service, index) => (
                <div key={index} className='flex-shrink-0 h-full' style={{ flexBasis: `${100 / visibleCount}%`, maxWidth: `${100 / visibleCount}%` }}>
                  <div className='flex justify-center items-stretch w-full h-full'>
                    <Box 
                      className='text-2xl w-full h-full'
                      IconComponent={service.icon}
                      label={service.label}
                      onClick={() => handleServiceSelection(service)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className='flex flex-row mt-4 space-x-2'>
          {servicesList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-3 w-3 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Ir para serviço ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='w-full max-w-5xl mx-auto flex justify-between'>
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