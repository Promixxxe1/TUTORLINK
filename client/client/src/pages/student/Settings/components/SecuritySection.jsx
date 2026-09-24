import { useState } from "react";
import { userAPI } from "../../../../services/api";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "react-toastify";

export default function SecuritySection() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
const [showNew, setShowNew] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const getPasswordStrength = (password) => {
    if (password.length < 6) {
      return {
        text: "Weak",
        color: "bg-red-500",
        width: "w-1/3",
      };
    }

    if (password.length >= 6 && /[A-Z]/.test(password) && /\d/.test(password)) {
      return {
        text: "Strong",
        color: "bg-green-500",
        width: "w-full",
      };
    }

    return {
      text: "Medium",
      color: "bg-yellow-500",
      width: "w-2/3",
    };
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await userAPI.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password changed successfully");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      toast.warning(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };
  const strength = getPasswordStrength(form.newPassword);

    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-8">
          Security Settings
        </h2>

        {/* Current Password */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-slate-700">
            Current Password
          </label>

          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            className="
          w-full
          rounded-xl
          border
          border-slate-300
          px-4
          py-3
          outline-none
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
          transition
        "
          />
        </div>

        {/* New Password */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-slate-700">
            New Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-slate-300 pl-11 pr-12 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${strength.color} ${strength.width} transition-all duration-300`}
            />
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Password Strength:
            <span className="font-semibold ml-1">{strength.text}</span>
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            Confirm Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            

            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-slate-300 pl-11 pr-12 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button
            type="submit"
            disabled={loading}
            className="
          inline-flex
          items-center
          gap-2
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold
          transition
          disabled:opacity-50
        "
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>
    );

}
