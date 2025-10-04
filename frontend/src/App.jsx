import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

// Pages
import Entrada from "./pages/Entrada"; 
import Loading from "./pages/Loading"; 
import Endereco from "./pages/Endereco"; 
import Servicos from './pages/Servicos';
import Fatura from './pages/Fatura';

function App() {
  
  
  return (
    <BrowserRouter> 
      <Routes>
        
        {/* Rota 1: Página Inicial / Entrada (Caminho base) */}
        <Route path="/" element={<Entrada />} />
        
        {/* Rota 2: Tela de Loading (Destino do botão 'Avançar') */}
        <Route path="/loading" element={<Loading />} />
        
        {/* Rota 3: Tela de Seleção de Endereços (Destino do timeout do Loading) */}
        <Route path="/endereco" element={<Endereco />} />
        
        {/* Rota 4: Tela de Serviços (A ser criada em breve) */}
        <Route path="/servicos" element={<Servicos />} /> 

        {/* Rota 5: Tela de Fatura (A ser criada em breve) */}
        <Route path="/fatura" element={<Fatura />} />

        {/* Fallback: Qualquer URL não mapeada volta para a Entrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;