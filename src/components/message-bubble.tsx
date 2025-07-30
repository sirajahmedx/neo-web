import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  avatarUrl?: string;
};

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src={message.avatarUrl || undefined} />
          <AvatarFallback>{isUser ? "U" : "B"}</AvatarFallback>
        </Avatar>
        <div
          className={`max-w-md px-4 py-2 rounded-lg shadow transition-colors ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <p className="break-words">{message.text}</p>
        </div>
      </div>
    </div>
  );
}
