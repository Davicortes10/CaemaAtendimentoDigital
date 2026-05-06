import axios from 'axios';

// =============================================================================
// CONFIGURAÇÃO DA API
// =============================================================================
// TODO: Substitua esta URL pela URL real do backend
const API_BASE_URL = 'http://localhost:3000/api';

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
  (error) => Promise.reject(error)
);

// Interceptor para tratar erros de autenticação (401 redireciona para login)
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

export interface ServiceType {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
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
// DADOS MOCKADOS PARA DESENVOLVIMENTO (fallback quando backend não disponível)
// =============================================================================

const USE_MOCK = true; // TODO: Mude para false quando o backend estiver pronto

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
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 800));
      // Mock: Gerente
      if (credentials.email === 'gerente@caema.com' && credentials.password === 'caema123') {
        return {
          token: 'mock-jwt-token-gerente',
          user: { id: '1', name: 'Gerente CAEMA', email: 'gerente@caema.com', role: 'gerente' },
        };
      }
      // Mock: Atendente
      if (credentials.email === 'atendente@caema.com' && credentials.password === 'caema123') {
        return {
          token: 'mock-jwt-token-atendente',
          user: { id: '2', name: 'Atendente CAEMA', email: 'atendente@caema.com', role: 'atendente', storeId: '1', storeName: 'Loja Centro - São Luís' },
        };
      }
      throw new Error('Credenciais inválidas');
    }

    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * POST /auth/logout
   */
  logout: async (): Promise<void> => {
    if (!USE_MOCK) {
      await api.post('/auth/logout');
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * GET /auth/me
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};

// =============================================================================
// SERVIÇO DE DADOS AUXILIARES
// =============================================================================

export const dataService = {
  /**
   * GET /data/cities
   */
  getCities: async (): Promise<City[]> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockCities;
    }
    const response = await api.get<City[]>('/data/cities');
    return response.data;
  },

  /**
   * GET /data/stores?cityId=
   */
  getStores: async (cityId?: string): Promise<Store[]> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return cityId ? mockStores.filter(s => s.cityId === cityId) : mockStores;
    }
    const response = await api.get<Store[]>('/data/stores', { params: { cityId } });
    return response.data;
  },

  /**
   * GET /data/attendants?storeId=
   */
  getAttendants: async (storeId?: string): Promise<Attendant[]> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return storeId ? mockAttendants.filter(a => a.storeId === storeId) : mockAttendants;
    }
    const response = await api.get<Attendant[]>('/data/attendants', { params: { storeId } });
    return response.data;
  },

  /**
   * GET /data/service-types
   */
  getServiceTypes: async (): Promise<ServiceType[]> => {
    if (USE_MOCK) {
      return [
        { id: '1', name: 'Segunda Via de Conta', isActive: true },
        { id: '2', name: 'Ligação Nova', isActive: true },
        { id: '3', name: 'Religação', isActive: true },
        { id: '4', name: 'Mudança de Titularidade', isActive: true },
        { id: '5', name: 'Negociação de Débitos', isActive: true },
        { id: '6', name: 'Reclamação', isActive: true },
        { id: '7', name: 'Outros', isActive: true },
      ];
    }
    const response = await api.get<ServiceType[]>('/data/service-types');
    return response.data;
  },
};

// =============================================================================
// SERVIÇO DE GUICHÊS (BOOTHS)
// =============================================================================

export const boothService = {
  /**
   * GET /booths?storeId=
   */
  getBooths: async (storeId?: string): Promise<Booth[]> => {
    const response = await api.get<Booth[]>('/booths', { params: { storeId } });
    return response.data;
  },

  /**
   * POST /booths
   */
  createBooth: async (storeId: string, name: string): Promise<Booth> => {
    const response = await api.post<Booth>('/booths', { storeId, name });
    return response.data;
  },

  /**
   * DELETE /booths/:id
   */
  deleteBooth: async (boothId: string): Promise<void> => {
    await api.delete(`/booths/${boothId}`);
  },

  /**
   * POST /booths/:id/occupy
   */
  occupyBooth: async (boothId: string): Promise<Booth> => {
    const response = await api.post<Booth>(`/booths/${boothId}/occupy`);
    return response.data;
  },

  /**
   * POST /booths/:id/leave
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
   * GET /tickets?storeId=&status=
   */
  getTickets: async (storeId?: string, status?: Ticket['status']): Promise<Ticket[]> => {
    const response = await api.get<Ticket[]>('/tickets', { params: { storeId, status } });
    return response.data;
  },

  /**
   * POST /tickets
   */
  createTicket: async (storeId: string, customerName: string, serviceType?: string): Promise<Ticket> => {
    const response = await api.post<Ticket>('/tickets', { storeId, customerName, serviceType });
    return response.data;
  },

  /**
   * GET /tickets/waiting?storeId=
   */
  getWaitingTickets: async (storeId: string): Promise<Ticket[]> => {
    const response = await api.get<Ticket[]>('/tickets/waiting', { params: { storeId } });
    return response.data;
  },

  /**
   * GET /tickets/called?storeId=&limit=
   */
  getCalledTickets: async (storeId?: string, limit: number = 10): Promise<Ticket[]> => {
    const response = await api.get<Ticket[]>('/tickets/called', { params: { storeId, limit } });
    return response.data;
  },

  /**
   * POST /tickets/call-next
   */
  callNextTicket: async (boothId: string): Promise<Ticket | null> => {
    const response = await api.post<Ticket | null>('/tickets/call-next', { boothId });
    return response.data;
  },

  /**
   * POST /tickets/:id/recall
   */
  recallTicket: async (ticketId: string): Promise<{ ticket: Ticket; noShow: boolean; nextTicket: Ticket | null }> => {
    const response = await api.post(`/tickets/${ticketId}/recall`);
    return response.data;
  },

  /**
   * POST /tickets/:id/start-service
   */
  startService: async (ticketId: string): Promise<Ticket> => {
    const response = await api.post<Ticket>(`/tickets/${ticketId}/start-service`);
    return response.data;
  },

  /**
   * POST /tickets/:id/end-service
   */
  endService: async (
    ticketId: string,
    options: {
      callNext?: boolean;
      serviceType?: string;
      quality?: AttendanceRecord['quality'];
      satisfaction?: number;
    } = {}
  ): Promise<{ completedTicket: Ticket; nextTicket: Ticket | null }> => {
    const response = await api.post(`/tickets/${ticketId}/end-service`, options);
    return response.data;
  },

  /**
   * POST /tickets/:id/no-show
   */
  markNoShow: async (ticketId: string): Promise<Ticket> => {
    const response = await api.post<Ticket>(`/tickets/${ticketId}/no-show`);
    return response.data;
  },
};

// =============================================================================
// SERVIÇO DE INDICADORES
// =============================================================================

export const indicatorsService = {
  /**
   * GET /indicators/summary
   */
  getSummary: async (filters?: FilterOptions): Promise<Indicator & { totalAttendances: number }> => {
    const response = await api.get('/indicators/summary', { params: filters });
    return response.data;
  },

  /**
   * GET /indicators/attendants
   */
  getAttendantIndicators: async (filters?: FilterOptions): Promise<AttendantIndicator[]> => {
    const response = await api.get<AttendantIndicator[]>('/indicators/attendants', { params: filters });
    return response.data;
  },

  /**
   * GET /indicators/stores
   */
  getStoreIndicators: async (filters?: FilterOptions): Promise<StoreIndicator[]> => {
    const response = await api.get<StoreIndicator[]>('/indicators/stores', { params: filters });
    return response.data;
  },

  /**
   * GET /indicators/cities
   */
  getCityIndicators: async (filters?: FilterOptions): Promise<CityIndicator[]> => {
    const response = await api.get<CityIndicator[]>('/indicators/cities', { params: filters });
    return response.data;
  },

  /**
   * GET /indicators/trend
   */
  getTrend: async (filters?: FilterOptions): Promise<{ period: string; tme: number; tma: number; tmo: number }[]> => {
    const response = await api.get('/indicators/trend', { params: filters });
    return response.data;
  },

  /**
   * GET /indicators/compare
   */
  comparePeriods: async (
    period1Start: string,
    period1End: string,
    period2Start: string,
    period2End: string,
    filters?: FilterOptions
  ): Promise<{ period1: Indicator; period2: Indicator; variation: Indicator }> => {
    const response = await api.get('/indicators/compare', {
      params: { period1Start, period1End, period2Start, period2End, ...filters },
    });
    return response.data;
  },
};

// =============================================================================
// SERVIÇO DE ATENDIMENTOS (HISTÓRICO)
// =============================================================================

export const attendanceService = {
  /**
   * GET /attendances?page=&pageSize=&cityId=&storeId=&attendantId=&startDate=&endDate=
   */
  getAttendances: async (
    filters?: FilterOptions,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<AttendanceRecord>> => {
    const response = await api.get<PaginatedResponse<AttendanceRecord>>('/attendances', {
      params: { ...filters, page, pageSize },
    });
    return response.data;
  },

  /**
   * GET /attendances/export (retorna arquivo Excel)
   */
  exportToExcel: async (filters?: FilterOptions): Promise<Blob> => {
    const response = await api.get('/attendances/export', {
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  },
};

// =============================================================================
// SERVIÇO DO PAINEL TV (TEMPO REAL)
// =============================================================================

export const tvPanelService = {
  /**
   * GET /tv/called-tickets?storeId=
   */
  getCalledTickets: async (storeId?: string): Promise<Ticket[]> => {
    const response = await api.get<Ticket[]>('/tv/called-tickets', { params: { storeId } });
    return response.data;
  },

  /**
   * Conecta ao WebSocket para atualizações em tempo real do painel TV
   * Eventos: TICKET_CALLED, TICKET_RECALLED, TICKET_STARTED
   */
  connectWebSocket: (
    storeId: string,
    callbacks: {
      onTicketCalled?: (ticket: Ticket) => void;
      onTicketRecalled?: (ticket: Ticket) => void;
      onTicketStarted?: (ticket: Ticket) => void;
      onError?: (error: Event) => void;
      onClose?: () => void;
    }
  ): WebSocket | null => {
    try {
      const wsUrl = API_BASE_URL.replace('http', 'ws').replace('/api', '/ws');
      const token = localStorage.getItem('token');
      const ws = new WebSocket(`${wsUrl}/tv?storeId=${storeId}&token=${token}`);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case 'TICKET_CALLED':
            callbacks.onTicketCalled?.(data.ticket);
            break;
          case 'TICKET_RECALLED':
            callbacks.onTicketRecalled?.(data.ticket);
            break;
          case 'TICKET_STARTED':
            callbacks.onTicketStarted?.(data.ticket);
            break;
        }
      };

      ws.onerror = (error) => callbacks.onError?.(error);
      ws.onclose = () => callbacks.onClose?.();

      return ws;
    } catch (error) {
      console.error('Erro ao conectar WebSocket:', error);
      return null;
    }
  },
};

export default api;
