import { useQueue } from '@/contexts/QueueContext';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import caemaLogo from '@/assets/caema-logo.png';

const CalledTickets = () => {
  const { calledTickets } = useQueue();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const latestTicket = calledTickets[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <header className="bg-sidebar text-sidebar-foreground py-4 px-6 flex items-center justify-between">
        <img src={caemaLogo} alt="CAEMA" className="h-12 object-contain" />
        <div className="text-right">
          <div className="text-2xl font-bold">
            {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-sm opacity-75">
            {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {/* Main Called Ticket */}
        {latestTicket ? (
          <Card className="mb-8 p-8 bg-primary text-primary-foreground animate-pulse">
            <div className="text-center">
              <div className="text-lg uppercase tracking-wider opacity-75 mb-2">Senha Chamada</div>
              <div className="text-8xl font-bold mb-4">{latestTicket.number}</div>
              <div className="text-3xl mb-2">{latestTicket.customerName}</div>
              <div className="text-xl opacity-90">
                {latestTicket.boothName}
              </div>
            </div>
          </Card>
        ) : (
          <Card className="mb-8 p-8 bg-muted">
            <div className="text-center text-muted-foreground">
              <div className="text-2xl">Aguardando chamada...</div>
            </div>
          </Card>
        )}

        {/* Recent Tickets */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Últimas Senhas Chamadas</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {calledTickets.slice(1, 11).map((ticket) => (
              <Card key={ticket.id} className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{ticket.number}</div>
                  <div className="text-sm text-muted-foreground truncate">{ticket.customerName}</div>
                  <div className="text-xs text-muted-foreground mt-1">{ticket.boothName}</div>
                </div>
              </Card>
            ))}
          </div>

          {calledTickets.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Nenhuma senha foi chamada ainda.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CalledTickets;
