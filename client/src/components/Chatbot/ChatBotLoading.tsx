import React from "react";

function ChatBotLoading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </>
  );
}

export default ChatBotLoading;
