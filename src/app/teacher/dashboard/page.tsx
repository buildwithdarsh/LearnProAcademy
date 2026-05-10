"use client";

import { useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Skeleton, StatSkeleton, ListSkeleton, CardSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection, useSlowSection } from "@/hooks/useAsyncData";
import { teacherSchedule, teacherDoubts } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  BookOpen, Clock, FileCheck, Users, CalendarDays,
  Play, MessageSquare, Star, Leaf, Briefcase, TrendingUp,
  CheckCircle2, XCircle, ArrowRightLeft, AlertCircle,
} from "lucide-react";

export default function TeacherDashboardPage() {
  const { data: stats, loading: statsLoading } = useAsyncData(
    useCallback(() => ({
      classesToday: 4,
      pendingDoubts: 4,
      assignmentsToGrade: 7,
      attendanceRate: 89.2,
      monthlyClasses: 47,
    }), []),
    800
  );

  const { data: schedule, loading: scheduleLoading } = useLazySection(
    useCallback(() => teacherSchedule, [])
  );

  const { data: doubts, loading: doubtsLoading } = useLazySection(
    useCallback(() => teacherDoubts.filter((d) => d.status !== "Resolved").slice(0, 3), []),
    600
  );

  const { data: earnings, loading: earningsLoading } = useSlowSection(
    useCallback(() => ({
      base: 85000,
      perClass: 24000,
      incentives: 12000,
      total: 121000,
    }), [])
  );

  const { data: feedback, loading: feedbackLoading } = useSlowSection(
    useCallback(() => ({
      rating: 4.9,
      breakdown: [
        { stars: 5, pct: 78 },
        { stars: 4, pct: 18 },
        { stars: 3, pct: 3 },
        { stars: 2, pct: 1 },
      ],
    }), [])
  );

  const statusColor: Record<string, string> = {
    Completed: "badge-success",
    Live: "badge-danger",
    Upcoming: "badge-warning",
    Cancelled: "badge-secondary",
  };

  const priorityColor: Record<string, string> = {
    High: "text-red-600 bg-red-50",
    Medium: "text-amber-600 bg-amber-50",
    Low: "text-green-600 bg-green-50",
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <TopBar title="Teacher Dashboard" subtitle="Dr. Anil Verma" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Welcome */}
        <div className="card bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Good Morning, Dr. Verma!</h2>
              <p className="text-emerald-100 mt-1">Physics Faculty | {today}</p>
              <p className="text-emerald-200 text-sm mt-2">You have 4 classes, 1 doubt session, and 1 paper review today.</p>
            </div>
            <img
              src="https://picsum.photos/seed/dr-anil-verma/200/200"
              alt="Dr. Anil Verma"
              className="h-20 w-20 rounded-full border-4 border-white/30 object-cover hidden sm:block"
            />
          </div>
        </div>

        {/* Stats */}
        {statsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => <StatSkeleton key={i} />)}
          </div>
        ) : stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="stat-card">
              <div className="flex items-center gap-2 text-text-secondary text-sm"><BookOpen className="h-4 w-4" />Classes Today</div>
              <div className="text-2xl font-bold mt-1">{stats.classesToday}</div>
              <div className="text-xs text-text-tertiary">2 completed, 1 live</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 text-text-secondary text-sm"><MessageSquare className="h-4 w-4" />Pending Doubts</div>
              <div className="text-2xl font-bold mt-1">{stats.pendingDoubts}</div>
              <div className="text-xs text-text-tertiary">3 high priority</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 text-text-secondary text-sm"><FileCheck className="h-4 w-4" />To Grade</div>
              <div className="text-2xl font-bold mt-1">{stats.assignmentsToGrade}</div>
              <div className="text-xs text-text-tertiary">assignments pending</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 text-text-secondary text-sm"><Users className="h-4 w-4" />Attendance Rate</div>
              <div className="text-2xl font-bold mt-1">{stats.attendanceRate}%</div>
              <div className="text-xs text-green-600">+2.1% from last month</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 text-text-secondary text-sm"><CalendarDays className="h-4 w-4" />Monthly Classes</div>
              <div className="text-2xl font-bold mt-1">{stats.monthlyClasses}</div>
              <div className="text-xs text-text-tertiary">this month</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" /> Today&apos;s Schedule
              </h3>
              {scheduleLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <Skeleton className="h-12 w-16 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : schedule && (
                <div className="relative">
                  <div className="absolute left-[38px] top-2 bottom-2 w-0.5 bg-border" />
                  <div className="space-y-4">
                    {schedule.map((item) => (
                      <div
                        key={item.id}
                        className={`flex gap-4 items-start relative ${
                          item.status === "Live" ? "bg-green-50 -mx-4 px-4 py-3 rounded-xl border border-green-200" : ""
                        }`}
                      >
                        <div className="text-xs font-mono font-semibold text-text-secondary w-16 pt-1 shrink-0 text-right">
                          {item.time}
                        </div>
                        <div className={`h-3 w-3 rounded-full mt-1.5 z-10 shrink-0 ${
                          item.status === "Live" ? "bg-green-500 animate-pulse" :
                          item.status === "Completed" ? "bg-emerald-500" :
                          item.status === "Cancelled" ? "bg-red-400" : "bg-amber-400"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm">{item.title}</span>
                            <span className={`badge ${statusColor[item.status]}`}>{item.status}</span>
                            {item.status === "Live" && (
                              <span className="badge badge-danger animate-pulse">LIVE NOW</span>
                            )}
                          </div>
                          <div className="text-xs text-text-secondary mt-1">
                            {item.type} &middot; {item.batch} &middot; {item.room} &middot; {item.duration}
                          </div>
                          {item.status === "Live" && (
                            <button className="btn-primary text-xs mt-2 flex items-center gap-1">
                              <Play className="h-3 w-3" /> Start / Join Class
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Classes Taken Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-emerald-600" /> Classes Taken — March 2026
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-emerald-700">47</div>
                  <div className="text-xs text-text-secondary mt-1">Classes Taken</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <XCircle className="h-6 w-6 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-xs text-text-secondary mt-1">Cancelled</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <ArrowRightLeft className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <div className="text-xs text-text-secondary mt-1">Substituted</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Pending Doubts Preview */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" /> Pending Doubts
              </h3>
              {doubtsLoading ? (
                <ListSkeleton items={3} />
              ) : doubts && (
                <div className="space-y-3">
                  {doubts.map((doubt) => (
                    <div key={doubt.id} className="flex gap-3 items-start p-3 bg-surface-secondary rounded-lg">
                      <img src={doubt.studentAvatar} alt={doubt.studentName} className="h-8 w-8 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">{doubt.studentName}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${priorityColor[doubt.priority]}`}>
                            {doubt.priority}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{doubt.question}</p>
                        <div className="text-[10px] text-text-tertiary mt-1">{doubt.chapter}</div>
                      </div>
                    </div>
                  ))}
                  <a href="/teacher/doubts" className="text-sm text-primary-600 hover:underline block text-center mt-2">
                    View all doubts &rarr;
                  </a>
                </div>
              )}
            </div>

            {/* Earnings */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" /> Earnings — March
              </h3>
              {earningsLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 w-1/2" />
                </div>
              ) : earnings && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Base Salary</span>
                    <span className="font-medium">{formatCurrency(earnings.base)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Per-class Bonus</span>
                    <span className="font-medium">{formatCurrency(earnings.perClass)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Incentives</span>
                    <span className="font-medium">{formatCurrency(earnings.incentives)}</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg text-emerald-700">{formatCurrency(earnings.total)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Student Feedback */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" /> Student Feedback
              </h3>
              {feedbackLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-20 mx-auto" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ) : feedback && (
                <div>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-amber-600">{feedback.rating}</div>
                    <div className="flex items-center justify-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.round(feedback.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-text-tertiary mt-1">out of 5.0</div>
                  </div>
                  <div className="space-y-2">
                    {feedback.breakdown.map((row) => (
                      <div key={row.stars} className="flex items-center gap-2 text-xs">
                        <span className="w-6 text-right text-text-secondary">{row.stars}★</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                        <span className="w-8 text-text-tertiary text-right">{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Leave Balance */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-600" /> Leave Balance
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-700">4</div>
                  <div className="text-[10px] text-text-secondary mt-0.5">Casual</div>
                </div>
                <div className="text-center p-3 bg-rose-50 rounded-lg">
                  <div className="text-xl font-bold text-rose-700">2</div>
                  <div className="text-[10px] text-text-secondary mt-0.5">Medical</div>
                </div>
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <div className="text-xl font-bold text-emerald-700">12</div>
                  <div className="text-[10px] text-text-secondary mt-0.5">Earned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
