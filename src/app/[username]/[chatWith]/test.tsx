"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid"; // for unique message IDs

interface ChatMessage {
  id: string;
  from: string;
  message: string;
  time: string;
  seen: boolean;
}

export default function ChatPage() {
  const params = useParams() as { username: string; chatWith: string };
  const { username, chatWith } = params;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!username) return;

    const newSocket: Socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.emit("join", username);

    // When you receive a message
    newSocket.on("private-message", (msg: ChatMessage) => {
      setChat((prev) => [...prev, msg]);

      // Send "seen" back if you are the receiver
      newSocket.emit("seen-message", {
        msgId: msg.id,
        to: msg.from,
        from: username,
      });
    });

    // Update seen status
    newSocket.on("message-seen", ({ msgId }) => {
      setChat((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, seen: true } : m))
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, [username]);

  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      const newMsg: ChatMessage = {
        id: uuidv4(),
        from: username,
        message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        seen: false,
      };

      socket.emit("private-message", { ...newMsg, to: chatWith });
      setChat((prev) => [...prev, newMsg]);
      setMessage("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Chat: {username} ↔ {chatWith}
      </h2>

      <div className="border rounded p-4 h-80 overflow-y-auto mb-4">
        {chat.map((msg) => (
          <div
            key={msg.id}
            className={msg.from === username ? "text-right" : "text-left"}
          >
            <p className="inline-block bg-gray-100 px-3 py-1 rounded">
              <strong>{msg.from}:</strong> {msg.message}
              <span className="ml-2 text-xs text-gray-500">{msg.time}</span>
              {msg.from === username && (
                <span className="ml-1 text-xs">
                  {msg.seen ? "✓✓" : "✓"}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
