import { ChatWindow } from '@/components/chat-window';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <main className="flex flex-col h-screen max-w-5xl mx-auto px-4 bg-background">
      <Header />
      <section className="flex-1 flex flex-col justify-center">
        <ChatWindow />
      </section>
    </main>
  );
}
