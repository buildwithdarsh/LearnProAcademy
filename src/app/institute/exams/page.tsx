"use client";

import { useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CardSkeleton, StatSkeleton, TableSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection } from "@/hooks/useAsyncData";
import { cn } from "@/lib/utils";
import {
  ClipboardList, Plus, Calendar, Clock, FileText, Users,
  BookOpen, BarChart3, CheckCircle2, AlertCircle, Layers,
} from "lucide-react";

const upcomingTests = [
  { id: "t1", name: "JEE Main Mock Test #15", batch: "JEE Adv — Morning + Evening", date: "2026-04-02", time: "10:00 AM", duration: "180 min", questions: 75, totalMarks: 300, type: "Monthly Mock", status: "Scheduled" },
  { id: "t2", name: "NEET Biology — Genetics & Evolution", batch: "NEET — Regular", date: "2026-04-03", time: "9:00 AM", duration: "60 min", questions: 30, totalMarks: 120, type: "Chapter Test", status: "Scheduled" },
  { id: "t3", name: "Physics — Electrostatics (Weekly)", batch: "JEE Adv — Morning", date: "2026-04-04", time: "11:00 AM", duration: "45 min", questions: 20, totalMarks: 60, type: "Weekly Test", status: "Scheduled" },
  { id: "t4", name: "Chemistry — Organic Reactions", batch: "JEE Adv — Evening", date: "2026-04-05", time: "2:00 PM", duration: "45 min", questions: 20, totalMarks: 60, type: "Chapter Test", status: "Draft" },
  { id: "t5", name: "UPSC Prelims Mock — GS Paper 1", batch: "Foundation Batch (Delhi)", date: "2026-04-06", time: "9:30 AM", duration: "120 min", questions: 100, totalMarks: 200, type: "Monthly Mock", status: "Scheduled" },
  { id: "t6", name: "Board Math — Coordinate Geometry", batch: "Weekday Batch", date: "2026-04-07", time: "4:00 PM", duration: "30 min", questions: 15, totalMarks: 40, type: "Chapter Test", status: "Draft" },
];

const questionBankStats = {
  total: 24680,
  bySubject: [
    { subject: "Physics", count: 6420, color: "bg-blue-500" },
    { subject: "Chemistry", count: 5890, color: "bg-emerald-500" },
    { subject: "Mathematics", count: 5780, color: "bg-violet-500" },
    { subject: "Biology", count: 3920, color: "bg-rose-500" },
    { subject: "General Studies", count: 1870, color: "bg-amber-500" },
    { subject: "Others", count: 800, color: "bg-gray-400" },
  ],
  byDifficulty: [
    { level: "Easy", count: 8240, pct: 33.4, color: "bg-emerald-500" },
    { level: "Medium", count: 10680, pct: 43.3, color: "bg-amber-500" },
    { level: "Hard", count: 4520, pct: 18.3, color: "bg-red-500" },
    { level: "Advanced", count: 1240, pct: 5.0, color: "bg-violet-500" },
  ],
};

const recentResults = [
  { id: "r1", name: "JEE Main Mock #14", date: "2026-03-25", students: 892, avgScore: 54.3, topScore: 268, passRate: 78.2 },
  { id: "r2", name: "Physics — Rotational Motion", date: "2026-03-22", students: 58, avgScore: 68.7, topScore: 56, passRate: 84.5 },
  { id: "r3", name: "Weekly Test — Week 38", date: "2026-03-20", students: 58, avgScore: 71.2, topScore: 138, passRate: 86.2 },
  { id: "r4", name: "Chemistry — Chemical Bonding", date: "2026-03-17", students: 58, avgScore: 62.4, topScore: 48, passRate: 72.4 },
  { id: "r5", name: "JEE Main Mock #13", date: "2026-02-25", students: 886, avgScore: 51.8, topScore: 256, passRate: 74.6 },
];

const statusBadge: Record<string, string> = {
  Scheduled: "badge-success",
  Draft: "badge-warning",
  Completed: "badge-primary",
};

const typeBadge: Record<string, string> = {
  "Monthly Mock": "bg-violet-100 text-violet-700",
  "Chapter Test": "bg-blue-100 text-blue-700",
  "Weekly Test": "bg-emerald-100 text-emerald-700",
};

export default function ExamsPage() {
  const testsData = useAsyncData(useCallback(() => upcomingTests, []), 1000);
  const qbData = useLazySection(useCallback(() => questionBankStats, []), 1200);
  const resultsData = useLazySection(useCallback(() => recentResults, []), 1400);

  const maxSubjectCount = Math.max(...questionBankStats.bySubject.map((s) => s.count));

  return (
    <>
      <TopBar title="Exam & Test Management" subtitle="Schedule, manage, and analyze tests" />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary-600" />
              <div>
                <div className="text-xl font-bold">{upcomingTests.length}</div>
                <div className="text-xs text-text-secondary">Upcoming Tests</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-violet-600" />
              <div>
                <div className="text-xl font-bold">{questionBankStats.total.toLocaleString()}</div>
                <div className="text-xs text-text-secondary">Questions in Bank</div>
              </div>
            </div>
          </div>
          <button className="btn-primary btn-sm">
            <Plus className="h-4 w-4" /> Create Test
          </button>
        </div>

        {/* Upcoming Tests */}
        {testsData.loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="card overflow-hidden p-0">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-base font-semibold text-text-primary">Upcoming Tests</h2>
            </div>
            <div className="divide-y divide-border-light">
              {testsData.data?.map((test) => (
                <div key={test.id} className="px-5 py-4 hover:bg-surface-secondary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm text-text-primary">{test.name}</h3>
                        <span className={cn("badge text-[10px]", typeBadge[test.type] || "bg-gray-100 text-gray-700")}>{test.type}</span>
                        <span className={cn("badge text-[10px]", statusBadge[test.status])}>{test.status}</span>
                      </div>
                      <p className="text-xs text-text-secondary">{test.batch}</p>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-text-secondary shrink-0">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{test.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{test.time} ({test.duration})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" />
                        <span>{test.questions} Qs / {test.totalMarks} marks</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Question Bank */}
          {qbData.loading ? (
            <CardSkeleton />
          ) : (
            <div className="card">
              <h2 className="text-base font-semibold text-text-primary mb-4">Question Bank</h2>

              <div className="mb-6">
                <h3 className="text-xs font-medium text-text-secondary uppercase mb-3">By Subject</h3>
                <div className="space-y-2.5">
                  {qbData.data?.bySubject.map((item) => {
                    const pct = (item.count / maxSubjectCount) * 100;
                    return (
                      <div key={item.subject} className="flex items-center gap-3">
                        <span className="text-xs text-text-secondary w-24 shrink-0">{item.subject}</span>
                        <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                          <div
                            className={cn("h-full rounded flex items-center pl-2", item.color)}
                            style={{ width: `${pct}%` }}
                          >
                            <span className="text-[10px] font-bold text-white">{item.count.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-text-secondary uppercase mb-3">By Difficulty</h3>
                <div className="flex gap-1 h-6 rounded-lg overflow-hidden">
                  {qbData.data?.byDifficulty.map((d) => (
                    <div
                      key={d.level}
                      className={cn("flex items-center justify-center text-[10px] font-bold text-white", d.color)}
                      style={{ width: `${d.pct}%` }}
                      title={`${d.level}: ${d.count.toLocaleString()} (${d.pct}%)`}
                    >
                      {d.pct > 10 && d.level}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {qbData.data?.byDifficulty.map((d) => (
                    <div key={d.level} className="text-center">
                      <div className="flex items-center gap-1">
                        <span className={cn("h-2 w-2 rounded-full", d.color)} />
                        <span className="text-[10px] text-text-secondary">{d.level}</span>
                      </div>
                      <span className="text-[10px] text-text-tertiary">{d.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recent Test Results */}
          {resultsData.loading ? (
            <TableSkeleton rows={5} columns={5} />
          ) : (
            <div className="card overflow-hidden p-0">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="text-base font-semibold text-text-primary">Recent Test Results</h2>
              </div>
              <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border">
                    <th className="text-left px-4 py-2.5 font-medium text-text-secondary text-xs">Test Name</th>
                    <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Students</th>
                    <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Avg Score</th>
                    <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Top Score</th>
                    <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Pass %</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsData.data?.map((result) => (
                    <tr key={result.id} className="border-b border-border-light hover:bg-surface-secondary/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-xs text-text-primary">{result.name}</div>
                        <div className="text-[10px] text-text-tertiary">{result.date}</div>
                      </td>
                      <td className="text-center px-4 py-3 text-xs">{result.students}</td>
                      <td className="text-center px-4 py-3">
                        <span className={cn(
                          "text-xs font-semibold",
                          result.avgScore >= 70 ? "text-emerald-600" : result.avgScore >= 50 ? "text-amber-600" : "text-red-600"
                        )}>
                          {result.avgScore}%
                        </span>
                      </td>
                      <td className="text-center px-4 py-3 text-xs font-semibold">{result.topScore}</td>
                      <td className="text-center px-4 py-3">
                        <span className={cn(
                          "text-xs font-semibold",
                          result.passRate >= 80 ? "text-emerald-600" : result.passRate >= 60 ? "text-amber-600" : "text-red-600"
                        )}>
                          {result.passRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
