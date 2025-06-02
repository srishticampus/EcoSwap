import React from "react";
import ReactMarkdown from "react-markdown";

function ChatBotHistory({ chatHistory }) {
  return (
    <div className="space-y-3">
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg whitespace-pre-line ${
            message.type === "user"
              ? "bg-gray-200 text-gray-800 self-end"
              : "bg-green-500 text-white self-start"
          }`}
        >
          {message.type === "user" && (
            <span className="text-sm text-gray-500 font-semibold">You:</span>
          )}
          <div className="mt-1">
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatBotHistory;
