
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  FileText,
  CreditCard,
  Target,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface Reminder {
  id: string;
  type: 'exercise' | 'session' | 'document' | 'payment' | 'goal';
  title: string;
  date: string;
  completed: boolean;
}

export const SmartReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'exercise',
      title: 'Daily Speech Exercise',
      date: '2:00 PM Today',
      completed: false
    },
    {
      id: '2',
      type: 'session',
      title: 'Prepare for Tomorrow\'s Session',
      date: '6:00 PM Today',
      completed: false
    },
    {
      id: '3',
      type: 'payment',
      title: 'Monthly Payment Due',
      date: 'Tomorrow',
      completed: false
    }
  ]);

  const handleComplete = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, completed: true }
        : reminder
    ));
    toast.success("Reminder marked as complete!");
  };

  const getIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'exercise':
        return <Bell className="w-4 h-4" />;
      case 'session':
        return <Calendar className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'payment':
        return <CreditCard className="w-4 h-4" />;
      case 'goal':
        return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {reminders.map(reminder => (
        <div
          key={reminder.id}
          className={`flex items-center justify-between p-4 rounded-lg border ${
            reminder.completed ? 'bg-accent/5' : 'bg-background'
          }`}
        >
          <div className="flex items-center gap-3">
            {getIcon(reminder.type)}
            <div>
              <h3 className={`font-medium ${
                reminder.completed ? 'line-through text-muted-foreground' : ''
              }`}>
                {reminder.title}
              </h3>
              <p className="text-sm text-muted-foreground">{reminder.date}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleComplete(reminder.id)}
            disabled={reminder.completed}
          >
            <Check className="w-4 h-4 mr-2" />
            Complete
          </Button>
        </div>
      ))}
    </div>
  );
};
