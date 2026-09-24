import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { bookingAPI } from "../../services/api";

export default function TutorEarningsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchBookings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const res = await bookingAPI.getMyBookings();
      const tutorBookings = (res.data?.bookings || []).filter((booking) => {
        const tutorId = booking.tutor?._id || booking.tutor;
        const userId = user?.id || user?._id;
        return tutorId && userId && tutorId.toString() === userId.toString();
      });
      setBookings(tutorBookings);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load earnings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const paidBookings = bookings.filter((booking) =>
    ["completed", "confirmed", "link_sent", "awaiting_confirmation"].includes(
      booking.status,
    ),
  );

  const totalEarned = paidBookings.reduce(
    (sum, booking) => sum + Number(booking.amount || 0),
    0,
  );

  const now = new Date();
  const thisMonth = bookings
    .filter((booking) => {
      const date = new Date(booking.date || booking.createdAt);
      return (
        !Number.isNaN(date.getTime()) &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, booking) => sum + Number(booking.amount || 0), 0);

  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = bookings
    .filter((booking) => {
      const date = new Date(booking.date || booking.createdAt);
      return (
        !Number.isNaN(date.getTime()) &&
        date.getMonth() === lastMonthDate.getMonth() &&
        date.getFullYear() === lastMonthDate.getFullYear()
      );
    })
    .reduce((sum, booking) => sum + Number(booking.amount || 0), 0);

  const pendingBalance = bookings
    .filter((booking) => !["cancelled", "refunded"].includes(booking.status))
    .reduce((sum, booking) => sum + Number(booking.amount || 0), 0);

  const transactions = bookings
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date),
    )
    .map((booking) => ({
      _id: booking._id,
      date: booking.date || booking.createdAt,
      student: booking.student?.name || "Student",
      type: booking.type || "lesson",
      amount: Number(booking.amount || 0),
      status: booking.status === "completed" ? "paid" : "pending",
    }));

  const withdrawals = [];

  const handleWithdraw = (event) => {
    event.preventDefault();
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount < 10000) {
      toast.error("Minimum withdrawal is ₦10,000.");
      return;
    }

    if (numericAmount > pendingBalance) {
      toast.error("Amount exceeds your available balance.");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      toast.success(
        "Withdrawal request submitted. Processing takes 3–5 business days.",
      );
      setWithdrawModal(false);
      setAmount("");
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-5xl space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Earnings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track your income and withdrawals
          </p>
        </div>
        <button
          onClick={() => setWithdrawModal(true)}
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
        >
          <span className="text-base">💳</span>
          Request Withdrawal
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Earned",
            value: `₦${totalEarned.toLocaleString()}`,
            icon: "💸",
            color: "bg-slate-900 text-white",
          },
          {
            label: "This Month",
            value: `₦${thisMonth.toLocaleString()}`,
            icon: "📈",
            color: "bg-blue-100 text-blue-700",
          },
          {
            label: "Last Month",
            value: `₦${lastMonth.toLocaleString()}`,
            icon: "📅",
            color: "bg-indigo-100 text-indigo-700",
          },
          {
            label: "Pending Balance",
            value: `₦${pendingBalance.toLocaleString()}`,
            icon: "🧾",
            color: "bg-slate-100 text-slate-700",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:scale-[1.02] transition-transform"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color}`}
            >
              <span className="text-lg">{item.icon}</span>
            </div>
            <div className="text-xl font-black text-slate-900">
              {item.value}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Transaction History</h2>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">
            Loading transactions...
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No transactions yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {["Date", "Student", "Type", "Amount", "Status"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500"
                      >
                        {header}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-900 text-sm">
                      {transaction.student}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 capitalize">
                      {transaction.type}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      ₦{transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          transaction.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Withdrawal History</h2>
        </div>

        {withdrawals.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No withdrawals yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {["Date", "Amount", "Bank", "Status"].map((header) => (
                    <th
                      key={header}
                      className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {withdrawals.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {item.date}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      ₦{item.amount}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {item.bank}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.statusClass}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {withdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-slate-900">
                Request Withdrawal
              </h3>
              <button
                onClick={() => setWithdrawModal(false)}
                className="text-slate-500 text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div className="p-4 bg-slate-100 rounded-xl">
                <p className="text-xs text-slate-500">Available Balance</p>
                <p className="text-2xl font-black text-slate-900">
                  ₦{pendingBalance.toLocaleString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Amount (₦)
                </label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  min={10000}
                  max={pendingBalance}
                  placeholder="Min. ₦10,000"
                  className="w-full px-4 py-3 bg-slate-100 rounded-xl text-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Minimum: ₦10,000 • Processing: 3–5 business days
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setWithdrawModal(false)}
                  className="flex-1 py-3 border border-slate-200 rounded-xl font-semibold text-slate-700 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
