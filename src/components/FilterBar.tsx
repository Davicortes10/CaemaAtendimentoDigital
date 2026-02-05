import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Filter, X } from 'lucide-react';
import { dataService } from '@/services/api';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  onFilterChange: (filters: {
    cityId?: string;
    storeId?: string;
    attendantId?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [stores, setStores] = useState<{ id: string; name: string; cityId: string }[]>([]);
  const [attendants, setAttendants] = useState<{ id: string; name: string; storeId: string }[]>([]);

  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [selectedStore, setSelectedStore] = useState<string | undefined>();
  const [selectedAttendant, setSelectedAttendant] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      loadStores(selectedCity);
      setSelectedStore(undefined);
      setSelectedAttendant(undefined);
    } else {
      setStores([]);
      setSelectedStore(undefined);
      setSelectedAttendant(undefined);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedStore) {
      loadAttendants(selectedStore);
      setSelectedAttendant(undefined);
    } else {
      setAttendants([]);
      setSelectedAttendant(undefined);
    }
  }, [selectedStore]);

  useEffect(() => {
    onFilterChange({
      cityId: selectedCity,
      storeId: selectedStore,
      attendantId: selectedAttendant,
      startDate: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
      endDate: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
    });
  }, [selectedCity, selectedStore, selectedAttendant, dateRange]);

  const loadCities = async () => {
    try {
      const data = await dataService.getCities();
      setCities(data);
    } catch (error) {
      console.error('Erro ao carregar cidades:', error);
    }
  };

  const loadStores = async (cityId: string) => {
    try {
      const data = await dataService.getStores(cityId);
      setStores(data);
    } catch (error) {
      console.error('Erro ao carregar lojas:', error);
    }
  };

  const loadAttendants = async (storeId: string) => {
    try {
      const data = await dataService.getAttendants(storeId);
      setAttendants(data);
    } catch (error) {
      console.error('Erro ao carregar atendentes:', error);
    }
  };

  const handleClearFilters = () => {
    setSelectedCity(undefined);
    setSelectedStore(undefined);
    setSelectedAttendant(undefined);
    setDateRange(undefined);
  };

  const hasActiveFilters = selectedCity || selectedStore || selectedAttendant || dateRange;

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            <X className="mr-2 h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger id="city">
              <SelectValue placeholder="Todas as cidades" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="store">Loja</Label>
          <Select value={selectedStore} onValueChange={setSelectedStore} disabled={!selectedCity}>
            <SelectTrigger id="store">
              <SelectValue placeholder="Todas as lojas" />
            </SelectTrigger>
            <SelectContent>
              {stores.map((store) => (
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="attendant">Atendente</Label>
          <Select
            value={selectedAttendant}
            onValueChange={setSelectedAttendant}
            disabled={!selectedStore}
          >
            <SelectTrigger id="attendant">
              <SelectValue placeholder="Todos os atendentes" />
            </SelectTrigger>
            <SelectContent>
              {attendants.map((attendant) => (
                <SelectItem key={attendant.id} value={attendant.id}>
                  {attendant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Período</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !dateRange && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR })} -{' '}
                      {format(dateRange.to, 'dd/MM/yyyy', { locale: ptBR })}
                    </>
                  ) : (
                    format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR })
                  )
                ) : (
                  <span>Selecione o período</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                locale={ptBR}
                className={cn('p-3 pointer-events-auto')}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
