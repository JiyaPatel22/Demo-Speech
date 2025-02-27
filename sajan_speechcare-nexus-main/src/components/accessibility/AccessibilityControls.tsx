
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Type,
  Moon,
  Languages,
  Mic,
  Eye
} from "lucide-react";

export const AccessibilityControls = () => {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [language, setLanguage] = useState('english');
  const [voiceControl, setVoiceControl] = useState(false);

  const handleFontSizeChange = (increment: number) => {
    setFontSize(prev => Math.min(Math.max(12, prev + increment), 24));
    document.documentElement.style.fontSize = `${fontSize}px`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Text Size</h3>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => handleFontSizeChange(-1)}
            className="w-10 h-10 p-0"
          >
            <Type className="w-4 h-4" />
            -
          </Button>
          <span className="font-medium">{fontSize}px</span>
          <Button
            variant="outline"
            onClick={() => handleFontSizeChange(1)}
            className="w-10 h-10 p-0"
          >
            <Type className="w-4 h-4" />
            +
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Display</h3>
        <Button
          variant={highContrast ? "default" : "outline"}
          onClick={toggleHighContrast}
          className="w-full"
        >
          <Eye className="w-4 h-4 mr-2" />
          High Contrast Mode
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Language</h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 rounded-md border"
        >
          <option value="english">English</option>
          <option value="spanish">Español</option>
          <option value="french">Français</option>
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Voice Control</h3>
        <Button
          variant={voiceControl ? "default" : "outline"}
          onClick={() => setVoiceControl(!voiceControl)}
          className="w-full"
        >
          <Mic className="w-4 h-4 mr-2" />
          {voiceControl ? 'Voice Control Active' : 'Enable Voice Control'}
        </Button>
      </div>
    </div>
  );
};
