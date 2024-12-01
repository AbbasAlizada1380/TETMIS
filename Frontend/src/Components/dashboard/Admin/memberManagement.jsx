import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaUserPlus, FaSpinner } from "react-icons/fa";
import { CreateUser } from "./createUser";

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null); // Tracks the member being updated

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:9000/member");
      setMembers(res.data.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
    setLoading(false);
  };

  const handleDeleteMember = async () => {
    try {
      await axios.delete(`http://localhost:9000/member/${deleteId}`);
      setDeleteId(null);
      setIsDeleteModalOpen(false);
      fetchMembers(); // Refresh the member list after deletion
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEditMember = (member) => {
    setEditMember(member);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Member Management</h2>
        <button
          onClick={() => {
            setEditMember(null); // Clear edit member state for adding a new user
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <FaUserPlus className="mr-2" /> Add Member
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-6">
          <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Position</th>
              <th className="border p-2">Entry Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="text-center">
                <td className="border p-2">{member.id}</td>
                <td className="border p-2">{member.fullName}</td>
                <td className="border p-2">{member.email}</td>
                <td className="border p-2">{member.role}</td>
                <td className="border p-2">{member.position}</td>
                <td className="border p-2">
                  {new Date(member.entryDate).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEditMember(member)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setDeleteId(member.id);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add/Edit Member Modal */}
      {isModalOpen && (
        <CreateUser
          setIsModalOpen={setIsModalOpen}
          fetchMembers={fetchMembers}
          editMember={editMember}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete this member? This action cannot be
              undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteMember}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;
