import { Mic, Paperclip, Smile } from "lucide-react"
import React from "react"
import { Input } from "../ui/input"

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
      <button className="text-muted-foreground hover:text-foreground p-2 rounded-full transition">
        <Smile className="h-5 w-5" />
      </button>

      <button className="text-muted-foreground hover:text-foreground p-2 rounded-full transition">
        <Paperclip className="h-5 w-5" />
      </button>

      <Input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={handleInputChange}   // ✅ now wrapped in function
        onKeyDown={handleKeyDown}
        className="flex-1 h-10 px-4 rounded-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <button
        onClick={handleSend}
        className="bg-transparent hover:bg-transparent p-2 text-muted-foreground hover:text-foreground transition"
      >
        <Mic className="h-5 w-5" />
      </button>
    </footer>
  )
}

export default ChatFooter
