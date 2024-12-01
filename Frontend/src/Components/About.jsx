import React from 'react';
import Navbar from './navbar';

const About = () => {
  return (
    <div>
      <Navbar/>

    <div className="bg-white p-8">
      <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
        <p className="text-gray-700">
          At TET Group, our mission is to deliver innovative software solutions that empower businesses to thrive in the digital landscape. We strive to create value through technology, focusing on customer satisfaction and quality.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Integrity: We uphold honesty and transparency in all our dealings.</li>
          <li>Innovation: We embrace creativity and challenge the status quo.</li>
          <li>Excellence: We are committed to delivering high-quality solutions and services.</li>
          <li>Collaboration: We believe in teamwork and open communication.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Our Team</h3>
        <p className="text-gray-700">
          Our team is composed of skilled professionals with diverse backgrounds in software development, design, project management, and IT consulting. We work together to ensure the success of our clients through dedicated support and expertise.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Our History</h3>
        <p className="text-gray-700">
          Founded in [Year], TET Group has grown from a small startup to a leading provider of software solutions. Our journey has been marked by continuous learning, adaptation, and a commitment to customer success.
        </p>
      </section>
    </div></div>
  );
};

export default About;
