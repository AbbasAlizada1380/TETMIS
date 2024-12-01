import { React, useEffect, useState } from "react";
import axios from "axios";
export const CreateUser = ({setIsModalOpen, editMember,fetchMembers}) => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    role: "",
    position: "",
    password: "",
    entryDate: "",
    exiteDate: "",
    skills: "",
    contacts: "",
  });
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    if (editMember) {
      setFormValues({ ...editMember, password: "*******" }); // Populate form for editing
    }
  }, [editMember]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleAddMember = async () => {
    try {      if (editMember) {
        await axios.put(`http://localhost:9000/member/${editMember.id}`, formValues);
      } else {
        await axios.post("http://localhost:9000/member", formValues);
      }
      setFormValues({
        fullName: "",
        email: "",
        role: "",
        position: "",
        password: "",
        entryDate: "",
        exiteDate: "",
        skills: "",
        contacts: "",
      }); // Refresh the member list after adding
      setIsModalOpen(false);
      fetchMembers()
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h3 className="text-xl font-bold mb-4"> Member</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddMember();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formValues.fullName}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={formValues.role}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Position</label>
            <input
              type="text"
              name="position"
              value={formValues.position}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Entry Date</label>
            <input
              type="date"
              name="entryDate"
              value={formatDate(formValues.entryDate)}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              save
            </button>
            <button
              type="button"
              onClick={() =>setIsModalOpen(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
