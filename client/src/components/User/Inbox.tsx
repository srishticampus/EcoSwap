import React from 'react';

const Inbox = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow mt-28">
      <h2 className="text-xl font-semibold mb-4">Inbox</h2>

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="text-lg font-semibold">Alin Alex</span>
        </div>
        <div className="text-sm text-gray-500 text-right">
          <p>18 April 2025,</p>
          <p>10:30 AM</p>
        </div>
      </div>

      <blockquote className="border-l-4 pl-4 text-gray-700 italic mb-4">
        “Hi, I just wanted to follow up regarding the project update you mentioned last week. Let me know if there's anything I can assist you with.”
      </blockquote>

      <button className="border border-gray-400 text-gray-700 px-4 py-1 rounded hover:bg-gray-100 mb-6">
        Reply
      </button>

      <textarea
        placeholder="Write your message.."
        className="w-full border border-gray-300 rounded p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
      ></textarea>

      <div className="text-right">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  );
};

export default Inbox;
