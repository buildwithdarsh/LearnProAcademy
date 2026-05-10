"use client";

import { useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Skeleton, StatSkeleton, CardSkeleton, TableSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection, useSlowSection } from "@/hooks/useAsyncData";
import { parentChildData, scoreProgressionData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  User, CheckCircle2, Calendar, TrendingUp, FileText, Clock,
  BookOpen, MessageSquare, BarChart3, CreditCard, Users, Phone,
  ExternalLink, Award, Target,
} from "lucide-react";

export default function ParentDashboardPage() {
  const { data, loading } = useAsyncData(
    useCallback(() => parentChildData, []),
    800
  );

  const { data: scores, loading: scoresLoading } = useLazySection(
    useCallback(() => parentChildData.recentScores, []),
    600
  );

  const { data: progression, loading: progressionLoading } = useSlowSection(
    useCallback(() => scoreProgressionData.slice(-5), [])
  );

  const student = data?.student;
  const weekly = data?.weeklyReport;
  const todayAtt = data?.todayAttendance;
  const nextFee = data?.nextFee;
  const ptm = data?.upcomingPTM;

  return (
    <>
      <TopBar title="Parent Dashboard" subtitle="Monitor your child's academic journey" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {loading ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}
            </div>
          </>
        ) : data && student && (
          <>
            {/* Top Row: Profile + Attendance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Child Profile Card */}
              <div className="card lg:col-span-1">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="h-16 w-16 rounded-full object-cover border-4 border-amber-100"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{student.name}</h3>
                    <p className="text-xs text-text-tertiary font-mono">{student.enrollmentId}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Batch</span>
                    <span className="font-medium text-right text-xs">{student.batch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Exam</span>
                    <span className="badge badge-primary">{student.exam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Branch</span>
                    <span className="font-medium">{student.branch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Status</span>
                    <span className="badge badge-success">{student.status}</span>
                  </div>
                </div>
              </div>

              {/* Today's Attendance */}
              <div className="card">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-amber-600" /> Today&apos;s Attendance
                </h3>
                {todayAtt && (
                  <div className={`p-4 rounded-xl ${todayAtt.present ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className={`h-6 w-6 ${todayAtt.present ? "text-green-600" : "text-red-500"}`} />
                      <span className={`font-bold text-lg ${todayAtt.present ? "text-green-700" : "text-red-700"}`}>
                        {todayAtt.present ? "Present" : "Absent"}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Attended: {todayAtt.classes.join(", ")}
                    </p>
                    {todayAtt.absent.length > 0 && (
                      <p className="text-sm text-red-600 mt-1">
                        Absent: {todayAtt.absent.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Weekly Performance Report */}
              <div className="card">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-amber-600" /> Weekly Report
                </h3>
                {weekly && (
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2.5 bg-blue-50 rounded-lg text-center">
                      <div className="font-bold text-blue-700">{weekly.testsAttempted}</div>
                      <div className="text-[10px] text-text-secondary">Tests Taken</div>
                    </div>
                    <div className="p-2.5 bg-emerald-50 rounded-lg text-center">
                      <div className="font-bold text-emerald-700">{weekly.avgScore}%</div>
                      <div className="text-[10px] text-text-secondary">Avg Score</div>
                    </div>
                    <div className="p-2.5 bg-purple-50 rounded-lg text-center">
                      <div className="font-bold text-purple-700">{weekly.assignmentsSubmitted}</div>
                      <div className="text-[10px] text-text-secondary">Assignments Done</div>
                    </div>
                    <div className="p-2.5 bg-amber-50 rounded-lg text-center">
                      <div className="font-bold text-amber-700">{weekly.doubtsRaised}/{weekly.doubtsResolved}</div>
                      <div className="text-[10px] text-text-secondary">Doubts R/R</div>
                    </div>
                    <div className="col-span-2 p-2.5 bg-surface-secondary rounded-lg flex items-center justify-between">
                      <span className="text-text-secondary">Study Hours</span>
                      <span className="font-bold">{weekly.studyHours} hrs</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat-card">
                <div className="flex items-center gap-2 text-text-secondary text-sm"><Calendar className="h-4 w-4" /> Attendance</div>
                <div className="text-2xl font-bold mt-1">{weekly?.attendance}%</div>
                <div className="text-xs text-green-600">This semester</div>
              </div>
              <div className="stat-card">
                <div className="flex items-center gap-2 text-text-secondary text-sm"><Target className="h-4 w-4" /> Avg Score</div>
                <div className="text-2xl font-bold mt-1">{weekly?.avgScore}%</div>
                <div className="text-xs text-text-tertiary">this week</div>
              </div>
              <div className="stat-card">
                <div className="flex items-center gap-2 text-text-secondary text-sm"><FileText className="h-4 w-4" /> Tests This Week</div>
                <div className="text-2xl font-bold mt-1">{weekly?.testsAttempted}</div>
                <div className="text-xs text-text-tertiary">completed</div>
              </div>
              <div className="stat-card">
                <div className="flex items-center gap-2 text-text-secondary text-sm"><BookOpen className="h-4 w-4" /> Pending</div>
                <div className="text-2xl font-bold mt-1 text-amber-600">{weekly?.assignmentsPending}</div>
                <div className="text-xs text-text-tertiary">assignment</div>
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Recent Test Scores Table */}
            <div className="card">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-600" /> Recent Test Scores
              </h3>
              {scoresLoading ? (
                <TableSkeleton rows={4} columns={4} />
              ) : scores && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-3 py-2.5 text-left text-xs font-semibold text-text-secondary">Test Name</th>
                        <th className="px-3 py-2.5 text-center text-xs font-semibold text-text-secondary">Score</th>
                        <th className="px-3 py-2.5 text-center text-xs font-semibold text-text-secondary">Percentage</th>
                        <th className="px-3 py-2.5 text-right text-xs font-semibold text-text-secondary">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scores.map((score, idx) => {
                        const pct = Math.round((score.score / score.total) * 100);
                        return (
                          <tr key={idx} className="border-b border-border-light hover:bg-surface-secondary transition-colors">
                            <td className="px-3 py-3 text-sm font-medium">{score.test}</td>
                            <td className="px-3 py-3 text-sm text-center font-bold">{score.score}/{score.total}</td>
                            <td className="px-3 py-3 text-center">
                              <span className={`badge ${pct >= 75 ? "badge-success" : pct >= 50 ? "badge-warning" : "badge-danger"}`}>
                                {pct}%
                              </span>
                            </td>
                            <td className="px-3 py-3 text-sm text-text-secondary text-right">{score.date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Score Progression Chart */}
            <div className="card">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-600" /> Score Progression
              </h3>
              {progressionLoading ? (
                <Skeleton className="h-48 w-full rounded-lg" />
              ) : progression && (
                <div>
                  {/* Simple Bar Chart */}
                  <div className="flex items-end gap-3 h-36 md:h-48 px-2">
                    {progression.map((p, i) => {
                      const maxScore = 100;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-xs font-bold text-emerald-700">{p.overall.toFixed(0)}%</span>
                          <div className="w-full flex gap-0.5 items-end h-36">
                            <div className="flex-1 bg-blue-400 rounded-t-sm transition-all" style={{ height: `${(p.physics / maxScore) * 100}%` }} title={`Physics: ${p.physics}`} />
                            <div className="flex-1 bg-amber-400 rounded-t-sm transition-all" style={{ height: `${(p.chemistry / maxScore) * 100}%` }} title={`Chemistry: ${p.chemistry}`} />
                            <div className="flex-1 bg-emerald-400 rounded-t-sm transition-all" style={{ height: `${(p.mathematics / maxScore) * 100}%` }} title={`Maths: ${p.mathematics}`} />
                          </div>
                          <span className="text-[10px] text-text-tertiary">{p.month.split(" ")[0]}</span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Legend */}
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                    <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-sm bg-blue-400" /> Physics</div>
                    <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-sm bg-amber-400" /> Chemistry</div>
                    <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-sm bg-emerald-400" /> Mathematics</div>
                  </div>
                </div>
              )}
            </div>

            {/* Attendance by Subject Chart */}
            <div className="card">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-600" /> Attendance by Subject
              </h3>
              {loading ? (
                <Skeleton className="h-40 w-full rounded-lg" />
              ) : (
                <div className="space-y-4">
                  {[
                    { subject: "Physics", pct: 92, color: "bg-blue-500" },
                    { subject: "Chemistry", pct: 85, color: "bg-amber-500" },
                    { subject: "Mathematics", pct: 88, color: "bg-emerald-500" },
                  ].map((item) => (
                    <div key={item.subject} className="flex items-center gap-4">
                      <span className="text-sm font-medium w-24">{item.subject}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all flex items-center justify-end pr-2`}
                          style={{ width: `${item.pct}%` }}
                        >
                          <span className="text-[10px] text-white font-bold">{item.pct}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 md:space-y-6">
            {/* Next Fee Payment */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-amber-600" /> Next Fee Payment
              </h3>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ) : nextFee && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="text-2xl font-bold text-amber-800 mb-1">{formatCurrency(nextFee.amount)}</div>
                  <div className="text-sm text-text-secondary mb-1">Due: {new Date(nextFee.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
                  <span className="badge badge-warning">{nextFee.status}</span>
                  <button className="btn-primary w-full mt-4">Pay Now</button>
                </div>
              )}
            </div>

            {/* Upcoming PTM */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-600" /> Upcoming PTM
              </h3>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ) : ptm && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Date</span>
                      <span className="font-medium">{new Date(ptm.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Time</span>
                      <span className="font-medium">{ptm.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Faculty</span>
                      <span className="font-medium">{ptm.faculty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Mode</span>
                      <span className="badge badge-primary">{ptm.mode}</span>
                    </div>
                  </div>
                  <button className="btn-primary w-full mt-4">Confirm Attendance</button>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="card">
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary hover:bg-gray-100 transition-colors">
                  <Phone className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Contact Faculty</span>
                  <ExternalLink className="h-3 w-3 text-text-tertiary ml-auto" />
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary hover:bg-gray-100 transition-colors">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">View Full Report Card</span>
                  <ExternalLink className="h-3 w-3 text-text-tertiary ml-auto" />
                </a>
                <a href="/parent/fees" className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary hover:bg-gray-100 transition-colors">
                  <CreditCard className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">View Fee History</span>
                  <ExternalLink className="h-3 w-3 text-text-tertiary ml-auto" />
                </a>
              </div>
            </div>

            {/* Performance Trend Mini Chart */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-amber-600" /> Recent Scores
              </h3>
              {scoresLoading ? (
                <Skeleton className="h-24 w-full rounded-lg" />
              ) : scores && (
                <div className="flex items-end gap-2 h-24">
                  {scores.map((s, i) => {
                    const pct = (s.score / s.total) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold">{Math.round(pct)}%</span>
                        <div
                          className={`w-full rounded-t-md transition-all ${pct >= 75 ? "bg-emerald-400" : pct >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                          style={{ height: `${pct}%` }}
                        />
                        <span className="text-[9px] text-text-tertiary truncate w-full text-center">{s.date}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
