import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

// Pages
import Atendimento from './pages/Atendimento';
import Entrada from "./pages/Entrada"; 
import Loading from "./pages/Loading"; 
import Endereco from "./pages/Endereco"; 
import Servicos from './pages/Servicos';

function App() {
  
  
  return (
    <BrowserRouter> 
      <Routes>
        {/*Rota 1: Pagina Inicial / Atendimento(Caminho base)*/}
        <Route path="/" element={<Atendimento />} />

        {/* Rota 2: Página de Login / Entrada*/}
        <Route path="/entrada" element={<Entrada />} />
        
        {/* Rota 3: Tela de Loading (Destino do botão 'Avançar') */}
        <Route path="/loading" element={<Loading />} />
        
        {/* Rota 4: Tela de Seleção de Endereços (Destino do timeout do Loading) */}
        <Route path="/endereco" element={<Endereco />} />
        
        {/* Rota 5: Tela de Serviços (A ser criada em breve) */}
        <Route path="/servicos" element={<Servicos />} /> 
        
        {/* Fallback: Qualquer URL não mapeada volta para a Entrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;