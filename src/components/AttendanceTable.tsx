import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import * as XLSX from 'xlsx';

interface AttendanceRecord {
  id: string;
  ticket: string;
  attendant: string;
  store: string;
  city: string;
  waitTime: number;
  serviceTime: number;
  totalTime: number;
  date: string;
  serviceType: string;
  quality: 'excellent' | 'good' | 'regular' | 'bad';
  satisfaction: number;
  status: 'completed' | 'cancelled';
}

// Mock data - será substituído pelos dados da API
const mockData: AttendanceRecord[] = [
  { id: '1', ticket: 'A001', attendant: 'Maria Silva', store: 'Loja Centro', city: 'São Luís', waitTime: 4.5, serviceTime: 12.3, totalTime: 16.8, date: '2024-01-15 09:30', serviceType: '2ª Via de Conta', quality: 'excellent', satisfaction: 5, status: 'completed' },
  { id: '2', ticket: 'A002', attendant: 'João Santos', store: 'Loja Centro', city: 'São Luís', waitTime: 3.2, serviceTime: 15.1, totalTime: 18.3, date: '2024-01-15 09:45', serviceType: 'Religação', quality: 'good', satisfaction: 4, status: 'completed' },
  { id: '3', ticket: 'A003', attendant: 'Ana Costa', store: 'Loja Sul', city: 'Imperatriz', waitTime: 6.1, serviceTime: 10.5, totalTime: 16.6, date: '2024-01-15 10:00', serviceType: 'Cadastro', quality: 'excellent', satisfaction: 5, status: 'completed' },
  { id: '4', ticket: 'A004', attendant: 'Carlos Lima', store: 'Loja Norte', city: 'Caxias', waitTime: 5.0, serviceTime: 14.2, totalTime: 19.2, date: '2024-01-15 10:15', serviceType: 'Negociação', quality: 'regular', satisfaction: 3, status: 'completed' },
  { id: '5', ticket: 'A005', attendant: 'Maria Silva', store: 'Loja Centro', city: 'São Luís', waitTime: 2.8, serviceTime: 11.7, totalTime: 14.5, date: '2024-01-15 10:30', serviceType: '2ª Via de Conta', quality: 'good', satisfaction: 4, status: 'completed' },
  { id: '6', ticket: 'A006', attendant: 'Pedro Souza', store: 'Loja Oeste', city: 'Timon', waitTime: 7.2, serviceTime: 13.0, totalTime: 20.2, date: '2024-01-15 10:45', serviceType: 'Reclamação', quality: 'bad', satisfaction: 2, status: 'cancelled' },
  { id: '7', ticket: 'A007', attendant: 'Ana Costa', store: 'Loja Sul', city: 'Imperatriz', waitTime: 4.0, serviceTime: 9.8, totalTime: 13.8, date: '2024-01-15 11:00', serviceType: 'Alteração Cadastral', quality: 'excellent', satisfaction: 5, status: 'completed' },
  { id: '8', ticket: 'A008', attendant: 'João Santos', store: 'Loja Centro', city: 'São Luís', waitTime: 5.5, serviceTime: 16.3, totalTime: 21.8, date: '2024-01-15 11:15', serviceType: 'Negociação', quality: 'good', satisfaction: 4, status: 'completed' },
];

const getQualityLabel = (quality: AttendanceRecord['quality']) => {
  const labels = {
    excellent: 'Excelente',
    good: 'Bom',
    regular: 'Regular',
    bad: 'Ruim'
  };
  return labels[quality];
};

const getQualityColor = (quality: AttendanceRecord['quality']) => {
  const colors = {
    excellent: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    good: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    regular: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    bad: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };
  return colors[quality];
};

const AttendanceTable = () => {
  const [data] = useState<AttendanceRecord[]>(mockData);

  const exportToExcel = () => {
    const exportData = data.map(record => ({
      'Senha': record.ticket,
      'Atendente': record.attendant,
      'Loja': record.store,
      'Cidade': record.city,
      'Tipo de Serviço': record.serviceType,
      'Tempo Espera (min)': record.waitTime,
      'Tempo Atendimento (min)': record.serviceTime,
      'Tempo Total (min)': record.totalTime,
      'Qualidade': getQualityLabel(record.quality),
      'Satisfação (1-5)': record.satisfaction,
      'Data/Hora': record.date,
      'Status': record.status === 'completed' ? 'Concluído' : 'Cancelado'
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Atendimentos');
    
    // Ajustar largura das colunas
    const colWidths = [
      { wch: 8 }, { wch: 18 }, { wch: 15 }, { wch: 12 }, { wch: 18 },
      { wch: 16 }, { wch: 20 }, { wch: 16 }, { wch: 12 }, { wch: 14 },
      { wch: 18 }, { wch: 12 }
    ];
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, `atendimentos_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Registro de Atendimentos</CardTitle>
        <Button onClick={exportToExcel} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Exportar Excel
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Senha</TableHead>
                <TableHead>Atendente</TableHead>
                <TableHead>Loja</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Tipo de Serviço</TableHead>
                <TableHead className="text-right">Espera</TableHead>
                <TableHead className="text-right">Atendimento</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Qualidade</TableHead>
                <TableHead className="text-center">Satisfação</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.ticket}</TableCell>
                  <TableCell>{record.attendant}</TableCell>
                  <TableCell>{record.store}</TableCell>
                  <TableCell>{record.city}</TableCell>
                  <TableCell>{record.serviceType}</TableCell>
                  <TableCell className="text-right">{record.waitTime.toFixed(1)} min</TableCell>
                  <TableCell className="text-right">{record.serviceTime.toFixed(1)} min</TableCell>
                  <TableCell className="text-right">{record.totalTime.toFixed(1)} min</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getQualityColor(record.quality)}`}>
                      {getQualityLabel(record.quality)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-yellow-500">{'★'.repeat(record.satisfaction)}{'☆'.repeat(5 - record.satisfaction)}</span>
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        record.status === 'completed'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {record.status === 'completed' ? 'Concluído' : 'Cancelado'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceTable;
