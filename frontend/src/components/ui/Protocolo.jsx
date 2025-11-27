

import React from "react";

const Protocolo = ({}) => {
    return (
        <div className="w-full flex flex-row justify-end-safe px-12">
            <div className=" mb-4 my-2 px-4 bg-white bg-opacity-95 rounded-lg shadow-lg w-1/6 h-30 border-2 border-blue-300">
                <h3 className="text-blue-900 text-lg font-bold mb-2">📋 Protocolo:</h3>
                <p className="text-blue-700 text-base font-mono bg-blue-50 p-2 rounded border text-center font-bold">
                    Variavel de protocolo aqui
                </p>
                <p className="text-blue-600 text-xs mt-2 text-center">
                    Guarde este número
                </p>
            </div>
        </div>
    );
};

export default Protocolo;