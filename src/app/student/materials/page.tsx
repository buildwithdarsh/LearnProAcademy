"use client";

import { useState, useCallback, useMemo } from "react";
import { useAsyncData } from "@/hooks/useAsyncData";
import { Skeleton } from "@/components/ui/Skeleton";
import { TopBar } from "@/components/layout/TopBar";
import { studyMaterials } from "@/lib/mock-data";
import type { StudyMaterial } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  FileText,
  Video,
  Calculator,
  BookOpen,
  ClipboardList,
  Brain,
  Download,
  Eye,
  Heart,
  Search,
  User,
  Calendar,
  HardDrive,
  Star,
} from "lucide-react";

const typeTabs = ["All", "PDF Notes", "Formula Sheets", "PYQ Papers", "Video Shorts", "DPP"];

const typeIconMap: Record<string, { icon: React.ReactNode; color: string; bgColor: string }> = {
  "PDF Notes": { icon: <FileText className="h-6 w-6" />, color: "text-danger-500", bgColor: "bg-danger-50" },
  "Video Short": { icon: <Video className="h-6 w-6" />, color: "text-primary-600", bgColor: "bg-primary-50" },
  "Formula Sheet": { icon: <Calculator className="h-6 w-6" />, color: "text-success-600", bgColor: "bg-success-50" },
  "PYQ Paper": { icon: <BookOpen className="h-6 w-6" />, color: "text-accent-600", bgColor: "bg-accent-50" },
  "DPP": { icon: <ClipboardList className="h-6 w-6" />, color: "text-warning-600", bgColor: "bg-warning-50" },
  "Mind Map": { icon: <Brain className="h-6 w-6" />, color: "text-primary-600", bgColor: "bg-primary-50" },
};

const typeToFilter: Record<string, string> = {
  "PDF Notes": "PDF Notes",
  "Formula Sheets": "Formula Sheet",
  "PYQ Papers": "PYQ Paper",
  "Video Shorts": "Video Short",
  "DPP": "DPP",
};

export default function MaterialsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  const fetcher = useCallback(() => {
    const mats = studyMaterials;
    const bm = new Set(mats.filter((m) => m.bookmarked).map((m) => m.id));
    return { materials: mats, initialBookmarks: bm };
  }, []);

  const { data, loading } = useAsyncData(fetcher, 1000);

  // Initialize bookmarks from data
  const effectiveBookmarks = useMemo(() => {
    if (bookmarks.size > 0) return bookmarks;
    if (data) return data.initialBookmarks;
    return new Set<string>();
  }, [data, bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev.size > 0 ? prev : data?.initialBookmarks || []);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.materials.filter((m) => {
      if (activeTab !== "All") {
        const filterType = typeToFilter[activeTab];
        if (filterType && m.type !== filterType) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!m.title.toLowerCase().includes(q) && !m.subject.toLowerCase().includes(q) && !m.chapter.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [data, activeTab, searchQuery]);

  return (
    <>
      <TopBar title="Study Materials" subtitle="Download notes, formula sheets, and more" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search materials by title, subject, or chapter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input !pl-10"
          />
        </div>

        {/* Type Tabs */}
        <div className="flex gap-2 flex-wrap">
          {typeTabs.map((tab) => (
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

        {/* Materials Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card space-y-3">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((material) => {
              const typeConf = typeIconMap[material.type] || typeIconMap["PDF Notes"];
              const isBookmarked = effectiveBookmarks.has(material.id);

              return (
                <div key={material.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    {/* Type Icon */}
                    <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center shrink-0", typeConf.bgColor)}>
                      <span className={typeConf.color}>{typeConf.icon}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold line-clamp-2 leading-snug">{material.title}</h4>
                        <button
                          onClick={() => toggleBookmark(material.id)}
                          className="shrink-0 p-1 rounded hover:bg-surface-secondary transition-colors"
                        >
                          {isBookmarked ? (
                            <Star className="h-4 w-4 text-warning-500 fill-warning-500" />
                          ) : (
                            <Star className="h-4 w-4 text-text-tertiary" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={cn(
                          "badge text-[10px]",
                          material.subject === "Physics" || material.subject === "All" ? "badge-primary" :
                          material.subject === "Chemistry" ? "badge-success" : "badge-warning"
                        )}>
                          {material.subject}
                        </span>
                        <span className="text-[10px] text-text-tertiary">{material.chapter}</span>
                      </div>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-3 mt-3 text-xs text-text-tertiary flex-wrap">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {material.faculty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {material.uploadDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" /> {material.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <HardDrive className="h-3 w-3" /> {material.size}
                    </span>
                  </div>

                  {/* Action */}
                  <div className="mt-4">
                    <button className={cn(
                      "w-full btn-sm",
                      material.type === "Video Short" ? "btn-primary" : "btn-secondary"
                    )}>
                      {material.type === "Video Short" ? (
                        <><Eye className="h-3.5 w-3.5" /> Watch</>
                      ) : (
                        <><Download className="h-3.5 w-3.5" /> Download</>
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
            <FileText className="h-12 w-12 text-text-tertiary mx-auto mb-3" />
            <p className="text-text-secondary">No materials found. Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </>
  );
}
