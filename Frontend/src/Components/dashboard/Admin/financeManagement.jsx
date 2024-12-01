import { useState, useEffect } from "react";

const FinanceManagement = () => {
  // Mock initial finance data
  const initialData = [
    {
      id: 1,
      description: "Website Hosting",
      amount: 120,
      type: "Expense",
      date: "2024-11-01",
    },
    {
      id: 2,
      description: "Client Payment",
      amount: 500,
      type: "Income",
      date: "2024-11-10",
    },
    {
      id: 3,
      description: "Software License",
      amount: 200,
      type: "Expense",
      date: "2024-11-15",
    },
  ];

  // State management
  const [financeData, setFinanceData] = useState(initialData);
  const [newEntry, setNewEntry] = useState({
    description: "",
    amount: "",
    type: "Income",
    date: "",
  });

  // Fetch data from database (mocked for now)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with an API call to your backend
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve(initialData), 500)
        );
        setFinanceData(response);
      } catch (error) {
        console.error("Error fetching finance data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  // Add new finance entry
  const handleAddEntry = (e) => {
    e.preventDefault();

    // Validation
    if (
      !newEntry.description ||
      !newEntry.amount ||
      !newEntry.type ||
      !newEntry.date
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const newFinance = {
      id: financeData.length + 1,
      ...newEntry,
      amount: parseFloat(newEntry.amount),
    };

    setFinanceData([...financeData, newFinance]);
    setNewEntry({
      description: "",
      amount: "",
      type: "Income",
      date: "",
    });
    alert("Finance entry added successfully!");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Finance Management</h2>

      {/* Finance Table */}
      <div className="overflow-x-auto mb-6">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {financeData.map((entry) => (
              <tr key={entry.id} className="text-center">
                <td className="border px-4 py-2">{entry.id}</td>
                <td className="border px-4 py-2">{entry.description}</td>
                <td className="border px-4 py-2">${entry.amount.toFixed(2)}</td>
                <td
                  className={`border px-4 py-2 ${
                    entry.type === "Income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {entry.type}
                </td>
                <td className="border px-4 py-2">{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Entry Form */}
      <form onSubmit={handleAddEntry} className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Add New Entry</h3>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={newEntry.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter description"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={newEntry.amount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={newEntry.type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={newEntry.date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default FinanceManagement;
