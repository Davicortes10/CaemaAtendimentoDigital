import { useQueue } from '@/contexts/QueueContext';
import { Card } from '@/components/ui/card';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNotificationSound } from '@/hooks/useNotificationSound';
import { useVoiceAnnouncement } from '@/hooks/useVoiceAnnouncement';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import caemaLogo from '@/assets/caema-logo.png';
import { cn } from '@/lib/utils';

// Mock data for demonstration - Centro São Luís
const mockTickets = [
  { id: 'mock-1', number: 'A023', customerName: 'Maria Silva', boothName: 'Guichê 1', storeId: '1', status: 'called' as const },
  { id: 'mock-2', number: 'A022', customerName: 'João Santos', boothName: 'Guichê 2', storeId: '1', status: 'called' as const },
  { id: 'mock-3', number: 'A021', customerName: 'Ana Costa', boothName: 'Guichê 3', storeId: '1', status: 'called' as const },
  { id: 'mock-4', number: 'A020', customerName: 'Carlos Oliveira', boothName: 'Guichê 1', storeId: '1', status: 'called' as const },
  { id: 'mock-5', number: 'A019', customerName: 'Fernanda Lima', boothName: 'Guichê 2', storeId: '1', status: 'called' as const },
  { id: 'mock-6', number: 'A018', customerName: 'Pedro Souza', boothName: 'Guichê 3', storeId: '1', status: 'called' as const },
];

const TVPanel = () => {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get('store');
  const { calledTickets, stores } = useQueue();
  
  // Use mock data if no real tickets exist (for demonstration)
  const ticketsToShow = useMemo(() => {
    if (calledTickets.length > 0) return calledTickets;
    // If filtering by store, only show mock if it matches store-1, otherwise show all mock
    if (storeId && storeId !== '1') return [];
    return mockTickets;
  }, [calledTickets, storeId]);
  
  // Filter tickets by store if storeId is provided
  const filteredTickets = useMemo(() => {
    if (!storeId) return ticketsToShow;
    return ticketsToShow.filter(ticket => ticket.storeId === storeId);
  }, [ticketsToShow, storeId]);
  
  // Get store name - use mock name for demonstration
  const storeName = stores.find(s => s.id === storeId)?.name || 
    (storeId === '1' || (!storeId && ticketsToShow === mockTickets) ? 'Centro São Luís' : undefined);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const lastTicketIdRef = useRef<string | null>(null);
  
  const { playNotificationSound } = useNotificationSound();
  const { announceTicket } = useVoiceAnnouncement();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load voices on mount (needed for some browsers)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Watch for new tickets and play notification
  useEffect(() => {
    const latestTicket = filteredTickets[0];
    
    if (latestTicket && latestTicket.id !== lastTicketIdRef.current) {
      lastTicketIdRef.current = latestTicket.id;
      
      // Trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 3000);
      
      if (soundEnabled) {
        // Play notification sound
        playNotificationSound();
        
        // Announce ticket after a short delay
        setTimeout(() => {
          announceTicket(
            latestTicket.number,
            latestTicket.boothName || 'guichê',
            latestTicket.customerName
          );
        }, 800);
      }
    }
  }, [filteredTickets, soundEnabled, playNotificationSound, announceTicket]);

  const latestTicket = filteredTickets[0];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Initialize audio context on user interaction
    if (!soundEnabled) {
      playNotificationSound();
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="bg-gray-50 py-4 px-8 flex items-center justify-between border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-6">
          <img src={caemaLogo} alt="CAEMA" className="h-14 object-contain" />
          {storeName && (
            <div className="text-gray-800">
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Loja</div>
              <div className="text-xl font-bold text-gray-900">{storeName}</div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSound}
            className="text-gray-700 hover:bg-gray-200"
          >
            {soundEnabled ? (
              <Volume2 className="h-6 w-6" />
            ) : (
              <VolumeX className="h-6 w-6" />
            )}
          </Button>
          
          <div className="text-right">
            <div className="text-3xl font-bold tabular-nums text-gray-900">
              {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-base text-gray-600 capitalize">
              {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-6 overflow-auto">
        {/* Main Called Ticket */}
        {latestTicket ? (
          <Card 
            className={cn(
              "mb-8 p-10 bg-primary border-none shadow-2xl transition-all duration-300",
              isAnimating && "animate-pulse scale-[1.02] shadow-[0_0_60px_rgba(37,99,235,0.5)]"
            )}
          >
            <div className="text-center">
              <div className="text-2xl uppercase tracking-[0.3em] text-black mb-3 font-semibold">
                Senha Chamada
              </div>
              <div 
                className={cn(
                  "text-[12rem] font-black leading-none mb-4 tracking-wider transition-transform duration-500 text-black",
                  isAnimating && "scale-110"
                )}
              >
                {latestTicket.number}
              </div>
              <div className="text-5xl font-bold mb-4 text-black">
                {latestTicket.customerName}
              </div>
              <div className="inline-block bg-white rounded-full px-10 py-4">
                <span className="text-3xl font-bold uppercase tracking-wider text-black">
                  {latestTicket.boothName}
                </span>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="mb-8 p-10 bg-primary border-none">
            <div className="text-center">
              <div className="text-3xl font-semibold text-black">Aguardando chamada...</div>
              <div className="text-xl text-black/70 mt-2">As senhas chamadas aparecerão aqui</div>
            </div>
          </Card>
        )}

        {/* Recent Tickets */}
        <div>
          <h2 className="text-5xl font-bold mb-8 text-black">
            Últimas Senhas Chamadas
          </h2>
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {filteredTickets.slice(1, 5).map((ticket, index) => (
              <Card 
                key={ticket.id} 
                className={cn(
                  "p-10 bg-primary border-none transition-all duration-300",
                  index === 0 && "ring-4 ring-black/20"
                )}
              >
                <div className="text-center">
                  <div className="text-7xl font-black text-black mb-4">
                    {ticket.number}
                  </div>
                  <div className="text-3xl text-black truncate font-bold">
                    {ticket.customerName}
                  </div>
                  <div className="text-2xl text-black/80 mt-3 uppercase tracking-wider font-semibold">
                    {ticket.boothName}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredTickets.length === 0 && (
            <div className="text-center py-12">
              <div className="text-2xl text-black">Nenhuma senha foi chamada ainda.</div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-3 px-8 border-t border-gray-200 shrink-0">
        <div className="flex items-center justify-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-3 h-3 rounded-full",
              soundEnabled ? "bg-green-500" : "bg-red-500"
            )} />
            <span className="text-sm font-medium">
              {soundEnabled ? 'Som ativado' : 'Som desativado'}
            </span>
          </div>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium">
            Senhas na fila: {filteredTickets.length}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default TVPanel;
