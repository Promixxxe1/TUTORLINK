import { useState, useEffect } from "react";
import { Camera, Plus, Trash2, Save } from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import { userAPI } from "../../services/api";

export default function TutorProfilePage() {
  const { user, setUser } = useAuth();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return;

      try {
        const response = await userAPI.getById(user.id);

        const tutor = response.data?.user || response.data;

        setName(tutor.name || "");
        setBio(tutor.bio || "");
        setCourses(tutor.courses || []);

        // Keep AuthContext/localStorage updated too
        const updatedUser = {
          ...user,
          ...tutor,
          courses: tutor.courses || [],
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to load tutor profile:", error);

        // Fallback to existing logged-in user data
        setName(user.name || "");
        setBio(user.bio || "");
        setCourses(user.courses || []);
      }
    };

    loadProfile();
  }, [user?.id]);

  // =========================
  // UPDATE BIO
  // =========================

  const handleSave = async (e) => {
    e.preventDefault();

    if (bio.length < 30) {
      toast.error("Bio must be at least 30 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await userAPI.updateProfile({
        name,
        bio,
      });

      const updatedUser = response.data.user;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE AVATAR
  // =========================

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setAvatarLoading(true);

      const response = await userAPI.updateAvatar(file);

      const updatedUser = {
        ...user,
        avatar: response.data.avatar,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile photo updated!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to upload profile photo.",
      );
    } finally {
      setAvatarLoading(false);
    }
  };

  // =========================
  // ADD COURSE
  // =========================

  const handleAddCourse = async (e) => {
    e.preventDefault();

    if (!courseName.trim()) {
      toast.error("Please enter a course name.");
      return;
    }

    if (!coursePrice || Number(coursePrice) < 0) {
      toast.error("Please enter a valid course price.");
      return;
    }

    try {
      setCourseLoading(true);

      const newCourse = {
        name: courseName.trim(),
        description: courseDescription.trim(),
        pricePerHour: Number(coursePrice),
      };

      const updatedCourses = [...courses, newCourse];

      const response = await userAPI.updateProfile({
        courses: updatedCourses,
      });

      const updatedUser = response.data.user;

      setUser(updatedUser);
      setCourses(updatedUser.courses || []);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setCourseName("");
      setCourseDescription("");
      setCoursePrice("");

      toast.success("Course added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add course.");
    } finally {
      setCourseLoading(false);
    }
  };

  // =========================
  // DELETE COURSE
  // =========================

  const handleDeleteCourse = async (courseId) => {
    try {
      setCourseLoading(true);

      const updatedCourses = courses.filter(
        (course) => course._id !== courseId,
      );

      const response = await userAPI.updateProfile({
        courses: updatedCourses,
      });

      const updatedUser = response.data.user;

      setUser(updatedUser);
      setCourses(updatedUser.courses || []);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Course removed successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove course.");
    } finally {
      setCourseLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800">My Profile</h1>

          <p className="text-slate-500 mt-2">
            Manage your public tutor profile and courses.
          </p>
        </div>

        {/* =========================
            PROFILE INFORMATION
        ========================= */}

        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Profile Information
              </h2>

              <p className="text-slate-500 mt-1">
                This information will be visible to students.
              </p>
            </div>
          </div>

          {/* Avatar */}

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <div className="relative">
              <img
                src={user.avatar || `https://i.pravatar.cc/200?u=${user.id}`}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />

              <label
                htmlFor="avatar-upload"
                className="absolute bottom-1 right-1 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md transition"
              >
                <Camera size={18} />
              </label>

              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>

              <p className="text-slate-500 mt-1">{user.email}</p>

              <p className="text-sm text-blue-600 font-semibold capitalize mt-2">
                {user.role}
              </p>

              {avatarLoading && (
                <p className="text-sm text-blue-600 mt-2">Uploading photo...</p>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-slate-400 mt-2">
              Your name is managed from your account information.
            </p>
          </div>

          {/* Email */}

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500"
            />
          </div>

          {/* Bio */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              About Me
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="6"
              placeholder="Tell students about yourself, your experience, teaching style, qualifications, and what you can help them learn..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            <div className="flex justify-between mt-2">
              <p className="text-xs text-slate-400">Minimum 30 characters</p>

              <p
                className={`text-xs ${
                  bio.length < 30 ? "text-red-500" : "text-green-600"
                }`}
              >
                {bio.length}/30
              </p>
            </div>
          </div>

          {/* Save */}

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={loading || bio.length < 30}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />

              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* =========================
            COURSES & PRICING
        ========================= */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 mt-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Courses & Pricing
            </h2>

            <p className="text-slate-500 mt-1">
              Add the courses you teach and set your price per hour.
            </p>
          </div>

          {/* Existing Courses */}

          <div className="space-y-4 mb-8">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div
                  key={course._id}
                  className="border border-slate-200 rounded-2xl p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        {course.name}
                      </h3>

                      <p className="text-slate-500 text-sm mt-2 leading-6">
                        {course.description || "No description provided."}
                      </p>

                      <p className="text-blue-600 font-bold mt-3">
                        ₦{Number(course.pricePerHour).toLocaleString()}
                        <span className="text-sm font-normal text-slate-500">
                          {" "}
                          / hour
                        </span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteCourse(course._id)}
                      disabled={courseLoading}
                      className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl transition"
                    >
                      <Trash2 size={17} />
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                <p className="text-slate-500">
                  You have not added any courses yet.
                </p>
              </div>
            )}
          </div>

          {/* Add Course */}

          <div className="border-t border-slate-200 pt-8">
            <div className="flex items-center gap-2 mb-6">
              <Plus className="text-blue-600" size={22} />

              <h3 className="text-xl font-bold text-slate-800">
                Add New Course
              </h3>
            </div>

            <form onSubmit={handleAddCourse}>
              <div className="grid md:grid-cols-2 gap-5">
                {/* Course Name */}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Course Name
                  </label>

                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g. Mathematics"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Price */}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Price Per Hour (₦)
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Description */}

              <div className="mt-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Course Description
                </label>

                <textarea
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  rows="4"
                  placeholder="Describe what students will learn..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={courseLoading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50"
                >
                  <Plus size={18} />

                  {courseLoading ? "Adding..." : "Add Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
