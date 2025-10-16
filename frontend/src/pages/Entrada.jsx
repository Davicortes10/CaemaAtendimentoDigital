import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtendimento } from "../context/AtendimentoContext"; 

// Components
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ButtonEntry from "../components/ui/ButtonEntry";

const Entrada = () => {
  const [inputValue, setInputValue] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const { 
    tipoAtendimento, 
    setOrigemFluxo, 
    setServicoEscolhido 
  } = useAtendimento(); 

  const handleSubmit = (e) => {
        e.preventDefault();
        setErro('');
        if (inputValue.trim() === '') {
            setErro("Por favor, preencha sua Matrícula ou CPF.");
            return;
        }

        // Validação de Somente Números (Segurança final)
        if (!/^\d+$/.test(inputValue)) {
            setErro("O campo deve conter apenas números."); 
            return;
        }
        
        // Validação de Tamanho 
        if (inputValue.length < 11) {
            setErro("A Matrícula/CPF deve ter pelo menos 11 dígitos.");
            return;
        }
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
          <Button 
            label={"Avançar"}
            type="submit"
          />
          
        </form>
        <ButtonEntry
            label={"Não Possuo Matrícula"}
            onClick={handleSolicitarMatricula}
            type="button"
        />
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