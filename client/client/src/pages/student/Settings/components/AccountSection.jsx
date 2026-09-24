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
      {/* Account Info */}
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
          <div>
            <p className="text-sm text-slate-500">Full Name</p>
            <h3 className="font-semibold">{user?.name}</h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>
            <h3 className="font-semibold">{user?.email}</h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">Role</p>
            <h3 className="font-semibold capitalize">{user?.role}</h3>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <h2 className="text-xl font-bold mb-6">Logout</h2>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-red-700">Danger Zone</h2>

        <p className="text-red-600 mt-3">
          Permanently delete your account. This action cannot be undone.
        </p>

        <button
          onClick={() => navigate("/student/account-delete")}
          className="mt-8 flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
        >
          <Trash2 size={18} />
          Delete Account
        </button>
      </div>
    </div>
  );
}
