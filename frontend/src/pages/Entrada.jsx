import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtendimento } from "../context/AtendimentoContext"; 
import { fetchClienteData } from '../api/apiMock';

// Components
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ButtonEntry from "../components/ui/ButtonEntry";

const Entrada = () => {
  const [inputValue, setInputValue] = useState('');
  const [erro, setErro] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { 
    tipoAtendimento, 
    setOrigemFluxo, 
    setServicoEscolhido, 
    setDocumentoDoCliente
  } = useAtendimento(); 

  const isCPF = (valor) => valor.length === 11;
  const isMatricula = (valor) => valor.length >= 6 && valor.length <= 10;

  const handleSubmit = (e) => {
        e.preventDefault();
        setErro('');

        const valorLimpo = inputValue.replace(/\D/g, '');

        if (valorLimpo.length === 0) {
            setErro("Por favor, preencha sua Matrícula ou CPF.");
            return;
        }

        // Validação de Somente Números (Segurança final)
        if (!/^\d+$/.test(valorLimpo)) {
            setErro("O campo deve conter apenas números."); 
            return;
        }
        
        // Validação de Tamanho 
        if (!isCPF(valorLimpo) && !isMatricula(valorLimpo)) {
            setErro("Documento inválido. Use 6-10 dígitos para Matrícula ou 11 para CPF.");
            return;
        }
        //Salva no Context
        setDocumentoDoCliente(valorLimpo)
        setOrigemFluxo('Matricula/CPF Válido');
        // Navigate to Loading page
        navigate('/loading'); 
  };

  const handleSolicitarMatricula = () => {
        setOrigemFluxo('Solicitar Matrícula');
        setServicoEscolhido('Nova Matrícula/Cadastro Presencial');
        const tipoLetra = tipoAtendimento === 'Preferencial' ? 'P' : 'N';

        // Gerar número de senha aleatório (Exemplo simples) - API
        const numeroSenha = tipoLetra + Math.floor(Math.random() * 900) + 100;
        
        const dadosParaSenha = {
            numero: numeroSenha,
        };
        navigate('/senha', { state: dadosParaSenha });
  };

  return (
    <Layout>
      <Logo />
      <h2 className="text-white text-5xl font-semibold pt-1 pb-7">
          Digite sua Matricula ou CPF!
        </h2>

        <form 
          onSubmit={handleSubmit}
          className="w-2xl"> 
          <Input 
            label="Matrícula ou CPF:"
            placeholder= "Ex: 12345678"
            value = {inputValue}
            onChange = {(e) => setInputValue(e.target.value)}
            isNumeric={true} 
          />
          <div className="w-80 mx-auto mt-2">
            <Button 
              label={"Avançar"}
              type="submit"
            />
          </div>
          
        </form>
        {/* Card específico para 'Não Possuo Matrícula' com tamanho padronizado */}
  <div className="w-80 mx-auto mt-4">
          <div className="w-80 mt-2">
              <ButtonEntry
                label={"Não Possuo Matrícula"}
                onClick={handleSolicitarMatricula}
                type="button"
              />
          </div>
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

export default Entrada;