import Faucet from "../assets/icons/faucet.svg";
import EditData from "../assets/icons/edit-data.svg";
import { LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { MdMonitor } from "react-icons/md";

export const Home = () => {

    const navigate = useNavigate();

    const handleEditData = (e) => {
        e.preventDefault(); 
        navigate('/EditData');
    };

    const handleReportWaterShortage = (e) => {
        e.preventDefault(); 
        navigate('/ReportWaterShortage');
    };

    const handlePasswordTracking = (e) => {
        e.preventDefault(); 
        navigate('/PasswordTracking');
    };

    const handleLogOut = () => {
        navigate('/'); 
    };

    return (
        <div className="flex flex-col w-full h-screen px-2 py-10 bg-[#014888] text-white">
            <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Olá, João Silva</h2> 
            <LogOut 
            onClick={handleLogOut}
            /></div>
            <p className="mt-4 text-[#B3E601] font-semibold">Opções de AutoAtendimento Mobile</p>
            <div className="flex flex-col items-center justify-center w-full mt-4 gap-4">
                <button
                    onClick={handleReportWaterShortage}
                    className="flex items-center justify-between rounded-md w-[90%] p-2 bg-white text-[#014888] font-semibold"
                >
                    Informar Falta de Água
                    <img 
                        src={Faucet} 
                        alt="Ícone de Torneira" 
                        className="w-10"
                        
                    />
                    
                </button>
                <button
                    onClick={handleEditData}
                    className="flex items-center justify-between rounded-md w-[90%] p-2 bg-white text-[#014888] font-semibold"
                >
                    Alterar Dados Cadastrais
                    <img 
                        src={EditData} 
                        alt="Ícone de Edição de Dados" 
                        className="w-10"
                       
                    /> 
                    
                </button>
                <button
                    onClick={handlePasswordTracking}
                    className="flex items-center justify-between rounded-md w-[90%] p-2 bg-white text-[#014888] font-semibold"
                >
                    Verficar Fila
                    <MdMonitor 
                        className="w-10 h-10 bg-sky-950]" 
                    />
                    
                </button>
            </div>
        </div>
    )
}