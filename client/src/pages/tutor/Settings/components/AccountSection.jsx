import { User, LogOut, Trash2 } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AccountSection() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="space-y-8">
      {/* Account Information */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          <User className="text-blue-600" size={28} />

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Account Information
            </h2>

            <p className="text-slate-500">View your account details.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <p className="text-sm text-slate-500">Full Name</p>

            <h3 className="font-semibold text-slate-800 mt-1">
              {user?.name || "Not available"}
            </h3>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm text-slate-500">Email</p>

            <h3 className="font-semibold text-slate-800 mt-1">
              {user?.email || "Not available"}
            </h3>
          </div>

          {/* Role */}
          <div>
            <p className="text-sm text-slate-500">Account Type</p>

            <h3 className="font-semibold text-slate-800 mt-1 capitalize">
              {user?.role || "Tutor"}
            </h3>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Logout</h2>

        <p className="text-slate-500 mb-6">
          Sign out of your TutorLink account on this device.
        </p>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
        <div className="flex items-start gap-4">
          <Trash2 className="text-red-600 flex-shrink-0 mt-1" size={24} />

          <div>
            <h2 className="text-2xl font-bold text-red-700">Danger Zone</h2>

            <p className="text-red-600 mt-2">
              Permanently delete your tutor account. This action cannot be
              undone.
            </p>
          </div>
        </div>

        <p className="text-sm text-red-500 mt-5">
          Account deletion will be handled separately.
        </p>
      </div>
    </div>
  );
}
