
export interface ProfileTab {
  id: "personal" | "medical" | "insurance" | "emergency" | "settings" | "documents";
  label: string;
  icon: React.ReactNode;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
