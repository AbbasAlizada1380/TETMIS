import React, { useState, useEffect } from "react";
import axios from "axios";

const IncomeManager = () => {
  const [incomes, setIncomes] = useState([]);
  const [formData, setFormData] = useState({ source: "", amount: "", takingDate: "" });
  const [editingIncome, setEditingIncome] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const apiUrl = "http://localhost:9000/income";

  // Fetch all incomes
  const fetchIncomes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setIncomes(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching incomes");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new income
  const addIncome = async () => {
    try {
      setLoading(true);
      const response = await axios.post(apiUrl, formData);
      setIncomes([...incomes, response.data]);
      setFormData({ source: "", amount: "", takingDate: "" });
      setLoading(false);
    } catch (err) {
      setError("Error adding income");
      setLoading(false);
    }
  };

  // Edit an existing income
  const editIncome = (income) => {
    setEditingIncome(income);
    setFormData({ source: income.source, amount: income.amount, date: income.date });
  };

  const updateIncome = async () => {
    try {
      setLoading(true);
      await axios.put(`${apiUrl}/${editingIncome.id}`, formData);
      setIncomes(
        incomes.map((income) =>
          income.id === editingIncome.id ? { ...income, ...formData } : income
        )
      );
      setEditingIncome(null);
      setFormData({ source: "", amount: "", date: "" });
      setLoading(false);
    } catch (err) {
      setError("Error updating income");
      setLoading(false);
    }
  };

  // Delete an income
  const deleteIncome = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${apiUrl}/${id}`);
      setIncomes(incomes.filter((income) => income.id !== id));
      setLoading(false);
    } catch (err) {
      setError("Error deleting income");
      setLoading(false);
    }
  };

  // Search incomes
  const filteredIncomes = incomes.filter((income) =>
    income.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Income Manager</h1>

      {error && <div className="text-red-500">{error}</div>}

      {/* Search */}
      <input
        type="text"
        placeholder="Search income by source..."
        className="border p-2 rounded mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Income Form */}
      <div className="mb-4">
        <input
          type="text"
          name="source"
          placeholder="Source"
          className="border p-2 rounded mb-2 w-full"
          value={formData.source}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="border p-2 rounded mb-2 w-full"
          value={formData.amount}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="takingDate"
          className="border p-2 rounded mb-2 w-full"
          value={formData.takingDate}
          onChange={handleInputChange}
        />
        {editingIncome ? (
          <button
            onClick={updateIncome}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Update Income
          </button>
        ) : (
          <button
            onClick={addIncome}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Income
          </button>
        )}
      </div>

      {/* Income Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Source</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncomes.map((income) => (
            <tr key={income.id}>
              <td className="border border-gray-300 p-2">{income.source}</td>
              <td className="border border-gray-300 p-2">{income.amount}</td>
              <td className="border border-gray-300 p-2">{income.takingDate}</td>
              <td className="border border-gray-300 p-2 flex justify-center items-center">
                <button
                  onClick={() => editIncome(income)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteIncome(income.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <div className="text-gray-500 mt-4">Loading...</div>}
    </div>
  );
};

export default IncomeManager;
