// src/components/Contact.jsx
import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';
import Navbar from './navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [contactMessageId, setContactMessageId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      console.log(formData)
      const response = await axios.post('http://localhost:9000/message/', formData);
      console.log(response);
      setContactMessageId(response.data.contactMessageId);
      setVerificationStep(true);
      setSuccessMessage('Verification email sent. Please enter the code below.');
    } catch (error) {
      setErrorMessage('Failed to send verification email. Please try again.');
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      console.log(verificationCode);
      await axios.post('http://localhost:9000/message/verify',
        {verificationCode},
      );
      setSuccessMessage('Your message has been sent to the admin successfully!');
      setFormData({ name: '', email: '', message: '' });
      setVerificationStep(false);
      setVerificationCode('');
    } catch (error) {
      setErrorMessage('Invalid verification code. Please try again.');
    }
  };

  return (
<div> 
  <Navbar/>
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-4xl font-bold text-center mb-6 text-blue-700">Contact Us</h2>

      {!verificationStep ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Your Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Send Message
          </button>

          {successMessage && (
            <p className="mt-4 text-green-600 text-center font-semibold">{successMessage}</p>
          )}

          {errorMessage && (
            <p className="mt-4 text-red-600 text-center font-semibold">{errorMessage}</p>
          )}
        </form>
      ) : (
        <form onSubmit={handleVerificationSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="verificationCode">Verification Code</label>
            <input
              type="text"
              name="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Verification Code"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200 ease-in-out"
          >
            Verify and Send Message
          </button>

          {successMessage && (
            <p className="mt-4 text-green-600 text-center font-semibold">{successMessage}</p>
          )}

          {errorMessage && (
            <p className="mt-4 text-red-600 text-center font-semibold">{errorMessage}</p>
          )}
        </form>
      )}

      {/* Social Links */}
      <div className="flex justify-center mt-8 space-x-6 text-blue-600">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <FaGithub size={28} className="hover:text-blue-800 transition duration-200" />
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={28} className="hover:text-blue-800 transition duration-200" />
        </a>
        <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={28} className="hover:text-blue-800 transition duration-200" />
        </a>
      </div>
    </div></div>
  );
};

export default Contact;
