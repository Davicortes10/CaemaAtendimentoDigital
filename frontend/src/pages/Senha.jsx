import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtendimento } from '../context/AtendimentoContext'; 
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button'; 
import ButtonWhite from '../components/ui/ButtonWhite'; 
import { FaPrint, FaRegWindowClose } from 'react-icons/fa'; 
import { QRCodeCanvas } from 'qrcode.react'; // Biblioteca do QR Code

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

    // 🌐 URL para o QR Code
    const urlBase = "https://meusistema.com/senha"; // <-- altere para o domínio do seu sistema
    const urlQRCode = `${urlBase}/${numeroSenha}`;

    return (
        <Layout>
            <Logo />
            <h2 className='text-white text-4xl font-semibold mt-1 mb-6'>
                Sua senha foi gerada com sucesso!
            </h2>

            <div className='bg-white p-8 rounded-2xl shadow-2xl w-[500px] text-center'> 
                <p className='text-2xl text-gray-700'>
                    Sua senha de atendimento é:
                </p>

                <h1 className='text-6xl font-extrabold text-blue-900'>
                    {numeroSenha}
                </h1>

                {/* 🔵 QR CODE COM URL */}
                <div className="flex justify-center">
                    <QRCodeCanvas 
                        value={urlQRCode}
                        size={150}
                        bgColor="#ffffff"
                        fgColor="#1e3a8a"
                        level="H"
                        marginSize={2}
                    />
                </div>

                <p className="text-sm text-gray-500 mb-4">
                    Escaneie o QR Code para acessar sua senha online.
                </p>

                <div className='mt-6 text-xl text-gray-600 border-t'>
                    <p>Tipo: {tipoAtendimento || 'Normal'}</p>
                    <p>Motivo: {motivoAtendimento}</p>
                </div>
            </div>

            <div className="flex flex-row justify-between gap-3 w-[600px]">
                <ButtonWhite
                    label="Imprimir"
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
