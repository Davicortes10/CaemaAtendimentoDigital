import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PeriodComparisonProps {
  onCompare: (period1: DateRange | undefined, period2: DateRange | undefined) => void;
}

const PeriodComparison = ({ onCompare }: PeriodComparisonProps) => {
  const [period1, setPeriod1] = useState<DateRange | undefined>();
  const [period2, setPeriod2] = useState<DateRange | undefined>();
  const [showComparison, setShowComparison] = useState(false);

  // Dados mockados para demonstração
  const [comparisonData] = useState({
    period1: {
      tme: 5.2,
      tma: 12.8,
      tmo: 18.0,
    },
    period2: {
      tme: 5.5,
      tma: 13.2,
      tmo: 18.7,
    },
  });

  const handleCompare = () => {
    if (period1 && period2) {
      setShowComparison(true);
      onCompare(period1, period2);
    }
  };

  const handleClear = () => {
    setPeriod1(undefined);
    setPeriod2(undefined);
    setShowComparison(false);
    onCompare(undefined, undefined);
  };

  const calculateDifference = (value1: number, value2: number) => {
    const diff = ((value1 - value2) / value2) * 100;
    return {
      value: Math.abs(diff),
      isPositive: diff < 0, // Menor é melhor para esses indicadores
      diff: value1 - value2,
    };
  };

  const DifferenceIndicator = ({ value1, value2, label }: { value1: number; value2: number; label: string }) => {
    const diff = calculateDifference(value1, value2);
    
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Período 1</p>
            <p className="text-2xl font-bold">{value1.toFixed(2)} min</p>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            {diff.isPositive ? (
              <TrendingDown className="h-5 w-5 text-green-600" />
            ) : diff.value === 0 ? (
              <Minus className="h-5 w-5 text-muted-foreground" />
            ) : (
              <TrendingUp className="h-5 w-5 text-red-600" />
            )}
            <p className={cn(
              "text-sm font-semibold",
              diff.isPositive ? "text-green-600" : diff.value === 0 ? "text-muted-foreground" : "text-red-600"
            )}>
              {diff.value === 0 ? '0%' : `${diff.isPositive ? '-' : '+'}${diff.value.toFixed(1)}%`}
            </p>
            <p className="text-xs text-muted-foreground">
              {diff.diff > 0 ? '+' : ''}{diff.diff.toFixed(2)} min
            </p>
          </div>
          
          <div className="flex-1 text-right">
            <p className="text-xs text-muted-foreground">Período 2</p>
            <p className="text-2xl font-bold">{value2.toFixed(2)} min</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparação de Períodos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Período 1 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Período 1</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !period1 && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {period1?.from ? (
                    period1.to ? (
                      <>
                        {format(period1.from, 'dd/MM/yyyy', { locale: ptBR })} -{' '}
                        {format(period1.to, 'dd/MM/yyyy', { locale: ptBR })}
                      </>
                    ) : (
                      format(period1.from, 'dd/MM/yyyy', { locale: ptBR })
                    )
                  ) : (
                    <span>Selecione o período 1</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={period1?.from}
                  selected={period1}
                  onSelect={setPeriod1}
                  numberOfMonths={2}
                  locale={ptBR}
                  className={cn('p-3 pointer-events-auto')}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Período 2 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Período 2</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !period2 && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {period2?.from ? (
                    period2.to ? (
                      <>
                        {format(period2.from, 'dd/MM/yyyy', { locale: ptBR })} -{' '}
                        {format(period2.to, 'dd/MM/yyyy', { locale: ptBR })}
                      </>
                    ) : (
                      format(period2.from, 'dd/MM/yyyy', { locale: ptBR })
                    )
                  ) : (
                    <span>Selecione o período 2</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={period2?.from}
                  selected={period2}
                  onSelect={setPeriod2}
                  numberOfMonths={2}
                  locale={ptBR}
                  className={cn('p-3 pointer-events-auto')}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCompare}
            disabled={!period1 || !period2}
            className="flex-1"
          >
            Comparar Períodos
          </Button>
          {showComparison && (
            <Button variant="outline" onClick={handleClear}>
              Limpar
            </Button>
          )}
        </div>

        {showComparison && period1 && period2 && (
          <div className="space-y-6 rounded-lg border bg-muted/50 p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Comparando</p>
              <div className="mt-1 flex items-center justify-center gap-2 text-sm">
                <span className="font-semibold">
                  {format(period1.from!, 'dd/MM/yyyy', { locale: ptBR })} - {format(period1.to!, 'dd/MM/yyyy', { locale: ptBR })}
                </span>
                <span className="text-muted-foreground">vs</span>
                <span className="font-semibold">
                  {format(period2.from!, 'dd/MM/yyyy', { locale: ptBR })} - {format(period2.to!, 'dd/MM/yyyy', { locale: ptBR })}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <DifferenceIndicator
                value1={comparisonData.period1.tme}
                value2={comparisonData.period2.tme}
                label="TME - Tempo Médio de Espera"
              />
              <DifferenceIndicator
                value1={comparisonData.period1.tma}
                value2={comparisonData.period2.tma}
                label="TMA - Tempo Médio de Atendimento"
              />
              <DifferenceIndicator
                value1={comparisonData.period1.tmo}
                value2={comparisonData.period2.tmo}
                label="TMO - Tempo Médio de Operação"
              />
            </div>

            <div className="rounded-lg bg-background p-3">
              <p className="text-sm font-medium">Análise</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {comparisonData.period1.tmo < comparisonData.period2.tmo
                  ? '✓ Houve melhora no desempenho geral. O TMO foi reduzido, indicando maior eficiência no atendimento.'
                  : '⚠ O desempenho apresentou queda. O TMO aumentou, sugerindo necessidade de otimização nos processos.'}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PeriodComparison;
