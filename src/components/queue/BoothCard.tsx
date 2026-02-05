import { Booth } from '@/types/queue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BoothCardProps {
  booth: Booth;
  isManager: boolean;
  isCurrentUserBooth: boolean;
  onOccupy?: () => void;
  onLeave?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

const BoothCard = ({ 
  booth, 
  isManager, 
  isCurrentUserBooth,
  onOccupy, 
  onLeave, 
  onDelete,
  onClick 
}: BoothCardProps) => {
  const canOccupy = !booth.isOccupied && !isManager;
  const canLeave = booth.isOccupied && isCurrentUserBooth;

  return (
    <Card 
      className={cn(
        "relative transition-all duration-300 cursor-pointer hover:shadow-lg",
        booth.isOccupied 
          ? "bg-[hsl(var(--booth-occupied))] text-white border-[hsl(var(--booth-occupied))]" 
          : "bg-[hsl(var(--booth-available))] text-white border-[hsl(var(--booth-available))]",
        canOccupy && "hover:scale-105"
      )}
      onClick={canOccupy ? onOccupy : (isCurrentUserBooth ? onClick : undefined)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">{booth.name}</h3>
            {booth.isOccupied && booth.attendantName && (
              <div className="flex items-center gap-1 mt-1 text-sm opacity-90">
                <User className="h-3 w-3" />
                <span>{booth.attendantName}</span>
              </div>
            )}
            {booth.currentTicket && (
              <div className="mt-2 text-sm font-medium">
                Senha: {booth.currentTicket.number}
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            {isManager && !booth.isOccupied && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            
            {canLeave && (
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onLeave?.();
                }}
              >
                Sair
              </Button>
            )}
          </div>
        </div>
        
        <div className="mt-2 text-xs opacity-75">
          {booth.isOccupied ? 'Ocupado' : 'Disponível'}
        </div>
      </CardContent>
    </Card>
  );
};

export default BoothCard;
