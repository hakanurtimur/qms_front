"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
interface Message {
  text: string;
  isUser: boolean;
}

interface AIChatBoxProps {
  messages: Message[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (e: React.FormEvent) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AIChatBox({
  messages,
  input,
  setInput,
  handleSendMessage,
  open,
  onOpenChange,
}: AIChatBoxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="flex bottom-4 right-4 rounded-full bg-opacity-5 w-6 h-6"
          size="icon"
        >
          <Sparkles className="h-6 w-6 " />
        </Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Point AI</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[78vh]">
          <ScrollArea className="flex-grow pr-4 rounded px-5 ">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4  ${message.isUser ? "text-right justify-end  " : "text-left  justify-start"}`}
              >
                <span
                  className={`inline-block p-4 rounded-lg max-w-lg break-words ${
                    message.isUser
                      ? "bg-primary text-primary-foreground rounded-br-none border rounded-md bg-black-800 text-white "
                      : "bg-muted bg-black-800 text-white rounded-bl-none"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="pt-4 border-t">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Mesajınızı yazın..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}