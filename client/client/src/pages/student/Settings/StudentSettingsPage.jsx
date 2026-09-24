import { useState } from "react";

import SettingsTabs from "./components/SettingsTabs";
import ProfileSection from "./components/ProfileSection";
import SecuritySection from "./components/SecuritySection";
import NotificationSection from "./components/NotificationSection";
import AccountSection from "./components/AccountSection";

export default function StudentSettingsPage() {
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
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800">Settings</h1>

          <p className="text-slate-500 mt-2">Manage your account preferences</p>
        </div>

        {/* Tabs */}

        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}

        <div className="mt-8">{renderSection()}</div>
      </div>
    </div>
  );
}
