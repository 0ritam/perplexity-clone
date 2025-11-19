"use client";

import { useEffect } from "react";
import { usePerplexityStream } from "@/hooks/use-perplexity-stream";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { ChatInput } from "@/components/ChatInput";
import { MessageBubble } from "@/components/MessageBubble";

export default function Home() {
  const { messages, isLoading, handleSearch, currentStep } = usePerplexityStream();
  const messagesContainerRef = useAutoScroll<HTMLDivElement>([messages]);

  // Hero View - Show when no messages
  if (messages.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 animate-in fade-in duration-700">
        <div className="w-full max-w-3xl">
          <div className="mb-16 text-center animate-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl font-normal tracking-tight text-slate-900">
              perplexity<span className="font-semibold text-teal-600">pro</span>
            </h1>
          </div>
          <div className="animate-in slide-in-from-bottom-8 duration-700 delay-200">
            <ChatInput onSubmit={handleSearch} isLoading={isLoading} centered />
          </div>
        </div>
      </div>
    );
  }

  // Chat View - Show when messages exist
  return (
    <div className="flex min-h-screen flex-col">
      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto pb-32 pt-8 scroll-smooth"
      >
        <div className="mx-auto max-w-4xl px-4">
          {messages.map((message, idx) => (
            <MessageBubble
              key={idx}
              role={message.role as "user" | "assistant"}
              content={message.content}
              sources={message.sources}
              steps={message.steps}
              isStreaming={message.isStreaming}
              currentStep={message.isStreaming ? currentStep : undefined}
            />
          ))}
        </div>
      </div>

      {/* Fixed Input at Bottom */}
      <div className="animate-in slide-in-from-bottom-4 duration-500">
        <ChatInput onSubmit={handleSearch} isLoading={isLoading} centered={false} />
      </div>
    </div>
  );
}
