"use client";

import { useState, useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { ChartSkeleton, TableSkeleton, CardSkeleton, StatSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection } from "@/hooks/useAsyncData";
import { cn, formatCurrency } from "@/lib/utils";
import {
  BarChart3, Trophy, Medal, Download, FileText, TrendingUp,
  Star, Award,
} from "lucide-react";

const batchResults = [
  { batch: "JEE Adv — Morning", avgScore: 72.3, passRate: 86.2, topScore: 94.5, students: 52, trend: "up" as const },
  { batch: "JEE Adv — Evening", avgScore: 65.8, passRate: 78.4, topScore: 88.2, students: 47, trend: "stable" as const },
  { batch: "JEE Main — Online", avgScore: 68.1, passRate: 81.3, topScore: 91.7, students: 89, trend: "up" as const },
  { batch: "NEET — Regular", avgScore: 74.6, passRate: 88.9, topScore: 92.3, students: 42, trend: "up" as const },
  { batch: "NEET — Repeater", avgScore: 62.4, passRate: 71.8, topScore: 85.1, students: 31, trend: "down" as const },
  { batch: "CBSE — Weekday", avgScore: 82.7, passRate: 95.6, topScore: 97.2, students: 23, trend: "up" as const },
  { batch: "UPSC — Foundation", avgScore: 58.3, passRate: 64.2, topScore: 78.9, students: 44, trend: "stable" as const },
];

const meritList = [
  { rank: 1, name: "Priya Sharma", batch: "JEE Adv — Morning", score: 94.5, avatar: "https://picsum.photos/seed/priya-sh/200/200" },
  { rank: 2, name: "Meera Krishnan", batch: "NEET — Regular", score: 92.3, avatar: "https://picsum.photos/seed/meera-k/200/200" },
  { rank: 3, name: "Ananya Patel", batch: "JEE Main — Online", score: 91.7, avatar: "https://picsum.photos/seed/ananya-p/200/200" },
  { rank: 4, name: "Arjun Mehta", batch: "JEE Adv — Morning", score: 89.8, avatar: "https://picsum.photos/seed/arjun-m/200/200" },
  { rank: 5, name: "Ravi Kumar", batch: "CBSE — Weekday", score: 88.4, avatar: "https://picsum.photos/seed/ravi-k/200/200" },
  { rank: 6, name: "Sanya Gupta", batch: "NEET — Regular", score: 87.9, avatar: "https://picsum.photos/seed/sanya-g/200/200" },
  { rank: 7, name: "Vikram Reddy", batch: "JEE Adv — Evening", score: 86.2, avatar: "https://picsum.photos/seed/vikram-r/200/200" },
  { rank: 8, name: "Neha Singh", batch: "JEE Main — Online", score: 85.7, avatar: "https://picsum.photos/seed/neha-s/200/200" },
  { rank: 9, name: "Aditya Joshi", batch: "NEET — Repeater", score: 85.1, avatar: "https://picsum.photos/seed/aditya-j/200/200" },
  { rank: 10, name: "Kavya Iyer", batch: "JEE Adv — Morning", score: 84.3, avatar: "https://picsum.photos/seed/kavya-i/200/200" },
];

const batchComparison = [
  { subject: "Physics", morning: 76, evening: 68, online: 71, neet: 72 },
  { subject: "Chemistry", morning: 72, evening: 64, online: 66, neet: 78 },
  { subject: "Mathematics", morning: 70, evening: 62, online: 68, neet: 0 },
  { subject: "Biology", morning: 0, evening: 0, online: 0, neet: 74 },
];

const toppers = meritList.slice(0, 3);

export default function ResultsPage() {
  const batchData = useAsyncData(useCallback(() => batchResults, []), 1000);
  const meritData = useLazySection(useCallback(() => meritList, []), 1200);
  const comparisonData = useLazySection(useCallback(() => batchComparison, []), 1500);
  const [selectedBatch, setSelectedBatch] = useState("All");

  const maxAvg = Math.max(...batchResults.map((b) => b.avgScore));

  return (
    <>
      <TopBar title="Results & Analytics" subtitle="Comprehensive performance analysis across batches" />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Summary Stats */}
        {batchData.loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="h-4 w-4 text-primary-600" />
                <span className="text-xs text-text-secondary">Overall Avg Score</span>
              </div>
              <div className="text-2xl font-bold">69.2%</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span className="text-xs text-text-secondary">Pass Rate</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600">80.9%</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-4 w-4 text-amber-600" />
                <span className="text-xs text-text-secondary">Top Score</span>
              </div>
              <div className="text-2xl font-bold text-amber-600">94.5%</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-violet-600" />
                <span className="text-xs text-text-secondary">Tests Conducted</span>
              </div>
              <div className="text-2xl font-bold">142</div>
            </div>
          </div>
        )}

        {/* Topper Showcase */}
        {batchData.loading ? (
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="card">
            <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" /> Topper Showcase
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {toppers.map((topper, idx) => {
                const medals = ["bg-amber-400", "bg-gray-400", "bg-amber-700"];
                const medalLabels = ["Gold", "Silver", "Bronze"];
                return (
                  <div key={topper.rank} className="bg-gradient-to-br from-surface-secondary to-white rounded-xl p-5 text-center border border-border-light">
                    <div className="relative inline-block mb-3">
                      <img
                        src={topper.avatar}
                        alt={topper.name}
                        className="h-20 w-20 rounded-full object-cover border-3 border-white shadow-md"
                      />
                      <div className={cn(
                        "absolute -bottom-1 -right-1 h-7 w-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm",
                        medals[idx]
                      )}>
                        #{topper.rank}
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm text-text-primary">{topper.name}</h3>
                    <p className="text-xs text-text-secondary mt-0.5">{topper.batch}</p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-lg font-bold text-text-primary">{topper.score}%</span>
                    </div>
                    <span className={cn("badge text-[10px] mt-2", idx === 0 ? "badge-warning" : "bg-gray-100 text-gray-600")}>{medalLabels[idx]} Medalist</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Batch-wise Results */}
          {batchData.loading ? (
            <ChartSkeleton height="h-80" />
          ) : (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-text-primary">Batch-wise Performance</h2>
                <select className="select text-xs" value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
                  <option value="All">All Batches</option>
                  {batchResults.map((b) => <option key={b.batch} value={b.batch}>{b.batch}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                {batchData.data
                  ?.filter((b) => selectedBatch === "All" || b.batch === selectedBatch)
                  .map((batch) => {
                    const barW = (batch.avgScore / maxAvg) * 100;
                    return (
                      <div key={batch.batch} className="flex items-center gap-3">
                        <span className="text-xs text-text-secondary w-36 shrink-0 truncate">{batch.batch}</span>
                        <div className="flex-1 h-7 bg-gray-100 rounded-md overflow-hidden relative">
                          <div
                            className={cn(
                              "h-full rounded-md flex items-center pl-2 transition-all duration-700",
                              batch.avgScore >= 75 ? "bg-emerald-500" : batch.avgScore >= 60 ? "bg-amber-500" : "bg-red-500"
                            )}
                            style={{ width: `${barW}%` }}
                          >
                            <span className="text-[11px] font-bold text-white">{batch.avgScore}%</span>
                          </div>
                        </div>
                        <span className={cn(
                          "text-xs font-medium w-12 text-right",
                          batch.trend === "up" ? "text-emerald-600" : batch.trend === "down" ? "text-red-600" : "text-text-tertiary"
                        )}>
                          {batch.trend === "up" ? "↑" : batch.trend === "down" ? "↓" : "→"}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Comparative Chart */}
          {comparisonData.loading ? (
            <ChartSkeleton height="h-80" />
          ) : (
            <div className="card">
              <h2 className="text-base font-semibold text-text-primary mb-4">Subject-wise Batch Comparison</h2>
              <div className="flex items-center gap-4 mb-4 text-[10px] flex-wrap">
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-blue-500" /> Morning</span>
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-violet-500" /> Evening</span>
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Online</span>
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-rose-500" /> NEET</span>
              </div>
              <div className="space-y-4">
                {comparisonData.data?.map((subj) => (
                  <div key={subj.subject}>
                    <div className="text-xs font-medium text-text-secondary mb-1.5">{subj.subject}</div>
                    <div className="flex gap-1">
                      {[
                        { val: subj.morning, color: "bg-blue-500", label: "Morn" },
                        { val: subj.evening, color: "bg-violet-500", label: "Eve" },
                        { val: subj.online, color: "bg-emerald-500", label: "Online" },
                        { val: subj.neet, color: "bg-rose-500", label: "NEET" },
                      ].map((bar) =>
                        bar.val > 0 ? (
                          <div key={bar.label} className="flex-1">
                            <div className="h-8 bg-gray-100 rounded relative flex items-end overflow-hidden">
                              <div
                                className={cn("w-full rounded transition-all", bar.color)}
                                style={{ height: `${bar.val}%` }}
                              />
                            </div>
                            <div className="text-center text-[10px] text-text-tertiary mt-0.5">{bar.val}%</div>
                          </div>
                        ) : (
                          <div key={bar.label} className="flex-1">
                            <div className="h-8 bg-gray-50 rounded flex items-center justify-center">
                              <span className="text-[10px] text-text-tertiary">—</span>
                            </div>
                            <div className="text-center text-[10px] text-text-tertiary mt-0.5">N/A</div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Merit List */}
        {meritData.loading ? (
          <TableSkeleton rows={10} columns={5} />
        ) : (
          <div className="card overflow-hidden p-0">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
                <Medal className="h-5 w-5 text-amber-500" /> Merit List — Top 10
              </h2>
              <div className="flex gap-2">
                <button className="btn-secondary text-xs flex items-center gap-1">
                  <Download className="h-3 w-3" /> Download Report Cards
                </button>
                <button className="btn-primary text-xs flex items-center gap-1">
                  <FileText className="h-3 w-3" /> Generate Report Cards
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-secondary border-b border-border">
                  <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs w-16">Rank</th>
                  <th className="text-left px-4 py-2.5 font-medium text-text-secondary text-xs">Student</th>
                  <th className="text-left px-4 py-2.5 font-medium text-text-secondary text-xs">Batch</th>
                  <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Score</th>
                  <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Performance</th>
                </tr>
              </thead>
              <tbody>
                {meritData.data?.map((student) => (
                  <tr key={student.rank} className="border-b border-border-light hover:bg-surface-secondary/50 transition-colors">
                    <td className="text-center px-4 py-3">
                      {student.rank <= 3 ? (
                        <span className={cn(
                          "inline-flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-bold",
                          student.rank === 1 ? "bg-amber-400" : student.rank === 2 ? "bg-gray-400" : "bg-amber-700"
                        )}>
                          {student.rank}
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-text-secondary">{student.rank}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={student.avatar} alt={student.name} className="h-8 w-8 rounded-full object-cover" />
                        <span className="font-medium text-text-primary">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-xs">{student.batch}</td>
                    <td className="text-center px-4 py-3">
                      <span className="text-sm font-bold text-text-primary">{student.score}%</span>
                    </td>
                    <td className="text-center px-4 py-3">
                      <div className="flex items-center justify-center">
                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${student.score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
