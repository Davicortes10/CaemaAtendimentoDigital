
export interface DetalhesLogin {
    user: string; 
    
    token: string;
    
    matricula: string;

    cpf: string;
}



export interface Endereco {
    id: number;

    logradouro: string;
   
    matriculaContrato: string;
   
    grandeCliente: boolean;
    
    detalheEndereco?: string; 
}


export interface Servico {
   
    id: number;
    
    titulo: string;
    
    rota: string;
    
    icone: string; 
}

