"use client"

import * as React from "react"
import { LucideCircleDashed, MessageSquare, MessageSquareDashedIcon, Phone, Users2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import ChatSearchInput from "../search-chat/ChatSearch"

// Example data for sidebar
const data = {
  user: {
    name: "Subodh",
    email: "subodh@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  chats: [
    {
      name: "Amit Sharma",
      lastMessage: "Are we meeting today?",
      time: "09:34 AM",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Priya Singh",
      lastMessage: "I'll call you later",
      time: "Yesterday",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Rahul Verma",
      lastMessage: "Check that file I sent",
      time: "2 days ago",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Neha Gupta",
      lastMessage: "Good night 😊",
      time: "2 days ago",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeChat, setActiveChat] = React.useState(data.chats[0])
  const { setOpen } = useSidebar()

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* Sidebar with icons only */}
      <Sidebar collapsible="none" className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <MessageSquare className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">WhatsApp</span>
                    <span className="truncate text-xs">Chats</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {/* Chats */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={{ children: "Chats", hidden: false }}
                    isActive
                    onClick={() => setOpen(true)}
                  >
                    <MessageSquareDashedIcon />
                    <span>Chats</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Status */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={{ children: "Status", hidden: false }}
                    onClick={() => setOpen(true)}
                  >
                    <LucideCircleDashed />
                    <span>Status</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Groups */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={{ children: "Groups", hidden: false }}
                    onClick={() => setOpen(true)}
                  >
                    <Users2 />
                    <span>Groups</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Calls */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={{ children: "Calls", hidden: false }}
                    onClick={() => setOpen(true)}
                  >
                    <Phone />
                    <span>Calls</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>

          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* Full chat list sidebar */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex bg-accent/0">
        <SidebarHeader className="gap-3.5 p-4">
          <div className="text-foreground text-base font-medium">Chats</div>
          <ChatSearchInput />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {data.chats.map((chat) => (
                <a
                  href="#"
                  key={chat.name}
                  onClick={() => setActiveChat(chat)}
                  className={`hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-3 border-b p-4 text-sm leading-tight last:border-b-0 ${activeChat?.name === chat.name ? "bg-sidebar-accent" : ""
                    }`}
                >
                  {/* Avatar */}
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  {/* Chat info */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex w-full items-center gap-2">
                      <span className="font-medium truncate">{chat.name}</span>
                      <span className="ml-auto text-xs">{chat.time}</span>
                    </div>
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {chat.lastMessage}
                    </span>
                  </div>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
