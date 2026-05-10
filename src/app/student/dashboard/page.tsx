"use client";

import { useCallback } from "react";
import { useAsyncData, useLazySection, useSlowSection } from "@/hooks/useAsyncData";
import { Skeleton, StatSkeleton, CardSkeleton, ListSkeleton } from "@/components/ui/Skeleton";
import { TopBar } from "@/components/layout/TopBar";
import {
  currentStudent,
  todaySchedule,
  studentTestResults,
  notifications,
  feeRecords,
} from "@/lib/mock-data";
import { cn, formatCurrency, formatPercent, timeAgo } from "@/lib/utils";
import {
  GraduationCap,
  BarChart3,
  FileText,
  ClipboardList,
  Video,
  MessageCircle,
  BookOpen,
  FolderOpen,
  TrendingUp,
  Clock,
  CheckCircle2,
  Bell,
  CreditCard,
  Play,
  AlertCircle,
  Zap,
  Star,
} from "lucide-react";

export default function StudentDashboardPage() {
  const mainFetcher = useCallback(() => ({
    student: currentStudent,
    testResults: studentTestResults.slice(0, 3),
    pendingFee: feeRecords.find((f) => f.studentId === "stu-1" && f.status === "Pending"),
  }), []);

  const scheduleFetcher = useCallback(() => todaySchedule, []);
  const notifFetcher = useCallback(() => notifications.slice(0, 5), []);

  const { data: mainData, loading: mainLoading } = useAsyncData(mainFetcher, 1000);
  const { data: scheduleData, loading: scheduleLoading } = useLazySection(scheduleFetcher, 400);
  const { data: notifData, loading: notifLoading } = useSlowSection(notifFetcher);

  const typeIcons: Record<string, string> = {
    class: "📚",
    test: "📝",
    fee: "💳",
    result: "📊",
    announcement: "📢",
    doubt: "❓",
    attendance: "📋",
  };

  return (
    <>
      <TopBar title="Dashboard" subtitle="Welcome back, Arjun!" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Welcome Banner */}
        {mainLoading ? (
          <div className="card bg-gradient-to-r from-primary-600 to-primary-800">
            <Skeleton className="h-6 w-48 bg-white/20" />
            <Skeleton className="h-4 w-64 bg-white/20 mt-2" />
          </div>
        ) : mainData ? (
          <div className="card bg-gradient-to-r from-primary-600 to-primary-800 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Good Morning, {mainData.student.name}! 🎯</h2>
                <p className="text-primary-100 mt-1">
                  Enrollment ID: {mainData.student.enrollmentId} &bull; {mainData.student.batch}
                </p>
                <p className="text-primary-200 text-sm mt-1">Branch: {mainData.student.branch}</p>
              </div>
              <img
                src="https://picsum.photos/seed/arjun-m/200/200"
                alt="Avatar"
                className="h-16 w-16 rounded-full border-2 border-white/30 hidden sm:block"
              />
            </div>
          </div>
        ) : null}

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mainLoading ? (
            Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
          ) : (
            <>
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Attendance</span>
                  <div className="h-9 w-9 rounded-lg bg-primary-50 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold">{formatPercent(87.5)}</p>
                <p className="text-xs text-text-tertiary">Min required: 80%</p>
              </div>
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Avg Score</span>
                  <div className="h-9 w-9 rounded-lg bg-success-50 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-success-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold">{formatPercent(72.3)}</p>
                <div className="flex items-center gap-1 text-xs text-success-600">
                  <TrendingUp className="h-3 w-3" /> Up 4.3% from last month
                </div>
              </div>
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Tests Taken</span>
                  <div className="h-9 w-9 rounded-lg bg-accent-50 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-accent-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold">14</p>
                <p className="text-xs text-text-tertiary">3 this week</p>
              </div>
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Pending Assignments</span>
                  <div className="h-9 w-9 rounded-lg bg-warning-50 flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-warning-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-danger-500">1 overdue!</p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card">
              <h3 className="font-semibold text-base mb-4">Today&apos;s Schedule</h3>
              {scheduleLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-10 w-16 rounded-lg" />
                      <div className="flex-1 space-y-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : scheduleData ? (
                <div className="space-y-3">
                  {scheduleData.map((item) => {
                    const isLive = item.status === "Live";
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "p-3 rounded-lg border transition-colors",
                          isLive
                            ? "border-success-500 bg-success-50"
                            : "border-border-light hover:bg-surface-secondary"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-center min-w-[50px] shrink-0">
                            <p className="text-sm font-semibold text-text-primary">{item.time}</p>
                            <p className="text-[11px] text-text-tertiary">{item.duration}</p>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.title}</p>
                            <p className="text-xs text-text-secondary truncate">
                              {item.subject} &bull; {item.faculty} &bull; {item.room}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={cn(
                                "badge hidden sm:inline-flex",
                                item.type === "Live Class" && "badge-primary",
                                item.type === "Test" && "badge-warning",
                                item.type === "Doubt Session" && "badge-success",
                                item.type === "Assignment Due" && "badge-danger",
                                item.type === "Recorded" && "bg-gray-100 text-gray-600"
                              )}
                            >
                              {item.type}
                            </span>
                            {isLive ? (
                              <button className="btn-primary text-xs !px-3 !py-1.5 whitespace-nowrap">
                                <Play className="h-3 w-3" /> Join
                              </button>
                            ) : item.status === "Completed" ? (
                              <CheckCircle2 className="h-5 w-5 text-success-500 shrink-0" />
                            ) : (
                              <span className="badge bg-gray-100 text-gray-500 whitespace-nowrap">{item.status}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {/* Recent Test Scores */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-base">Recent Test Scores</h3>
                <a href="/student/tests" className="text-sm text-primary-600 hover:underline">View All</a>
              </div>
              {mainLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-3 rounded-lg border border-border-light space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  ))}
                </div>
              ) : mainData ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {mainData.testResults.map((test) => {
                    const scorePercent = (test.marksObtained / test.totalMarks) * 100;
                    return (
                      <div
                        key={test.id}
                        className="p-4 rounded-lg border border-border-light hover:border-primary-200 transition-colors"
                      >
                        <p className="text-sm font-medium truncate">{test.testName}</p>
                        <div className="flex items-end gap-1 mt-2">
                          <span className="text-2xl font-bold text-primary-600">
                            {test.marksObtained}
                          </span>
                          <span className="text-sm text-text-tertiary mb-0.5">
                            /{test.totalMarks}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${scorePercent}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-text-secondary">
                            Percentile: {test.percentile}
                          </span>
                          <span className="badge badge-primary text-[10px]">
                            Rank #{test.rank}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Upcoming Fee */}
            {mainLoading ? (
              <CardSkeleton />
            ) : mainData?.pendingFee ? (
              <div className="card border-warning-500/30 bg-warning-50/30">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-5 w-5 text-warning-600" />
                  <h3 className="font-semibold text-base">Upcoming Fee</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Installment {mainData.pendingFee.installment}/{mainData.pendingFee.totalInstallments}</span>
                    <span className="badge badge-warning">Pending</span>
                  </div>
                  <p className="text-2xl font-bold">{formatCurrency(mainData.pendingFee.amount)}</p>
                  <p className="text-sm text-text-secondary">Due: {mainData.pendingFee.dueDate}</p>
                  <button className="btn-primary btn-sm w-full mt-2">Pay Now</button>
                </div>
              </div>
            ) : null}

            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-semibold text-base mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <a href="/student/schedule" className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border-light hover:bg-primary-50 active:bg-primary-50 hover:border-primary-200 active:border-primary-200 transition-colors cursor-pointer">
                  <Video className="h-5 w-5 text-primary-600" />
                  <span className="text-xs font-medium text-center">Join Class</span>
                </a>
                <a href="/student/tests" className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border-light hover:bg-accent-50 active:bg-accent-50 hover:border-accent-200 active:border-accent-200 transition-colors cursor-pointer">
                  <FileText className="h-5 w-5 text-accent-600" />
                  <span className="text-xs font-medium text-center">Take Test</span>
                </a>
                <a href="/student/doubts" className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border-light hover:bg-success-50 active:bg-success-50 hover:border-success-200 active:border-success-200 transition-colors cursor-pointer">
                  <MessageCircle className="h-5 w-5 text-success-600" />
                  <span className="text-xs font-medium text-center">Clear Doubts</span>
                </a>
                <a href="/student/materials" className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border-light hover:bg-warning-50 active:bg-warning-50 hover:border-warning-200 active:border-warning-200 transition-colors cursor-pointer">
                  <FolderOpen className="h-5 w-5 text-warning-600" />
                  <span className="text-xs font-medium text-center">View Materials</span>
                </a>
              </div>
            </div>

            {/* Notifications */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-base flex items-center gap-2">
                  <Bell className="h-4 w-4" /> Notifications
                </h3>
              </div>
              {notifLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <div className="flex-1 space-y-1">
                        <Skeleton className="h-3.5 w-3/4" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : notifData ? (
                <div className="space-y-3">
                  {notifData.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "flex gap-3 p-2 rounded-lg transition-colors cursor-pointer hover:bg-surface-secondary",
                        !notif.read && "bg-primary-50/50"
                      )}
                    >
                      <span className="text-sm mt-0.5">{typeIcons[notif.type] || "📌"}</span>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-xs", !notif.read ? "font-semibold" : "font-medium")}>
                          {notif.title}
                        </p>
                        <p className="text-[11px] text-text-secondary line-clamp-2 mt-0.5">
                          {notif.message}
                        </p>
                        <p className="text-[10px] text-text-tertiary mt-0.5">{timeAgo(notif.time)}</p>
                      </div>
                      {!notif.read && (
                        <span className="h-2 w-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
