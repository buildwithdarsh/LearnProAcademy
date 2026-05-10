"use client";

import { Bell, Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { notifications } from "@/lib/mock-data";
import { timeAgo } from "@/lib/utils";

const typeIcons: Record<string, string> = {
  class: "📚",
  test: "📝",
  fee: "💳",
  result: "📊",
  announcement: "📢",
  doubt: "❓",
  attendance: "📋",
};

export function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border px-4 md:px-6 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-base md:text-lg font-bold text-text-primary truncate">{title}</h1>
          {subtitle && <p className="text-xs md:text-sm text-text-secondary truncate">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-2 bg-surface-secondary rounded-lg px-3 py-2 w-64">
            <Search className="h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none w-full"
            />
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-secondary active:bg-surface-tertiary transition-colors"
          >
            <Search className="h-5 w-5 text-text-secondary" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-surface-secondary active:bg-surface-tertiary transition-colors"
            >
              <Bell className="h-5 w-5 text-text-secondary" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 h-4 w-4 bg-danger-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                {/* Desktop dropdown */}
                <div className="hidden md:block absolute right-0 top-full mt-2 w-96 bg-white rounded-xl border border-border shadow-lg z-50 max-h-[480px] overflow-hidden">
                  <div className="px-4 py-3 border-b border-border flex justify-between items-center">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    <span className="text-xs text-primary-600 cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="overflow-y-auto max-h-[400px]">
                    {notifications.map((notif) => (
                      <NotificationItem key={notif.id} notif={notif} />
                    ))}
                  </div>
                </div>
                {/* Mobile full-screen slide */}
                <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <h3 className="font-semibold">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)} className="p-1.5 rounded-lg active:bg-surface-secondary">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {notifications.map((notif) => (
                      <NotificationItem key={notif.id} notif={notif} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (slides down) */}
      {showSearch && (
        <div className="md:hidden mt-3 flex items-center gap-2 bg-surface-secondary rounded-lg px-3 py-2.5">
          <Search className="h-4 w-4 text-text-tertiary shrink-0" />
          <input
            type="text"
            placeholder="Search anything..."
            autoFocus
            className="bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none w-full"
          />
          <button onClick={() => setShowSearch(false)} className="text-text-tertiary">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </header>
  );
}

function NotificationItem({ notif }: { notif: (typeof notifications)[0] }) {
  return (
    <div
      className={cn(
        "px-4 py-3 border-b border-border-light hover:bg-surface-secondary active:bg-surface-tertiary transition-colors cursor-pointer",
        !notif.read && "bg-primary-50/50"
      )}
    >
      <div className="flex gap-3">
        <span className="text-lg">{typeIcons[notif.type] || "📌"}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className={cn("text-sm", !notif.read ? "font-semibold" : "font-medium")}>{notif.title}</p>
            {!notif.read && <span className="h-2 w-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />}
          </div>
          <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{notif.message}</p>
          <p className="text-[11px] text-text-tertiary mt-1">{timeAgo(notif.time)}</p>
        </div>
      </div>
    </div>
  );
}
