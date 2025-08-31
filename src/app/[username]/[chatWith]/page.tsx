"use client";
import { AppSidebar } from "@/components/sidebar/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import Incoming from "@/components/chat-message/incoming"
import Outgoing from "@/components/chat-message/outgoing"
import ChatHeader from "@/components/sidebar/chat-header"
import ChatFooter from "@/components/sidebar/chat-footer"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useChat } from "../../../../logic/useChat";
export default function Page() {
  const params = useParams() as { username: string; chatWith: string };
  const { username, chatWith } = params;

  const { chat, sendMessage } = useChat(username, chatWith);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      sendMessage(message);
      setMessage("");
    }

  };

  console.log("Chat messages:", chat);


  return (
    <SidebarProvider style={{ "--sidebar-width": "390px" } as React.CSSProperties}>
      {/* Left Sidebar (chat list) */}
      <AppSidebar />

      {/* Right panel (chat window) */}
      <SidebarInset className="flex flex-col h-screen bg-background">
        {/* Chat header */}
        <ChatHeader />

        {/* Messages area */}
        <div className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto bg-muted/5">
          {/* Date separator */}
          <div className="flex justify-center my-4">
            <Badge variant="secondary" className="text-xs font-normal px-2 py-1">
              Today
            </Badge>
          </div>

          {chat.map((msg, index) =>
            msg.type === "incoming" ? (
              <Incoming key={index} {...msg} />
            ) : (
              <Outgoing key={index} {...msg} />
            )
          )}
        </div>

        {/* Footer with input */}
        <ChatFooter
          message={message}
          setMessage={setMessage}
          handleSend={handleSend}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
