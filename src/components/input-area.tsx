import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type InputAreaProps = {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

export function InputArea({
  onSendMessage,
  disabled = false,
  placeholder = "Type your message...",
}: InputAreaProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed.length > 0) {
      onSendMessage(trimmed);
      setInput("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === "Enter" && !e.shiftKey) ||
      (e.key === "Enter" && (e.ctrlKey || e.metaKey))
    ) {
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow"
        disabled={disabled}
        aria-disabled={disabled}
        autoComplete="off"
        aria-label="Message input"
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !input.trim()}
        aria-label="Send message"
        aria-disabled={disabled || !input.trim()}
        title="Send message (Enter or Ctrl+Enter)"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
