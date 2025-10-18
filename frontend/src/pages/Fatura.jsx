import React, { useState, useEffect, useMemo } from "react";
import Logo from "../components/ui/Logo";

const CardFaturas = () => {
  const [protocolo, setProtocolo] = useState(null);
  // faturas de exemplo (datas recentes para demonstrar filtros Pago / Vencido)
  const [faturas] = useState([
    // Pago recente
    { mes: "Agosto", data: "05/08/2025", valor: 350.0, status: "Pago" },
    // Pendente (não vencida ainda)
    { mes: "Setembro", data: "15/09/2025", valor: 420.5, status: "Pendente" },
    // Não pago e com data anterior a hoje -> será considerado Vencido
    { mes: "Outubro", data: "01/10/2025", valor: 290.75, status: "Não pago" },
    // Pago dentro do período
    { mes: "Outubro", data: "10/10/2025", valor: 380.0, status: "Pago" },
    // Pendente recente
    { mes: "Outubro", data: "12/10/2025", valor: 510.25, status: "Pendente" },
  ]);

  // filtro de status: 'todos' | 'pago' | 'vencido'
  const [statusFilter, setStatusFilter] = useState("todos");

  // 💡 Recupera protocolo do localStorage
  useEffect(() => {
    const protocoloSalvo = localStorage.getItem("protocoloAtendimento");
    if (protocoloSalvo) {
      setProtocolo(protocoloSalvo);
    }
  }, []);

  const parseBRDate = (ddmmyyyy) => {
    // espera formato dd/mm/yyyy
    const parts = ddmmyyyy.split("/");
    if (parts.length !== 3) return null;
    const [d, m, y] = parts.map(Number);
    return new Date(y, m - 1, d);
  };

  const corStatus = (status) => {
    switch (status) {
      case "Pago":
        return "bg-green-100 text-green-700 border-green-400";
      case "Pendente":
        return "bg-yellow-100 text-yellow-700 border-yellow-400";
      case "Não pago":
      case "Vencido":
        return "bg-red-100 text-red-700 border-red-400";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  // calcula intervalo dos últimos 3 meses (inclui mês atual)
  const hoje = useMemo(() => new Date(), []);
  const dataInicioTresMeses = useMemo(() => {
    const d = new Date(hoje.getFullYear(), hoje.getMonth(), 1); // início do mês atual
    d.setMonth(d.getMonth() - 2); // volta 2 meses -> cobre 3 meses no total
    return d;
  }, [hoje]);

  // Lista filtrada: últimos 3 meses + filtro de status
  const faturasFiltradas = useMemo(() => {
    return faturas
      .map((f) => {
        const parsed = parseBRDate(f.data);
        const isOverdue = parsed ? parsed < new Date() && f.status !== "Pago" : false;
        const displayStatus = isOverdue && f.status !== "Pago" ? "Vencido" : f.status;
        return { ...f, parsedDate: parsed, isOverdue, displayStatus };
      })
      .filter((f) => {
        // filtra pelos últimos 3 meses
        if (!f.parsedDate) return false;
        if (f.parsedDate < dataInicioTresMeses) return false;
        if (f.parsedDate > new Date()) return false;

        // filtra pelo status
        if (statusFilter === "pago") return f.displayStatus === "Pago";
        if (statusFilter === "vencido") return f.displayStatus === "Vencido";
        return true; // todos
      })
      .sort((a, b) => b.parsedDate - a.parsedDate);
  }, [faturas, dataInicioTresMeses, statusFilter]);

  return (
    <div className="min-h-screen bg-blue-900 p-8">
      <Logo />
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Faturas Mensais
      </h1>

      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${statusFilter === "todos" ? "bg-white text-blue-900" : "bg-white/20 text-white"}`}
          onClick={() => setStatusFilter("todos")}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${statusFilter === "pago" ? "bg-white text-blue-900" : "bg-white/20 text-white"}`}
          onClick={() => setStatusFilter("pago")}
        >
          Pago
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${statusFilter === "vencido" ? "bg-white text-blue-900" : "bg-white/20 text-white"}`}
          onClick={() => setStatusFilter("vencido")}
        >
          Vencido
        </button>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 px-2 min-w-max justify-center">
          {faturasFiltradas.length === 0 && (
            <div className="text-white">Nenhuma fatura encontrada nos últimos 3 meses com este filtro.</div>
          )}
          {faturasFiltradas.map((fatura, index) => (
            <div
              key={index}
              className="min-w-[260px] bg-white shadow-lg rounded-2xl p-5 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-lg font-semibold text-blue-700 mb-2">
                {fatura.mes} / {fatura.parsedDate ? fatura.parsedDate.getFullYear() : "2025"}
              </div>
              <div className="text-gray-600 mb-1">
                <strong>Data:</strong> {fatura.data}
              </div>
              <div className="text-gray-800 text-xl font-bold mb-2">
                R$ {fatura.valor.toFixed(2)}
              </div>
              <div
                className={`inline-block px-3 py-1 rounded-full border text-sm font-semibold ${corStatus(
                  fatura.displayStatus
                )}`}
              >
                {fatura.displayStatus}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-blue-200 mt-6">Role para o lado para ver as faturas dos outros meses →</p>

      {protocolo && (
        <div className="fixed bottom-4 right-4 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg max-w-xs border-2 border-blue-300">
          <h3 className="text-blue-900 text-lg font-bold mb-2">📋 Protocolo:</h3>
          <p className="text-blue-700 text-base font-mono bg-blue-50 p-2 rounded border text-center font-bold">{protocolo}</p>
        </div>
      )}
    </div>
  );
};

export default CardFaturas;
