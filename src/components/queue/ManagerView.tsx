import { useState } from 'react';
import { useQueue } from '@/contexts/QueueContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Tv } from 'lucide-react';
import BoothCard from './BoothCard';
import { useToast } from '@/hooks/use-toast';

const ManagerView = () => {
  const { cities, getStoresByCity, getBoothsByStore, createBooth, deleteBooth } = useQueue();
  const { toast } = useToast();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedStore, setSelectedStore] = useState<string>('');

  const stores = selectedCity ? getStoresByCity(selectedCity) : [];
  const booths = selectedStore ? getBoothsByStore(selectedStore) : [];
  const selectedStoreName = stores.find(s => s.id === selectedStore)?.name || '';

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId);
    setSelectedStore('');
  };

  const handleCreateBooth = () => {
    if (!selectedStore) return;
    createBooth(selectedStore);
    toast({
      title: 'Guichê criado',
      description: 'Novo guichê adicionado com sucesso.',
    });
  };

  const handleDeleteBooth = (boothId: string) => {
    deleteBooth(boothId);
    toast({
      title: 'Guichê removido',
      description: 'Guichê removido com sucesso.',
    });
  };

  const handleOpenTV = () => {
    if (!selectedStore) return;
    window.open(`/tv?store=${selectedStore}`, '_blank');
    toast({
      title: 'Painel TV aberto',
      description: `Exibindo senhas da loja: ${selectedStoreName}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cidade</label>
              <Select value={selectedCity} onValueChange={handleCityChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma cidade" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Loja</label>
              <Select 
                value={selectedStore} 
                onValueChange={setSelectedStore}
                disabled={!selectedCity}
              >
                <SelectTrigger>
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booths */}
      {selectedStore && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Guichês</CardTitle>
            <div className="flex gap-2">
              <Button onClick={handleOpenTV} size="sm" variant="outline">
                <Tv className="mr-2 h-4 w-4" />
                Abrir TV - {selectedStoreName}
              </Button>
              <Button onClick={handleCreateBooth} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Criar Guichê
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {booths.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum guichê cadastrado nesta loja.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {booths.map(booth => (
                  <BoothCard
                    key={booth.id}
                    booth={booth}
                    isManager={true}
                    isCurrentUserBooth={false}
                    onDelete={() => handleDeleteBooth(booth.id)}
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

export default ManagerView;
