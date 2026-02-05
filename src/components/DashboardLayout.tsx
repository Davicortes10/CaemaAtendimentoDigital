import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, BarChart3, Users } from 'lucide-react';
import caemaLogo from '@/assets/caema-logo.png';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col bg-sidebar text-sidebar-foreground">
        <div className="flex h-16 items-center justify-center border-b border-sidebar-border px-4">
          <img src={caemaLogo} alt="CAEMA" className="h-12 object-contain" />
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          {user?.role === 'gerente' && (
            <>
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                Indicadores
              </div>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive('/dashboard') && "bg-sidebar-accent"
                )}
                onClick={() => navigate('/dashboard')}
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                Visão Geral
              </Button>
            </>
          )}
          
          <div className={cn("mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60", user?.role === 'gerente' && "mt-4")}>
            Atendimento
          </div>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive('/filas') && "bg-sidebar-accent"
            )}
            onClick={() => navigate('/filas')}
          >
            <Users className="mr-3 h-5 w-5" />
            Gerenciamento de Filas
          </Button>
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-sidebar-foreground/60">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="sidebar"
            size="sm"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
