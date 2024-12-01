import React from 'react';
import Navbar from './navbar';

const Services = () => {
  const services = [
    {
      title: "Custom Software Development",
      description: "We create tailored software solutions, focusing on understanding client needs and providing scalable, robust applications.",
      icon: "🛠️", // You can replace this with an appropriate icon component
    },
    {
      title: "Web Application Development",
      description: "Our expertise in modern web frameworks and languages delivers responsive, efficient, and user-friendly web applications.",
      icon: "🌐",
    },
    {
      title: "Mobile App Development",
      description: "We develop iOS and Android applications that enhance accessibility, performance, and user engagement.",
      icon: "📱",
    },
    {
      title: "Cloud Solutions & Integration",
      description: "Secure cloud integration services including AWS, Azure, and Google Cloud, focusing on data management and scalable infrastructure.",
      icon: "☁️",
    },
    {
      title: "UI/UX Design",
      description: "Our design philosophy prioritizes user-centered designs that elevate usability, aesthetic appeal, and brand alignment.",
      icon: "🎨",
    },
    {
      title: "Cybersecurity Services",
      description: "We offer cybersecurity audits, vulnerability assessments, and data protection services to safeguard client data.",
      icon: "🔒",
    },
    {
      title: "Consulting and Strategy Development",
      description: "Our experts provide guidance on tech strategy, digital transformation, and software roadmap planning.",
      icon: "💼",
    },
    {
      title: "Maintenance & Support",
      description: "Comprehensive post-launch support, covering updates, troubleshooting, and long-term system performance optimization.",
      icon: "🛡️",
    },
  ];

  return (
    <div>
     <Navbar/>
    <div className="bg-gray-100 p-8">


      <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 text-center transition-transform duration-300 hover:scale-105 ">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Services;
