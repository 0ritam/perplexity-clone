
import { useState, useRef, useEffect } from "react";
import { Search, Sparkles, MapPin, Globe, Image as ImageIcon, Mic, ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSubmit: (query: string) => void;
  isLoading?: boolean;
  centered?: boolean;
}

export function ChatInput({ onSubmit, isLoading, centered = false }: ChatInputProps) {
  const [query, setQuery] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
      setQuery("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  const containerClasses = centered
    ? "flex justify-center items-center w-full"
    : "fixed bottom-0 left-0 right-0 bg-slate-50 border-t border-slate-200 py-4";

  return (
    <div className={containerClasses}>
      <form
        onSubmit={handleSubmit}
        className={`relative ${centered ? "w-full max-w-3xl" : "max-w-4xl w-full mx-auto px-4"}`}
      >
        <div className="relative flex flex-col gap-2">
          <div className="relative flex items-center gap-2 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-teal-500 rounded-2xl bg-white shadow-lg transition-all">
            {/* Left icons */}
            <div className="flex items-center gap-1 pl-4 py-3">
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                title="Search"
              >
                <Search size={18} />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                title="Focus"
              >
                <Sparkles size={18} />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                title="Location"
              >
                <MapPin size={18} />
              </button>
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything. Type @ for mentions."
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none bg-transparent py-4 text-slate-900 placeholder-slate-400 focus:outline-none disabled:opacity-50 max-h-[200px] overflow-y-auto"
              style={{ minHeight: "24px" }}
            />

            {/* Right icons */}
            <div className="flex items-center gap-1 pr-2 py-3">
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                title="Translate"
              >
                <Globe size={18} />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                title="Math"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3h18v18H3z"/>
                  <path d="M8 8h8M8 16h8M8 12h8"/>
                </svg>
              </button>
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                title="Attach"
              >
                <ImageIcon size={18} />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                title="Voice"
              >
                <Mic size={18} />
              </button>
              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="p-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Send"
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
