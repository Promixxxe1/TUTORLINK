import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

import { userAPI } from "../../../../services/api";

function PasswordInput({
  name,
  label,
  value,
  showPassword,
  onToggle,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-slate-700 mb-2"
      >
        {label}
      </label>

      <div className="relative w-full">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={
            name === "currentPassword"
              ? "current-password"
              : "new-password"
          }
          className="w-full h-12 px-4 pr-12 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            showPassword
              ? `Hide ${label}`
              : `Show ${label}`
          }
          className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-slate-500 hover:text-slate-700"
        >
          {showPassword ? (
            <EyeOff size={19} />
          ) : (
            <Eye size={19} />
          )}
        </button>
      </div>
    </div>
  );
}

export default function SecuritySection() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }

    if (!form.newPassword) {
      toast.error("Please enter a new password.");
      return;
    }

    if (form.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await userAPI.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password changed successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Lock
          className="text-blue-600 flex-shrink-0"
          size={28}
        />

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Security
          </h2>

          <p className="text-slate-500">
            Keep your TutorLink account secure.
          </p>
        </div>
      </div>

      {/* Security Information */}
      <div className="flex gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8">
        <ShieldCheck
          className="text-blue-600 flex-shrink-0"
          size={24}
        />

        <div>
          <h3 className="font-semibold text-slate-800">
            Change your password
          </h3>

          <p className="text-sm text-slate-600 mt-1">
            Use a strong password that you don't use on other
            websites.
          </p>
        </div>
      </div>

      {/* Password Fields */}
      <div className="space-y-6">
        <PasswordInput
          name="currentPassword"
          label="Current Password"
          value={form.currentPassword}
          showPassword={showCurrent}
          onToggle={() => setShowCurrent((prev) => !prev)}
          onChange={handleChange}
          placeholder="Enter your current password"
        />

        <PasswordInput
          name="newPassword"
          label="New Password"
          value={form.newPassword}
          showPassword={showNew}
          onToggle={() => setShowNew((prev) => !prev)}
          onChange={handleChange}
          placeholder="Enter your new password"
        />

        <PasswordInput
          name="confirmPassword"
          label="Confirm New Password"
          value={form.confirmPassword}
          showPassword={showConfirm}
          onToggle={() => setShowConfirm((prev) => !prev)}
          onChange={handleChange}
          placeholder="Confirm your new password"
        />
      </div>

      {/* Password Requirements */}
      <div className="mt-6 p-4 bg-slate-50 rounded-xl">
        <p className="text-sm font-semibold text-slate-700 mb-2">
          Password requirements
        </p>

        <ul className="text-sm text-slate-500 space-y-1">
          <li>• At least 6 characters</li>
          <li>• Use a combination of letters and numbers</li>
          <li>• Avoid using easily guessed passwords</li>
        </ul>
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </div>
    </form>
  );
}
