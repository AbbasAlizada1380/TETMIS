// src/components/VerifyEmail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying your email...');

 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Email Verification</h2>
        <p className="text-gray-700 text-lg mb-6">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
