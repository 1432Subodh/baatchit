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
  time: string; // UI formatted
  status: string;
  type: "incoming" | "outgoing";
  from?: string;
  to?: string;
  rawTime?: string; // keep ISO for date grouping
}

export function useChat(username: string, chatWith: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const newSocket: Socket = io("https://baatchitserver.onrender.com/", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    setSocket(newSocket);

    // When connected/reconnected, always join
    newSocket.on("connect", () => {
      console.log("✅ Connected:", newSocket.id);
      newSocket.emit("join", username);
    });

    newSocket.on("disconnect", (reason) => {
      console.warn("⚠️ Disconnected:", reason);
    });

    newSocket.on("reconnect_attempt", () => {
      console.log("🔄 Trying to reconnect...");
    });

    // fetch history
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/messages/${username}/${chatWith}`);
        const data = await res.json();
        setChat(
          data.map((msg: any) => ({
            ...msg,
            rawTime: msg.time,
            time: new Date(msg.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            type: msg.from === username ? "outgoing" : "incoming",
          }))
        );
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();

    // receive private messages
    newSocket.on("private-message", (msg: Message) => {
      setChat((prev) => [
        ...prev,
        {
          ...msg,
          rawTime: msg.time,
          time: new Date(msg.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "incoming",
        },
      ]);

      // mark as seen
      fetch("/api/messages/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msgId: msg.id, status: "Read" }),
      });

      newSocket.emit("seen-message", {
        msgId: msg.id,
        to: msg.from,
        from: username,
      });
    });

    // update seen
    newSocket.on("message-seen", ({ msgId }) => {
      setChat((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, status: "Read" } : m))
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, [username, chatWith]);

  // send message
  const sendMessage = (text: string) => {
    if (socket && text.trim() !== "") {
      const now = new Date();
      const newMsg: Message = {
        id: uuidv4(),
        alt: username,
        fallback: username.charAt(0).toUpperCase(),
        message: text,
        rawTime: now.toISOString(),
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Sent",
        type: "outgoing",
        from: username,
        to: chatWith,
      };

      setChat((prev) => [...prev, newMsg]);

      fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newMsg, time: newMsg.rawTime }),
      }).catch(() => {
        setChat((prev) =>
          prev.map((m) => (m.id === newMsg.id ? { ...m, status: "Failed" } : m))
        );
      });

      socket.emit("private-message", { ...newMsg, time: newMsg.rawTime });
    }
  };

  return { chat, sendMessage, loading };
}
