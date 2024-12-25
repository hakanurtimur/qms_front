"use client";

import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="flex bottom-4 right-4 rounded-full bg-opacity-5 w-6 h-6"
              size="icon"
            >
              <Sparkles className="h-6 w-6 " />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Qubqa AI</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Qubqa AI</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[78vh]">
          <ScrollArea className="flex-grow pr-4 rounded px-5 ">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4  ${message.isUser ? "text-right justify-end  " : "text-left  justify-start"}`}
              >
                {/* <span
                  className={`inline-block p-4 rounded-lg max-w-lg break-words ${
                    message.isUser
                      ? "bg-primary text-primary-foreground rounded-br-none border rounded-md bg-black-800 text-white "
                      : "bg-muted bg-black-800 text-white rounded-bl-none"
                  }`}
                >
                  {message.text}
                </span> */}
                <article
                  className={`prose prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-strong:text-white inline-block p-4 rounded-lg max-w-lg break-words ${
                    message.isUser
                      ? "bg-primary text-primary-foreground rounded-br-none border rounded-md bg-black-800 text-white "
                      : "bg-muted bg-black-800 text-white rounded-bl-none"
                  }`}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {message.text}
                  </Markdown>
                </article>
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
