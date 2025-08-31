// import { AppSidebar } from "@/components/sidebar/sidebar"
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
// import { Badge } from "@/components/ui/badge"
// import Incoming from "@/components/chat-message/incoming"
// import { Message } from "../../interface/message"
// import Outgoing from "@/components/chat-message/outgoing"
// import ChatHeader from "@/components/sidebar/chat-header"
// import ChatFooter from "@/components/sidebar/chat-footer"

// export default function Page() {

//   const messages: Message[] = [
//     {
//       src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//       alt: "Amit Sharma",
//       fallback: "AS",
//       message: "Hey, are we meeting today?",
//       time: "10:43 AM",
//       status: "Read",
//       type: "incoming",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//       alt: "You",
//       fallback: "Y",
//       message: "Yes, at 5 PM. 👍",
//       time: "10:43 AM",
//       status: "Read",
//       type: "outgoing",
//     },
//   ]
//   return (
//     <SidebarProvider style={{ "--sidebar-width": "390px" } as React.CSSProperties}>
//       {/* Left Sidebar (chat list) */}
//       <AppSidebar />

//       {/* Right panel (chat window) */}
//       <SidebarInset className="flex flex-col h-screen bg-background">
//         {/* Chat header */}
//         <ChatHeader />

//         {/* Messages area */}
//         <div className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto bg-muted/5">
//           {/* Date separator */}
//           <div className="flex justify-center my-4">
//             <Badge variant="secondary" className="text-xs font-normal px-2 py-1">
//               Today
//             </Badge>
//           </div>

//           {/* Incoming message */}

//           {messages.map((msg, index) =>
//             msg.type === "incoming" ? (
//               <Incoming key={index} {...msg} />
//             ) : (
//               <Outgoing key={index} {...msg} />
//             )
//           )}


//         </div>

//         <ChatFooter />
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }


import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page