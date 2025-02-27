
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { format } from "date-fns";

interface ReportGeneratorProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

export const ReportGenerator = ({ dateRange }: ReportGeneratorProps) => {
  const [generating, setGenerating] = useState(false);

  const generateReport = async () => {
    setGenerating(true);
    // TODO: Implement report generation logic
    setTimeout(() => {
      setGenerating(false);
    }, 2000);
  };

  const reportTypes = [
    {
      title: "Progress Summary",
      description: "Overview of speech therapy progress and improvements",
      icon: FileText
    },
    {
      title: "Exercise Report",
      description: "Detailed analysis of exercise completion and performance",
      icon: FileText
    },
    {
      title: "Goals Achievement",
      description: "Summary of achieved and in-progress therapy goals",
      icon: FileText
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Generate Reports</h3>
        <p className="text-muted-foreground mb-6">
          Generate detailed reports for the period from {format(dateRange.from, 'PPP')} to {format(dateRange.to, 'PPP')}
        </p>
        
        <div className="grid gap-4 md:grid-cols-3">
          {reportTypes.map((report) => (
            <div 
              key={report.title}
              className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <report.icon className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-semibold mb-2">{report.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={generateReport}
                disabled={generating}
              >
                <Download className="h-4 w-4 mr-2" />
                Generate
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
