import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Box from '../components/ui/Box';
import ButtonWhite from '../components/ui/ButtonWhite';

import { FaHome } from "react-icons/fa"; 
import {FaRightToBracket} from "react-icons/fa6";


// Simulação da lista que virá da API
const enderecosMock = [
    { id: 1, matricula: "12345678", endereco: "Rua Onze, 17, São Raimundo" },
    { id: 2, matricula: "98765432", endereco: "Av. Principal, 789, Cohab" },
    { id: 3, matricula: "11223344", endereco: "Travessa Minerva, 10, Coroado" },
];

const Endereco = () => {
  const navigate = useNavigate();
    // 💡 Dados Receiver
    const [enderecos, setEnderecos] = useState([]);
    const [loading, setLoading] = useState(true);

    // 💡 Api Simulação
    useEffect(() => {
        setEnderecos(enderecosMock); 
        setLoading(false);
    }, []);

    const handleSelectAddress = (id) => {
        console.log(`Endereço ${id} selecionado.`);
        navigate('/servicos'); 
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
        Selecione um Endereco para atendimento
      </h2>
      <div className='flex flex-row w-full justify-between px-64 mt-4 opacity-60'>
        <h3 className='text-white text-2xl font-semibold'>
          Olá, Wesley Morais
        </h3>
      </div>
      <div className='flex flex-row w-full justify-between px-64'>
        {enderecos.map((item) => (
            <Box 
              key={item.id}
              IconComponent={FaHome}
              className = "w-80 text-xl"
              label={`${item.endereco} | Matrícula: ${item.matricula}`}
              onClick={() => handleSelectAddress(item.id)}/>
          ))}
      </div>
      <div className='flex flex-row w-full justify-end px-64'>
        <ButtonWhite
            IconComponent={FaRightToBracket}
            className = "w-80"
            label={"Sair"}
            onClick={handleSair}
        />
      </div>
    </Layout>
  );
};

export default Endereco;