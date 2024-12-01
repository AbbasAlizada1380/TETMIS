import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ for: "", amount: "", person: "" });
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); // New state for year

  const apiUrl = "http://localhost:9000/expense"; // Adjust this to your API base URL

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setExpenses(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (err) {
      setError("Error fetching expenses");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or update an expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExpense) {
        await axios.put(`${apiUrl}/${editingExpense.id}`, formData);
        setEditingExpense(null);
      } else {
        await axios.post(apiUrl, formData);
      }
      setIsFormOpen(false);
      fetchExpenses();
    } catch (err) {
      setError("Error saving expense");
    }
  };
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - i);

  // Delete an expense
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchExpenses();
    } catch (err) {
      setError("Error deleting expense");
    }
  };

  // Start editing an expense
  const startEditing = (expense) => {
    setEditingExpense(expense);
    setFormData(expense);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingExpense(null);
    setFormData({ for: "", amount: "", person: "" });
  };

  // Filter expenses by person and selected month
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.createdAt);
    const expenseMonth = expenseDate.getMonth(); // Extract month
    const expenseYear = expenseDate.getFullYear(); // Extract year

    const matchesSearchTerm = expense.person
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMonth =
      !selectedMonth || expenseMonth === parseInt(selectedMonth, 10);
    const matchesYear =
      !selectedYear || expenseYear === parseInt(selectedYear, 10);

    return matchesSearchTerm && matchesMonth && matchesYear;
  });

  // Generate month options (current month to the past)
  const currentMonth = new Date().getMonth();
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = (currentMonth - i + 12) % 12; // Wrap around for past months
    return {
      value: month,
      label: new Date(0, month).toLocaleString("default", { month: "long" }),
    };
  });

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold  w-auto  ">
          Expense Manager
        </h1>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center "
        >
          Add record
        </button>
      </div>

        {error && <p className="text-red-500">{error}</p>}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-4 rounded shadow-md mb-4"
          >
            <div className="mb-2">
              <label className="block text-sm font-semibold">For</label>
              <input
                type="text"
                name="for"
                value={formData.for}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Amount</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Person</label>
              <input
                type="text"
                name="person"
                value={formData.person}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {editingExpense ? "Update" : "Add"}
              </button>
              {editingExpense && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
        <div className="mb-2 shadow border p-2 ">
          <h2 className="text-lg font-bold  mb-2">
            Filter Expenses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search by Person */}
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Search by Person
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Enter person's name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Filter by Month */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Filter by Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">All Months</option>
                {monthOptions.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Year */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Filter by Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">All Years</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Expenses list */}
        {loading ? (
          <p>Loading expenses...</p>
        ) : (
          <table className="w-full border-collapse border p-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">For</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Person</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="text-center">
                  <td className="border px-4 py-2">{expense.for}</td>
                  <td className="border px-4 py-2">{expense.amount}</td>
                  <td className="border px-4 py-2">{expense.person}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => startEditing(expense)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

    </div>
  );
};

export default ExpenseManager;
