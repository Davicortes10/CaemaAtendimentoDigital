import React,{ lazy, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAtendimento } from "../context/AtendimentoContext";
import { fetchClienteData } from '../api/apiMock';
// Components
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';


const Loading = () => {
  const navigate = useNavigate(); 

  const { 
        documentoDoCliente,      
        setMatriculasDoCliente,
        setIsGrandeCliente
  } = useAtendimento();

  const isCPF = (valor) => valor && valor.length === 11;
  const isMatricula = (valor) => valor && valor.length >= 6 && valor.length <= 10;

  useEffect(() => {
        const documento = documentoDoCliente;
        
    if (!documento) {
            // Se não houver documento, volta para a tela inicial
            navigate('/');
            return;
    }
  const consultarDados = async () => {
            try {
                // 2. CHAMA A API 
                const dadosCliente = await fetchClienteData(documento); 
                const matriculas = dadosCliente.matrículas || [];
                
                // 3. SALVA A LISTA DE MATRÍCULAS NO CONTEXT
                setMatriculasDoCliente(dadosCliente.matrículas);
                
                // 4. DECISÃO DE FLUXO E NAVEGAÇÃO
                if (dadosCliente.matrículas.length === 0) {
                    // Sem matrículas: Tratar como erro (ex: navegar para uma tela de erro)
                    console.error("Nenhuma matrícula encontrada.");
                    navigate('/erro', { state: { mensagem: "Documento não encontrado no sistema." } });
                    
                }else if (matriculas.length === 1) {
                const matriculaUnica = matriculas[0];
                setIsGrandeCliente(matriculaUnica.isGrandeCliente); 

                navigate('/servicos'); 
                } else if (isCPF(documento)) {
                    // FLUXO CPF: Múltiplas matrículas. Vai para seleção de endereço.
                    navigate('/endereco'); 
                    
                } else if (isMatricula(documento)) {
                    // FLUXO MATRÍCULA: Vai direto para serviços (matrícula única).
                    const matriculaUnica = dadosCliente.matrículas[0];
                    setIsGrandeCliente(matriculaUnica.isGrandeCliente); 
                    
                    navigate('/servicos');
                }

            } catch (error) {
                console.error("Erro na comunicação com a API:", error);
                navigate('/erro', { state: { mensagem: "Erro ao consultar o sistema." } });
            }
        };

        // Usa um pequeno delay para que o usuário veja a tela de loading antes da consulta
        const timer = setTimeout(consultarDados, 500); 

        return () => clearTimeout(timer); // Limpa o timer na saída

  }, [navigate, documentoDoCliente, setMatriculasDoCliente, setIsGrandeCliente]); 
    
  return (
    <Layout>
      <Logo />
      <div className="animate-[spin_3s_linear_infinite]
                            rounded-full 
                            h-84 w-84
                            border-[20px]       /* Largura da borda/anel (20px) */
                          border-white     
                          border-t-lime-600
                          border-l-lime-600
                          pb-10
                          mt-10"
                          
                          
            ></div>
            <h2 className="text-white text-4xl pt-7">Validando seus dados...</h2>
            <h3 className="text-white">Buscando dados no sistema</h3>
    </Layout>
  );
};

export default Loading;