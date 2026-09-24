
import { useState } from "react";

import SettingsTabs from "./Settings/components/SettingsTabs";
import ProfileSection from "./Settings/components/ProfileSection";
import SecuritySection from "./Settings/components/SecuritySection";
import NotificationSection from "./Settings/components/NotificationSection";
import AccountSection from "./Settings/components/AccountSection";

export default function TutorSettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderSection = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileSection />;

      case "Security":
        return <SecuritySection />;

      case "Notifications":
        return <NotificationSection />;

      case "Account":
        return <AccountSection />;

      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800">
            Settings
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your tutor account preferences
          </p>
        </div>


        {/* Settings Tabs */}

        <SettingsTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />


        {/* Active Settings Section */}

        <div className="mt-8">
          {renderSection()}
        </div>

      </div>
    </div>
  );
}
