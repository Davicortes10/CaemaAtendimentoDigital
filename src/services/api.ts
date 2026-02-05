import axios from 'axios';

// =============================================================================
// CONFIGURAÇÃO DA API
// =============================================================================
// IMPORTANTE: Substitua esta URL pela URL real do backend quando disponível
const API_BASE_URL = 'https://api.example.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// =============================================================================
// TIPOS E INTERFACES
// =============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'gerente' | 'atendente';
  storeId?: string;
  storeName?: string;
  cityId?: string;
  cityName?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface City {
  id: string;
  name: string;
}

export interface Store {
  id: string;
  name: string;
  cityId: string;
  cityName?: string;
}

export interface Attendant {
  id: string;
  name: string;
  email: string;
  storeId: string;
  storeName?: string;
}

export interface Booth {
  id: string;
  name: string;
  storeId: string;
  isOccupied: boolean;
  attendantId?: string;
  attendantName?: string;
  currentTicketId?: string;
}

export interface Ticket {
  id: string;
  number: string;
  customerName: string;
  storeId: string;
  storeName?: string;
  status: 'waiting' | 'called' | 'in_service' | 'completed' | 'no_show';
  boothId?: string;
  boothName?: string;
  attendantId?: string;
  attendantName?: string;
  createdAt: string;
  calledAt?: string;
  startedAt?: string;
  completedAt?: string;
  recallCount?: number;
}

export interface Indicator {
  tme: number; // Tempo Médio de Espera (minutos)
  tma: number; // Tempo Médio de Atendimento (minutos)
  tmo: number; // Tempo Médio de Operação (minutos)
}

export interface AttendantIndicator extends Indicator {
  attendantId: string;
  attendantName: string;
  storeId: string;
  storeName: string;
  cityId: string;
  cityName: string;
  totalAttendances: number;
}

export interface StoreIndicator extends Indicator {
  storeId: string;
  storeName: string;
  cityId: string;
  cityName: string;
  totalAttendances: number;
}

export interface CityIndicator extends Indicator {
  cityId: string;
  cityName: string;
  totalAttendances: number;
}

export interface AttendanceRecord {
  id: string;
  ticketNumber: string;
  customerName: string;
  attendantId: string;
  attendantName: string;
  storeId: string;
  storeName: string;
  cityId: string;
  cityName: string;
  boothId: string;
  boothName: string;
  serviceType: string;
  waitTime: number;
  serviceTime: number;
  totalTime: number;
  quality: 'excellent' | 'good' | 'regular' | 'bad';
  satisfaction: number;
  status: 'completed' | 'no_show';
  date: string;
}

export interface FilterOptions {
  cityId?: string;
  storeId?: string;
  attendantId?: string;
  startDate?: string;
  endDate?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// =============================================================================
// DADOS MOCKADOS PARA DESENVOLVIMENTO
// =============================================================================

const mockCities: City[] = [
  { id: '1', name: 'São Luís' },
  { id: '2', name: 'Imperatriz' },
  { id: '3', name: 'Caxias' },
  { id: '4', name: 'Timon' },
  { id: '5', name: 'Codó' },
];

const mockStores: Store[] = [
  { id: '1', name: 'Loja Centro - São Luís', cityId: '1' },
  { id: '2', name: 'Loja Cohama - São Luís', cityId: '1' },
  { id: '3', name: 'Loja Centro - Imperatriz', cityId: '2' },
  { id: '4', name: 'Loja Maranhão Novo - Imperatriz', cityId: '2' },
  { id: '5', name: 'Loja Centro - Caxias', cityId: '3' },
  { id: '6', name: 'Loja Centro - Timon', cityId: '4' },
  { id: '7', name: 'Loja Centro - Codó', cityId: '5' },
];

const mockAttendants: Attendant[] = [
  { id: '1', name: 'Maria Silva', email: 'maria@caema.com', storeId: '1' },
  { id: '2', name: 'João Santos', email: 'joao@caema.com', storeId: '1' },
  { id: '3', name: 'Ana Costa', email: 'ana@caema.com', storeId: '1' },
  { id: '4', name: 'Pedro Oliveira', email: 'pedro@caema.com', storeId: '2' },
  { id: '5', name: 'Carla Souza', email: 'carla@caema.com', storeId: '2' },
  { id: '6', name: 'Lucas Pereira', email: 'lucas@caema.com', storeId: '3' },
  { id: '7', name: 'Fernanda Lima', email: 'fernanda@caema.com', storeId: '3' },
  { id: '8', name: 'Rafael Alves', email: 'rafael@caema.com', storeId: '4' },
];

// =============================================================================
// SERVIÇO DE AUTENTICAÇÃO
// =============================================================================

export const authService = {
  /**
   * POST /auth/login
   * Realiza o login do usuário
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Credenciais mockadas para teste - Gerente
    if (credentials.email === 'gerente@caema.com' && credentials.password === 'caema123') {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        token: 'mock-jwt-token-gerente-2024',
        user: {
          id: '1',
          name: 'Gerente CAEMA',
          email: 'gerente@caema.com',
          role: 'gerente' as const,
        },
      };
    }
    
    // Credenciais mockadas para teste - Atendente
    if (credentials.email === 'atendente@caema.com' && credentials.password === 'caema123') {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        token: 'mock-jwt-token-atendente-2024',
        user: {
          id: '2',
          name: 'Atendente CAEMA',
          email: 'atendente@caema.com',
          role: 'atendente' as const,
          storeId: '1',
          storeName: 'Loja Centro - São Luís',
        },
      };
    }
    
    // Chamada real à API
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
  
  /**
   * POST /auth/logout
   * Realiza o logout do usuário
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * GET /auth/me
   * Retorna os dados do usuário logado
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};

// =============================================================================
// SERVIÇO DE DADOS AUXILIARES (Cidades, Lojas, Atendentes)
// =============================================================================

export const dataService = {
  /**
   * GET /data/cities
   * Lista todas as cidades
   */
  getCities: async (): Promise<City[]> => {
    try {
      const response = await api.get<City[]>('/data/cities');
      return response.data;
    } catch (error) {
      console.log('Usando dados mockados para cidades');
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockCities;
    }
  },
  
  /**
   * GET /data/stores
   * Lista todas as lojas (pode filtrar por cidade)
   */
  getStores: async (cityId?: string): Promise<Store[]> => {
    try {
      const response = await api.get<Store[]>('/data/stores', { params: { cityId } });
      return response.data;
    } catch (error) {
      console.log('Usando dados mockados para lojas');
      await new Promise(resolve => setTimeout(resolve, 300));
      return cityId ? mockStores.filter(store => store.cityId === cityId) : mockStores;
    }
  },
  
  /**
   * GET /data/attendants
   * Lista todos os atendentes (pode filtrar por loja)
   */
  getAttendants: async (storeId?: string): Promise<Attendant[]> => {
    try {
      const response = await api.get<Attendant[]>('/data/attendants', { params: { storeId } });
      return response.data;
    } catch (error) {
      console.log('Usando dados mockados para atendentes');
      await new Promise(resolve => setTimeout(resolve, 300));
      return storeId ? mockAttendants.filter(a => a.storeId === storeId) : mockAttendants;
    }
  },
};

// =============================================================================
// SERVIÇO DE INDICADORES
// =============================================================================

export const indicatorsService = {
  /**
   * GET /indicators/summary
   * Retorna o resumo dos indicadores (TME, TMA, TMO médios)
   */
  getSummary: async (filters?: FilterOptions): Promise<Indicator> => {
    const response = await api.get<Indicator>('/indicators/summary', { params: filters });
    return response.data;
  },

  /**
   * GET /indicators/attendants
   * Retorna indicadores agrupados por atendente
   */
  getAttendantIndicators: async (filters?: FilterOptions): Promise<AttendantIndicator[]> => {
    const response = await api.get<AttendantIndicator[]>('/indicators/attendants', { params: filters });
    return response.data;
  },
  
  /**
   * GET /indicators/stores
   * Retorna indicadores agrupados por loja
   */
  getStoreIndicators: async (filters?: FilterOptions): Promise<StoreIndicator[]> => {
    const response = await api.get<StoreIndicator[]>('/indicators/stores', { params: filters });
    return response.data;
  },
  
  /**
   * GET /indicators/cities
   * Retorna indicadores agrupados por cidade
   */
  getCityIndicators: async (filters?: FilterOptions): Promise<CityIndicator[]> => {
    const response = await api.get<CityIndicator[]>('/indicators/cities', { params: filters });
    return response.data;
  },

  /**
   * GET /indicators/trend
   * Retorna a tendência dos indicadores ao longo do tempo
   */
  getTrend: async (filters?: FilterOptions): Promise<{ period: string; tme: number; tma: number; tmo: number }[]> => {
    const response = await api.get('/indicators/trend', { params: filters });
    return response.data;
  },

  /**
   * GET /indicators/compare
   * Compara indicadores entre dois períodos
   */
  comparePeriods: async (period1Start: string, period1End: string, period2Start: string, period2End: string): Promise<{
    period1: Indicator;
    period2: Indicator;
    variation: Indicator;
  }> => {
    const response = await api.get('/indicators/compare', {
      params: { period1Start, period1End, period2Start, period2End }
    });
    return response.data;
  },
};

// =============================================================================
// SERVIÇO DE ATENDIMENTOS
// =============================================================================

export const attendanceService = {
  /**
   * GET /attendances
   * Lista todos os atendimentos com paginação e filtros
   */
  getAttendances: async (
    filters?: FilterOptions,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<AttendanceRecord>> => {
    const response = await api.get<PaginatedResponse<AttendanceRecord>>('/attendances', {
      params: { ...filters, page, pageSize }
    });
    return response.data;
  },

  /**
   * GET /attendances/export
   * Exporta atendimentos para Excel
   */
  exportToExcel: async (filters?: FilterOptions): Promise<Blob> => {
    const response = await api.get('/attendances/export', {
      params: filters,
      responseType: 'blob'
    });
    return response.data;
  },
};

// =============================================================================
// SERVIÇO DE GUICHÊS
// =============================================================================

export const boothService = {
  /**
   * GET /booths
   * Lista todos os guichês (pode filtrar por loja)
   */
  getBooths: async (storeId?: string): Promise<Booth[]> => {
    const response = await api.get<Booth[]>('/booths', { params: { storeId } });
    return response.data;
  },

  /**
   * POST /booths
   * Cria um novo guichê
   */
  createBooth: async (storeId: string, name: string): Promise<Booth> => {
    const response = await api.post<Booth>('/booths', { storeId, name });
    return response.data;
  },

  /**
   * DELETE /booths/:id
   * Remove um guichê
   */
  deleteBooth: async (boothId: string): Promise<void> => {
    await api.delete(`/booths/${boothId}`);
  },

  /**
   * POST /booths/:id/occupy
   * Atendente ocupa um guichê
   */
  occupyBooth: async (boothId: string): Promise<Booth> => {
    const response = await api.post<Booth>(`/booths/${boothId}/occupy`);
    return response.data;
  },

  /**
   * POST /booths/:id/leave
   * Atendente deixa um guichê
   */
  leaveBooth: async (boothId: string): Promise<Booth> => {
    const response = await api.post<Booth>(`/booths/${boothId}/leave`);
    return response.data;
  },
};

// =============================================================================
// SERVIÇO DE SENHAS/TICKETS
// =============================================================================

export const ticketService = {
  /**
   * GET /tickets
   * Lista senhas (pode filtrar por loja e status)
   */
  getTickets: async (storeId?: string, status?: Ticket['status']): Promise<Ticket[]> => {
    const response = await api.get<Ticket[]>('/tickets', { params: { storeId, status } });
    return response.data;
  },

  /**
   * GET /tickets/waiting
   * Lista senhas em espera por loja
   */
  getWaitingTickets: async (storeId: string): Promise<Ticket[]> => {
    const response = await api.get<Ticket[]>('/tickets/waiting', { params: { storeId } });
    return response.data;
  },

  /**
   * GET /tickets/called
   * Lista últimas senhas chamadas (para painel TV)
   */
  getCalledTickets: async (storeId?: string, limit: number = 10): Promise<Ticket[]> => {
    const response = await api.get<Ticket[]>('/tickets/called', { params: { storeId, limit } });
    return response.data;
  },

  /**
   * POST /tickets
   * Cria uma nova senha
   */
  createTicket: async (storeId: string, customerName: string): Promise<Ticket> => {
    const response = await api.post<Ticket>('/tickets', { storeId, customerName });
    return response.data;
  },

  /**
   * POST /tickets/call-next
   * Chama a próxima senha para um guichê
   */
  callNextTicket: async (boothId: string): Promise<Ticket | null> => {
    const response = await api.post<Ticket | null>(`/tickets/call-next`, { boothId });
    return response.data;
  },

  /**
   * POST /tickets/:id/recall
   * Rechama uma senha (incrementa contador de rechamadas)
   */
  recallTicket: async (ticketId: string): Promise<{ ticket: Ticket; noShow: boolean; nextTicket: Ticket | null }> => {
    const response = await api.post(`/tickets/${ticketId}/recall`);
    return response.data;
  },

  /**
   * POST /tickets/:id/start-service
   * Inicia o atendimento de uma senha
   */
  startService: async (ticketId: string): Promise<Ticket> => {
    const response = await api.post<Ticket>(`/tickets/${ticketId}/start-service`);
    return response.data;
  },

  /**
   * POST /tickets/:id/end-service
   * Finaliza o atendimento (com ou sem chamar próxima senha)
   */
  endService: async (ticketId: string, callNext: boolean = true, quality?: AttendanceRecord['quality'], satisfaction?: number): Promise<{
    completedTicket: Ticket;
    nextTicket: Ticket | null;
  }> => {
    const response = await api.post(`/tickets/${ticketId}/end-service`, { callNext, quality, satisfaction });
    return response.data;
  },

  /**
   * POST /tickets/:id/no-show
   * Marca senha como cliente ausente
   */
  markNoShow: async (ticketId: string): Promise<Ticket> => {
    const response = await api.post<Ticket>(`/tickets/${ticketId}/no-show`);
    return response.data;
  },
};

// =============================================================================
// SERVIÇO DE PAINEL TV (WebSocket ou Polling)
// =============================================================================

export const tvPanelService = {
  /**
   * GET /tv/called-tickets
   * Retorna senhas chamadas para exibição no painel TV
   */
  getCalledTickets: async (storeId?: string): Promise<Ticket[]> => {
    const response = await api.get<Ticket[]>('/tv/called-tickets', { params: { storeId } });
    return response.data;
  },

  /**
   * Conecta ao WebSocket para atualizações em tempo real
   * O backend deve implementar um endpoint WebSocket
   */
  connectWebSocket: (storeId: string, onTicketCalled: (ticket: Ticket) => void): WebSocket | null => {
    try {
      const wsUrl = API_BASE_URL.replace('http', 'ws').replace('/api', '/ws');
      const ws = new WebSocket(`${wsUrl}/tv?storeId=${storeId}`);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'TICKET_CALLED') {
          onTicketCalled(data.ticket);
        }
      };

      return ws;
    } catch (error) {
      console.error('Erro ao conectar WebSocket:', error);
      return null;
    }
  },
};

export default api;
