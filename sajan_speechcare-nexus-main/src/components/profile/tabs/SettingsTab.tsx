
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SettingsTabProps {
  notificationEmail: boolean;
  setNotificationEmail: (value: boolean) => void;
  notificationSMS: boolean;
  setNotificationSMS: (value: boolean) => void;
  language: string;
  setLanguage: (value: string) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
}

export const SettingsTab = ({
  notificationEmail,
  setNotificationEmail,
  notificationSMS,
  setNotificationSMS,
  language,
  setLanguage,
  highContrast,
  setHighContrast,
}: SettingsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications">Email Notifications</Label>
            <Switch
              id="emailNotifications"
              checked={notificationEmail}
              onCheckedChange={setNotificationEmail}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="smsNotifications">SMS Notifications</Label>
            <Switch
              id="smsNotifications"
              checked={notificationSMS}
              onCheckedChange={setNotificationSMS}
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-medium">Language & Accessibility</h3>
        <div className="space-y-2">
          <Label htmlFor="language">Preferred Language</Label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="highContrast">High Contrast Mode</Label>
          <Switch
            id="highContrast"
            checked={highContrast}
            onCheckedChange={setHighContrast}
          />
        </div>
      </div>
    </div>
  );
};
