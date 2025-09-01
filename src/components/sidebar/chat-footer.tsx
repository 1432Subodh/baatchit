import { Mic, Paperclip, SendHorizonal, Smile } from "lucide-react"
import React from "react"
import { Input } from "../ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "../ui/button"

interface Props {
  message: string
  setMessage: (msg: string) => void
  handleSend: () => void
}

function ChatFooter({ message, setMessage, handleSend }: Props) {
  // handle input change here instead of inline
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <footer className="sticky bottom-0 bg-background p-3 flex items-center gap-2 border-t border-border">
      <Tooltip>
        <TooltipTrigger><div className="text-muted-foreground hover:text-foreground p-2 rounded-full transition">
        <Paperclip className="h-5 w-5" />
      </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Document</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger><div className="text-muted-foreground hover:text-foreground p-2 rounded-full transition">
          <Smile className="h-5 w-5" />
        </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Emoji</p>
        </TooltipContent>
      </Tooltip>


      

      <Input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={handleInputChange}   // ✅ now wrapped in function
        onKeyDown={handleKeyDown}
        className="flex-1 h-10 px-4 rounded-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <div
        onClick={handleSend}
        className="rounded-full hover:bg-primary/90 bg-primary p-2 text-accent transition"
      >
        <SendHorizonal className="h-5 w-5" />
      </div>
    </footer>
  )
}

export default ChatFooter
