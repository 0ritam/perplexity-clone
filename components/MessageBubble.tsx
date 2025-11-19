import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SourceCarousel } from "./SourceCarousel";
import { StatusIndicator } from "./StatusIndicator";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  steps?: string[];
  isStreaming?: boolean;
  currentStep?: "searching" | "reading" | "analyzing" | "generating";
}

export function MessageBubble({ role, content, sources, steps, isStreaming, currentStep }: MessageBubbleProps) {
  if (role === "user") {
    return (
      <div className="w-full flex justify-start mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-4xl w-full">
          <p className="text-2xl font-semibold text-slate-900">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start mb-8 animate-in fade-in duration-700">
      <div className="max-w-4xl w-full">
        {/* Show loading indicator while streaming and no content yet */}
        {isStreaming && !content && currentStep && (
          <div className="animate-in fade-in duration-300">
            <StatusIndicator step={currentStep} />
          </div>
        )}

        {/* Show steps if available and no content yet */}
        {isStreaming && !content && steps && steps.length > 0 && (
          <div className="mb-4 space-y-2 animate-in fade-in slide-in-from-left-2 duration-500">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="text-sm text-slate-600 animate-in fade-in slide-in-from-left-2"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                🔍 {step}
              </div>
            ))}
          </div>
        )}

        {/* Show sources if available and content is being generated */}
        {sources && sources.length > 0 && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-500">
            <SourceCarousel sources={sources} />
          </div>
        )}

        {/* Show content - only render if there's actual content and it's not raw JSON */}
        {content && content.trim() && !content.startsWith('[{') && !content.startsWith('{') && (
          <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-teal-600 prose-strong:text-slate-900 animate-in fade-in duration-500">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        )}

        {/* If still streaming but we only have raw JSON, show a message */}
        {isStreaming && content && (content.startsWith('[{') || content.startsWith('{')) && (
          <div className="text-sm text-slate-500 italic animate-pulse">
            Processing your query...
          </div>
        )}
      </div>
    </div>
  );
}
