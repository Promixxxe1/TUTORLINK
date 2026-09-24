import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap, Users, CheckCircle } from "lucide-react";
import { authAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const roles = [
  {
    value: "student",
    label: "Student",
    icon: "school",
    desc: "I want to find a tutor and book lessons",
  },
  {
    value: "tutor",
    label: "Tutor",
    icon: "person_book",
    desc: "I want to teach and earn as an expert",
  },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await authAPI.signup({ name, email, password, role });

      console.log("Signup Response:", response.data); // Debug log

      // Save token and user data
      // Save token and user data
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Update AuthContext immediately
      setUser(response.data.user);

      setSuccess("Account created successfully!");
      setTimeout(() => {
        // Redirect based on role
        console.log("User role:", response.data.user.role); // Debug log
        if (response.data.user.role === "tutor") {
          navigate("/tutor");
        } else {
          navigate("/student/dashboard");
        }
      }, 1500);
    } catch (err) {
      console.error("Signup error:", err); // Debug log
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute top-0 right-0 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 flex">
        {/* Left Progress Bar */}
        <div className="w-1.5 bg-gray-200">
          <div
            className="w-full bg-gradient-to-b from-slate-700 to-slate-800 transition-all duration-500"
            style={{ height: step === 1 ? "50%" : "100%" }}
          />
        </div>

        <div className="flex-1 p-8 md:p-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-lg font-black text-slate-900">TutorLink</span>
          </div>

          <header className="mb-8">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-1">
              Step {step} of 2
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-1">
              {step === 1 ? "Choose Your Role" : "Create Your Account"}
            </h2>
            <p className="text-gray-600 text-sm">
              {step === 1
                ? "How will you use TutorLink?"
                : "Complete your profile to get started."}
            </p>
          </header>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-5 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <div className="space-y-3">
                {roles.map((r, idx) => {
                  const icon =
                    idx === 0 ? (
                      <GraduationCap size={24} />
                    ) : (
                      <Users size={24} />
                    );
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`w-full p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all duration-200 ${
                        role === r.value
                          ? "border-slate-700 bg-slate-50"
                          : "border-gray-200 hover:border-slate-300 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          role === r.value
                            ? "bg-slate-700 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {icon}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{r.label}</p>
                        <p className="text-xs text-gray-600">{r.desc}</p>
                      </div>
                      {role === r.value && (
                        <CheckCircle
                          size={20}
                          className="ml-auto text-slate-700"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <>
                <div>
                  <label
                    className="block text-sm font-semibold text-slate-900 mb-2"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-slate-700 focus:bg-white transition-all text-sm"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-slate-900 mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-slate-700 focus:bg-white transition-all text-sm"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-slate-900 mb-2"
                    htmlFor="pass"
                  >
                    Password
                  </label>
                  <input
                    id="pass"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-slate-700 focus:bg-white transition-all text-sm"
                    placeholder="Min. 8 chars, 1 number, 1 special char"
                  />
                </div>
              </>
            )}

            <div className="flex gap-3 pt-2">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg font-semibold text-base hover:shadow-lg hover:shadow-slate-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading
                  ? "Creating…"
                  : step === 1
                    ? "Continue"
                    : "Create Account"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-slate-700 hover:text-slate-800 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
