"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

export interface Message {
  id: string;
  src?: string;
  alt: string;
  fallback: string;
  message: string;
  time: string;
  status: string; // "Sent" | "Delivered" | "Read"
  type: "incoming" | "outgoing";
}

export function useChat(username: string, chatWith: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chat, setChat] = useState<Message[]>([]);

  useEffect(() => {
    if (!username) return;

    const newSocket: Socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });

    setSocket(newSocket);
    newSocket.emit("join", username);

    // receive
    newSocket.on("private-message", (msg: Message) => {
      setChat((prev) => [...prev, { ...msg, type: "incoming" }]);

      // mark as seen
      newSocket.emit("seen-message", {
        msgId: msg.id,
        to: msg.alt,
        from: username,
      });
    });

    // update seen
    newSocket.on("message-seen", ({ msgId }) => {
      setChat((prev) =>
        prev.map((m) =>
          m.id === msgId ? { ...m, status: "Read" } : m
        )
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, [username]);

  const sendMessage = (text: string) => {
    if (socket && text.trim() !== "") {
      const newMsg: Message = {
        id: uuidv4(),
        alt: username,
        fallback: username.charAt(0).toUpperCase(),
        message: text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Sent",
        type: "outgoing",
      };

      socket.emit("private-message", { ...newMsg, to: chatWith });
      setChat((prev) => [...prev, newMsg]);
    }
  };




  return { chat, sendMessage };
}
