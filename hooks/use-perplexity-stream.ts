// hooks/use-perplexity-stream.ts
import { useState } from "react";

interface Message {
  role: string;
  content: string;
  sources?: string[];
  steps?: string[];
  isStreaming?: boolean;
}

export function usePerplexityStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<"searching" | "reading" | "analyzing" | "generating">("searching");

  const handleSearch = async (query: string) => {
    // Add user message
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: query }]);
    
    // Add empty assistant message placeholder
    setMessages((prev) => [...prev, { role: "assistant", content: "", steps: [], sources: [], isStreaming: true }]);

    try {
      const response = await fetch("https://mock-askperplexity.piyushhhxyz.deno.net", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        // Split by lines
        const lines = buffer.split("\n");
        buffer = lines.pop() || ""; // Keep incomplete line in buffer

        for (const line of lines) {
          if (!line.trim() || !line.startsWith("data:")) continue;

          const jsonStr = line.substring(5).trim(); // Remove "data:" prefix
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);
            console.log("Stream Data:", data);

            setMessages((prev) => {
              const newMsgs = [...prev];
              const lastMsg = newMsgs[newMsgs.length - 1];

              // Extract answer text from diff_block patches
              if (data.blocks && Array.isArray(data.blocks)) {
                for (const block of data.blocks) {
                  if (block.diff_block && block.diff_block.patches) {
                    for (const patch of block.diff_block.patches) {
                      // Look for answer patches
                      if ((patch.op === 'add' || patch.op === 'replace') && 
                          patch.path?.includes('answer') && patch.value) {
                        
                        if (patch.op === 'add') {
                          lastMsg.content += patch.value;
                        } else if (patch.op === 'replace') {
                          lastMsg.content = patch.value;
                        }
                        setCurrentStep("generating");
                      }
                    }
                  }
                }
              }

              // Extract sources from web results
              if (data.content?.web_results) {
                if (!lastMsg.sources) lastMsg.sources = [];
                data.content.web_results.forEach((result: any) => {
                  if (result.url && !lastMsg.sources!.includes(result.url)) {
                    lastMsg.sources!.push(result.url);
                  }
                });
              }

              // Track search steps
              if (data.step_type === "INITIAL_QUERY") {
                setCurrentStep("searching");
              } else if (data.step_type === "SEARCH_WEB") {
                setCurrentStep("reading");
              }

              return newMsgs;
            });

          } catch (e) {
            console.error("Error parsing JSON:", e);
          }
        }
      }

      // Mark streaming complete
      setMessages((prev) => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].isStreaming = false;
        return newMsgs;
      });

    } catch (error) {
      console.error(error);
      setMessages((prev) => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].content = "Sorry, an error occurred.";
        newMsgs[newMsgs.length - 1].isStreaming = false;
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, handleSearch, currentStep };
}
