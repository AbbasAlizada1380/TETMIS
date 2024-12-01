import React from 'react';
import Navbar from './navbar';

const HomePage = () => {
  localStorage.setItem('darkMode',false)
  return (
    <div className="bg-gray-100 font-sans ">
      <Navbar/>
      {/* Hero Section */} 
      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to TET Group</h1>
          <p className="text-lg md:text-2xl mb-8">
            Empowering businesses through cutting-edge software solutions.
          </p>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">
            Discover Our Services
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Service Cards */}
            <div className="bg-white shadow-lg rounded-lg p-8 text-left">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Custom Software Development</h3>
              <p className="text-gray-700">
                Tailored solutions designed to streamline your business operations and boost growth.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8 text-left">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Mobile Application Development</h3>
              <p className="text-gray-700">
                High-performance mobile applications to engage customers on any device.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8 text-left">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Cloud Solutions</h3>
              <p className="text-gray-700">
                Secure, scalable cloud services that enable remote collaboration and data storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-200 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">About TET Group</h2>
          <p className="text-lg text-gray-700 mb-6">
            TET Group is a team of passionate developers, designers, and strategists committed to delivering
            transformative technology solutions. From inception to deployment, we build software that drives 
            innovation and fosters business growth.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img src="link_to_photo" alt="Team Member" className="w-24 h-24 mx-auto rounded-full mb-4"/>
              <h3 className="text-xl font-semibold">Ali Ahmadi</h3>
              <p className="text-blue-700">Lead Developer</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img src="link_to_photo" alt="Team Member" className="w-24 h-24 mx-auto rounded-full mb-4"/>
              <h3 className="text-xl font-semibold">Sara Mohammadi</h3>
              <p className="text-blue-700">UI/UX Designer</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img src="link_to_photo" alt="Team Member" className="w-24 h-24 mx-auto rounded-full mb-4"/>
              <h3 className="text-xl font-semibold">Hassan Karimi</h3>
              <p className="text-blue-700">Project Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-lg mb-8">
            Ready to transform your business with innovative technology? Reach out to us today.
          </p>
          <a href='/contact' className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
