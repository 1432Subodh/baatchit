import React from 'react'
import { ModeToggle } from '../../../theme-provider/theme-btn'
import MainAvatar from '../avatar/mainavatar'
import { Button } from '../ui/button'
import { MoreVertical, Phone, Video } from 'lucide-react'

function ChatHeader() {
  return (
    <>
    
    <header className="sticky top-0 flex items-center justify-between p-3 border-b border-border bg-background">
          <div className="flex items-center gap-3">
            <ModeToggle />
            <MainAvatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Amit Sharma" fallback="AS" />

            <div className="flex flex-col">
              <span className="font-medium text-sm">Amit Sharma</span>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </header>
    </>
  )
}

export default ChatHeader