import { Hexagon } from "lucide-react";
import EditDataIcon from "../assets/icons/edit-data.svg";

export const EditData = () => {
    return (
        <div className="px-4 py-6 max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <img 
                    src={EditDataIcon} 
                    alt="Ícone de Edição de Dados" 
                    className="w-8 h-8"
                />
                <h2 className="text-lg text-[#014888] font-bold">
                    Alterar Dados Cadastrais
                </h2>
            </div>

            <form className="space-y-8">
                <section>
                    <h3 className="flex items-center gap-2 text-[#014888] font-semibold mb-4">
                        <Hexagon className="w-5 h-5" fill="currentColor" />
                        <span>Dados Pessoais</span>
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label 
                                htmlFor="nome" 
                                className="text-sm font-medium text-gray-700 mb-1"
                            >
                                Nome Completo
                            </label>
                            <input 
                                type="text" 
                                id="nome"
                                name="nome"
                                placeholder="Ex: João da Silva" 
                                className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                         focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                         focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label 
                                    htmlFor="cpf" 
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    CPF
                                </label>
                                <input 
                                    type="text" 
                                    id="cpf"
                                    name="cpf"
                                    placeholder="000.000.000-00" 
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                             focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label 
                                    htmlFor="rg" 
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    RG
                                </label>
                                <input 
                                    type="text" 
                                    id="rg"
                                    name="rg"
                                    placeholder="00.000.000-0" 
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                             focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label 
                                htmlFor="data-nascimento" 
                                className="text-sm font-medium text-gray-700 mb-1"
                            >
                                Data de Nascimento
                            </label>
                            <input 
                                type="date" 
                                id="data-nascimento"
                                name="data-nascimento"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                         focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                         focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label 
                                htmlFor="genero" 
                                className="text-sm font-medium text-gray-700 mb-1"
                            >
                                Gênero
                            </label>
                            <select 
                                id="genero"
                                name="genero"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                         focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                         focus:border-transparent transition-all bg-white"
                            >
                                <option value="">Selecione...</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="outro">Outro</option>
                                <option value="prefiro-nao-informar">Prefiro não informar</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="flex items-center gap-2 text-[#014888] font-semibold mb-4">
                        <Hexagon className="w-5 h-5" fill="currentColor" />
                        <span>Endereço</span>
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label 
                                htmlFor="cep" 
                                className="text-sm font-medium text-gray-700 mb-1"
                            >
                                CEP
                            </label>
                            <input 
                                type="text" 
                                id="cep"
                                name="cep"
                                placeholder="00000-000" 
                                className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                         focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                         focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label 
                                htmlFor="rua" 
                                className="text-sm font-medium text-gray-700 mb-1"
                            >
                                Rua/Avenida
                            </label>
                            <input 
                                type="text" 
                                id="rua"
                                name="rua"
                                placeholder="Nome da rua" 
                                className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                         focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                         focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="flex flex-col flex-1">
                                <label 
                                    htmlFor="numero" 
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    Número
                                </label>
                                <input 
                                    type="text" 
                                    id="numero"
                                    name="numero"
                                    placeholder="123" 
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                             focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="flex flex-col flex-1">
                                <label 
                                    htmlFor="complemento" 
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    Complemento
                                </label>
                                <input 
                                    type="text" 
                                    id="complemento"
                                    name="complemento"
                                    placeholder="Apt 12" 
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                             focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label 
                                htmlFor="bairro" 
                                className="text-sm font-medium text-gray-700 mb-1"
                            >
                                Bairro
                            </label>
                            <input 
                                type="text" 
                                id="bairro"
                                name="bairro"
                                placeholder="Nome do bairro" 
                                className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                         focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                         focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="flex flex-col flex-[2]">
                                <label 
                                    htmlFor="cidade" 
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    Cidade
                                </label>
                                <input 
                                    type="text" 
                                    id="cidade"
                                    name="cidade"
                                    placeholder="Cidade" 
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                             focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="flex flex-col flex-1">
                                <label 
                                    htmlFor="estado" 
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    UF
                                </label>
                                <select 
                                    id="estado"
                                    name="estado"
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                             focus:border-transparent transition-all bg-white"
                                >
                                    <option value="">UF</option>
                                    <option value="SP">SP</option>
                                    <option value="RJ">RJ</option>
                                    <option value="MG">MG</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="flex items-center gap-2 text-[#014888] font-semibold mb-4">
                        <Hexagon className="w-5 h-5" fill="currentColor" />
                        <span>Contato</span>
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label 
                                htmlFor="email" 
                                className="text-sm font-medium text-gray-700 mb-1"
                            >
                                E-mail
                            </label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                placeholder="exemplo@email.com" 
                                className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                         focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                         focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label 
                                htmlFor="telefone" 
                                className="text-sm font-medium text-gray-700 mb-1"
                            >
                                Telefone
                            </label>
                            <input 
                                type="tel" 
                                id="telefone"
                                name="telefone"
                                placeholder="(00) 00000-0000" 
                                className="w-full p-3 border-2 border-gray-300 rounded-lg 
                                         focus:outline-none focus:ring-2 focus:ring-[#014888] 
                                         focus:border-transparent transition-all"
                            />
                        </div>
                    </div>
                </section>

                <button 
                    type="submit"
                    className="w-full bg-[#014888] text-white font-semibold py-3 px-6 
                             rounded-lg hover:bg-[#013366] active:bg-[#012244] 
                             transition-colors duration-200 focus:outline-none 
                             focus:ring-4 focus:ring-blue-300"
                >
                    Salvar Alterações
                </button>
            </form>
        </div>
    );
};
