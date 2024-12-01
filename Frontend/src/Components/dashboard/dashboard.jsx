import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiMoneyStack } from "react-icons/gi";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import IncomeManager from "./Admin/Income.jsx";

import {
  FaSun,
  FaMoon,
  FaBars,
  FaSignOutAlt,
  FaUserFriends,
  FaEnvelope,
} from "react-icons/fa";

import MemberManagement from "./Admin/memberManagement";
import VerifiedMessages from "./Admin/verifiedMessages";
import ExpenseManager from "./Admin/expense.jsx";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  // Ensure token exists before decoding
  let decodedToken = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
      localStorage.setItem("user", JSON.stringify(decodedToken)); // Store user data in localStorage
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  const User = localStorage.getItem("user");
  const user = User ? JSON.parse(User) : null; // Access the passed decodedToken correctly

  const [formData, setFormData] = useState({
    email: user?.email || "",
    password: "*******",
    repassword: "********",
    profile: user?.profile || "",
    fullName: user?.fullName || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("home");

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:9000/member/update/${user?.id}`,
        formData
      );
      console.log("Update successful:");
      setProfileOpen(false);
    } catch (error) {
      console.error("Error during update:", error);
      alert("There was an error updating the profile.");
    }
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  const handleMobileSidebarToggle = () =>
    setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    const fetchUserProfile = async () => {
      try {
        // Placeholder for user image fetching logic
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    fetchUserProfile();
  }, [navigate, token]);

  const renderContent = () => {
    switch (activeComponent) {
      case "memberManagement":
        return <MemberManagement />;
      case "IncomeManager":
        return <IncomeManager />;
      case "ExpenseManagement":
        return <ExpenseManager />;
      case "messages":
        return <VerifiedMessages />;

      default:
        return <ExpenseManager />;
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      } min-h-screen flex`}
    >
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex bg-black bg-opacity-50 md:hidden">
          <div className="w-64 bg-blue-600 text-white p-6">
            <h2 className="text-2xl font-bold mb-6">Dashboard Menu</h2>
            <button
              onClick={handleDarkModeToggle}
              className="flex items-center text-xl mb-4"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 mr-2" />
              ) : (
                <FaMoon className="text-blue-200 mr-2" />
              )}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <ul className="space-y-4">
              <li
                onClick={() => {
                  setActiveComponent("memberManagement");
                  setIsMobileSidebarOpen(false);
                }}
                className="p-2 hover:bg-blue-500 rounded cursor-pointer flex items-center"
              >
                <FaUserFriends className="mr-2" /> Member Management
              </li>
              <li
                onClick={() => {
                  setActiveComponent("expenseManagement");
                  setIsMobileSidebarOpen(false);
                }}
                className="p-2 hover:bg-blue-500 rounded cursor-pointer flex items-center"
              >
                <FaUserFriends className="mr-2" /> Expense Management
              </li>
              <li
                onClick={() => {
                  setActiveComponent("IncomeManager");
                  setIsMobileSidebarOpen(false);
                }}
                className="p-2 hover:bg-blue-500 rounded cursor-pointer flex items-center"
              >
                <FaUserFriends className="mr-2" /> Income Management
              </li>

              <li
                onClick={() => {
                  setActiveComponent("messages");
                  setIsMobileSidebarOpen(false);
                }}
                className="p-2 hover:bg-blue-500 rounded cursor-pointer flex items-center"
              >
                <FaEnvelope className="mr-2" /> Messages
              </li>
              <li
                className="p-2 hover:bg-blue-500 rounded cursor-pointer flex items-center"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </li>
            </ul>
          </div>
          <div className="flex-1" onClick={handleMobileSidebarToggle} />
        </div>
      )}

      {/* Sidebar for Desktop */}
      <aside
        className={`hidden md:block ${
          isSidebarExpanded ? "w-64" : "w-24"
        } bg-blue-600 text-white p-6 transition-width duration-300`}
      >
        <button
          className="mb-6 text-lg font-bold flex items-center"
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
        >
          {isSidebarExpanded ? "Collapse" : "Expand"}
        </button>
        <ul className="space-y-4">
          <li
            onClick={() => setActiveComponent("memberManagement")}
            className="p-2 hover:bg-blue-500 rounded cursor-pointer flex items-center"
          >
            <FaUserFriends className="mr-2" />{" "}
            {isSidebarExpanded && "Member Management"}
          </li>
          <li
            onClick={() => setActiveComponent("expenseManagement")}
            className="p-2 hover:bg-blue-500 rounded cursor-pointer flex items-center"
          >
            <GiMoneyStack className="mr-2" />{" "}
            {isSidebarExpanded && "Expense Management"}
          </li>
          <li
            onClick={() => setActiveComponent("IncomeManager")}
            className="p-2 hover:bg-blue-500 rounded cursor-pointer flex items-center"
          >
            <GiMoneyStack className="mr-2" />{" "}
            {isSidebarExpanded && "Income Management"}
          </li>

          <li
            onClick={() => setActiveComponent("messages")}
            className="p-2 hover:bg-blue-500 rounded cursor-pointer flex items-center"
          >
            <FaEnvelope className="mr-2" /> {isSidebarExpanded && "Messages"}
          </li>
          <li
            className="p-2 hover:bg-blue-500 rounded cursor-pointer flex items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" /> {isSidebarExpanded && "Logout"}
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-4 shadow-md bg-white">
          <h1 className="text-xl font-bold">
            welcome dear <u>{formData.fullName}</u>!
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDarkModeToggle}
              className="hidden md:block text-2xl"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-blue-600" />
              )}
            </button>
            <img
              onClick={() => setProfileOpen(true)}
              src={userImage || "/images/user-placeholder.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 cursor-pointer"
            />
            <button
              onClick={handleMobileSidebarToggle}
              className="md:hidden text-2xl"
            >
              <FaBars />
            </button>
          </div>
        </nav>
        <div className="p-8">{renderContent()}</div>
      </div>

      {/* Profile Update Modal */}
      {profileOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onReset={() => setProfileOpen(false)}
            onSubmit={handleUpdate}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Full Name
              </label>
              <input
                type="fullName"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your Full Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="repassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                re-enter password
              </label>
              <input
                type="password"
                id="repassword"
                name="repassword"
                value={formData.repassword}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="re-enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="profile"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                profile picture
              </label>
              <input
                type="file"
                id="profile"
                name="profile"
                value={formData.profile}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="uplaod image "
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
              <button
                type="reset"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
