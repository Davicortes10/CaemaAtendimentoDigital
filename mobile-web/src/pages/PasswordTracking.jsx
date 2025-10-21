import { Ticket, Clock, CheckCircle, XCircle, Users, Volume2, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export const PasswordTracking = () => {
    const [currentPassword, setCurrentPassword] = useState("A045");
    const [myPassword, setMyPassword] = useState("A052");
    const [estimatedTime, setEstimatedTime] = useState("15 min");
    const [position, setPosition] = useState(7);
    
    const [calledPasswords, setCalledPasswords] = useState([
        { id: 1, password: "A045", time: "14:35", status: "em-atendimento", guiche: 3 },
        { id: 2, password: "A044", time: "14:32", status: "concluido", guiche: 2 },
        { id: 3, password: "A043", time: "14:29", status: "concluido", guiche: 1 },
        { id: 4, password: "A042", time: "14:26", status: "concluido", guiche: 3 },
        { id: 5, password: "A041", time: "14:23", status: "concluido", guiche: 2 },
    ]);

    const [history, setHistory] = useState([
        { password: "A040", time: "14:20", guiche: 1 },
        { password: "A039", time: "14:17", guiche: 2 },
        { password: "A038", time: "14:14", guiche: 3 },
        { password: "A037", time: "14:11", guiche: 1 },
        { password: "A036", time: "14:08", guiche: 2 },
        { password: "A035", time: "14:05", guiche: 3 },
        { password: "A034", time: "14:02", guiche: 1 },
        { password: "A033", time: "13:59", guiche: 2 },
    ]);

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    const getStatusColor = (status) => {
        switch(status) {
            case "em-atendimento":
                return "bg-blue-100 text-blue-800 border-blue-300";
            case "concluido":
                return "bg-green-100 text-green-800 border-green-300";
            case "cancelado":
                return "bg-red-100 text-red-800 border-red-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case "em-atendimento":
                return <Clock className="w-4 h-4" />;
            case "concluido":
                return <CheckCircle className="w-4 h-4" />;
            case "cancelado":
                return <XCircle className="w-4 h-4" />;
            default:
                return null;
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case "em-atendimento":
                return "Em Atendimento";
            case "concluido":
                return "Concluído";
            case "cancelado":
                return "Cancelado";
            default:
                return "";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-6">
            <div className="bg-[#014888] text-white sticky top-0 z-10 shadow-lg">
                <div className="px-4 py-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <Ticket className="w-7 h-7" />
                            <h1 className="text-2xl font-bold">Acompanhar Senha</h1>
                        </div>
                        <button
                            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                            className={`p-2 rounded-full transition-colors ${
                                notificationsEnabled 
                                    ? 'bg-yellow-400 text-gray-900' 
                                    : 'bg-blue-700 text-white'
                            }`}
                        >
                            <Bell className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-blue-100 text-sm">
                        Acompanhe sua senha em tempo real
                    </p>
                </div>

                <div className="bg-white text-gray-900 px-4 py-6 border-t-4 border-yellow-400">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600">SENHA ATUAL</span>
                        <Volume2 className="w-5 h-5 text-[#014888] animate-pulse" />
                    </div>
                    <div className="text-5xl font-bold text-[#014888] text-center my-2">
                        {currentPassword}
                    </div>
                    <div className="text-center text-sm text-gray-600">
                        Guichê 3
                    </div>
                </div>
            </div>

            <div className="px-4 mt-6 space-y-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <Ticket className="w-6 h-6" />
                        <h2 className="text-lg font-bold">Minha Senha</h2>
                    </div>
                    
                    <div className="bg-white text-gray-900 rounded-xl p-4 mb-4">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#014888] mb-1">
                                {myPassword}
                            </div>
                            <div className="text-sm text-gray-600">
                                Sua senha
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-400/30 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Users className="w-4 h-4" />
                                <span className="text-xs font-medium">Posição</span>
                            </div>
                            <div className="text-2xl font-bold">{position}º</div>
                        </div>
                        
                        <div className="bg-blue-400/30 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4" />
                                <span className="text-xs font-medium">Tempo Estimado</span>
                            </div>
                            <div className="text-2xl font-bold">{estimatedTime}</div>
                        </div>
                    </div>

                    <div className="mt-4 bg-blue-400/20 rounded-lg p-3 text-center text-sm">
                        <p className="font-medium">Fique atento!</p>
                        <p className="text-xs mt-1 text-blue-100">
                            Sua senha será chamada em breve
                        </p>
                    </div>
                </div>

                <section className="bg-white rounded-2xl shadow-lg p-5">
                    <h2 className="text-lg font-bold text-[#014888] mb-4 flex items-center gap-2">
                        <Volume2 className="w-5 h-5" />
                        Senhas Chamadas
                    </h2>
                    
                    <div className="space-y-3">
                        {calledPasswords.map((item) => (
                            <div 
                                key={item.id}
                                className={`border-2 rounded-xl p-4 transition-all ${
                                    item.status === "em-atendimento" 
                                        ? "border-blue-400 bg-blue-50 shadow-md" 
                                        : "border-gray-200 bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl font-bold text-[#014888]">
                                            {item.password}
                                        </div>
                                        {item.status === "em-atendimento" && (
                                            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                                AGORA
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-gray-700">
                                            Guichê {item.guiche}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {item.time}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(item.status)}`}>
                                    {getStatusIcon(item.status)}
                                    {getStatusText(item.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white rounded-2xl shadow-lg p-5">
                    <h2 className="text-lg font-bold text-[#014888] mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Histórico de Atendimentos
                    </h2>
                    
                    <div className="space-y-2">
                        {history.map((item, index) => (
                            <div 
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-200 text-gray-700 font-bold text-sm px-3 py-1 rounded-md">
                                        {item.password}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {item.time}
                                    </div>
                                </div>
                                
                                <div className="bg-[#014888] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    Guichê {item.guiche}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-4 py-3 text-[#014888] font-semibold text-sm border-2 border-[#014888] rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors">
                        Ver Mais Senhas
                    </button>
                </section>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4">
                    <div className="flex gap-3">
                        <Bell className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-amber-800 mb-1">
                                Dicas Importantes
                            </p>
                            <ul className="text-xs text-amber-700 space-y-1">
                                <li>• Fique próximo ao local de atendimento</li>
                                <li>• Ative as notificações para ser avisado</li>
                                <li>• Tenha seus documentos em mãos</li>
                                <li>• Caso perca sua vez, retire nova senha</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <button className="w-full bg-red-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-red-600 active:bg-red-700 transition-colors shadow-lg flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Cancelar Minha Senha
                </button>
            </div>
        </div>
    );
};