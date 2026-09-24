import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdLockReset, MdCheckCircle, MdArrowForward } from "react-icons/md";
import { authAPI } from "../../services/api";
import { BookOpen, CircleCheck, Circle } from "lucide-react";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const defaultEmail = searchParams.get("email") || "";
  const defaultCode = searchParams.get("code") || "";

  const [email, setEmail] = useState(defaultEmail);
  const [code, setCode] = useState(defaultCode);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checks = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "Contains a number", ok: /\d/.test(password) },
    {
      label: "Contains a special character",
      ok: /[^a-zA-Z0-9]/.test(password),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !code) {
      setError("Email and reset code are required.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (!checks.every((c) => c.ok)) {
      setError("Password does not meet requirements");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await authAPI.resetPassword(email, code, password);
      console.log("Reset success:", response.data);
      setDone(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Reset failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-secondary-fixed-dim/20 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl ring-1 ring-outline-variant/10 p-8 md:p-12 relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-sm text-white material-symbols-filled">
              <BookOpen className="bg-slate-900 w-10 h-10 rounded-lg p-2" />
            </span>
          </div>
          <span className="text-lg font-black text-primary">TutorLink</span>
        </div>

        {!done ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-1">
                Reset Password
              </h2>
              <p className="text-on-surface-variant text-sm">
                Create a new secure password for your account.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 bg-error-container text-on-error-container rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 border-2 border-gray-400 border-outline-variant rounded-xl text-on-surface focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all outline-none text-sm"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Reset Code
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3.5 border-2 border-gray-400 border-outline-variant rounded-xl text-on-surface focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all outline-none text-sm"
                  placeholder="6-digit code"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 border-2 border-gray-400 border-outline-variant rounded-xl text-on-surface focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all outline-none text-sm"
                  placeholder="Min. 8 characters"
                />
                
                <div className="mt-3 space-y-1.5">
                  {checks.map((c) => (
                    <div key={c.label} className="flex items-center gap-2">
                      {c.ok ? (
                        <CircleCheck className="w-4 h-4 text-green-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-400" />
                      )}

                      <span
                        className={`text-xs ${
                          c.ok
                            ? "text-green-700 font-semibold"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
                
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full px-4 py-3.5 border-2 border-gray-400 border-outline-variant rounded-xl text-on-surface focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all outline-none text-sm"
                  placeholder="Repeat password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-base hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating…
                  </>
                ) : (
                  <>
                    <MdLockReset className="text-lg" />
                    Update Password
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-secondary text-4xl material-symbols-filled">
                lock_open
              </span>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              Password Changed!
            </h2>
            <p className="text-on-surface-variant text-sm mb-8">
              Your password has been updated. You can now log in with your new
              password.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
            >
              <MdCheckCircle className="text-lg" />
              Login Now
              <MdArrowForward className="text-lg" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
