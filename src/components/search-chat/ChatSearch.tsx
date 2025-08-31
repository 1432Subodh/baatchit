"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function ChatSearchInput() {
  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      {/* Input */}
      <Input
        placeholder="Search or start new chat..."
        className="pl-10 pr-4 py-2 w-full rounded-md  
                   placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-all duration-150"
      />
    </div>
  )
}
