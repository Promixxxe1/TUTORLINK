import { RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

export default function RefreshButton() {
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const onStart = () => setSpinning(true);
    const onEnd = () => setSpinning(false);

    window.addEventListener("manualRefreshStart", onStart);
    window.addEventListener("manualRefreshEnd", onEnd);

    return () => {
      window.removeEventListener("manualRefreshStart", onStart);
      window.removeEventListener("manualRefreshEnd", onEnd);
    };
  }, []);

  const handleClick = () => {
    // Immediately reload the whole page so data refreshes fully
    window.dispatchEvent(new CustomEvent("manualRefreshStart"));
    // Small delay to let spinner appear, then reload
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <button
      onClick={handleClick}
      title="Refresh data"
      className={`w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-100 transition ${spinning ? "text-blue-600" : "text-slate-700"}`}
    >
      <RefreshCw size={18} className={spinning ? "animate-spin" : ""} />
    </button>
  );
}
