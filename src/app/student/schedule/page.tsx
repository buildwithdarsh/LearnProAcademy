"use client";

import { useCallback, useState } from "react";
import { useAsyncData, useLazySection } from "@/hooks/useAsyncData";
import { Skeleton } from "@/components/ui/Skeleton";
import { TopBar } from "@/components/layout/TopBar";
import { todaySchedule } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Play,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  MessageCircle,
  ClipboardList,
  BookOpen,
  MapPin,
  User,
  Calendar,
} from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeSlots = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

// Weekly schedule mock
const weeklyScheduleData = [
  { day: "Mon", time: "6:30 AM", subject: "Physics", title: "Rotational Motion", type: "Live Class" as const },
  { day: "Mon", time: "8:15 AM", subject: "Chemistry", title: "Organic — Alcohols", type: "Live Class" as const },
  { day: "Mon", time: "11:00 AM", subject: "Mathematics", title: "Coordinate Geometry", type: "Live Class" as const },
  { day: "Mon", time: "2:00 PM", subject: "Physics", title: "Doubt Session", type: "Doubt Session" as const },
  { day: "Tue", time: "6:30 AM", subject: "Mathematics", title: "Calculus — Integration", type: "Live Class" as const },
  { day: "Tue", time: "8:15 AM", subject: "Physics", title: "Electrostatics", type: "Live Class" as const },
  { day: "Tue", time: "10:00 AM", subject: "Chemistry", title: "Weekly Test", type: "Test" as const },
  { day: "Tue", time: "2:00 PM", subject: "Chemistry", title: "Doubt Session", type: "Doubt Session" as const },
  { day: "Wed", time: "6:30 AM", subject: "Chemistry", title: "Thermodynamics", type: "Live Class" as const },
  { day: "Wed", time: "8:15 AM", subject: "Mathematics", title: "Trigonometry", type: "Live Class" as const },
  { day: "Wed", time: "11:00 AM", subject: "Physics", title: "Modern Physics", type: "Live Class" as const },
  { day: "Thu", time: "6:30 AM", subject: "Physics", title: "Waves & Optics", type: "Live Class" as const },
  { day: "Thu", time: "8:15 AM", subject: "Chemistry", title: "Inorganic Chemistry", type: "Live Class" as const },
  { day: "Thu", time: "10:00 AM", subject: "All", title: "Mock Test", type: "Test" as const },
  { day: "Fri", time: "6:30 AM", subject: "Mathematics", title: "Algebra — Matrices", type: "Live Class" as const },
  { day: "Fri", time: "8:15 AM", subject: "Physics", title: "Mechanics Revision", type: "Live Class" as const },
  { day: "Fri", time: "11:00 AM", subject: "Chemistry", title: "Organic Practice", type: "Live Class" as const },
  { day: "Fri", time: "2:00 PM", subject: "Mathematics", title: "Doubt Session", type: "Doubt Session" as const },
  { day: "Sat", time: "6:30 AM", subject: "All", title: "Weekly Test — PCM", type: "Test" as const },
  { day: "Sat", time: "10:00 AM", subject: "Physics", title: "Problem Solving", type: "Live Class" as const },
  { day: "Sat", time: "11:00 AM", subject: "Chemistry", title: "Lab Session", type: "Live Class" as const },
];

const typeIcon = (type: string) => {
  switch (type) {
    case "Live Class": return <Video className="h-4 w-4" />;
    case "Test": return <FileText className="h-4 w-4" />;
    case "Doubt Session": return <MessageCircle className="h-4 w-4" />;
    case "Assignment Due": return <ClipboardList className="h-4 w-4" />;
    case "Recorded": return <BookOpen className="h-4 w-4" />;
    default: return <Calendar className="h-4 w-4" />;
  }
};

const statusColor = (status: string) => {
  switch (status) {
    case "Live": return "bg-success-500 text-white";
    case "Completed": return "bg-gray-100 text-gray-500";
    case "Upcoming": return "bg-primary-100 text-primary-700";
    case "Cancelled": return "bg-danger-50 text-danger-600";
    default: return "bg-gray-100 text-gray-500";
  }
};

const subjectColor = (subject: string) => {
  if (subject.includes("Physics")) return "border-l-blue-500 bg-blue-50/50";
  if (subject.includes("Chemistry")) return "border-l-green-500 bg-green-50/50";
  if (subject.includes("Mathematics")) return "border-l-orange-500 bg-orange-50/50";
  return "border-l-purple-500 bg-purple-50/50";
};

const subjectCellColor = (subject: string) => {
  if (subject.includes("Physics")) return "bg-blue-100 text-blue-800 border-blue-200";
  if (subject.includes("Chemistry")) return "bg-green-100 text-green-800 border-green-200";
  if (subject.includes("Mathematics")) return "bg-orange-100 text-orange-800 border-orange-200";
  return "bg-purple-100 text-purple-800 border-purple-200";
};

export default function SchedulePage() {
  const [view, setView] = useState<"today" | "weekly">("today");

  const scheduleFetcher = useCallback(() => todaySchedule, []);
  const weeklyFetcher = useCallback(() => weeklyScheduleData, []);

  const { data: todayData, loading: todayLoading } = useAsyncData(scheduleFetcher, 800);
  const { data: weeklyData, loading: weeklyLoading } = useLazySection(weeklyFetcher, 600);

  return (
    <>
      <TopBar title="Class Schedule" subtitle="Your timetable and upcoming classes" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("today")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              view === "today" ? "bg-primary-600 text-white" : "bg-white text-text-secondary border border-border hover:bg-surface-secondary"
            )}
          >
            Today&apos;s Schedule
          </button>
          <button
            onClick={() => setView("weekly")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              view === "weekly" ? "bg-primary-600 text-white" : "bg-white text-text-secondary border border-border hover:bg-surface-secondary"
            )}
          >
            Weekly Timetable
          </button>
        </div>

        {/* Today's Timeline */}
        {view === "today" && (
          <div className="card">
            <h3 className="font-semibold text-base mb-6">Friday, March 28, 2026</h3>
            {todayLoading ? (
              <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-12 w-20 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : todayData ? (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[72px] top-0 bottom-0 w-0.5 bg-border" />

                <div className="space-y-1">
                  {todayData.map((item, idx) => {
                    const isLive = item.status === "Live";
                    const isCompleted = item.status === "Completed";
                    return (
                      <div key={item.id} className="relative flex gap-4 items-start group">
                        {/* Time */}
                        <div className="w-16 text-right shrink-0 pt-3">
                          <p className="text-sm font-semibold text-text-primary">{item.time}</p>
                        </div>

                        {/* Dot */}
                        <div className="relative z-10 mt-3.5">
                          <div className={cn(
                            "h-3 w-3 rounded-full border-2",
                            isLive ? "bg-success-500 border-success-500 animate-pulse" :
                            isCompleted ? "bg-gray-300 border-gray-300" :
                            "bg-white border-primary-500"
                          )} />
                        </div>

                        {/* Card */}
                        <div className={cn(
                          "flex-1 p-3 md:p-4 rounded-lg border-l-4 mb-3 transition-colors",
                          isLive ? "border-l-success-500 bg-success-50 border border-success-200" :
                          subjectColor(item.subject)
                        )}>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              {typeIcon(item.type)}
                              <h4 className="text-sm font-semibold">{item.title}</h4>
                              <span className={cn("badge text-[10px] whitespace-nowrap", statusColor(item.status))}>
                                {isLive && (
                                  <span className="relative flex h-2 w-2 mr-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                  </span>
                                )}
                                {item.status}
                              </span>
                              {isCompleted && (
                                <CheckCircle2 className="h-5 w-5 text-success-500 shrink-0" />
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-text-secondary">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3 shrink-0" /> {item.subject}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3 shrink-0" /> {item.faculty}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 shrink-0" /> {item.room}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3 shrink-0" /> {item.duration}
                              </span>
                            </div>
                            {isLive && (
                              <button className="btn-primary text-xs !px-3 !py-1.5 mt-2 whitespace-nowrap">
                                <Play className="h-3 w-3" /> Join Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Weekly Calendar Grid */}
        {view === "weekly" && (
          <div className="card overflow-x-auto">
            <h3 className="font-semibold text-base mb-4">Weekly Timetable — March 24-29, 2026</h3>
            {weeklyLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex gap-2">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <Skeleton key={j} className="h-16 flex-1 rounded-lg" />
                    ))}
                  </div>
                ))}
              </div>
            ) : weeklyData ? (
              <div className="min-w-[800px]">
                {/* Header */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  <div className="text-xs font-semibold text-text-tertiary px-2 py-2">Time</div>
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className={cn(
                        "text-xs font-semibold px-2 py-2 text-center rounded-lg",
                        day === "Fri" ? "bg-primary-50 text-primary-700" : "text-text-secondary"
                      )}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Grid rows */}
                {timeSlots.map((slot) => (
                  <div key={slot} className="grid grid-cols-7 gap-2 mb-1">
                    <div className="text-[11px] text-text-tertiary px-2 py-2 flex items-start">{slot}</div>
                    {weekDays.map((day) => {
                      const entry = weeklyData.find((e) => e.day === day && e.time.startsWith(slot.split(":")[0]));
                      if (!entry) {
                        return <div key={day} className="min-h-[48px] rounded-lg" />;
                      }
                      return (
                        <div
                          key={day}
                          className={cn(
                            "min-h-[48px] p-2 rounded-lg border text-[11px] cursor-pointer hover:shadow-sm transition-shadow",
                            subjectCellColor(entry.subject)
                          )}
                        >
                          <p className="font-semibold truncate">{entry.title}</p>
                          <p className="text-[10px] opacity-70 mt-0.5">{entry.subject}</p>
                          {entry.type === "Test" && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold mt-0.5 text-warning-600">
                              <FileText className="h-2.5 w-2.5" /> Test
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}
