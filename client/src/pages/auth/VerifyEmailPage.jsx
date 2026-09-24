import { useState, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BookOpen } from "lucide-react";
import { authAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const inputs = useRef([]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !code[i] && i > 0)
      inputs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(""));
      inputs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const full = code.join("");
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (full.length < 6) {
      setError("Enter the 6-digit code");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.verifyEmail(email, full);
      const { token, user } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      if (user.role === "student") {
        navigate("/student/dashboard");
      } else if (user.role === "tutor") {
        navigate("/tutor/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authAPI.resendVerification(email);
      setResent(true);
      setTimeout(() => setResent(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to resend code.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6  relative bg-slate-200 overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full bg-white/20 blur-[120px] pointer-events-none" />
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-sm text-white">
              <BookOpen />
            </span>
          </div>
          <span className="text-lg font-black text-slate-900">TutorLink</span>
        </div>
        <div className="mb-8">
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-white text-2xl">
              <MdEmail />
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-600 mb-1">
            Verify Your Email
          </h2>
          <p className="text-gray-600 text-sm">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-gray-600">
              {email || "your email"}
            </span>
            .
          </p>
        </div>
        {error && (
          <div className="mb-5 p-3 bg-red-100 text-red-800 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-slate-700"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-3 justify-center" onPaste={handlePaste}>
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-bold bg-white rounded-xl border-2 border-gray-200 focus:border-slate-500 focus:bg-white transition-all outline-none text-slate-600"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-base hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Verifying…" : "Verify Email"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={resent}
            className="mt-1 text-slate-500 font-bold text-sm hover:underline disabled:opacity-50"
          >
            {resent ? "✓ Code resent!" : "Resend Code"}
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          <Link
            to="/login"
            className="text-slate-900 font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
