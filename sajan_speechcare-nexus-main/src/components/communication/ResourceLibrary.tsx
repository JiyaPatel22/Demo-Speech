
import { Book, Download, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Resource {
  id: string;
  title: string;
  type: "exercise" | "material" | "education" | "schedule";
  description: string;
  date: string;
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Articulation Exercises - Week 12",
    type: "exercise",
    description: "Daily practice exercises focusing on R sound production",
    date: "March 18, 2024",
  },
  {
    id: "2",
    title: "Speech Development Guide",
    type: "education",
    description: "Understanding the mechanics of speech production",
    date: "March 15, 2024",
  },
  {
    id: "3",
    title: "Practice Schedule - March",
    type: "schedule",
    description: "Recommended daily practice routine",
    date: "March 1, 2024",
  },
];

const getIcon = (type: Resource["type"]) => {
  switch (type) {
    case "exercise":
      return FileText;
    case "material":
      return Book;
    case "education":
      return Book;
    case "schedule":
      return Calendar;
  }
};

export const ResourceLibrary = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Resources</h2>
      <div className="space-y-4">
        {resources.map((resource) => {
          const Icon = getIcon(resource.type);
          return (
            <div
              key={resource.id}
              className="p-4 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {resource.description}
                    </p>
                    <span className="text-xs text-gray-500 mt-2 block">
                      Added: {resource.date}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info("Download coming soon")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
