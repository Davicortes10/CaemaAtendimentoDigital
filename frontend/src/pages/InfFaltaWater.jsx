import React from "react";
import Layout from "../components/layout/Layout";
import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import { useState } from "react";

const InfFaltaWater = () => {
    const [mensagem, setMensagem] = useState("");

    const handleEnviar = () => {
    alert(`Mensagem enviada: ${mensagem}`);
  };
  return (
    <Layout>
        <Logo />
        <div className="mb-8">
        <label className="text-white text-lg font-medium mb-2 block">
          Digite sua mensagem:
        </label>
        <textarea
          className="w-sm p-2 rounded bg-white"
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          placeholder="Escreva sua mensagem aqui..."
          rows={4}
        />
      </div>
        <Button
            label={"Enviar Alerta!"}
            onClick={handleEnviar}
        />
    </Layout>
  )
}
export default InfFaltaWater;