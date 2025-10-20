import { Droplet, MapPin, Clock, AlertCircle, Send } from "lucide-react";
import { useState } from "react";

export const ReportWaterShortage = () => {
    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        email: "",
        endereco: "",
        numero: "",
        bairro: "",
        cidade: "",
        cep: "",
        dataInicio: "",
        horaInicio: "",
        tipoProblema: "",
        descricao: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados do formulário:", formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-6">
            <div className="max-w-lg mx-auto">
                <div className="bg-[#014888] text-white rounded-t-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <Droplet className="w-8 h-8" />
                        <h1 className="text-2xl font-bold">Falta d'Água</h1>
                    </div>
                    <p className="text-blue-100 text-sm">
                        Reporte a falta de abastecimento em sua região
                    </p>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
                    <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-amber-800 font-medium">
                                Importante
                            </p>
                            <p className="text-sm text-amber-700 mt-1">
                                Preencha todos os campos para agilizar o atendimento. 
                                Tempo médio de resposta: 24-48 horas.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl shadow-lg p-6 space-y-6">

                    <section>
                        <h2 className="flex items-center gap-2 text-[#014888] font-semibold text-lg mb-4 pb-2 border-b-2 border-blue-100">
                            <MapPin className="w-5 h-5" />
                            <span>Localização da Falta</span>
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <label 
                                    htmlFor="cep" 
                                    className="text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    CEP <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="cep"
                                    name="cep"
                                    value={formData.cep}
                                    onChange={handleChange}
                                    placeholder="00000-000" 
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                             focus:border-transparent transition-all text-gray-800
                                             placeholder:text-gray-400"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label 
                                    htmlFor="endereco" 
                                    className="text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Endereço <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="endereco"
                                    name="endereco"
                                    value={formData.endereco}
                                    onChange={handleChange}
                                    placeholder="Rua, Avenida..." 
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                             focus:border-transparent transition-all text-gray-800
                                             placeholder:text-gray-400"
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="flex flex-col flex-1">
                                    <label 
                                        htmlFor="numero" 
                                        className="text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Número <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="numero"
                                        name="numero"
                                        value={formData.numero}
                                        onChange={handleChange}
                                        placeholder="123" 
                                        required
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                                 focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                                 focus:border-transparent transition-all text-gray-800
                                                 placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="flex flex-col flex-[2]">
                                    <label 
                                        htmlFor="bairro" 
                                        className="text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Bairro <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="bairro"
                                        name="bairro"
                                        value={formData.bairro}
                                        onChange={handleChange}
                                        placeholder="Nome do bairro" 
                                        required
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                                 focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                                 focus:border-transparent transition-all text-gray-800
                                                 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label 
                                    htmlFor="cidade" 
                                    className="text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Cidade <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="cidade"
                                    name="cidade"
                                    value={formData.cidade}
                                    onChange={handleChange}
                                    placeholder="Nome da cidade" 
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                             focus:border-transparent transition-all text-gray-800
                                             placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 text-[#014888] font-semibold text-lg mb-4 pb-2 border-b-2 border-blue-100">
                            <Clock className="w-5 h-5" />
                            <span>Detalhes da Ocorrência</span>
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <label 
                                    htmlFor="tipoProblema" 
                                    className="text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Tipo de Problema <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    id="tipoProblema"
                                    name="tipoProblema"
                                    value={formData.tipoProblema}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                             focus:border-transparent transition-all bg-white
                                             text-gray-800"
                                >
                                    <option value="">Selecione o tipo de problema</option>
                                    <option value="falta-total">Falta Total de Água</option>
                                    <option value="pressao-baixa">Pressão Baixa</option>
                                    <option value="agua-suja">Água Suja/Turva</option>
                                    <option value="vazamento">Vazamento na Rua</option>
                                    <option value="intermitente">Abastecimento Intermitente</option>
                                </select>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex flex-col flex-1">
                                    <label 
                                        htmlFor="dataInicio" 
                                        className="text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Data de Início <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="date" 
                                        id="dataInicio"
                                        name="dataInicio"
                                        value={formData.dataInicio}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                                 focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                                 focus:border-transparent transition-all text-gray-800"
                                    />
                                </div>

                                <div className="flex flex-col flex-1">
                                    <label 
                                        htmlFor="horaInicio" 
                                        className="text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Hora Aproximada
                                    </label>
                                    <input 
                                        type="time" 
                                        id="horaInicio"
                                        name="horaInicio"
                                        value={formData.horaInicio}
                                        onChange={handleChange}
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                                 focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                                 focus:border-transparent transition-all text-gray-800"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label 
                                    htmlFor="descricao" 
                                    className="text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Descrição Detalhada
                                </label>
                                <textarea 
                                    id="descricao"
                                    name="descricao"
                                    value={formData.descricao}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Forneça detalhes adicionais sobre o problema (opcional)"
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                             focus:border-transparent transition-all resize-none
                                             text-gray-800 placeholder:text-gray-400"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Máximo 500 caracteres
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col gap-3 pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-[#014888] text-white font-semibold py-4 px-6 
                                     rounded-lg hover:bg-[#013366] active:bg-[#012244] 
                                     transition-colors duration-200 focus:outline-none 
                                     focus:ring-4 focus:ring-blue-300 shadow-md
                                     flex items-center justify-center gap-2"
                        >
                            <Send className="w-5 h-5" />
                            Enviar Solicitação
                        </button>

                        <button 
                            type="button"
                            onClick={() => setFormData({
                                nome: "",
                                telefone: "",
                                email: "",
                                endereco: "",
                                numero: "",
                                bairro: "",
                                cidade: "",
                                cep: "",
                                dataInicio: "",
                                horaInicio: "",
                                tipoProblema: "",
                                descricao: ""
                            })}
                            className="w-full bg-white text-gray-700 font-medium py-3 px-6 
                                     rounded-lg border-2 border-gray-300 hover:bg-gray-50 
                                     active:bg-gray-100 transition-colors duration-200 
                                     focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Limpar Formulário
                        </button>
                    </div>
                </form>

                <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-[#014888] mb-2">
                        Canais de Atendimento
                    </h3>
                    <div className="space-y-1 text-sm text-gray-700">
                        <p>📞 Central de Atendimento: 0800 XXX XXXX</p>
                        <p>💬 WhatsApp: (00) 00000-0000</p>
                        <p>⏰ Horário: Segunda a Sexta, 8h às 18h</p>
                    </div>
                </div>
            </div>
        </div>
    );
};