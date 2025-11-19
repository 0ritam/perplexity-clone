"use client";

import Image from "next/image";
import { Home, Newspaper, MessageSquare, TrendingUp, Bell, User, ArrowUpRight, Plus } from "lucide-react";

export function PerplexitySidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col items-center border-r border-slate-200 bg-slate-50 py-4">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/download.png"
          alt="Perplexity Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
      </div>

      {/* New Thread Button */}
      <button className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-colors hover:bg-slate-300">
        <Plus size={20} />
      </button>

      {/* Navigation Items */}
      <nav className="flex flex-1 flex-col items-center gap-6">
        <SidebarItem icon={<Home size={22} />} label="Home" active />
        <SidebarItem icon={<Newspaper size={22} />} label="Discover" />
        <SidebarItem icon={<MessageSquare size={22} />} label="Spaces" />
        <SidebarItem icon={<TrendingUp size={22} />} label="Finance" />
      </nav>

      {/* Bottom Items */}
      <div className="flex flex-col items-center gap-6">
        <button className="text-slate-500 transition-colors hover:text-slate-700">
          <Bell size={22} />
        </button>
        
        {/* Account with Pro Badge */}
        <div className="relative">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 text-slate-700 transition-colors hover:bg-slate-400">
            <User size={20} />
          </button>
          <div className="absolute -bottom-1 -right-1 rounded-full bg-teal-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            PRO
          </div>
        </div>

        {/* Upgrade Button */}
        <button className="text-slate-500 transition-colors hover:text-slate-700">
          <ArrowUpRight size={22} />
        </button>
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function SidebarItem({ icon, label, active }: SidebarItemProps) {
  return (
    <button
      className={`group relative flex flex-col items-center gap-1 transition-colors ${
        active ? "text-teal-600" : "text-slate-500 hover:text-slate-700"
      }`}
      title={label}
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span className="text-[10px] font-medium">{label}</span>
      
      {/* Active indicator */}
      {active && (
        <div className="absolute -left-8 h-8 w-1 rounded-r-full bg-teal-600" />
      )}
    </button>
  );
}
