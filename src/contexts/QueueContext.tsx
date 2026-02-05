import React, { createContext, useContext, useState, useCallback } from 'react';
import { Booth, Ticket, Store, City, UserRole } from '@/types/queue';
import { useAuth } from '@/contexts/AuthContext';

// Mock data - será substituído por chamadas à API
const mockCities: City[] = [
  { id: '1', name: 'São Luís' },
  { id: '2', name: 'Imperatriz' },
  { id: '3', name: 'Caxias' },
];

const mockStores: Store[] = [
  { id: '1', name: 'Loja Centro', cityId: '1' },
  { id: '2', name: 'Loja Shopping', cityId: '1' },
  { id: '3', name: 'Loja Imperatriz Centro', cityId: '2' },
  { id: '4', name: 'Loja Caxias', cityId: '3' },
];

const initialBooths: Booth[] = [
  { id: '1', name: 'Guichê 1', storeId: '1', isOccupied: false },
  { id: '2', name: 'Guichê 2', storeId: '1', isOccupied: false },
  { id: '3', name: 'Guichê 3', storeId: '1', isOccupied: false },
  { id: '4', name: 'Guichê 1', storeId: '2', isOccupied: false },
  { id: '5', name: 'Guichê 2', storeId: '2', isOccupied: false },
];

const initialTickets: Ticket[] = [
  { id: '1', number: 'A001', customerName: 'João Silva', storeId: '1', status: 'waiting' },
  { id: '2', number: 'A002', customerName: 'Maria Santos', storeId: '1', status: 'waiting' },
  { id: '3', number: 'A003', customerName: 'Pedro Oliveira', storeId: '1', status: 'waiting' },
  { id: '4', number: 'B001', customerName: 'Ana Costa', storeId: '2', status: 'waiting' },
  { id: '5', number: 'B002', customerName: 'Carlos Souza', storeId: '2', status: 'waiting' },
];

interface QueueContextType {
  cities: City[];
  stores: Store[];
  booths: Booth[];
  tickets: Ticket[];
  calledTickets: Ticket[];
  userRole: UserRole;
  currentUserId: string;
  currentUserName: string;
  occupiedBoothId: string | null;
  
  setUserRole: (role: UserRole) => void;
  getStoresByCity: (cityId: string) => Store[];
  getBoothsByStore: (storeId: string) => Booth[];
  getWaitingTickets: (storeId: string) => Ticket[];
  
  createBooth: (storeId: string) => void;
  deleteBooth: (boothId: string) => void;
  occupyBooth: (boothId: string) => void;
  leaveBooth: (boothId: string) => void;
  
  callNextTicket: (boothId: string) => Ticket | null;
  recallTicket: (boothId: string) => { noShow: boolean; nextTicket: Ticket | null };
  startService: (boothId: string) => void;
  endService: (boothId: string) => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [booths, setBooths] = useState<Booth[]>(initialBooths);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [calledTickets, setCalledTickets] = useState<Ticket[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('atendente');
  const [occupiedBoothId, setOccupiedBoothId] = useState<string | null>(null);
  
  // Usar dados do usuário logado
  const currentUserId = user?.id || 'user-1';
  const currentUserName = user?.name || 'Atendente';

  const getStoresByCity = useCallback((cityId: string) => {
    return mockStores.filter(store => store.cityId === cityId);
  }, []);

  const getBoothsByStore = useCallback((storeId: string) => {
    return booths.filter(booth => booth.storeId === storeId);
  }, [booths]);

  const getWaitingTickets = useCallback((storeId: string) => {
    return tickets.filter(ticket => ticket.storeId === storeId && ticket.status === 'waiting');
  }, [tickets]);

  const createBooth = useCallback((storeId: string) => {
    const storeBooths = booths.filter(b => b.storeId === storeId);
    const newBoothNumber = storeBooths.length + 1;
    const newBooth: Booth = {
      id: `booth-${Date.now()}`,
      name: `Guichê ${newBoothNumber}`,
      storeId,
      isOccupied: false,
    };
    setBooths(prev => [...prev, newBooth]);
  }, [booths]);

  const deleteBooth = useCallback((boothId: string) => {
    setBooths(prev => prev.filter(b => b.id !== boothId));
  }, []);

  const occupyBooth = useCallback((boothId: string) => {
    setBooths(prev => prev.map(booth => 
      booth.id === boothId 
        ? { ...booth, isOccupied: true, attendantId: currentUserId, attendantName: currentUserName }
        : booth
    ));
    setOccupiedBoothId(boothId);
  }, [currentUserId, currentUserName]);

  const leaveBooth = useCallback((boothId: string) => {
    const booth = booths.find(b => b.id === boothId);
    if (booth?.currentTicket) {
      setTickets(prev => prev.map(t => 
        t.id === booth.currentTicket?.id ? { ...t, status: 'waiting' as const } : t
      ));
    }
    
    setBooths(prev => prev.map(b => 
      b.id === boothId 
        ? { ...b, isOccupied: false, attendantId: undefined, attendantName: undefined, currentTicket: undefined }
        : b
    ));
    setOccupiedBoothId(null);
  }, [booths]);

  const callNextTicket = useCallback((boothId: string) => {
    const booth = booths.find(b => b.id === boothId);
    if (!booth) return null;

    const waitingTickets = tickets.filter(t => t.storeId === booth.storeId && t.status === 'waiting');
    if (waitingTickets.length === 0) return null;

    const nextTicket = waitingTickets[0];
    const updatedTicket: Ticket = {
      ...nextTicket,
      status: 'called',
      calledAt: new Date(),
      boothId: booth.id,
      boothName: booth.name,
    };

    setTickets(prev => prev.map(t => t.id === nextTicket.id ? updatedTicket : t));
    setBooths(prev => prev.map(b => b.id === boothId ? { ...b, currentTicket: updatedTicket } : b));
    setCalledTickets(prev => [updatedTicket, ...prev.slice(0, 9)]);

    return updatedTicket;
  }, [booths, tickets]);

  const recallTicket = useCallback((boothId: string): { noShow: boolean; nextTicket: Ticket | null } => {
    const booth = booths.find(b => b.id === boothId);
    if (!booth?.currentTicket) return { noShow: false, nextTicket: null };

    const currentRecallCount = (booth.currentTicket.recallCount || 0) + 1;
    
    // Se chamou 5 vezes, marca como no_show e chama próxima
    if (currentRecallCount >= 5) {
      const noShowTicket = booth.currentTicket;
      
      // Marca como no_show
      setTickets(prev => prev.map(t => 
        t.id === noShowTicket.id ? { ...t, status: 'no_show' as const } : t
      ));
      setCalledTickets(prev => prev.filter(t => t.id !== noShowTicket.id));
      
      // Chama próxima senha
      const waitingTickets = tickets.filter(t => t.storeId === booth.storeId && t.status === 'waiting');
      if (waitingTickets.length > 0) {
        const nextTicket = waitingTickets[0];
        const updatedNextTicket: Ticket = {
          ...nextTicket,
          status: 'called',
          calledAt: new Date(),
          boothId: booth.id,
          boothName: booth.name,
          recallCount: 0,
        };
        
        setTickets(prev => prev.map(t => t.id === nextTicket.id ? updatedNextTicket : t));
        setBooths(prev => prev.map(b => b.id === boothId ? { ...b, currentTicket: updatedNextTicket } : b));
        setCalledTickets(prev => [updatedNextTicket, ...prev.slice(0, 9)]);
        
        return { noShow: true, nextTicket: updatedNextTicket };
      } else {
        setBooths(prev => prev.map(b => b.id === boothId ? { ...b, currentTicket: undefined } : b));
        return { noShow: true, nextTicket: null };
      }
    }

    const updatedTicket: Ticket = {
      ...booth.currentTicket,
      calledAt: new Date(),
      recallCount: currentRecallCount,
    };

    setTickets(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
    setBooths(prev => prev.map(b => b.id === boothId ? { ...b, currentTicket: updatedTicket } : b));
    setCalledTickets(prev => [updatedTicket, ...prev.filter(t => t.id !== updatedTicket.id).slice(0, 9)]);
    
    return { noShow: false, nextTicket: null };
  }, [booths, tickets]);

  const startService = useCallback((boothId: string) => {
    const booth = booths.find(b => b.id === boothId);
    if (!booth?.currentTicket) return;

    setTickets(prev => prev.map(t => 
      t.id === booth.currentTicket?.id ? { ...t, status: 'in_service' as const } : t
    ));
    setBooths(prev => prev.map(b => 
      b.id === boothId && b.currentTicket 
        ? { ...b, currentTicket: { ...b.currentTicket, status: 'in_service' } }
        : b
    ));
  }, [booths]);

  const endService = useCallback((boothId: string) => {
    const booth = booths.find(b => b.id === boothId);
    if (!booth?.currentTicket) return;

    setTickets(prev => prev.map(t => 
      t.id === booth.currentTicket?.id ? { ...t, status: 'completed' as const } : t
    ));
    setBooths(prev => prev.map(b => 
      b.id === boothId ? { ...b, currentTicket: undefined } : b
    ));
    setCalledTickets(prev => prev.filter(t => t.id !== booth.currentTicket?.id));
  }, [booths]);

  return (
    <QueueContext.Provider value={{
      cities: mockCities,
      stores: mockStores,
      booths,
      tickets,
      calledTickets,
      userRole,
      currentUserId,
      currentUserName,
      occupiedBoothId,
      setUserRole,
      getStoresByCity,
      getBoothsByStore,
      getWaitingTickets,
      createBooth,
      deleteBooth,
      occupyBooth,
      leaveBooth,
      callNextTicket,
      recallTicket,
      startService,
      endService,
    }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error('useQueue deve ser usado dentro de um QueueProvider');
  }
  return context;
};
