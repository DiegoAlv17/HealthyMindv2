import React, { useState } from "react";
import { Send } from "lucide-react";

const mockMessages = [
  {
    id: "1",
    senderId: "psychologist1",
    receiverId: "user1",
    content: "Hello! How are you feeling today?",
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    senderId: "user1",
    receiverId: "psychologist1",
    content: "I'm doing better, thanks for asking!",
    createdAt: new Date(Date.now() - 3000000),
  },
];

const mockChats = [
  {
    id: "1",
    lastMessage: { content: "Hello! How are you feeling today?" },
  },
  // Puedes agregar más chats de ejemplo aquí.
];

export function Chats() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Lógica para enviar el mensaje
    console.log(`Sending message: ${newMessage}`);
    setNewMessage("");
  };

  return (
    <div className="h-screen flex">
      {/* Lista de chats */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Messages</h2>
          <div className="space-y-2">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                  selectedChat === chat.id ? "bg-pink-50" : ""
                }`}
              >
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-3 text-left">
                    <p className="font-medium text-gray-900">
                      Dr. Sarah Johnson
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.lastMessage?.content}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mensajes del chat */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Dr. Sarah Johnson</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === "user1"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                      message.senderId === "user1"
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
