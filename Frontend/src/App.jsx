// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './Components/services';
import About from './Components/About';
import Contact from './Components/contact';
import HomePage from './Components/Home';
import Navbar from './Components/navbar.jsx';
import AddMember from './Components/AddMember';
import VerifyEmail from './Components/verifyEmail';
import Dashboard from './Components/dashboard/dashboard.jsx';
import LoginPage from './Components/loginPage.jsx';

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify_email/*" element={<VerifyEmail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
