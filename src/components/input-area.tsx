import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Paperclip, Send } from 'lucide-react'

type InputAreaProps = {
  onSendMessage: (text: string) => void
}

export function InputArea({ onSendMessage }: InputAreaProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" size="icon">
        <Send className="h-4 w-4" />
      </Button>
      <Button type="button" size="icon" variant="outline">
        <Mic className="h-4 w-4" />
      </Button>
      <Button type="button" size="icon" variant="outline">
        <Paperclip className="h-4 w-4" />
      </Button>
    </form>
  )
}

