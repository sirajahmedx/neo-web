'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, PlusCircle } from 'lucide-react';

type Chat = {
  id: string;
  title: string;
};

export function Sidebar() {
  const [chats, setChats] = useState<Chat[]>([
    { id: '1', title: 'General Inquiry' },
    { id: '2', title: 'Technical Support' },
    { id: '3', title: 'Sales Inquiry' },
  ]);

  const addNewChat = () => {
    const newChat = { id: Date.now().toString(), title: `New Chat ${chats.length + 1}` };
    setChats([newChat, ...chats]);
  };

  return (
    <div className="w-64 h-screen bg-background border-r border-border flex flex-col">
      <div className="p-4">
        <Button className="w-full justify-start" onClick={addNewChat}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New chat
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-2">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              className="w-full justify-start text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {chat.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
