"use client";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import Incoming from "@/components/chat-message/incoming";
import Outgoing from "@/components/chat-message/outgoing";
import ChatHeader from "@/components/sidebar/chat-header";
import ChatFooter from "@/components/sidebar/chat-footer";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useChat } from "../../../../logic/useChat";
import { getDateLabel } from "../../../../utils/dateLabel";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const params = useParams() as { username: string; chatWith: string };
  const { username, chatWith } = params;

  const { chat, sendMessage, loading } = useChat(username, chatWith);
  const [message, setMessage] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (message.trim() !== "") {
      sendMessage(message);
      setMessage("");
    }
  };

  // auto-scroll to bottom when chat updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  // group messages by date
  const groupedChat = chat.reduce((acc: any, msg) => {
    const dateLabel = getDateLabel(msg.rawTime || "");
    if (!acc[dateLabel]) acc[dateLabel] = [];
    acc[dateLabel].push(msg);
    return acc;
  }, {});

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "390px" } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen bg-background">
        <ChatHeader />

        {/* Messages area */}
        <div
          className="flex-1 flex flex-col gap-2 p-2 overflow-y-auto bg-muted/5"
          ref={chatContainerRef}
        >
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            Object.keys(groupedChat).map((date) => (
              <div key={date} className="relative">
                {/* Sticky date badge */}
                <div className="sticky top-2 z-10 flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs font-normal px-2 py-1 shadow-sm"
                    >
                      {date}
                    </Badge>
                  </motion.div>
                </div>

                {/* Messages under this date */}
                <div className="flex flex-col gap-1 mt-6">
                  <AnimatePresence>
                    {groupedChat[date].map((msg: any) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {msg.type === "incoming" ? (
                          <Incoming {...msg} />
                        ) : (
                          <Outgoing {...msg} />
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <ChatFooter
          message={message}
          setMessage={setMessage}
          handleSend={handleSend}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
