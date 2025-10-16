import React, { useState, useEffect } from "react";
import Logo from "../components/ui/Logo";

const CardFaturas = () => {
  const [protocolo, setProtocolo] = useState(null);
  const [faturas] = useState([
    {
      mes: "Janeiro",
      data: "10/01/2025",
      valor: 350.0,
      status: "Pago",
    },
    {
      mes: "Fevereiro",
      data: "10/02/2025",
      valor: 420.5,
      status: "Pendente",
    },
    {
      mes: "Março",
      data: "10/03/2025",
      valor: 290.75,
      status: "Não pago",
    },
    {
      mes: "Abril",
      data: "10/04/2025",
      valor: 380.0,
      status: "Pago",
    },
    {
      mes: "Maio",
      data: "10/05/2025",
      valor: 510.25,
      status: "Pendente",
    },
  ]);

  // 💡 Recupera protocolo do localStorage
  useEffect(() => {
    const protocoloSalvo = localStorage.getItem('protocoloAtendimento');
    if (protocoloSalvo) {
      setProtocolo(protocoloSalvo);
    }
  }, []);

  const corStatus = (status) => {
    switch (status) {
      case "Pago":
        return "bg-green-100 text-green-700 border-green-400";
      case "Pendente":
        return "bg-yellow-100 text-yellow-700 border-yellow-400";
      case "Não pago":
        return "bg-red-100 text-red-700 border-red-400";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 p-8">
      <Logo />
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Faturas Mensais
      </h1>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 px-2 min-w-max justify-center">
          {faturas.map((fatura, index) => (
            <div
              key={index}
              className="min-w-[260px] bg-white shadow-lg rounded-2xl p-5 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-lg font-semibold text-blue-700 mb-2">
                {fatura.mes} / 2025
              </div>
              <div className="text-gray-600 mb-1">
                <strong>Data:</strong> {fatura.data}
              </div>
              <div className="text-gray-800 text-xl font-bold mb-2">
                R$ {fatura.valor.toFixed(2)}
              </div>
              <div
                className={`inline-block px-3 py-1 rounded-full border text-sm font-semibold ${corStatus(
                  fatura.status
                )}`}
              >
                {fatura.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-blue-200 mt-6">
        Role para o lado para ver as faturas dos outros meses →
      </p>
      
      {protocolo && (
        <div className="fixed bottom-4 right-4 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg max-w-xs border-2 border-blue-300">
          <h3 className="text-blue-900 text-lg font-bold mb-2">📋 Protocolo:</h3>
          <p className="text-blue-700 text-base font-mono bg-blue-50 p-2 rounded border text-center font-bold">
            {protocolo}
          </p>
        </div>
      )}
    </div>
  );
};

export default CardFaturas;
