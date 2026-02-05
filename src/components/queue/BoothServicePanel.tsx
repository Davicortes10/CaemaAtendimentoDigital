import { Booth } from '@/types/queue';
import { useQueue } from '@/contexts/QueueContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Phone, PhoneForwarded, Play, UserCheck, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
interface BoothServicePanelProps {
  booth: Booth;
  onBack: () => void;
}

const BoothServicePanel = ({ booth, onBack }: BoothServicePanelProps) => {
  const { callNextTicket, recallTicket, startService, endService, getWaitingTickets, leaveBooth } = useQueue();
  const { toast } = useToast();
  
  const waitingTickets = getWaitingTickets(booth.storeId);
  const currentTicket = booth.currentTicket;
  const isInService = currentTicket?.status === 'in_service';
  const isWaitingClient = currentTicket?.status === 'called';
  
  // Só pode sair se não tiver senha em atendimento ou aguardando cliente
  const canLeaveBooth = !currentTicket;

  const handleCallNext = () => {
    const ticket = callNextTicket(booth.id);
    if (ticket) {
      toast({
        title: 'Senha chamada',
        description: `Senha ${ticket.number} - ${ticket.customerName}`,
      });
    } else {
      toast({
        title: 'Sem senhas',
        description: 'Não há senhas aguardando atendimento.',
        variant: 'destructive',
      });
    }
  };

  const handleRecall = () => {
    if (currentTicket) {
      const result = recallTicket(booth.id);
      
      if (result.noShow) {
        if (result.nextTicket) {
          toast({
            title: 'Cliente ausente',
            description: `Senha ${currentTicket.number} marcada como ausente. Chamando ${result.nextTicket.number}.`,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Cliente ausente',
            description: `Senha ${currentTicket.number} marcada como ausente. Não há mais senhas.`,
            variant: 'destructive',
          });
        }
      } else {
        const recallCount = (currentTicket.recallCount || 0) + 1;
        toast({
          title: 'Senha chamada novamente',
          description: `Senha ${currentTicket.number} - Chamada ${recallCount}/5`,
        });
      }
    }
  };

  const handleStartService = () => {
    startService(booth.id);
    toast({
      title: 'Atendimento iniciado',
      description: `Atendendo ${currentTicket?.customerName}`,
    });
  };

  const handleEndAndCallNext = () => {
    const ticket = callNextTicket(booth.id);
    if (ticket) {
      toast({
        title: 'Próxima senha chamada',
        description: `Senha ${ticket.number} - ${ticket.customerName}`,
      });
    } else {
      toast({
        title: 'Atendimento encerrado',
        description: 'Não há mais senhas aguardando.',
      });
    }
  };

  const handleEndServiceOnly = () => {
    endService(booth.id);
    toast({
      title: 'Atendimento encerrado',
      description: 'Você pode chamar a próxima senha quando estiver pronto.',
    });
  };

  const handleLeave = () => {
    if (!canLeaveBooth) {
      toast({
        title: 'Não é possível sair',
        description: 'Encerre o atendimento atual antes de sair do guichê.',
        variant: 'destructive',
      });
      return;
    }
    leaveBooth(booth.id);
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">{booth.name}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Ticket */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Senha Atual</CardTitle>
          </CardHeader>
          <CardContent>
            {currentTicket ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary">{currentTicket.number}</div>
                  <div className="mt-2 text-lg text-muted-foreground">{currentTicket.customerName}</div>
                  <div className="mt-1 text-sm">
                    Status: {isInService ? (
                      <span className="text-green-600 font-medium">Em atendimento</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Aguardando cliente</span>
                    )}
                  </div>
                  {!isInService && currentTicket.recallCount !== undefined && currentTicket.recallCount > 0 && (
                    <div className="mt-1 text-sm text-orange-600 font-medium">
                      Chamadas: {currentTicket.recallCount}/5
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {!isInService && (
                    <>
                      <Button onClick={handleRecall} variant="outline" className="w-full">
                        <PhoneForwarded className="mr-2 h-4 w-4" />
                        Chamar Novamente
                      </Button>
                      <Button onClick={handleStartService} className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Cliente Chegou - Iniciar Atendimento
                      </Button>
                    </>
                  )}
                  
                  {isInService && (
                    <div className="flex flex-col gap-2">
                      <Button onClick={handleEndAndCallNext} className="w-full">
                        <UserCheck className="mr-2 h-4 w-4" />
                        Encerrar e Chamar Próxima
                      </Button>
                      <Button onClick={handleEndServiceOnly} variant="outline" className="w-full">
                        <Pause className="mr-2 h-4 w-4" />
                        Encerrar Atendimento (Pausa)
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-4">Nenhuma senha em atendimento</div>
                <Button onClick={handleCallNext} size="lg" className="w-full">
                  <Phone className="mr-2 h-5 w-5" />
                  Chamar Próxima Senha
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Queue Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fila de Espera</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-primary">{waitingTickets.length}</div>
              <div className="text-muted-foreground">senhas aguardando</div>
            </div>
            
            {waitingTickets.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {waitingTickets.slice(0, 5).map((ticket, index) => (
                  <div 
                    key={ticket.id} 
                    className="flex justify-between items-center p-2 rounded bg-muted"
                  >
                    <span className="font-medium">{ticket.number}</span>
                    <span className="text-sm text-muted-foreground">{ticket.customerName}</span>
                  </div>
                ))}
                {waitingTickets.length > 5 && (
                  <div className="text-center text-sm text-muted-foreground">
                    e mais {waitingTickets.length - 5} senhas...
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          variant="destructive" 
          onClick={handleLeave}
          disabled={!canLeaveBooth}
          title={!canLeaveBooth ? 'Encerre o atendimento atual antes de sair' : undefined}
        >
          Sair do Guichê
        </Button>
      </div>
    </div>
  );
};

export default BoothServicePanel;
