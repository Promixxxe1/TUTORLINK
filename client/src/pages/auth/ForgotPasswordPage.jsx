import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLockReset, MdMarkEmailRead } from "react-icons/md";
import { BookOpen } from "lucide-react";
import { authAPI } from "../../services/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputs = useRef([]);

  const handleCodeChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const nextCode = [...code];
    nextCode[index] = value;
    setCode(nextCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index, event) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (event) => {
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pasted.length === 6) {
      event.preventDefault();
      setCode(pasted.split(""));
      inputs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await authAPI.forgotPassword(email);
      setSent(true);
      setCode(["", "", "", "", "", ""]);
    } catch (error) {
      console.error("Forgot password error:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    const fullCode = code.join("");

    if (fullCode.length !== 6) {
      alert("Please enter the 6-digit code sent to your email.");
      return;
    }

    navigate(
      `/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(fullCode)}`,
    );
  };

  const handleResend = async () => {
    if (!email) return;

    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setCode(["", "", "", "", "", ""]);
      setSent(true);
    } catch (error) {
      console.error("Resend forgot password error:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#eef3f9]">
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full bg-primary-fixed-dim/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-secondary-fixed-dim/20 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl  p-8 md:p-12 relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-sm text-white material-symbols-filled">
              <BookOpen />
            </span>
          </div>
          <span className="text-lg font-black text-primary">TutorLink</span>
        </div>

        {!sent ? (
          <>
            <div className="mb-8">
              <div className="w-14 h-14 bg-gray-300 rounded-2xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-secondary text-2xl">
                  <MdLockReset />
                </span>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-1">
                Forgot Password?
              </h2>
              <p className="text-gray-600 font-semibold text-sm">
                Enter your email and we'll send you a reset code.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-300 rounded-xl text-on-surface border-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all outline-none text-sm"
                  placeholder="name@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-base hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? "Sending…" : "Send Reset Code"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-secondary text-4xl material-symbols-filled">
                <MdMarkEmailRead />
              </span>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              Check Your Email
            </h2>
            <p className="text-slate-900 text-sm mb-6">
              We sent a reset code to{" "}
              <span className="font-semibold text-primary">{email}</span>. It
              expires in 10 minutes.
            </p>

            <div className="mb-5" onPaste={handleCodePaste}>
              <div className="flex gap-3 justify-center">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(index, e)}
                    className="w-12 h-14 text-center text-xl font-bold bg-white rounded-xl border-2 border-gray-200 focus:border-slate-500 focus:bg-white transition-all outline-none text-slate-600"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-primary-container transition-colors"
            >
              Continue to Reset Password
            </button>

            <button
              onClick={handleResend}
              className="mt-3 text-sm text-gray-600 font-semibold hover:underline"
            >
              Resend email
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-on-surface-variant text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-gray-600 font-bold hover:underline underline-offset-4 ml-1"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
