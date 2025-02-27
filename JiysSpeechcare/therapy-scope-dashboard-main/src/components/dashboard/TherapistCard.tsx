
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface TherapistCardProps {
  name: string;
  image: string;
  patientLoad: number;
  maxPatients: number;
  successRate: number;
  pendingReports: number;
}

export const TherapistCard = ({
  name,
  image,
  patientLoad,
  maxPatients,
  successRate,
  pendingReports,
}: TherapistCardProps) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    toast.info(`Viewing ${name}'s profile`);
    navigate(`/therapists/${name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleViewReports = () => {
    toast.info(`Viewing ${pendingReports} pending reports`);
    navigate(`/therapists/${name.toLowerCase().replace(/\s+/g, '-')}/reports`);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 cursor-pointer" onClick={handleViewProfile}>
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold hover:text-primary cursor-pointer" onClick={handleViewProfile}>
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {patientLoad} / {maxPatients} patients
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Patient Load</span>
              <span className="text-muted-foreground">
                {Math.round((patientLoad / maxPatients) * 100)}%
              </span>
            </div>
            <Progress value={(patientLoad / maxPatients) * 100} />
          </div>
          <div className="flex justify-between text-sm">
            <span>Success Rate</span>
            <span
              className={
                successRate >= 80
                  ? "text-green-600"
                  : successRate >= 60
                  ? "text-yellow-600"
                  : "text-red-600"
              }
            >
              {successRate}%
            </span>
          </div>
          {pendingReports > 0 && (
            <div 
              className="text-sm text-highlight cursor-pointer hover:underline" 
              onClick={handleViewReports}
            >
              {pendingReports} reports pending
            </div>
          )}
          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
