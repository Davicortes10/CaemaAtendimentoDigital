import React,{ lazy, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// Components
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';


const Loading = () => {
  const navigate = useNavigate(); 
    useEffect(() => {
        const timer = setTimeout(() => {
            // Next page if executed with sucess
            navigate('/endereco'); 
        }, 3000);
        
        return () => clearTimeout(timer);
    // Navigate in array of dependencies
    }, [navigate]); 
  return (
    <Layout>
      <Logo />
      <div className="animate-[spin_3s_linear_infinite]
                            rounded-full 
                            h-58 w-58
                            border-[20px]       /* Largura da borda/anel (20px) */
                          border-white     
                          border-t-lime-600
                          border-l-lime-600
                          pb-10"
                          
                          
            ></div>
            <h2 className="text-white text-4xl pt-7">Validando seus dados...</h2>
            <h3 className="text-white">Buscando dados no sistema</h3>
    </Layout>
  );
};

export default Loading;