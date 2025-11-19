import { ExternalLink } from "lucide-react";

interface Source {
  title: string;
  url: string;
  favicon?: string;
}

interface SourceCarouselProps {
  sources: Source[] | string[];
}

export function SourceCarousel({ sources }: SourceCarouselProps) {
  if (!sources || sources.length === 0) return null;

  // Handle both string[] and Source[] formats
  const normalizedSources: Source[] = sources.map((source, idx) => {
    if (typeof source === "string") {
      return {
        title: extractDomain(source),
        url: source,
        favicon: getFaviconUrl(source),
      };
    }
    return {
      ...source,
      favicon: source.favicon || getFaviconUrl(source.url),
    };
  });

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-medium text-slate-700">Sources</h3>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {normalizedSources.map((source, idx) => (
          <a
            key={idx}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-w-[200px] max-w-[280px] items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-teal-400 hover:shadow-md hover:scale-105 animate-in fade-in slide-in-from-left-2"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Index Number */}
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 transition-all duration-300 group-hover:bg-teal-100 group-hover:text-teal-700">
              {idx + 1}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-2">
                {/* Favicon */}
                {source.favicon && (
                  <img
                    src={source.favicon}
                    alt=""
                    className="mt-0.5 h-4 w-4 shrink-0 rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                
                {/* Title */}
                <p className="flex-1 truncate text-sm font-medium text-slate-900 transition-colors duration-200 group-hover:text-teal-700">
                  {source.title}
                </p>

                {/* External Link Icon */}
                <ExternalLink className="h-3 w-3 shrink-0 text-slate-400 opacity-0 transition-all duration-200 group-hover:opacity-100" />
              </div>

              {/* URL */}
              <p className="mt-1 truncate text-xs text-slate-500">
                {extractDomain(source.url)}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function getFaviconUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
  } catch {
    return "";
  }
}
