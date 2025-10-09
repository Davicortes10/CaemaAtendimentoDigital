import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Fatura = () => {
  const [dados, setDados] = useState({
    cliente: "Sérgio Murilo Frazão",
    endereco: "Rua das Flores, 123 - Centro, São Paulo/SP",
    servico: "Manutenção de Sistema Abastecimento de Água",
    data: "06/10/2025",
    itens: [
      { descricao: "Troca de chave", quantidade: 2, valor: 80 },
      { descricao: "Instalação de torneira", quantidade: 5, valor: 25 },
      { descricao: "Mão de obra", quantidade: 1, valor: 150 },
    ],
  });

  const faturaRef = useRef();

  // Atualiza campos do formulário
  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  // Atualiza itens
  const handleItemChange = (index, campo, valor) => {
    const novosItens = [...dados.itens];
    novosItens[index][campo] = valor;
    setDados({ ...dados, itens: novosItens });
  };

  // Adiciona novo item
  const adicionarItem = () => {
    setDados({
      ...dados,
      itens: [...dados.itens, { descricao: "", quantidade: 1, valor: 0 }],
    });
  };

  // Remove item
  const removerItem = (index) => {
    const novosItens = dados.itens.filter((_, i) => i !== index);
    setDados({ ...dados, itens: novosItens });
  };

  const valorTotal = dados.itens.reduce(
    (acc, item) => acc + item.quantidade * item.valor,
    0
  );

  // Gera PDF da fatura
  const gerarPDF = async () => {
    const element = faturaRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`Fatura_${dados.cliente}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Sistema de Fatura Interativo
      </h1>

      {/* Formulário de Edição */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Dados da Fatura
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            name="cliente"
            value={dados.cliente}
            onChange={handleChange}
            className="border rounded-lg p-2"
            placeholder="Cliente"
          />
          <input
            name="data"
            value={dados.data}
            onChange={handleChange}
            className="border rounded-lg p-2"
            placeholder="Data"
          />
          <input
            name="servico"
            value={dados.servico}
            onChange={handleChange}
            className="border rounded-lg p-2 col-span-2"
            placeholder="Serviço"
          />
          <input
            name="endereco"
            value={dados.endereco}
            onChange={handleChange}
            className="border rounded-lg p-2 col-span-2"
            placeholder="Endereço"
          />
        </div>

        <h2 className="text-lg font-semibold mb-2 text-blue-600">
          Itens da Fatura
        </h2>

        {dados.itens.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-2 mb-2 items-center border-b pb-2"
          >
            <input
              value={item.descricao}
              onChange={(e) =>
                handleItemChange(index, "descricao", e.target.value)
              }
              className="border rounded-lg p-2 col-span-2"
              placeholder="Descrição"
            />
            <input
              type="number"
              value={item.quantidade}
              onChange={(e) =>
                handleItemChange(index, "quantidade", parseInt(e.target.value))
              }
              className="border rounded-lg p-2 text-center"
              placeholder="Qtd"
            />
            <input
              type="number"
              value={item.valor}
              onChange={(e) =>
                handleItemChange(index, "valor", parseFloat(e.target.value))
              }
              className="border rounded-lg p-2 text-right"
              placeholder="Valor"
            />
            <button
              onClick={() => removerItem(index)}
              className="text-red-600 hover:text-red-800 text-sm col-span-4 text-right"
            >
              Remover
            </button>
          </div>
        ))}

        <button
          onClick={adicionarItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3 hover:bg-blue-600"
        >
          + Adicionar Item
        </button>
      </div>

      {/* Fatura para Impressão */}
      <div
        ref={faturaRef}
        className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Fatura de Serviço
        </h2>

        <p>
          <strong>Cliente:</strong> {dados.cliente}
        </p>
        <p>
          <strong>Endereço:</strong> {dados.endereco}
        </p>
        <p>
          <strong>Serviço:</strong> {dados.servico}
        </p>
        <p className="mb-4">
          <strong>Data:</strong> {dados.data}
        </p>

        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Descrição</th>
              <th className="border border-gray-300 p-2 text-center">Qtd</th>
              <th className="border border-gray-300 p-2 text-right">
                Valor (R$)
              </th>
              <th className="border border-gray-300 p-2 text-right">
                Total (R$)
              </th>
            </tr>
          </thead>
          <tbody>
            {dados.itens.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{item.descricao}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.quantidade}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {item.valor.toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {(item.quantidade * item.valor).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end text-xl font-semibold text-blue-700">
          Total: R$ {valorTotal.toFixed(2)}
        </div>

        <div className="text-center mt-6 text-gray-600">
          <p>Obrigado pela preferência!</p>
          <p>Contato: (11) 99999-9999 | email@empresa.com</p>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={gerarPDF}
          className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700"
        >
          📄 Gerar PDF da Fatura
        </button>
      </div>
    </div>
  );
};

export default Fatura;
