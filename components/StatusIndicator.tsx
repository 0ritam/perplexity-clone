import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface StatusIndicatorProps {
  step?: "searching" | "reading" | "analyzing" | "generating";
}

const statusMessages = {
  searching: "Searching...",
  reading: "Finding results...",
  analyzing: "Analyzing sources...",
  generating: "Generating answer...",
};

export function StatusIndicator({ step = "searching" }: StatusIndicatorProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-4 flex items-center gap-3">
      <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
      <span className="text-sm text-slate-600 animate-pulse">
        {statusMessages[step]}
        {dots}
      </span>
    </div>
  );
}
