import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatBotHistory from "./ChatBotHistory";
import ChatBotLoading from "./ChatBotLoading";
import { secret_key } from "./SecretKey";
import UserNavbar from "../User/UserNav";

function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(secret_key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch {
      console.error("Error sending message");
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Chatbot</h1>

        <div className="bg-white rounded-xl shadow-md p-4">
          <ChatBotHistory chatHistory={chatHistory} />
          <ChatBotLoading isLoading={isLoading} />
        </div>

        <div className="flex items-center gap-2 mt-6">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={userInput}
            onChange={handleUserInput}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            onClick={sendMessage}
            disabled={isLoading}
          >
            Send
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            onClick={clearChat}
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
