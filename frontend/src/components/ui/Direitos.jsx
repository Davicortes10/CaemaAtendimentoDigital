import React from "react";

const Direitos = () => {
  return (
    <div className="w-full flex flex-row justify-between items-end px-2 pb-1">
      
      {/* Lado Esquerdo: Créditos e Brisa */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-xl tracking-widest">BRISA</span>
          <div className="h-4 w-[2px] bg-blue-300"></div>
          <p className="text-white text-sm font-medium">
            Desenvolvido por <span className="font-bold italic">Carlos Ronyhelton - Davi Cortês - Felipe Barbosa - Gustavo Rocha - Kawann Conceição - Sergio Frazão</span>
          </p>
        </div>
        <p className="text-white text-[10px] uppercase tracking-taller">
          © 2026 Todos os direitos reservados
        </p>
      </div>
    </div>
  );
};

export default Direitos;