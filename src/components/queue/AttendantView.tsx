import { useState } from 'react';
import { useQueue } from '@/contexts/QueueContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BoothCard from './BoothCard';
import BoothServicePanel from './BoothServicePanel';
import { useToast } from '@/hooks/use-toast';

const AttendantView = () => {
  const { stores, getBoothsByStore, occupyBooth, leaveBooth, occupiedBoothId, booths, currentUserId } = useQueue();
  const { toast } = useToast();
  const [selectedStore, setSelectedStore] = useState<string>(stores[0]?.id || '');
  const [showServicePanel, setShowServicePanel] = useState(false);

  const storeBooths = selectedStore ? getBoothsByStore(selectedStore) : [];
  const occupiedBooth = booths.find(b => b.id === occupiedBoothId);

  const handleOccupy = (boothId: string) => {
    if (occupiedBoothId) {
      toast({
        title: 'Você já está em um guichê',
        description: 'Saia do guichê atual antes de ocupar outro.',
        variant: 'destructive',
      });
      return;
    }
    occupyBooth(boothId);
    setShowServicePanel(true);
    toast({
      title: 'Guichê ocupado',
      description: 'Você está pronto para atender.',
    });
  };

  const handleLeave = (boothId: string) => {
    leaveBooth(boothId);
    setShowServicePanel(false);
    toast({
      title: 'Guichê liberado',
      description: 'Você saiu do guichê.',
    });
  };

  const handleBoothClick = () => {
    if (occupiedBoothId) {
      setShowServicePanel(true);
    }
  };

  // If attendant has an occupied booth and wants to see service panel
  if (showServicePanel && occupiedBooth) {
    return (
      <BoothServicePanel 
        booth={occupiedBooth} 
        onBack={() => setShowServicePanel(false)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Store Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Selecione a Loja</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="Selecione uma loja" />
            </SelectTrigger>
            <SelectContent>
              {stores.map(store => (
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Booths */}
      {selectedStore && (
        <Card>
          <CardHeader>
            <CardTitle>Guichês Disponíveis</CardTitle>
            {occupiedBoothId && (
              <p className="text-sm text-muted-foreground">
                Você está ocupando um guichê. Clique nele para acessar o painel de atendimento.
              </p>
            )}
          </CardHeader>
          <CardContent>
            {storeBooths.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum guichê disponível nesta loja.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {storeBooths.map(booth => (
                  <BoothCard
                    key={booth.id}
                    booth={booth}
                    isManager={false}
                    isCurrentUserBooth={booth.attendantId === currentUserId}
                    onOccupy={() => handleOccupy(booth.id)}
                    onLeave={() => handleLeave(booth.id)}
                    onClick={handleBoothClick}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AttendantView;
