"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Copy, Loader2, Save, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { InputArea } from "./input-area";
import { MessageBubble } from "./message-bubble";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateId = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return Math.floor(Math.random() * 10000).toString();
  };

  const formatConversation = (msgs: Message[]) =>
    msgs.map((m) => `${m.sender}: ${m.text}`).join("\n");

  const handleSendMessage = async (text: string) => {
    setError(null);
    const newMessage: Message = { id: generateId(), text, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:3000/api/generate", {
        input: text,
      });
      const botMessage: Message = {
        id: generateId(),
        text: response.data.response,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err: unknown) {
      setError("Failed to get response from bot.");
      console.error("Error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setError(null);
  };

  const handleCopyConversation = () => {
    const conversation = formatConversation(messages);
    navigator.clipboard.writeText(conversation);
  };

  const handleSaveChat = () => {
    const conversation = formatConversation(messages);
    const blob = new Blob([conversation], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat_conversation.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full pt-16">
      <div
        className="flex-grow overflow-y-auto p-4 space-y-4"
        aria-live="polite"
        aria-label="Chat conversation"
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Bot is typing...</span>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm" role="alert">
            {error}
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t">
        <div className="flex space-x-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearChat}
            disabled={messages.length === 0 || isTyping}
            title="Clear all messages"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyConversation}
            disabled={messages.length === 0}
            title="Copy conversation to clipboard"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Conversation
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveChat}
            disabled={messages.length === 0}
            title="Save conversation as text file"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Chat
          </Button>
        </div>
        <InputArea onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
