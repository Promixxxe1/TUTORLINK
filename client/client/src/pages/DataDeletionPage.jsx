import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Info,
  HelpCircle,
  Shield,
  MinusCircle,
  Trash2,
} from "lucide-react";

export default function DataDeletionPage() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className=" min-h-screen pt-28">
      <section className="bg-slate-900 text-white py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-on-primary-container text-sm mb-6">
            <span className="font-medium uppercase tracking-wide opacity-70 bg-gray-500 text-white px-3 py-1 rounded-full">
              Privacy & Security
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Data Deletion Request
          </h1>
          <p className="text-on-primary-container text-lg leading-relaxed">
            At TutorLink, we respect your right to privacy. Use this form to
            request the permanent removal of your account and associated
            personal data.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            {!submitted ? (
              <div className="bg-white rounded-3xl p-6 md:p-10  border-2 border-gray-300 shadow-xl">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  Request Account Deletion
                </h2>
                <p className="text-on-surface-variant text-sm mb-8">
                  Your request will be processed within 7 days.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1.5">
                      Registered Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3.5 bg-gray-300 rounded-xl text-on-surface border-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all outline-gray-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1.5">
                      Reason{" "}
                      <span className="text-on-surface-variant font-normal ">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Help us improve by sharing why you're leaving..."
                      className="w-full px-4 py-3 bg-gray-300 rounded-xl text-on-surface border-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all outline-gray-400 text-sm resize-none"
                    />
                  </div>
                  <div className="p-4 bg-gray-200 rounded-xl border-l-4 border-secondary">
                    <div className="flex gap-3">
                      <Info className="text-secondary flex-shrink-0" />
                      <p className="text-on-surface-variant text-xs leading-relaxed">
                        <strong className="text-primary block mb-1">
                          Important Notice
                        </strong>
                        Deletion is permanent. You will lose access to all your
                        course progress, tutor message history, booking records,
                        and certificates.
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-base hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {loading && (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {loading ? "Submitting…" : "Request Account Deletion"}
                    {!loading && (
                      <span className="material-symbols-outlined">
                        <Trash2 />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 border-2 border-gray-300 shadow-xl text-center">
                <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-white text-4xl bg-slate-900 rounded-full" />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-2">
                  Request Submitted
                </h2>
                <p className="text-on-surface-variant text-sm mb-6 max-w-sm mx-auto">
                  We've received your data deletion request for{" "}
                  <span className="font-semibold text-primary">{email}</span>.
                  You'll receive a confirmation email within 24 hours.
                </p>
                <Link
                  to="/"
                  className="inline-block px-8 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-container transition-colors"
                >
                  Return to Homepage
                </Link>
              </div>
            )}
          </div>
          {/* right ui........................ */}
          <div className="md:col-span-5 space-y-5">
            <div className=" border-2 border-gray-300 shadow-xl rounded-3xl p-6 bg-gray-100">
              <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center mb-4">
                <Shield className=" bg-gray-400 rounded-xl w-15 h-15 p-2" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">
                Our Privacy Promise
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Your data security is our top priority. We ensure all personal
                identifiers are purged from our active systems upon request, in
                compliance with GDPR and NDPR regulations.
              </p>
            </div>
            <div className="border-2 border-gray-300 rounded-3xl p-6 bg-gray-100 shadow-xl">
              <h3 className="text-lg font-bold text-primary mb-4">
                What gets deleted?
              </h3>
              <div className="space-y-2.5">
                {[
                  "Account profile and personal information",
                  "Booking history and lesson records",
                  "Chat messages and communications",
                  "Payment history and invoices",
                  "Reviews and ratings you've given",
                  "Learning progress and certificates",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-error text-[16px] mt-0.5 flex-shrink-0">
                      <MinusCircle />
                    </span>
                    <span className="text-sm text-on-surface-variant">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 px-2">
              <HelpCircle className="text-outline" />
              <p className="text-sm text-on-surface-variant">
                Have questions?{" "}
                <Link
                  to="/contact"
                  className="text-secondary font-semibold hover:underline"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
