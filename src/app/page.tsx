import { ChatWindow } from '@/components/chat-window';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <main className="flex flex-col h-screen max-w-5xl mx-auto">
      <Header />
      <ChatWindow />
    </main>
  );
}
