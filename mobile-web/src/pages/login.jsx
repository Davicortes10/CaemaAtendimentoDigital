import CaemaLogo from "../assets/logo-caema.svg";

export const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-[#014888]">
            <img 
                src={CaemaLogo} 
                alt="Logo Caema" 
                className="w-50"
            />
            <div className="flex flex-col items-center justify-center p-4 gap-4 w-[90%]">
                <h2 className="text-xl text-white font-bold">AutoAtendimento Mobile</h2>
                <input 
                    type="text" 
                    placeholder="Matrícula"
                    className="outline-none p-4 w-[90%] rounded-md bg-white text-2xl text-gray-500"
                />
                <input 
                    type="date" 
                    placeholder="Data de Nascimento"
                    className="outline-none p-4 w-[90%] rounded-md bg-white text-2xl text-gray-500"
                />
                <button
                    className="w-[90%] p-4 rounded-md bg-[#B3E601] cursor-pointer text-[#014888] font-bold"
                >
                    ENTRAR
                </button>
            </div>
        </div>
    )
}