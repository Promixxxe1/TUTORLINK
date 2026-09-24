const tabs = ["Profile", "Security", "Notifications", "Account"];

export default function SettingsTabs({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[130px] py-3 rounded-xl font-semibold transition-all duration-300

            ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
