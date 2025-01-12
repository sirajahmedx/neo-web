'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './message-bubble';
import { InputArea } from './input-area';
import { Button } from '@/components/ui/button';
import { Loader2, Copy, Save, Trash2 } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = { id: Date.now(), text, sender: 'user' };
    setMessages([...messages, newMessage]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = { id: Date.now(), text: `You said: ${text}`, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleCopyConversation = () => {
    const conversation = messages.map((m) => `${m.sender}: ${m.text}`).join('\n');
    navigator.clipboard.writeText(conversation);
  };

  const handleSaveChat = () => {
    const conversation = messages.map((m) => `${m.sender}: ${m.text}`).join('\n');
    const blob = new Blob([conversation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat_conversation.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full pt-16">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Bot is typing...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t">
        <div className="flex space-x-2 mb-4">
          <Button variant="outline" size="sm" onClick={handleClearChat}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyConversation}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Conversation
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveChat}>
            <Save className="h-4 w-4 mr-2" />
            Save Chat
          </Button>
        </div>
        <InputArea onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
