"use client";

import { useState, useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAsyncData } from "@/hooks/useAsyncData";
import { teacherSchedule } from "@/lib/mock-data";
import type { ScheduleItem } from "@/lib/mock-data";
import {
  Calendar, List, Grid3X3, Clock, Play, RotateCcw, ClipboardCheck,
} from "lucide-react";

const weeklySchedule: Record<string, ScheduleItem[]> = {
  Mon: [
    { id: "ws-1", type: "Live Class", title: "Mechanics — Friction", subject: "Physics", faculty: "Dr. Anil Verma", time: "6:30 AM", duration: "90 min", batch: "JEE Adv — Morning", room: "Hall A", status: "Completed" },
    { id: "ws-2", type: "Live Class", title: "Electrostatics Basics", subject: "Physics", faculty: "Dr. Anil Verma", time: "8:15 AM", duration: "75 min", batch: "JEE Main — Online", room: "Online Studio", status: "Completed" },
    { id: "ws-3", type: "Doubt Session", title: "Open Doubt Session", subject: "Physics", faculty: "Dr. Anil Verma", time: "2:00 PM", duration: "60 min", batch: "All Batches", room: "Room 201", status: "Completed" },
  ],
  Tue: [
    { id: "ws-4", type: "Live Class", title: "Work, Energy & Power", subject: "Physics", faculty: "Dr. Anil Verma", time: "6:30 AM", duration: "90 min", batch: "JEE Adv — Morning", room: "Hall A", status: "Completed" },
    { id: "ws-5", type: "Test", title: "Chapter Test Review", subject: "Physics", faculty: "Dr. Anil Verma", time: "10:00 AM", duration: "45 min", batch: "JEE Adv — Morning", room: "Staff Room", status: "Completed" },
  ],
  Wed: [
    { id: "ws-6", type: "Live Class", title: "Rotational Motion — Torque", subject: "Physics", faculty: "Dr. Anil Verma", time: "6:30 AM", duration: "90 min", batch: "JEE Adv — Morning", room: "Hall A", status: "Completed" },
    { id: "ws-7", type: "Live Class", title: "Magnetism — Biot-Savart", subject: "Physics", faculty: "Dr. Anil Verma", time: "8:15 AM", duration: "75 min", batch: "JEE Main — Online", room: "Online Studio", status: "Completed" },
    { id: "ws-8", type: "Live Class", title: "Waves — Interference", subject: "Physics", faculty: "Dr. Anil Verma", time: "2:00 PM", duration: "90 min", batch: "JEE Adv — Evening", room: "Hall B", status: "Completed" },
  ],
  Thu: [
    { id: "ws-9", type: "Live Class", title: "Rotational Motion — Angular Momentum", subject: "Physics", faculty: "Dr. Anil Verma", time: "6:30 AM", duration: "90 min", batch: "JEE Adv — Morning", room: "Hall A", status: "Completed" },
    { id: "ws-10", type: "Doubt Session", title: "Doubt Clearing", subject: "Physics", faculty: "Dr. Anil Verma", time: "10:30 AM", duration: "60 min", batch: "All Batches", room: "Room 201", status: "Completed" },
  ],
  Fri: teacherSchedule,
  Sat: [
    { id: "ws-11", type: "Live Class", title: "Modern Physics — Dual Nature", subject: "Physics", faculty: "Dr. Anil Verma", time: "8:00 AM", duration: "90 min", batch: "JEE Adv — Morning", room: "Hall A", status: "Upcoming" },
    { id: "ws-12", type: "Test", title: "Weekly Mock Invigilation", subject: "Physics", faculty: "Dr. Anil Verma", time: "2:00 PM", duration: "180 min", batch: "JEE Adv — Morning", room: "Exam Hall", status: "Upcoming" },
  ],
  Sun: [],
};

const timeSlots = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const batchColors: Record<string, string> = {
  "JEE Adv — Morning": "bg-blue-100 border-blue-300 text-blue-800",
  "JEE Main — Online": "bg-purple-100 border-purple-300 text-purple-800",
  "JEE Adv — Evening": "bg-orange-100 border-orange-300 text-orange-800",
  "All Batches": "bg-teal-100 border-teal-300 text-teal-800",
};

const statusColor: Record<string, string> = {
  Completed: "badge-success",
  Live: "badge-danger",
  Upcoming: "badge-warning",
  Cancelled: "badge-secondary",
};

function getSlotForTime(time: string): string {
  const hour = parseInt(time.split(":")[0]);
  const isPM = time.includes("PM");
  const h24 = isPM && hour !== 12 ? hour + 12 : (!isPM && hour === 12 ? 0 : hour);
  return `${h24 < 12 ? h24 : h24 - 12 === 0 ? 12 : h24 - 12}:00 ${h24 < 12 ? "AM" : "PM"}`;
}

export default function TeacherSchedulePage() {
  const [view, setView] = useState<"daily" | "weekly">("daily");

  const { data: dailySchedule, loading } = useAsyncData(
    useCallback(() => teacherSchedule, []),
    700
  );

  const { data: weeklyData, loading: weeklyLoading } = useAsyncData(
    useCallback(() => weeklySchedule, []),
    900
  );

  return (
    <>
      <TopBar title="My Schedule" subtitle="Manage your classes, sessions, and tests" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Calendar className="h-5 w-5 text-emerald-600 shrink-0" />
            <h2 className="text-base sm:text-lg font-semibold truncate">
              {view === "daily" ? "Today — Fri, Mar 28, 2026" : "This Week — Mar 23–29, 2026"}
            </h2>
          </div>
          <div className="flex bg-white rounded-lg border border-border overflow-hidden shrink-0 self-start">
            <button
              onClick={() => setView("daily")}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${
                view === "daily" ? "bg-emerald-600 text-white" : "text-text-secondary hover:bg-surface-secondary"
              }`}
            >
              <List className="h-4 w-4" /> Daily
            </button>
            <button
              onClick={() => setView("weekly")}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${
                view === "weekly" ? "bg-emerald-600 text-white" : "text-text-secondary hover:bg-surface-secondary"
              }`}
            >
              <Grid3X3 className="h-4 w-4" /> Weekly
            </button>
          </div>
        </div>

        {/* Daily View */}
        {view === "daily" && (
          <div className="card">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-16 w-20 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                    <Skeleton className="h-8 w-24 rounded-lg" />
                  </div>
                ))}
              </div>
            ) : dailySchedule && (
              <div className="space-y-4">
                {dailySchedule.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border transition-all ${
                      item.status === "Live"
                        ? "border-green-300 bg-green-50 shadow-sm shadow-green-100"
                        : "border-border-light bg-white hover:border-border"
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      {/* Time block */}
                      <div className={`text-center p-2.5 sm:p-3 rounded-xl shrink-0 ${
                        item.status === "Live" ? "bg-green-600 text-white" :
                        item.status === "Completed" ? "bg-gray-100 text-text-secondary" :
                        "bg-emerald-50 text-emerald-700"
                      }`}>
                        <Clock className="h-4 w-4 mx-auto mb-1" />
                        <div className="text-sm font-bold whitespace-nowrap">{item.time}</div>
                        <div className="text-[10px] opacity-80">{item.duration}</div>
                      </div>

                      {/* Details + Actions */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold text-sm">{item.title}</h4>
                              <span className={`badge ${statusColor[item.status]}`}>{item.status}</span>
                              {item.status === "Live" && (
                                <span className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2 text-xs text-text-secondary">
                              <span className="badge badge-primary">{item.subject}</span>
                              <span className={`badge border whitespace-nowrap ${batchColors[item.batch] || "bg-gray-100"}`}>{item.batch}</span>
                            </div>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-xs text-text-tertiary">
                              <span>{item.room}</span>
                              <span>{item.type}</span>
                            </div>
                          </div>

                          {/* Actions — desktop only inline */}
                          <div className="hidden sm:flex flex-col gap-2 shrink-0">
                            {item.status === "Live" ? (
                              <button className="btn-primary text-xs flex items-center gap-1">
                                <Play className="h-3 w-3" /> Join Class
                              </button>
                            ) : item.status === "Upcoming" ? (
                              <>
                                <button className="btn-secondary text-xs flex items-center gap-1">
                                  <RotateCcw className="h-3 w-3" /> Reschedule
                                </button>
                                <button className="btn-primary text-xs flex items-center gap-1">
                                  <ClipboardCheck className="h-3 w-3" /> Attendance
                                </button>
                              </>
                            ) : (
                              <button className="btn-secondary text-xs flex items-center gap-1">
                                <ClipboardCheck className="h-3 w-3" /> Attendance
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Actions — mobile, stacked below */}
                        <div className="flex sm:hidden gap-2 mt-3 overflow-hidden">
                          {item.status === "Live" ? (
                            <button className="btn-primary text-xs flex items-center gap-1 flex-1 justify-center min-w-0">
                              <Play className="h-3 w-3 shrink-0" /> Join Class
                            </button>
                          ) : item.status === "Upcoming" ? (
                            <>
                              <button className="btn-secondary text-xs flex items-center gap-1 flex-1 justify-center min-w-0">
                                <RotateCcw className="h-3 w-3 shrink-0" /> Reschedule
                              </button>
                              <button className="btn-primary text-xs flex items-center gap-1 flex-1 justify-center min-w-0">
                                <ClipboardCheck className="h-3 w-3" /> Attendance
                              </button>
                            </>
                          ) : (
                            <button className="btn-secondary text-xs flex items-center gap-1">
                              <ClipboardCheck className="h-3 w-3" /> Attendance
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Weekly View */}
        {view === "weekly" && (
          <div className="card overflow-x-auto p-0">
            {weeklyLoading ? (
              <div className="p-6">
                <Skeleton className="h-96 w-full rounded-lg" />
              </div>
            ) : weeklyData && (
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th className="px-3 py-3 text-left text-xs font-semibold text-text-secondary w-20">Time</th>
                    {days.map((day) => (
                      <th key={day} className={`px-2 py-3 text-center text-xs font-semibold ${
                        day === "Fri" ? "text-emerald-700 bg-emerald-50" : "text-text-secondary"
                      }`}>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((slot) => (
                    <tr key={slot} className="border-b border-border-light">
                      <td className="px-3 py-2 text-[10px] font-mono text-text-tertiary align-top">{slot}</td>
                      {days.map((day) => {
                        const items = (weeklyData[day] || []).filter((item) => {
                          return getSlotForTime(item.time) === slot;
                        });
                        return (
                          <td key={day} className={`px-1 py-1 align-top ${day === "Fri" ? "bg-emerald-50/50" : ""}`}>
                            {items.map((item) => (
                              <div
                                key={item.id}
                                className={`p-1.5 rounded-lg border text-[10px] leading-tight mb-1 ${
                                  batchColors[item.batch] || "bg-gray-50 border-gray-200 text-gray-700"
                                } ${item.status === "Live" ? "ring-2 ring-green-400 ring-offset-1" : ""}`}
                              >
                                <div className="font-semibold truncate">{item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}</div>
                                <div className="text-[9px] opacity-70 mt-0.5">{item.time} &middot; {item.duration}</div>
                              </div>
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}
