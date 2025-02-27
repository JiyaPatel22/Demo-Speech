import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Search } from "lucide-react";
import { toast } from "sonner";

interface PatientFormData {
  name: string;
  id: string;
  age: number;
  gender: string;
  diagnosis: string;
  treatmentPlan: string;
  notes: string;
}

// Mock patient data (in a real app, this would come from a database)
const mockPatients: PatientFormData[] = [
  {
    name: "John Smith",
    id: "PT0001",
    age: 45,
    gender: "male",
    diagnosis: "Speech delay",
    treatmentPlan: "Weekly sessions",
    notes: "Shows steady improvement",
  },
  {
    name: "Sarah Johnson",
    id: "PT0002",
    age: 28,
    gender: "female",
    diagnosis: "Stuttering",
    treatmentPlan: "Bi-weekly sessions",
    notes: "Responsive to therapy",
  },
];

const generatePatientId = () => {
  return `PT${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
};

const Patients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<PatientFormData>({
    name: "",
    id: generatePatientId(),
    age: 0,
    gender: "",
    diagnosis: "",
    treatmentPlan: "",
    notes: "",
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const foundPatient = mockPatients.find(
      (patient) => patient.name.toLowerCase().includes(query.toLowerCase())
    );

    if (foundPatient && query.length > 0) {
      setFormData(foundPatient);
      toast.success(`Found patient: ${foundPatient.name}`);
    } else if (query.length > 0) {
      setFormData({
        name: "",
        id: generatePatientId(),
        age: 0,
        gender: "",
        diagnosis: "",
        treatmentPlan: "",
        notes: "",
      });
      toast.error("No patient found with that name");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting patient data:", formData);
    toast.success("Patient details saved successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Patient Details</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for existing patients..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Patient Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="id" className="text-sm font-medium text-gray-700">
                Patient ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                readOnly
                value={formData.id}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="0"
                max="150"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="diagnosis" className="text-sm font-medium text-gray-700">
              Diagnosis / Condition
            </label>
            <textarea
              id="diagnosis"
              name="diagnosis"
              required
              value={formData.diagnosis}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="treatmentPlan" className="text-sm font-medium text-gray-700">
              Treatment Plan
            </label>
            <textarea
              id="treatmentPlan"
              name="treatmentPlan"
              required
              value={formData.treatmentPlan}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Doctor's Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Medical Records
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/90"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, PNG, JPG up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button type="submit" className="w-full md:w-auto">
              Save Patient Details
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Patients;
