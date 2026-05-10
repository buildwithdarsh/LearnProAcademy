"use client";

import { useState, useCallback } from "react";
import { useAsyncData } from "@/hooks/useAsyncData";
import { Skeleton } from "@/components/ui/Skeleton";
import { TopBar } from "@/components/layout/TopBar";
import { studentDoubts, SUBJECTS } from "@/lib/mock-data";
import { cn, timeAgo, getInitials } from "@/lib/utils";
import {
  Send,
  ImagePlus,
  Clock,
  CheckCircle2,
  Loader2,
  AlertCircle,
  MessageCircle,
  User,
  Tag,
  BookOpen,
  ChevronDown,
} from "lucide-react";

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  Submitted: { color: "badge-warning", icon: <AlertCircle className="h-3 w-3" />, label: "Submitted" },
  "In Progress": { color: "badge-primary", icon: <Loader2 className="h-3 w-3 animate-spin" />, label: "In Progress" },
  Resolved: { color: "badge-success", icon: <CheckCircle2 className="h-3 w-3" />, label: "Resolved" },
};

const priorityConfig: Record<string, string> = {
  Low: "bg-gray-100 text-gray-500",
  Medium: "badge-warning",
  High: "badge-danger",
};

// Additional forum doubts for the "Doubt Forum" tab
const forumDoubts = [
  {
    id: "fd1",
    studentName: "Priya Sharma",
    studentAvatar: "https://picsum.photos/seed/priya-sh/200/200",
    subject: "Physics",
    chapter: "Electrostatics",
    question: "Can someone explain why the electric field inside a conductor is zero? I understand the result but not the physical reasoning.",
    status: "Resolved" as const,
    createdAt: new Date("2026-03-27T08:30:00"),
    resolvedAt: new Date("2026-03-27T11:00:00"),
    assignedTo: "Dr. Rajesh Kumar",
    priority: "Medium" as const,
    replies: 3,
  },
  {
    id: "fd2",
    studentName: "Rohit Gupta",
    studentAvatar: "https://picsum.photos/seed/rohit-g/200/200",
    subject: "Mathematics",
    chapter: "Calculus",
    question: "What is the difference between Riemann sum and the definite integral? Are they always equal?",
    status: "In Progress" as const,
    createdAt: new Date("2026-03-28T07:00:00"),
    assignedTo: "Prof. Kunal Shah",
    priority: "Low" as const,
    replies: 1,
  },
  {
    id: "fd3",
    studentName: "Ananya Patel",
    studentAvatar: "https://picsum.photos/seed/ananya-p/200/200",
    subject: "Chemistry",
    chapter: "Organic Chemistry",
    question: "How do I determine which product is the major product in an E1cb elimination? The textbook examples are confusing.",
    status: "Submitted" as const,
    createdAt: new Date("2026-03-28T09:00:00"),
    assignedTo: "Prof. Sneha Iyer",
    priority: "High" as const,
    replies: 0,
  },
];

export default function DoubtsPage() {
  const [activeTab, setActiveTab] = useState<"my" | "forum">("my");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [question, setQuestion] = useState("");

  const fetcher = useCallback(() => studentDoubts, []);
  const { data, loading } = useAsyncData(fetcher, 1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Doubt submitted! (Demo)");
    setSubject("");
    setChapter("");
    setQuestion("");
  };

  const renderDoubtCard = (doubt: typeof studentDoubts[0] & { replies?: number }, showStudent = false) => {
    const status = statusConfig[doubt.status];
    return (
      <div key={doubt.id} className="card hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          {showStudent && (
            <img
              src={doubt.studentAvatar}
              alt={doubt.studentName}
              className="h-10 w-10 rounded-full object-cover shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn(
                "badge text-[10px]",
                doubt.subject === "Physics" ? "badge-primary" :
                doubt.subject === "Chemistry" ? "badge-success" : "badge-warning"
              )}>
                {doubt.subject}
              </span>
              <span className="badge bg-surface-tertiary text-text-secondary text-[10px]">
                {doubt.chapter}
              </span>
              <span className={cn("badge text-[10px] gap-1", status.color)}>
                {status.icon} {status.label}
              </span>
              <span className={cn("badge text-[10px]", priorityConfig[doubt.priority])}>
                {doubt.priority}
              </span>
            </div>

            {showStudent && (
              <p className="text-xs text-text-secondary mt-1.5">{doubt.studentName}</p>
            )}

            {/* Question */}
            <p className="text-sm mt-2 text-text-primary leading-relaxed">{doubt.question}</p>

            {/* Image */}
            {doubt.image && (
              <div className="mt-3">
                <img
                  src={doubt.image}
                  alt="Doubt attachment"
                  className="rounded-lg border border-border max-h-48 object-cover"
                />
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center gap-4 mt-3 text-xs text-text-tertiary flex-wrap">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" /> {doubt.assignedTo}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Asked {timeAgo(doubt.createdAt)}
              </span>
              {doubt.resolvedAt && (
                <span className="flex items-center gap-1 text-success-600">
                  <CheckCircle2 className="h-3 w-3" /> Resolved {timeAgo(doubt.resolvedAt)}
                </span>
              )}
              {"replies" in doubt && (
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" /> {(doubt as typeof forumDoubts[0]).replies} replies
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <TopBar title="Doubt Clearing" subtitle="Ask questions and get answers from faculty" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Ask a Doubt Form */}
        <div className="card">
          <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary-600" />
            Ask a Doubt
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="select"
                  required
                >
                  <option value="">Select Subject</option>
                  {SUBJECTS.jee.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Chapter</label>
                <input
                  type="text"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder="e.g., Rotational Motion"
                  className="input"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary mb-1 block">Your Question</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Describe your doubt in detail. Be specific about which concept or problem you're stuck on..."
                className="input min-h-[100px] resize-y"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button type="button" className="btn-secondary btn-sm">
                <ImagePlus className="h-4 w-4" /> Attach Image
              </button>
              <button type="submit" className="btn-primary btn-sm">
                <Send className="h-4 w-4" /> Submit Doubt
              </button>
            </div>
          </form>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("my")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === "my" ? "bg-primary-600 text-white" : "bg-white text-text-secondary border border-border hover:bg-surface-secondary"
            )}
          >
            My Doubts
          </button>
          <button
            onClick={() => setActiveTab("forum")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === "forum" ? "bg-primary-600 text-white" : "bg-white text-text-secondary border border-border hover:bg-surface-secondary"
            )}
          >
            Doubt Forum
          </button>
        </div>

        {/* Doubts List */}
        {activeTab === "my" && (
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-4">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))
            ) : data ? (
              data.map((doubt) => renderDoubtCard(doubt))
            ) : null}
          </div>
        )}

        {activeTab === "forum" && (
          <div className="space-y-4">
            {forumDoubts.map((doubt) => renderDoubtCard(doubt as any, true))}
          </div>
        )}
      </div>
    </>
  );
}
