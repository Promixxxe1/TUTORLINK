import { Link } from "react-router-dom";
import { BsHourglassTop, BsCheckCircle } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { LuBookOpen } from "react-icons/lu";
// import { Status, StatusIndicator, StatusLabel } from "@diceui/react";

const applicationStatus = "pending"; // Demo: change this to test different states

const statusConfig = {
  pending: {
    icon: <BsHourglassTop />,
    iconBg: "bg-[#ffd59f]",
    iconColor: "text-on-tertiary-fixed",
    title: "Application Under Review",
    subtitle: "We're reviewing your application",
    message:
      "Our team carefully reviews each application to ensure quality. This typically takes 24-48 hours.",
    badge: "Under Review",
    badgeColor: "bg-[#ffd59f]",
  },
  approved: {
    icon: <BsCheckCircle />,
    iconBg: "bg-secondary-container",
    iconColor: "text-secondary",
    title: "Application Approved!",
    subtitle: "Welcome to TutorLink",
    message:
      "Congratulations! Your application has been approved. You can now access your tutor dashboard and start teaching.",
    badge: "Approved",
    badgeColor: "bg-green-100 text-green-800",
  },
  rejected: {
    icon: <GiCancel />,
    iconBg: "bg-error-container",
    iconColor: "text-error",
    title: "Application Not Approved",
    subtitle: "We couldn't approve your application at this time",
    message:
      "Your application didn't meet our current requirements. You can review the feedback and resubmit.",
    badge: "Rejected",
    badgeColor: "bg-error-container text-on-error-container",
  },
};

export default function ApplicationStatusPage() {
  const config = statusConfig[applicationStatus];

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg bg-white rounded-3xl p-8 md:p-12 shadow-2xl ring-1 ring-outline-variant/10 z-10 text-center">
        <div className="flex items-center gap-2 mb-10 justify-center">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-sm text-white material-symbols-filled">
              <LuBookOpen/>
            </span>
          </div>
          <span className="text-lg font-black text-primary">TutorLink</span>
        </div>

        <div
          className={`w-24 h-24 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}
        >
          <span
            className={`material-symbols-outlined text-5xl ${config.iconColor} material-symbols-filled`}
          >
            {config.icon}
          </span>
        </div>

        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${config.badgeColor}`}
        >
          {config.badge}
        </span>

        <h1 className="text-2xl font-black text-primary mb-2">
          {config.title}
        </h1>
        <p className="text-on-surface-variant text-sm mb-2">
          {config.subtitle}
        </p>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
          {config.message}
        </p>

        {applicationStatus === "pending" && (
          <div className="bg-gray-200 rounded-2xl p-5 mb-8 text-left space-y-3">
            <h3 className="font-bold text-primary text-sm">
              What happens next?
            </h3>
            {[
              "Our team reviews your credentials and bio",
              "We verify your identification documents",
              "You receive an email with the decision",
              "If approved, your profile goes live immediately",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-secondary-container rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-on-secondary-container">
                    {i + 1}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">{step}</p>
              </div>
            ))}
          </div>
        )}

        {applicationStatus === "rejected" && (
          <div className="bg-error-container/30 rounded-2xl p-5 mb-8 text-left">
            <h3 className="font-bold text-error text-sm mb-2">
              Rejection Reason
            </h3>
            <p className="text-xs text-on-surface-variant">
              Your bio did not meet the minimum 100-character requirement and
              your credentials could not be verified. Please update your
              application and resubmit.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {applicationStatus === "approved" && (
            <Link
              to="/tutor/dashboard"
              className="block w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-bold hover:scale-[1.02] transition-all"
            >
              Go to Tutor Dashboard
            </Link>
          )}
          {applicationStatus === "rejected" && (
            <Link
              to="/tutor-application"
              className="block w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-container transition-colors"
            >
              Edit & Resubmit
            </Link>
          )}
          {applicationStatus === "pending" && (
            <p className="text-xs text-on-surface-variant">
              Estimated review time: 24-48 hours
            </p>
          )}
          <Link
            to="/"
            className="block text-sm text-gray-600 font-semibold hover:underline"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
