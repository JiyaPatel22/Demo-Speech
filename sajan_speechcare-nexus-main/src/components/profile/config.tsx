
import { User, Phone, Heart, ShieldCheck, Upload, Bell } from "lucide-react";
import { ProfileTab } from "./types";

export const tabs: ProfileTab[] = [
  { id: "personal", label: "Personal Info", icon: <User className="w-4 h-4" /> },
  { id: "medical", label: "Medical History", icon: <Heart className="w-4 h-4" /> },
  { id: "insurance", label: "Insurance", icon: <ShieldCheck className="w-4 h-4" /> },
  { id: "emergency", label: "Emergency Contacts", icon: <Phone className="w-4 h-4" /> },
  { id: "settings", label: "Settings", icon: <Bell className="w-4 h-4" /> },
  { id: "documents", label: "Documents", icon: <Upload className="w-4 h-4" /> },
];
