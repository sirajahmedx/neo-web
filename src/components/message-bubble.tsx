import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}

type MessageBubbleProps = {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <Avatar className="w-8 h-8">
          <AvatarImage src={isUser ? "/user-avatar.png" : "/bot-avatar.png"} />
          <AvatarFallback>{isUser ? 'U' : 'B'}</AvatarFallback>
        </Avatar>
        <div
          className={`max-w-md px-4 py-1 rounded-lg shadow ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          }`}
        >
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  )
}

