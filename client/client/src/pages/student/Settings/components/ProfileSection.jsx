import { useState, useEffect } from "react";
import { userAPI } from "../../../../services/api.js";
import { useAuth } from "../../../../context/AuthContext";
import { Camera, Save } from "lucide-react";

export default function ProfileSection() {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    bio: user?.bio || "",
  });

  const [avatar, setAvatar] = useState(
    user?.avatar || `https://i.pravatar.cc/200?u=${user?.id}`,
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) return;

    setProfile({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
      bio: user.bio || "",
    });

    setAvatar(user.avatar || `https://i.pravatar.cc/200?u=${user.id}`);
  }, [user]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview immediately
    setAvatar(URL.createObjectURL(file));

    try {
      const res = await userAPI.updateAvatar(file);

      const updatedUser = {
        ...user,
        avatar: res.data.avatar,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err);
      alert("Failed to upload avatar");
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await userAPI.updateProfile({
        name: profile.name,
        bio: profile.bio,
      });

      const updatedUser = response.data.user;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile Updated!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile");
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

      <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-slate-200">
        {/* Avatar */}

        <div className="relative w-fit">
          <img
            src={avatar}
            alt=""
            className="w-28 h-28 rounded-3xl object-cover border-4 border-slate-100"
          />

          <label
            className="
            absolute
            bottom-0
            right-0
            w-10
            h-10
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            cursor-pointer
            hover:scale-110
            transition
          "
          >
            <Camera size={18} />

            <input type="file" accept="image/*" hidden onChange={handleImage} />
          </label>
        </div>

        {/* User */}

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">{profile.name}</h2>

          <p className="text-slate-500 mt-1">{profile.email}</p>

          <span
            className="
            inline-flex
            mt-3
            px-3
            py-1
            rounded-full
            bg-blue-100
            text-blue-700
            text-xs
            font-bold
            uppercase
          "
          >
            {profile.role}
          </span>
        </div>
      </div>

      {/* Form */}

      <div className="mt-8 space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
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

        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            value={profile.email}
            disabled
            className="
            w-full
            rounded-xl
            bg-slate-100
            border
            border-slate-200
            px-4
            py-3
            text-slate-500
            cursor-not-allowed
          "
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-slate-700">Bio</label>

          <textarea
            rows={5}
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Tell us a little about yourself..."
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            resize-none
            outline-none
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            transition
          "
          />
        </div>
      </div>

      {/* Footer */}

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
            <Save size={18} />
          )}
          Save Changes
        </button>
      </div>
    </form>
  );
}
