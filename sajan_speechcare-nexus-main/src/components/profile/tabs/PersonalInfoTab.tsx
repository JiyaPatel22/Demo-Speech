
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PersonalInfo } from "../types";

interface PersonalInfoTabProps {
  personalInfo: PersonalInfo;
  onInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoTab = ({ personalInfo, onInfoChange }: PersonalInfoTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={personalInfo.firstName}
            onChange={onInfoChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={personalInfo.lastName}
            onChange={onInfoChange}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={personalInfo.email}
          onChange={onInfoChange}
          disabled
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={personalInfo.phone}
          onChange={onInfoChange}
        />
      </div>
    </div>
  );
};
