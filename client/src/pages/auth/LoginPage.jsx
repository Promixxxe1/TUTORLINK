import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, BookOpen } from "lucide-react";
import { authAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      console.log(response.data.user);

      // Save token and user data
      // Save token and user data
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Update AuthContext immediately
      setUser(response.data.user);

      console.log(JSON.parse(localStorage.getItem("user")));

      setSuccess("Login successful!");
      setTimeout(() => {
        // Redirect based on role
        const user = response.data.user;
        if (user.role === "tutor") {
          navigate("/tutor");
        } else {
          navigate("/student/dashboard");
        }
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
        {/* Left panel - Branding */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-700 to-slate-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <BookOpen size={24} className="text-white" />
              </div>
              <span className="text-2xl font-extrabold">TutorLink</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Connect with Expert Tutors
            </h1>
            <p className="text-slate-200 text-lg leading-relaxed">
              Learn from the best tutors in your field. Get personalized
              attention and improve your skills today.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex -space-x-4 mb-4">
              {[1, 2, 3].map((n) => (
                <img
                  key={n}
                  className="w-12 h-12 rounded-full border-3 border-white object-cover"
                  src={`https://i.pravatar.cc/48?img=${n}`}
                  alt="tutor"
                />
              ))}
            </div>
            <p className="text-slate-200 font-medium">
              Trusted by 10,000+ students
            </p>
          </div>
        </div>

        {/* Right panel - Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            {/* Mobile logo */}
            <div className="md:hidden flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <BookOpen size={20} className="text-white" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900">
                TutorLink
              </span>
            </div>

            {/* Header */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to your account to continue learning
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                  {success}
                </div>
              )}
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-slate-700 focus:bg-white transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-900">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-slate-700 hover:text-slate-800 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-slate-700 focus:bg-white transition-all duration-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-slate-400 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Sign up link */}
            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-slate-700 hover:text-slate-800 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
