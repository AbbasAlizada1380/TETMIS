import React, { useState } from 'react';
import axios from 'axios';

const AddMember = () => {
  const [memberData, setMemberData] = useState({
    fullName: '',
    email: '',
    password: '',
    entryDate: '',
    exitDate: '',
    skills: '',
    contacts: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData({
      ...memberData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert skills and contacts to JSON objects
      const skillsArray = memberData.skills.split(',').map(skill => skill.trim());
      const contactsArray = memberData.contacts.split(',').map(contact => contact.trim());

      const dataToSend = {
        ...memberData,
        skills: skillsArray,
        contacts: contactsArray,
      };
console.log(dataToSend)
      const response = await axios.post('http://localhost:9000/member/', dataToSend);
      console.log('Member added successfully:', response.data);
      // Optionally reset the form
      setMemberData({
        fullName: '',
        email: '',
        password: '',
        entryDate: '',
        exitDate: '',
        skills: '',
        contacts: '',
      });
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Add New Member</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {Object.keys(memberData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={
                key === 'password'
                  ? 'password'
                  : key === 'entryDate' || key === 'exitDate'
                  ? 'date'
                  : 'text'
              }
              id={key}
              name={key}
              value={memberData[key]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMember;
