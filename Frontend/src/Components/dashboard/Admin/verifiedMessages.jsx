import React, { useState, useEffect } from "react";
import axios from "axios";

const VerifiedMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(5); // Number of messages per page

  // Fetch messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/message/verified-messages"
      );
      const updatedMessages = response.data.reverse(); // Reverse to show the most recent first
      setMessages(updatedMessages);

      // Preserve filtering and pagination:
      if (searchTerm) {
        const filtered = updatedMessages.filter((message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMessages(filtered);
      } else {
        setFilteredMessages(updatedMessages);
      }
    } catch (error) {
      console.error("Error fetching verified messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [searchTerm]); // Ensure it updates when the search term changes

  // Pagination calculations
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="verified-messages-container">
      <h2 className="text-2xl font-bold mb-4">Verified Messages</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by sender name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to the first page when a new search is performed
          }}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Messages Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Message</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentMessages.length ? (
            currentMessages.map((message) => (
              <tr key={message.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {message.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {message.message}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Intl.DateTimeFormat("en-AF", {
                    timeZone: "Asia/Kabul",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(new Date(message.updatedAt))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No messages found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination mt-4 flex justify-center">
        {Array.from(
          { length: Math.ceil(filteredMessages.length / messagesPerPage) },
          (_, i) => i + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`px-3 py-1 mx-1 rounded ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VerifiedMessages;
