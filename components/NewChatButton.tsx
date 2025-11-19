"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function NewChatButton() {
  const router = useRouter();

  const handleNewChat = () => {
    // Refresh the page to reset state
    router.refresh();
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleNewChat}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-md transition-all hover:shadow-lg hover:scale-105 border border-slate-200"
    >
      <Plus size={18} />
      New Chat
    </button>
  );
}
