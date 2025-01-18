import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiMoneyStack } from "react-icons/gi";
import { jwtDecode } from "jwt-decode";
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
  const navigate = useNavigate();

  // Fetch and decode token
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [userImage, setUserImage] = useState(null);

  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(JSON.stringify(decodedToken));
        // localStorage.setItem("name", JSON.stringify(decodedToken.fullName));
        console.log(decodedToken);
        
      } catch (error) {
        console.error("Invalid token, logging out.", error);
        handleLogout();
      }
    }
  }, [token]);

  // Redirect to login if no user
  const [formData, setFormData] = useState(() => {
    // Use a function to initialize state to handle user being null initially
    return {
      email: user?.email || "guest",       // Default to "guest" if no email
      fullName: user?.fullName || "",      // Default to empty string
      password: "",                        // Empty string for new password
      repassword: "",                      // Empty string for confirmation password
      profile: null,                       // Null for profile picture initially
      role: user?.role || "",              // Default to empty string if no role
      entryDate: user?.entryDate || "",    // Default to empty string for entry date
      skills: user?.skills || "",          // Default to empty string for skills
      contacts: user?.contacts || "",      // Default to empty string for contacts
    };
  });
  
  // Update formData dynamically if the user state changes
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email || "guest",
        fullName: user.fullName || "",
        role: user.role || "",
        entryDate: user.entryDate || "",
        skills: user.skills || "",
        contacts: user.contacts || "",
      }));
    }
  }, [user]);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("home");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch(
        `http://localhost:8000/users/update/${user?.id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error updating profile.");
        return;
      }

      const updatedData = await response.json();
      console.log("Update successful:", updatedData);
    } catch (err) {
      setError("An error occurred while updating the profile.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  // Handle sidebar toggle
  const handleMobileSidebarToggle = () =>
    setIsMobileSidebarOpen(!isMobileSidebarOpen);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Render active component
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
           
            wellcome dear <u>{localStorage.getItem("name")}</u>!
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
        <div className="fixed inset-0 overflow-x-scroll flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" p-6 bg-white rounded shadow-lg">
            <form onSubmit={handleUpdate} className="space-y-4">
              <h2 className="text-xl font-bold text-center">Update Profile</h2>
              {error && <p className="text-red-500">{error}</p>}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    placeholder="Enter your Full Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="repassword"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Re-enter Password
                  </label>
                  <input
                    type="password"
                    id="repassword"
                    name="repassword"
                    value={formData.repassword}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    placeholder="Re-enter your password"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-bold text-gray-700"
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                      placeholder="Enter role"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="entryDate"
                      className="block text-sm font-bold text-gray-700"
                    >
                      Entry Date
                    </label>
                    <input
                      type="date"
                      id="entryDate"
                      name="entryDate"
                      value={formData.entryDate}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="skills"
                      className="block text-sm font-bold text-gray-700"
                    >
                      Skills
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                      placeholder="Enter skills"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contacts"
                      className="block text-sm font-bold text-gray-700"
                    >
                      Contacts
                    </label>
                    <input
                      type="text"
                      id="contacts"
                      name="contacts"
                      value={formData.contacts}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                      placeholder="Enter contacts"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="profile"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="profile"
                    name="profile"
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setProfileOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
