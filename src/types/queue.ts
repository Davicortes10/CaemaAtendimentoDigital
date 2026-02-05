export interface Booth {
  id: string;
  name: string;
  storeId: string;
  isOccupied: boolean;
  attendantId?: string;
  attendantName?: string;
  currentTicket?: Ticket;
}

export interface Ticket {
  id: string;
  number: string;
  customerName: string;
  storeId: string;
  status: 'waiting' | 'called' | 'in_service' | 'completed' | 'no_show';
  calledAt?: Date;
  boothId?: string;
  boothName?: string;
  recallCount?: number;
}

export interface Store {
  id: string;
  name: string;
  cityId: string;
}

export interface City {
  id: string;
  name: string;
}

export type UserRole = 'gerente' | 'atendente';
