import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";



//public pages imports......................

import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import FindTutorsPage from "./pages/FindTutorsPage";

// tutor application page imports........................
import TutorApplicationPage from "./pages/tutor/TutorApplicationPage";
import ApplicationStatusPage from "./pages/tutor/ApplicationStatusPage";


//student imports.......................
import StudentDashboardPage from "./pages/student/StudentDashboardPage";
import StudentBookingsPage from "./pages/student/StudentBookingsPage";
import StudentMessagesPage from "./pages/student/StudentMessagesPage";
import StudentFavouritesPage from "./pages/student/StudentFavouritesPage";
import StudentProgressPage from "./pages/student/StudentProgressPage";
import StudentReviewsPage from "./pages/student/StudentReviewsPage";
import StudentPaymentsPage from "./pages/student/StudentPaymentsPage";
import StudentInvoicesPage from "./pages/student/StudentInvoicesPage";
import StudentSupportTicketsPage from "./pages/student/StudentSupportTicketsPage";
import StudentSettingsPage from "./pages/student/Settings/StudentSettingsPage";
import StudentNotificationsPage from "./pages/student/StudentNotificationsPage";
import AccountDeletionPage from "./pages/student/Settings/AccountDeletionPage";






// Tutor pages imports........................
import TutorDashboardPage from "./pages/tutor/TutorDashboardPage";
import TutorSchedulePage from "./pages/tutor/TutorSchedulePage";
import TutorStudentsPage from "./pages/tutor/TutorStudentsPage";
import TutorEarningsPage from "./pages/tutor/TutorEarningsPage";
import TutorPayoutPage from "./pages/tutor/TutorPayoutPage";
import TutorAnalyticsPage from "./pages/tutor/TutorAnalyticsPage";
import TutorMessagesPage from "./pages/tutor/TutorMessagesPage";
import TutorProfilePage from "./pages/tutor/TutorProfilePage";
import TutorRatingsPage from "./pages/tutor/TutorRatingsPage";
import TutorSettingsPage from "./pages/tutor/TutorSettingsPage";
import TutorNotificationsPage from "./pages/tutor/TutorNotificationsPage";

// footer links imports........................
import FAQPage from "./pages/FAQPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import LegalPage from "./pages/LegalPage";
import DataPrivacyPage from "./pages/DataPrivacyPage";
import DataDeletionPage from "./pages/DataDeletionPage";
import CompareTutorsPage from "./pages/CompareTutorsPage";

// layouts imports........................
import GuestLayout from "./layouts/GuestLayout";
import StudentLayout from "./layouts/StudentLayout/StudentLayout";
import TutorPageLayout from "./layouts/TutorPageLayout";

// auth pages imports........................
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public Pages Routes ── */}
          <Route element={<GuestLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/find-tutors" element={<FindTutorsPage />} />

            {/* footer links routes............ */}
            <Route path="/data-deletion" element={<DataDeletionPage />} />
            <Route path="/compare-tutors" element={<CompareTutorsPage />} />
            <Route path="/faqs" element={<FAQPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/data-privacy" element={<DataPrivacyPage />} />
          </Route>
          {/* ── Semi-public ── */}
          <Route path="tutor-application" element={<TutorApplicationPage />} />
          <Route
            path="tutor/application-status"
            element={<ApplicationStatusPage />}
          />

          {/* ── Student Layout Routes ──_______________________________ */}
          <Route path="/student" element={<StudentLayout />}>
            {/* Dashboard */}
            <Route path="dashboard" element={<StudentDashboardPage />} />

            {/* Student Pages */}
            <Route path="bookings" element={<StudentBookingsPage />} />
            <Route path="messages" element={<StudentMessagesPage />} />
            <Route path="favourites" element={<StudentFavouritesPage />} />
            <Route path="progress" element={<StudentProgressPage />} />
            <Route path="reviews" element={<StudentReviewsPage />} />
            <Route path="payments" element={<StudentPaymentsPage />} />
            <Route path="invoices" element={<StudentInvoicesPage />} />
            <Route path="support" element={<StudentSupportTicketsPage />} />
            <Route path="settings" element={<StudentSettingsPage />} />
            <Route
              path="notifications"
              element={<StudentNotificationsPage />}
            />
            <Route path="account-delete" element={<AccountDeletionPage />} />
          </Route>

          {/* ── Tutor Layout Routes ───────────────────────────────────── */}
          <Route path="/tutor" element={<TutorPageLayout />}>
            {/* Dashboard */}
            <Route path="dashboard" element={<TutorDashboardPage />} />

            {/* Tutor Pages */}
            <Route path="schedule" element={<TutorSchedulePage />} />
            <Route path="students" element={<TutorStudentsPage />} />
            <Route path="earnings" element={<TutorEarningsPage />} />
            <Route path="payout" element={<TutorPayoutPage />} />
            <Route path="analytics" element={<TutorAnalyticsPage />} />
            <Route path="messages" element={<TutorMessagesPage />} />
            <Route path="profile" element={<TutorProfilePage />} />
            <Route path="ratings" element={<TutorRatingsPage />} />
            <Route path="settings" element={<TutorSettingsPage />} />
            <Route path="notifications" element={<TutorNotificationsPage />} />
          </Route>

          {/* ── Auth Routes ── */}
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </AuthProvider>
  );
};

export default App;
