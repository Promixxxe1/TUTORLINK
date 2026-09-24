import { useEffect, useState } from "react";
import { Camera, Save, User } from "lucide-react";
import { toast } from "react-toastify";

import { userAPI } from "../../../../services/api";
import { useAuth } from "../../../../context/AuthContext";
import { getAvatarUrl } from "../../../../types";

export default function ProfileSection() {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setProfile({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
    });

    setAvatar(getAvatarUrl(user));
  }, [user]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await userAPI.updateProfile({
        name: profile.name.trim(),
      });

      const updatedUser = response.data?.user || response.data;

      const nextUser = {
        ...user,
        ...updatedUser,
        name: updatedUser.name || profile.name.trim(),
      };

      setUser(nextUser);
      localStorage.setItem("user", JSON.stringify(nextUser));

      toast.success("Profile information updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile information.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setAvatarLoading(true);

      const preview = URL.createObjectURL(file);
      setAvatar(preview);

      const response = await userAPI.updateAvatar(file);

      const avatarUrl = response.data?.avatar || response.data?.user?.avatar;

      const nextUser = {
        ...user,
        avatar: avatarUrl,
      };

      setUser(nextUser);
      localStorage.setItem("user", JSON.stringify(nextUser));

      setAvatar(getAvatarUrl(nextUser));

      toast.success("Profile picture updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to upload profile picture.",
      );
    } finally {
      setAvatarLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <User className="text-blue-600" size={28} />

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Profile Settings
          </h2>

          <p className="text-slate-500">
            Manage your basic account information.
          </p>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src={avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-slate-100"
          />

          <label
            htmlFor="settings-avatar"
            className="absolute bottom-0 right-0 w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center cursor-pointer transition"
          >
            <Camera size={17} />
          </label>

          <input
            id="settings-avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">Profile Picture</h3>

          <p className="text-sm text-slate-500 mt-1">
            Upload a new profile picture.
          </p>

          {avatarLoading && (
            <p className="text-sm text-blue-600 mt-2">Uploading...</p>
          )}
        </div>
      </div>

      {/* Name */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Email Address
        </label>

        <input
          type="email"
          value={profile.email}
          disabled
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
        />

        <p className="text-xs text-slate-400 mt-2">
          Your email address cannot be changed here.
        </p>
      </div>

      {/* Role */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Account Type
        </label>

        <input
          type="text"
          value={profile.role}
          disabled
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 capitalize cursor-not-allowed"
        />
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          <Save size={18} />

          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
