import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { AtendimentoProvider } from './context/AtendimentoContext'; 

// Pages
import Atendimento from './pages/Atendimento';
import Entrada from "./pages/Entrada"; 
import Loading from "./pages/Loading"; 
import Endereco from "./pages/Endereco"; 
import Servicos from './pages/Servicos';
import Fatura from './pages/Fatura';
import AlterCad from './pages/AlterCad';
import InfFaltaWater from './pages/InfFaltaWater';
import Senha from './pages/Senha';

function App() {
  
  
  return (
    <BrowserRouter> 
       <AtendimentoProvider>
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

          {/* Rota 5: Tela de Fatura (A ser criada em breve) */}
          <Route path="/fatura" element={<Fatura />} />

          {/* Rota 6: Tela de edição de dados (A ser criada em breve) */}
          <Route path="/alterCad" element={<AlterCad/>} />

          {/* Rota 7: Tela de Alerta de falta de água (A ser criada em breve) */}
          <Route path="/infFaltaWater" element={<InfFaltaWater/>} />

          {/* Rota 8: Tela de Senha */}
          <Route path="/senha" element={<Senha/>} />

          {/* Fallback: Qualquer URL não mapeada volta para a Entrada */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AtendimentoProvider>
    </BrowserRouter>
  );
}

export default App;