import { useState } from "react";
import { AlertTriangle, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userAPI } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

export default function AccountDeletionPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== "DELETE") {
      return toast.error('Type "DELETE" to continue.');
    }

    if (!password) {
      return toast.error("Please enter your password.");
    }

    try {
      setLoading(true);

      await userAPI.deleteAccount({
        password,
      });

      
      toast.success("Account deleted successfully.");

      await logout();

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-red-200 overflow-hidden">
        {/* Header */}

        <div className="bg-red-50 p-8 border-b border-red-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-red-700">
                Delete Account
              </h1>

              <p className="text-red-600 mt-2">
                This action is permanent and cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}

        <div className="p-8">
          <h2 className="font-semibold text-lg mb-4">
            Deleting your account will permanently remove:
          </h2>

          <ul className="space-y-3 text-slate-600 list-disc list-inside">
            <li>Your profile information</li>

            <li>Messages</li>

            <li>Bookings</li>

            <li>Reviews</li>

            <li>Saved tutors</li>

            <li>Notification preferences</li>

            <li>All account data</li>
          </ul>

          {/* Confirm */}

          <div className="mt-10">
            <label className="block font-semibold mb-2">
              Type <span className="text-red-600">DELETE</span> to confirm
            </label>

            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Password */}

          <div className="mt-6">
            <label className="block font-semibold mb-2">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl disabled:opacity-50"
            >
              <Trash2 size={18} />

              {loading ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
