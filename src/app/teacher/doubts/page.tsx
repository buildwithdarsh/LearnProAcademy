"use client";

import { useState, useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Skeleton, StatSkeleton, ListSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection } from "@/hooks/useAsyncData";
import { teacherDoubts } from "@/lib/mock-data";
import type { Doubt } from "@/lib/mock-data";
import { timeAgo } from "@/lib/utils";
import {
  MessageSquare, Clock, CheckCircle2, AlertTriangle, ArrowUpDown,
  Send, ImageIcon, Mic, Filter, ChevronDown,
} from "lucide-react";

type FilterStatus = "All" | "Submitted" | "In Progress" | "Resolved";
type SortBy = "Newest" | "Oldest" | "Priority";

const priorityOrder: Record<string, number> = { High: 0, Medium: 1, Low: 2 };

export default function TeacherDoubtsPage() {
  const [filter, setFilter] = useState<FilterStatus>("All");
  const [sortBy, setSortBy] = useState<SortBy>("Newest");
  const [resolveOpen, setResolveOpen] = useState<string | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  const { data: stats, loading: statsLoading } = useAsyncData(
    useCallback(() => ({
      totalPending: 4,
      avgResolutionTime: 2.1,
      slaCompliance: 96.2,
      resolvedToday: 8,
    }), []),
    700
  );

  const { data: doubts, loading: doubtsLoading } = useLazySection(
    useCallback(() => teacherDoubts, []),
    600
  );

  const filteredDoubts = doubts
    ? doubts
        .filter((d) => filter === "All" || d.status === filter)
        .sort((a, b) => {
          if (sortBy === "Newest") return b.createdAt.getTime() - a.createdAt.getTime();
          if (sortBy === "Oldest") return a.createdAt.getTime() - b.createdAt.getTime();
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        })
    : [];

  const statusColor: Record<string, string> = {
    Submitted: "badge-warning",
    "In Progress": "badge-primary",
    Resolved: "badge-success",
  };

  const priorityColor: Record<string, string> = {
    High: "bg-red-50 text-red-700 border-red-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Low: "bg-green-50 text-green-700 border-green-200",
  };

  const filters: FilterStatus[] = ["All", "Submitted", "In Progress", "Resolved"];

  return (
    <>
      <TopBar title="Doubt Queue" subtitle="Resolve student doubts and queries" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Stats */}
        {statsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}
          </div>
        ) : stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-card">
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MessageSquare className="h-4 w-4" /> Total Pending
              </div>
              <div className="text-2xl font-bold mt-1 text-amber-600">{stats.totalPending}</div>
              <div className="text-xs text-text-tertiary">doubts awaiting resolution</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <Clock className="h-4 w-4" /> Avg Resolution
              </div>
              <div className="text-2xl font-bold mt-1">{stats.avgResolutionTime} hrs</div>
              <div className="text-xs text-green-600">Below 4hr SLA</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <CheckCircle2 className="h-4 w-4" /> SLA Compliance
              </div>
              <div className="text-2xl font-bold mt-1 text-emerald-600">{stats.slaCompliance}%</div>
              <div className="text-xs text-text-tertiary">within 4 hours</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <CheckCircle2 className="h-4 w-4" /> Resolved Today
              </div>
              <div className="text-2xl font-bold mt-1 text-blue-600">{stats.resolvedToday}</div>
              <div className="text-xs text-text-tertiary">doubts cleared</div>
            </div>
          </div>
        )}

        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-1.5 bg-white rounded-xl border border-border p-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f ? "bg-emerald-600 text-white" : "text-text-secondary hover:bg-surface-secondary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-text-secondary" />
            <select
              className="select text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
              <option value="Priority">Priority</option>
            </select>
          </div>
        </div>

        {/* Doubt List */}
        {doubtsLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card">
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDoubts.length === 0 ? (
              <div className="card text-center py-12">
                <CheckCircle2 className="h-12 w-12 text-emerald-300 mx-auto mb-3" />
                <h3 className="font-semibold text-text-secondary">No doubts in this category</h3>
                <p className="text-sm text-text-tertiary mt-1">All caught up!</p>
              </div>
            ) : (
              filteredDoubts.map((doubt) => (
                <div key={doubt.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    {/* Student avatar */}
                    <img
                      src={doubt.studentAvatar}
                      alt={doubt.studentName}
                      className="h-10 w-10 rounded-full object-cover shrink-0"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{doubt.studentName}</span>
                        <span className={`badge ${statusColor[doubt.status]}`}>{doubt.status}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${priorityColor[doubt.priority]}`}>
                          {doubt.priority}
                        </span>
                        <span className="text-xs text-text-tertiary ml-auto">{timeAgo(doubt.createdAt)}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        <span className="badge badge-primary">{doubt.subject}</span>
                        <span className="badge">{doubt.chapter}</span>
                      </div>

                      <p className="text-sm text-text-secondary mb-3">{doubt.question}</p>

                      {doubt.image && (
                        <div className="mb-3">
                          <img
                            src={doubt.image}
                            alt="Doubt attachment"
                            className="rounded-lg border border-border max-w-[240px] h-auto"
                          />
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {doubt.status !== "Resolved" && (
                          <button
                            onClick={() => setResolveOpen(resolveOpen === doubt.id ? null : doubt.id)}
                            className="btn-primary text-xs flex items-center gap-1"
                          >
                            <Send className="h-3 w-3" /> Resolve
                          </button>
                        )}
                        {doubt.status === "Resolved" && doubt.resolvedAt && (
                          <span className="text-xs text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Resolved {timeAgo(doubt.resolvedAt)}
                          </span>
                        )}
                      </div>

                      {/* Reply Form */}
                      {resolveOpen === doubt.id && (
                        <div className="mt-4 p-4 bg-surface-secondary rounded-xl border border-border-light">
                          <label className="text-sm font-medium text-text-secondary block mb-2">Your Response</label>
                          <textarea
                            className="input w-full h-24 resize-none mb-3"
                            placeholder="Type your explanation or solution here..."
                            value={replyTexts[doubt.id] || ""}
                            onChange={(e) => setReplyTexts((prev) => ({ ...prev, [doubt.id]: e.target.value }))}
                          />
                          <div className="flex items-center gap-3">
                            <button className="btn-primary text-xs flex items-center gap-1">
                              <Send className="h-3 w-3" /> Send Response
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="Attach image">
                              <ImageIcon className="h-4 w-4 text-text-secondary" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="Voice note">
                              <Mic className="h-4 w-4 text-text-secondary" />
                            </button>
                            <button
                              onClick={() => setResolveOpen(null)}
                              className="btn-secondary text-xs ml-auto"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
