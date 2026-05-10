"use client";

import { useState, useCallback, useMemo } from "react";
import { useAsyncData } from "@/hooks/useAsyncData";
import { Skeleton } from "@/components/ui/Skeleton";
import { TopBar } from "@/components/layout/TopBar";
import { lectures } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Play,
  Clock,
  Eye,
  Calendar,
  User,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Search,
} from "lucide-react";

const subjectTabs = ["All", "Physics", "Chemistry", "Mathematics"];

const watchStatusConfig: Record<string, { color: string; bgColor: string; label: string }> = {
  Watched: { color: "text-success-600", bgColor: "bg-success-50 border-success-200", label: "Watched" },
  "Partially Watched": { color: "text-warning-600", bgColor: "bg-warning-50 border-warning-200", label: "In Progress" },
  Unwatched: { color: "text-gray-400", bgColor: "bg-gray-50 border-gray-200", label: "New" },
};

export default function LecturesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetcher = useCallback(() => lectures, []);
  const { data, loading } = useAsyncData(fetcher, 1000);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((l) => {
      if (activeTab !== "All" && l.subject !== activeTab) return false;
      if (searchQuery && !l.title.toLowerCase().includes(searchQuery.toLowerCase()) && !l.chapter.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [data, activeTab, searchQuery]);

  return (
    <>
      <TopBar title="Recorded Lectures" subtitle="Watch and revisit your class recordings" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {subjectTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "bg-primary-600 text-white"
                    : "bg-white text-text-secondary border border-border hover:bg-surface-secondary"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search lectures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input !pl-10"
            />
          </div>
        </div>

        {/* Lecture Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card p-0 overflow-hidden">
                <Skeleton className="h-40 w-full rounded-none" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-8 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((lecture) => {
              const statusConf = watchStatusConfig[lecture.watched];
              return (
                <div key={lecture.id} className="card p-0 overflow-hidden hover:shadow-md transition-shadow group">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-100">
                    <img
                      src={lecture.thumbnail}
                      alt={lecture.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="h-6 w-6 text-primary-600 ml-0.5" />
                      </div>
                    </div>
                    {/* Duration badge */}
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                      {lecture.duration}
                    </span>
                    {/* Watch status badge */}
                    <span className={cn(
                      "absolute top-2 left-2 badge text-[10px] border",
                      statusConf.bgColor, statusConf.color
                    )}>
                      {lecture.watched === "Watched" && <CheckCircle2 className="h-3 w-3" />}
                      {statusConf.label}
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    {/* Progress bar */}
                    {lecture.progress > 0 && lecture.progress < 100 && (
                      <div className="w-full h-1 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-primary-500 rounded-full"
                          style={{ width: `${lecture.progress}%` }}
                        />
                      </div>
                    )}
                    {lecture.progress === 100 && (
                      <div className="w-full h-1 bg-success-500 rounded-full" />
                    )}

                    {/* Title & Meta */}
                    <div>
                      <h4 className="text-sm font-semibold line-clamp-2 leading-snug">{lecture.title}</h4>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className={cn(
                          "badge text-[10px]",
                          lecture.subject === "Physics" ? "badge-primary" :
                          lecture.subject === "Chemistry" ? "badge-success" : "badge-warning"
                        )}>
                          {lecture.subject}
                        </span>
                        <span className="text-[10px] text-text-tertiary">{lecture.chapter}</span>
                      </div>
                    </div>

                    {/* Faculty & Stats */}
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" /> {lecture.faculty}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {lecture.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {lecture.views}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className={cn(
                      "w-full btn-sm",
                      lecture.watched === "Unwatched" ? "btn-primary" :
                      lecture.watched === "Partially Watched" ? "btn-primary" : "btn-secondary"
                    )}>
                      {lecture.watched === "Unwatched" ? (
                        <><Play className="h-3.5 w-3.5" /> Watch</>
                      ) : lecture.watched === "Partially Watched" ? (
                        <><RotateCcw className="h-3.5 w-3.5" /> Resume ({lecture.progress}%)</>
                      ) : (
                        <><RotateCcw className="h-3.5 w-3.5" /> Watch Again</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="card text-center py-12">
            <BookOpen className="h-12 w-12 text-text-tertiary mx-auto mb-3" />
            <p className="text-text-secondary">No lectures found for this filter.</p>
          </div>
        )}
      </div>
    </>
  );
}
