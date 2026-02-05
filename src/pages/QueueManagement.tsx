import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import ManagerView from '@/components/queue/ManagerView';
import AttendantView from '@/components/queue/AttendantView';

const QueueManagement = () => {
  const { user } = useAuth();
  const userRole = user?.role || 'atendente';

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Gerenciamento de Filas</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie guichês e atendimentos
          </p>
        </div>

        {userRole === 'gerente' ? <ManagerView /> : <AttendantView />}
      </div>
    </DashboardLayout>
  );
};

export default QueueManagement;
