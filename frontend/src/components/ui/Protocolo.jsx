import React from "react";

const Protocolo = () => {
    return (
        /* Removido w-full e px-12 para não vazar da div pai */
        <div className="flex flex-row justify-end">
            <div className="mb-4 px-4 py-2 bg-white bg-opacity-95 rounded-lg shadow-lg border-2 border-blue-300 min-w-[250px]">
                <h3 className="text-blue-900 text-lg font-bold mb-1 flex items-center gap-2">
                    <span>📋</span> Protocolo:
                </h3>
                <p className="text-blue-700 text-base font-mono bg-blue-50 p-2 rounded border text-center font-bold">
                    Variavel de protocolo aqui
                </p>
                <p className="text-blue-600 text-[10px] mt-1 text-center font-semibold">
                    Guarde este número
                </p>
            </div>
        </div>
    );
};

export default Protocolo;