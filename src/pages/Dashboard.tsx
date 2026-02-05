import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import DashboardLayout from '@/components/DashboardLayout';
import FilterBar from '@/components/FilterBar';
import IndicatorCard from '@/components/IndicatorCard';
import PeriodComparison from '@/components/PeriodComparison';
import { Clock, Timer, TrendingUp } from 'lucide-react';
import AttendanceTable from '@/components/AttendanceTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { indicatorsService, FilterOptions } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Dados mockados para demonstração - serão substituídos pelos dados da API
  const [summaryData, setSummaryData] = useState({
    avgTME: 5.2,
    avgTMA: 12.8,
    avgTMO: 18.0,
  });

  const [chartData] = useState([
    { name: 'São Luís', TME: 5.1, TMA: 12.5, TMO: 17.6 },
    { name: 'Imperatriz', TME: 5.3, TMA: 13.0, TMO: 18.3 },
    { name: 'Caxias', TME: 5.0, TMA: 12.8, TMO: 17.8 },
    { name: 'Timon', TME: 5.4, TMA: 12.9, TMO: 18.3 },
    { name: 'Codó', TME: 5.2, TMA: 12.7, TMO: 17.9 },
  ]);

  const [trendData] = useState([
    { month: 'Jan', TME: 5.5, TMA: 13.2, TMO: 18.7 },
    { month: 'Fev', TME: 5.4, TMA: 13.0, TMO: 18.4 },
    { month: 'Mar', TME: 5.3, TMA: 12.9, TMO: 18.2 },
    { month: 'Abr', TME: 5.2, TMA: 12.8, TMO: 18.0 },
    { month: 'Mai', TME: 5.1, TMA: 12.6, TMO: 17.7 },
    { month: 'Jun', TME: 5.0, TMA: 12.5, TMO: 17.5 },
  ]);

  const loadIndicators = async (newFilters: FilterOptions) => {
    setIsLoading(true);
    try {
      // Quando a API estiver pronta, substituir pelos dados reais
      // const data = await indicatorsService.getAttendantIndicators(newFilters);
      
      // Por enquanto, simulando um carregamento
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Aqui você processaria os dados da API
      // setSummaryData({ avgTME: ..., avgTMA: ..., avgTMO: ... });
      
    } catch (error) {
      console.error('Erro ao carregar indicadores:', error);
      toast({
        title: 'Erro ao carregar dados',
        description: 'Não foi possível carregar os indicadores. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    loadIndicators(newFilters);
  };

  const handlePeriodComparison = (period1: DateRange | undefined, period2: DateRange | undefined) => {
    // Aqui você faria a requisição à API com os dois períodos para comparação
    console.log('Comparando períodos:', { period1, period2 });
  };

  useEffect(() => {
    loadIndicators({});
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard de Indicadores</h1>
          <p className="text-muted-foreground">
            Acompanhe os principais indicadores de atendimento em tempo real
          </p>
        </div>

        {/* Filters */}
        <FilterBar onFilterChange={handleFilterChange} />

        {/* Period Comparison */}
        <PeriodComparison onCompare={handlePeriodComparison} />

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <IndicatorCard
            title="TME - Tempo Médio de Espera"
            value={summaryData.avgTME}
            icon={Clock}
            color="primary"
            trend={{ value: -2.3, isPositive: true }}
          />
          <IndicatorCard
            title="TMA - Tempo Médio de Atendimento"
            value={summaryData.avgTMA}
            icon={Timer}
            color="secondary"
            trend={{ value: -1.8, isPositive: true }}
          />
          <IndicatorCard
            title="TMO - Tempo Médio de Operação"
            value={summaryData.avgTMO}
            icon={TrendingUp}
            color="accent"
            trend={{ value: -2.1, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Indicadores por Cidade</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="TME" fill="hsl(var(--chart-1))" name="TME (min)" />
                  <Bar dataKey="TMA" fill="hsl(var(--chart-2))" name="TMA (min)" />
                  <Bar dataKey="TMO" fill="hsl(var(--chart-3))" name="TMO (min)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Tendência dos Últimos 6 Meses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="TME"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="TME (min)"
                  />
                  <Line
                    type="monotone"
                    dataKey="TMA"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="TMA (min)"
                  />
                  <Line
                    type="monotone"
                    dataKey="TMO"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    name="TMO (min)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Table */}
        <AttendanceTable />

        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">Carregando dados...</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
