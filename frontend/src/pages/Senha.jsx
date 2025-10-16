import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtendimento } from '../context/AtendimentoContext'; 
// Importar seus componentes
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Box from '../components/ui/Box'; // Usando o Box como solicitado
import Button from '../components/ui/Button'; 
import ButtonWhite from '../components/ui/ButtonWhite'; 

// Icons
import { FaPrint, FaRegWindowClose } from 'react-icons/fa'; 

const Senha = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { 
        tipoAtendimento, 
        servicoEscolhido, 
        limparSessao 
    } = useAtendimento(); 

    const numeroSenha = location.state?.numero || 'S-000';
    const motivoAtendimento = servicoEscolhido || "Serviço Presencial (Erro)";
    
    const handleImprimir = () => {
        console.log(`Ação: Imprimindo a senha ${numeroSenha}`);
        alert(`Imprimindo Senha: ${numeroSenha} \nMotivo: ${motivoAtendimento}`);
        handleFinalizar();
    };

    const handleFinalizar = () => {
        limparSessao(); 
        navigate('/');
    };

    return (
        <Layout>
            <Logo />
            <h2 className='text-white text-4xl font-semibold mt-1 mb-6'>
                Sua senha foi gerada com sucesso!
            </h2>
            <div className='bg-white p-8 rounded-2xl shadow-2xl w-[600px] text-center'> 
                
                <p className='text-2xl text-gray-700 mb-2'>
                    Sua senha de atendimento é:
                </p>
                <h1 className='text-8xl font-extrabold text-blue-900 mb-6'>
                    {numeroSenha}
                </h1>
                
                <div className='mt-6 text-xl text-gray-600 border-t pt-4'>
                    <p>
                        Tipo: {tipoAtendimento || 'Normal'}
                    </p>
                    <p>
                        Motivo: {motivoAtendimento}
                    </p>
                </div>
                
            </div>
            <div className="flex flex-col items-center gap-3 w-[600px]">
                <Button 
                    label="Imprimir Senha"
                    IconComponent={FaPrint}
                    onClick={handleImprimir}
                    className="w-full text-2xl py-3" 
                />
                <ButtonWhite
                    label="Finalizar Atendimento"
                    IconComponent={FaRegWindowClose}
                    onClick={handleFinalizar}
                    className="w-full text-2xl py-3" 
                />
            </div>
        </Layout>
    );
};

export default Senha;