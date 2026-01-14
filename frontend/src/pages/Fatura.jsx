import React, { useState, useMemo, useRef } from "react";
import Layout from "../components/layout/Layout";
import Logo from "../components/ui/Logo";
import Protocolo from "../components/ui/Protocolo";
import Direitos from "../components/ui/Direitos";

const CardFaturas = () => {
  const [statusFilter, setStatusFilter] = useState("todos");
  const containerRef = useRef(null);

  const [faturas] = useState([
    { mes: "Agosto", data: "05/08/2025", valor: 350.0, status: "Pago" },
    { mes: "Setembro", data: "15/09/2025", valor: 420.5, status: "Pendente" },
    { mes: "Outubro", data: "01/10/2025", valor: 290.75, status: "Não pago" },
    { mes: "Outubro", data: "10/10/2025", valor: 380.0, status: "Pago" },
    { mes: "Novembro", data: "12/11/2025", valor: 510.25, status: "Pendente" },
  ]);

  const parseBRDate = (ddmmyyyy) => {
    const parts = ddmmyyyy.split("/");
    if (parts.length !== 3) return null;
    const [d, m, y] = parts.map(Number);
    return new Date(y, m - 1, d);
  };

  const corStatus = (status) => {
    switch (status) {
      case "Pago": return "bg-green-100 text-green-700 border-green-400";
      case "Pendente": return "bg-yellow-100 text-yellow-700 border-yellow-400";
      case "Vencido": return "bg-red-100 text-red-700 border-red-400";
      default: return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  const hoje = useMemo(() => new Date(), []);

  const faturasFiltradas = useMemo(() => {
    return faturas
      .map((f) => {
        const parsed = parseBRDate(f.data);
        const isOverdue = parsed ? parsed < hoje && f.status !== "Pago" : false;
        const displayStatus = isOverdue ? "Vencido" : f.status;
        return { ...f, parsedDate: parsed, displayStatus };
      })
      .filter((f) => {
        if (statusFilter === "pago") return f.displayStatus === "Pago";
        if (statusFilter === "vencido") return f.displayStatus === "Vencido";
        return true;
      })
      .sort((a, b) => b.parsedDate - a.parsedDate);
  }, [faturas, statusFilter, hoje]);

  return (
    <Layout>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Cabeçalho com Botão Voltar Absoluto para não deslocar o Logo */}
      <div className="w-full relative">
        <button 
          onClick={() => window.history.back()} // Ou use navigation do react-router
          className="absolute left-30 top-12 bg-white hover:bg-white text-blue-900 hover:text-blue-900 px-8 py-3 rounded-xl border border-white/30 transition-all font-bold text-xl flex items-center gap-3 shadow-lg"
        >
          <span className="text-2xl">←</span> Voltar
        </button>
        <Logo />
      </div>

      <div className="flex-1 flex flex-col items-center justify-between w-full px-20 overflow-hidden">
        
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-md">Faturas Mensais</h1>
          
          <div className="flex gap-4 mb-8">
            {["todos", "pago", "vencido"].map((filter) => (
              <button
                key={filter}
                className={`px-10 py-3 rounded-xl text-2xl font-bold transition-all ${
                  statusFilter === filter 
                  ? "bg-white text-blue-900 shadow-xl scale-105" 
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
                onClick={() => setStatusFilter(filter)}
              >
                {filter.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full relative h-[380px] flex items-center">
          <div
            ref={containerRef}
            className="flex gap-8 overflow-x-auto no-scrollbar w-full px-10 py-4"
            style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
          >
            {faturasFiltradas.length === 0 ? (
              <div className="w-full text-center text-white text-3xl italic opacity-50">
                Nenhuma fatura encontrada.
              </div>
            ) : (
              faturasFiltradas.map((fatura, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[420px] h-[320px] bg-white shadow-2xl rounded-[2.5rem] p-10 border border-gray-100 flex flex-col justify-between"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <div className="text-2xl font-bold text-blue-800 uppercase tracking-tighter">
                    {fatura.mes} / {fatura.parsedDate?.getFullYear()}
                  </div>
                  <div>
                    <div className="text-gray-500 text-xl mb-1">Vencimento: {fatura.data}</div>
                    <div className="text-blue-950 text-5xl font-black">
                      <span className="text-2xl mr-1">R$</span>
                      {fatura.valor.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                  <div className={`text-center py-3 rounded-xl border-2 text-xl font-bold ${corStatus(fatura.displayStatus)}`}>
                    {fatura.displayStatus}
                  </div>
                </div>
              ))
            )}
          </div>

          {faturasFiltradas.length > 2 && (
            <>
              <button 
                onClick={() => containerRef.current.scrollBy({ left: -450, behavior: 'smooth' })}
                className="absolute -left-5 z-10 bg-white/20 hover:bg-white text-white hover:text-blue-900 w-16 h-16 rounded-full text-3xl flex items-center justify-center transition-all border border-white/30 shadow-lg"
              >
                ◀
              </button>
              <button 
                onClick={() => containerRef.current.scrollBy({ left: 450, behavior: 'smooth' })}
                className="absolute -right-5 z-10 bg-white/20 hover:bg-white text-white hover:text-blue-900 w-16 h-16 rounded-full text-3xl flex items-center justify-center transition-all border border-white/30 shadow-lg"
              >
                ▶
              </button>
            </>
          )}
        </div>
        
        <p className="text-white/40 text-xl mt-4 animate-pulse">
          Deslize para ver mais faturas →
        </p>
      </div>

      <div className="w-full flex flex-row justify-between items-end px-16 pb-4">
        <Direitos />
        <Protocolo />
      </div>
    </Layout>
  );
};

export default CardFaturas;