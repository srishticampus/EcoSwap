import React, { useState, useEffect } from 'react';
import { ClipboardList } from "lucide-react";
import axios from 'axios';

const SubmitComplaint = () => {
  const [complaintMessage, setComplaintMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const complaintByUserType = "users";
  const userId = localStorage.getItem("userid");
  const organizationId = null;

  const handleSubmit = async () => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await axios.post("http://localhost:8000/addComplaint", {
        complaintMessage,
        complaintByUserType,
        userId,
        organizationId
      });

      if (response.data.success) {
        setSuccessMsg("Complaint submitted successfully.");
        setComplaintMessage("");
      } else {
        setErrorMsg("Failed to submit complaint.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const fetchComplaintHistory = async () => {
    setHistoryLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/complaints/user/${userId}`);
      // Sort by latest first
      const sortedData = response.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComplaints(sortedData);
    } catch (error) {
      console.error("Error fetching complaint history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    fetchComplaintHistory();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-40 bg-white rounded-lg shadow-md text-center">
      {/* Stylish View History Button */}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-full mb-6 hover:bg-green-700 transition duration-200"
        onClick={handleOpenModal}
      >
        📜 View Complaint History
      </button>

      <div className="flex flex-col items-center mb-6">
        <ClipboardList className="h-6 w-6 text-green-600 mb-2" />
        <h2 className="text-2xl font-semibold">Submit a Complaint</h2>
      </div>

      <div className="text-left mb-2">
        <label className="text-md font-medium text-gray-700">Complaint Description</label>
      </div>

      <textarea
        placeholder="Enter your complaint"
        value={complaintMessage}
        onChange={(e) => setComplaintMessage(e.target.value)}
        className="w-full border border-gray-300 rounded p-3 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
      ></textarea>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading || !complaintMessage}
      >
        {loading ? "Sending..." : "Send"}
      </button>

      {successMsg && <p className="text-green-600 mt-4">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mt-4">{errorMsg}</p>}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-center w-full">🕘 Complaint History</h3>
              <button
                className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>

            {/* Complaint History List */}
            {historyLoading ? (
              <p className="text-center">Loading...</p>
            ) : complaints.length === 0 ? (
              <p className="text-center text-gray-600">No complaints found.</p>
            ) : (
              <ul className="space-y-4 max-h-80 overflow-y-auto px-2">
                {complaints.map((complaint) => (
                  <li key={complaint._id} className="bg-gray-100 rounded-lg p-4 shadow-sm">
                    <p className="text-gray-800"><strong>Message:</strong> {complaint.complaintMessage}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Submitted on: {new Date(complaint.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {/* Back Button */}
            <div className="mt-6 text-right">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitComplaint;
