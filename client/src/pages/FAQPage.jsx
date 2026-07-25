import { useState } from "react";

const faqs = [
  {
    category: "Payments & Billing",
    icon: "payments",
    items: [
      {
        q: "How much does a trial lesson cost?",
        a: "Trial lessons are fixed at ₦5,000 for 1 hour. This gives you a risk-free way to try a tutor before committing to a subscription.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept card payments, bank transfers, USSD, and QR codes via Paystack. You can also pay via manual bank transfer (requires admin approval within 24 hours).",
      },
      {
        q: "How do I get a refund?",
        a: "You're eligible for a 100% refund if you cancel 24+ hours before your lesson, or a 50% refund if cancelled less than 24 hours before. Refunds are processed within 3-10 business days.",
      },
      {
        q: "Can I download invoices?",
        a: "Yes! Go to My Bookings → Past tab, or the dedicated Invoices page in your sidebar to download PDF invoices for any completed lesson.",
      },
      {
        q: "Are there subscription plans?",
        a: "After your trial, you can subscribe to 4, 8, or 12 lessons per month at discounted rates. Subscriptions auto-renew monthly.",
      },
    ],
  },
  {
    category: "Booking & Lessons",
    icon: "calendar_today",
    items: [
      {
        q: "How do I book a lesson?",
        a: 'Browse tutors, click "View Profile", then "Book Trial Lesson". Select your preferred date, time, and payment method to complete the booking.',
      },
      {
        q: "How do I get the class link?",
        a: "After payment confirmation, our admin team generates and sends a Zoom or Google Meet link to both you and your tutor via email and in-app chat.",
      },
      {
        q: "Can I reschedule a lesson?",
        a: 'Yes, click "Request Reschedule" on your upcoming lesson. Your tutor will approve or decline the new time within 24 hours.',
      },
      {
        q: "What happens if my tutor doesn't show up?",
        a: "Contact support immediately. We'll investigate and issue a full refund if the tutor was at fault.",
      },
      {
        q: "How long are lessons?",
        a: "Trial lessons are 1 hour. Subscription lessons can be 1-2 hours depending on your plan and tutor agreement.",
      },
    ],
  },
  {
    category: "Account & Security",
    icon: "security",
    items: [
      {
        q: "How do I change my password?",
        a: "Go to Settings → Security → Change Password. You'll need your current password to set a new one.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes. We use Paystack for all card transactions, which is PCI-DSS compliant. We never store your card details directly.",
      },
      {
        q: "Can I delete my account?",
        a: "Yes. Go to Settings → Account → Delete Account. Your account will be scheduled for deletion in 30 days, giving you time to cancel if needed.",
      },
      {
        q: "How do I enable two-factor authentication?",
        a: "Go to Settings → Security → Enable 2FA. Scan the QR code with Google Authenticator and enter the 6-digit code to activate.",
      },
    ],
  },
  {
    category: "For Tutors",
    icon: "person_book",
    items: [
      {
        q: "How do I apply to become a tutor?",
        a: 'Click "Become a Tutor" on the homepage or sign up with the "I want to teach" option. Complete the 4-step application form and submit for review.',
      },
      {
        q: "How long does application review take?",
        a: "We review applications within 24-48 hours. You'll receive an email notification with the decision.",
      },
      {
        q: "How do I withdraw my earnings?",
        a: "Go to Earnings → Request Withdrawal. Minimum withdrawal is ₦10,000. Funds are transferred to your saved bank account within 3-5 business days.",
      },
      {
        q: "What percentage does TutorLink take?",
        a: "TutorLink charges a 10% platform fee on all transactions. You keep 90% of your earnings.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({}); // Changed to a simple object
  const [search, setSearch] = useState("");

  const toggle = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filtered = faqs
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          !search ||
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="bg-gray-100 text-gray-800 pt-26">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 text-center px-6">
        <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="max-w-md mx-auto mb-8">
          Find answers to common questions about TutorLink.
        </p>
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg">No results for "{search}"</p>
          </div>
        ) : (
          filtered.map((cat) => (
            <div key={cat.category} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{cat.category}</h2>
              {cat.items.map((item, i) => {
                const key = `${cat.category}-${i}`;
                const isOpen = openItems[key];
                return (
                  <div key={key} className="bg-white shadow-sm rounded-lg mb-2">
                    <button
                      onClick={() => toggle(key)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center rounded-lg hover:bg-gray-100"
                    >
                      <span className="font-semibold">{item.q}</span>
                      <span
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 text-sm">{item.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))
        )}

        {/* CTA */}
        <div className="bg-slate-900 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Still have questions?
          </h3>
          <p className="text-white mb-6">
            Our support team is here to help you.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-2 bg-white text-slate-900 rounded-lg font-bold hover:bg-gray-100"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
