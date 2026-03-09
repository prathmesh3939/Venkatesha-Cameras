import { useEffect, useState } from "react";
import api from "../../api/api";
import { Search, RefreshCw, CreditCard, PlusCircle, X, IndianRupee, AlertCircle, CheckCircle, Clock } from "lucide-react";

function Payments() {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/bookings");
      setBookings(res.data.bookings || []);
    } catch {
      setError("Failed to load payments");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.bookingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "ALL" || 
      b.paymentStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalBalance = filteredBookings.reduce((sum, b) => sum + b.remainingAmount, 0);
  const pendingCount = filteredBookings.filter(b => b.paymentStatus === "PENDING").length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-blue-600" />
                Payments
              </h1>
              <p className="text-gray-600 mt-1">Manage customer payments and transactions</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={loadBookings}
                className="p-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Refresh"
              >
                <RefreshCw className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by booking number or customer name..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PARTIAL">Partial</option>
              <option value="PAID">Paid</option>
            </select>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{filteredBookings.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{pendingCount}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Balance Due</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">₹ {formatCurrency(totalBalance)}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-3 text-gray-600">Loading payments...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No payments found</p>
              {searchTerm && (
                <p className="text-gray-500 text-sm mt-1">Try adjusting your search criteria</p>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Booking No</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Customer</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Total</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Paid</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Balance</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBookings.map((b) => {
                      const paid = b.totalAmount - b.remainingAmount;
                      return (
                        <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <span className="font-mono font-semibold text-gray-800">{b.bookingNumber}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-700">{b.customer?.name || "—"}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-semibold text-gray-800">₹ {formatCurrency(b.totalAmount)}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-green-600 font-medium">₹ {formatCurrency(paid)}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-semibold text-red-600">₹ {formatCurrency(b.remainingAmount)}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(b.paymentStatus)}`}>
                              {b.paymentStatus}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            {b.remainingAmount > 0 ? (
                              <button
                                onClick={() => setSelected(b)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                              >
                                <PlusCircle className="h-4 w-4" />
                                Add Payment
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                                <CheckCircle className="h-4 w-4" />
                                Paid
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Footer Summary */}
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{filteredBookings.length}</span> of{" "}
                    <span className="font-semibold">{bookings.length}</span> bookings
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-sm">
                      <span className="text-gray-600">Total Balance Due:</span>
                      <span className="ml-2 font-bold text-red-600">₹ {formatCurrency(totalBalance)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Payment Modal */}
        {selected && (
          <PaymentModal
            booking={selected}
            onSuccess={() => {
              setSelected(null);
              loadBookings();
            }}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </div>
  );
}

function PaymentModal({ booking, onClose, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("CASH");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  const savePayment = async () => {
    setError("");

    const value = Number(amount);
    if (!value || value <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (value > booking.remainingAmount) {
      setError(`Amount exceeds balance of ₹ ${formatCurrency(booking.remainingAmount)}`);
      return;
    }

    try {
      setLoading(true);
      await api.post("/payments", {
        bookingId: booking._id,
        amount: value,
        mode,
        note: note.trim() || undefined
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const quickAmounts = [1000, 5000, 10000, booking.remainingAmount];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Add Payment</h3>
            <p className="text-sm text-gray-600 mt-1">Complete payment for booking</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Booking Info */}
          <div className="bg-gray-50 rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Booking Number</p>
                <p className="font-semibold text-gray-800">{booking.bookingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Customer</p>
                <p className="font-semibold text-gray-800">{booking.customer?.name || "—"}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-bold text-lg text-gray-800">₹ {formatCurrency(booking.totalAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount Paid</p>
                <p className="font-bold text-lg text-green-600">₹ {formatCurrency(booking.totalAmount - booking.remainingAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Balance Due</p>
                <p className="font-bold text-lg text-red-600">₹ {formatCurrency(booking.remainingAmount)}</p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  autoFocus
                />
              </div>
              
              {/* Quick Amounts */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt === booking.remainingAmount ? amt : amt.toString())}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {amt === booking.remainingAmount ? "Full Amount" : `₹ ${formatCurrency(amt)}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Mode
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: "CASH", label: "Cash", icon: "💵" },
                  { value: "UPI", label: "UPI", icon: "📱" },
                  { value: "CARD", label: "Card", icon: "💳" },
                  { value: "BANK_TRANSFER", label: "Bank Transfer", icon: "🏦" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setMode(option.value)}
                    className={`p-4 border rounded-xl transition-all ${
                      mode === option.value
                        ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add any notes about this payment..."
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Payment date and time will be automatically recorded
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={savePayment}
                disabled={loading || !amount || Number(amount) <= 0}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  "Save Payment"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN').format(amount);
};

const getStatusClasses = (status) => {
  switch (status) {
    case "PAID":
      return "bg-green-100 text-green-800";
    case "PARTIAL":
      return "bg-blue-100 text-blue-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default Payments;