import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Phone, Heart, ShieldCheck, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { tabs } from "./config";
import { PersonalInfoTab } from "./tabs/PersonalInfoTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { fetchUserProfile, updateUserProfile } from "./profileService";
import type { ProfileTab, PersonalInfo } from "./types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab["id"]>("personal");
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationSMS, setNotificationSMS] = useState(true);
  const [language, setLanguage] = useState("english");
  const [highContrast, setHighContrast] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        if (data) {
          const { profile, user } = data;
          setUserId(user.id);
          setPersonalInfo({
            firstName: profile.first_name || "",
            lastName: profile.last_name || "",
            email: user.email || "",
            phone: "",
          });
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        toast.error("Failed to load profile");
      }
    };
    loadProfile();
  }, []);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      await updateUserProfile(userId, personalInfo);
      toast.success("Changes saved successfully");
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || "Failed to save changes");
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalInfoTab
            personalInfo={personalInfo}
            onInfoChange={handlePersonalInfoChange}
          />
        );

      case "settings":
        return (
          <SettingsTab
            notificationEmail={notificationEmail}
            setNotificationEmail={setNotificationEmail}
            notificationSMS={notificationSMS}
            setNotificationSMS={setNotificationSMS}
            language={language}
            setLanguage={setLanguage}
            highContrast={highContrast}
            setHighContrast={setHighContrast}
          />
        );

      case "medical":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="conditions">Existing Conditions</Label>
              <Textarea
                id="conditions"
                placeholder="List any existing medical conditions..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                placeholder="List current medications..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                placeholder="List any allergies..."
              />
            </div>
          </div>
        );

      case "insurance":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Insurance Provider</Label>
              <Input id="provider" defaultValue="HealthCare Plus" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="policyNumber">Policy Number</Label>
              <Input id="policyNumber" defaultValue="HC123456789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="groupNumber">Group Number</Label>
              <Input id="groupNumber" defaultValue="GP987654" />
            </div>
          </div>
        );

      case "emergency":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Primary Contact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Name</Label>
                  <Input id="emergencyName" defaultValue="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input id="relationship" defaultValue="Spouse" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Phone</Label>
                <Input id="emergencyPhone" type="tel" defaultValue="+1 234 567 8901" />
              </div>
            </div>
          </div>
        );

      case "documents":
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-gray-600">
                Drag and drop files here, or{" "}
                <button className="text-primary hover:underline" onClick={() => toast.info("Upload feature coming soon")}>
                  browse
                </button>
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Recent Documents</h3>
              <div className="space-y-2">
                {["Medical Report - March 2024", "Insurance Card", "Prescription Record"].map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm">{doc}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.info("Download feature coming soon")}
                    >
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2"
          >
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        {renderTabContent()}
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
