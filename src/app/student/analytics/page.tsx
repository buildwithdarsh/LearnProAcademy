"use client";

import { useCallback } from "react";
import { useAsyncData, useLazySection, useSlowSection } from "@/hooks/useAsyncData";
import { Skeleton, StatSkeleton, ChartSkeleton } from "@/components/ui/Skeleton";
import { TopBar } from "@/components/layout/TopBar";
import { scoreProgressionData, topicHeatmapData, studentTestResults } from "@/lib/mock-data";
import { cn, formatPercent } from "@/lib/utils";
import {
  TrendingUp,
  Target,
  Award,
  Clock,
  Brain,
  AlertTriangle,
  ChevronUp,
  BookOpen,
  Zap,
  BarChart3,
} from "lucide-react";

const subjectColors: Record<string, string> = {
  Physics: "#3b82f6",
  Chemistry: "#22c55e",
  Mathematics: "#f59e0b",
  Overall: "#a855f7",
};

const subjectBgColors: Record<string, string> = {
  Physics: "bg-blue-50 border-blue-200",
  Chemistry: "bg-green-50 border-green-200",
  Mathematics: "bg-orange-50 border-orange-200",
};

const recommendations = [
  { subject: "Physics", topic: "Electrostatics", score: 65, suggestion: "Focus on Gauss's Law and Electric Potential. Practice numerical problems from HC Verma Chapter 29.", priority: "High" },
  { subject: "Physics", topic: "Modern Physics", score: 58, suggestion: "Review Photoelectric Effect and Bohr Model. Watch recorded lecture by Dr. Rajesh Kumar.", priority: "High" },
  { subject: "Chemistry", topic: "Thermodynamics", score: 62, suggestion: "Strengthen Hess's Law and Gibbs Free Energy concepts. Solve DPP #38.", priority: "Medium" },
  { subject: "Mathematics", topic: "Calculus", score: 68, suggestion: "Practice definite integrals properties. Focus on substitution and integration by parts.", priority: "Medium" },
];

const topperComparison = [
  { metric: "Avg Score", you: 72.3, topper: 91.2, batch: 65.4 },
  { metric: "Accuracy", you: 78.5, topper: 92.0, batch: 68.7 },
  { metric: "Attendance", you: 87.5, topper: 96.0, batch: 79.3 },
  { metric: "Tests Attempted", you: 14, topper: 14, batch: 11 },
  { metric: "Study Hours/Week", you: 38.5, topper: 48.0, batch: 32.0 },
];

export default function AnalyticsPage() {
  const mainFetcher = useCallback(() => ({
    progression: scoreProgressionData,
    heatmap: topicHeatmapData,
    tests: studentTestResults,
  }), []);

  const { data, loading } = useAsyncData(mainFetcher, 1000);

  const recFetcher = useCallback(() => recommendations, []);
  const { data: recData, loading: recLoading } = useSlowSection(recFetcher);

  // Compute max score for chart scaling
  const maxScore = 100;

  return (
    <>
      <TopBar title="Performance Analytics" subtitle="Track your progress and identify areas for improvement" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
          ) : (
            <>
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Current Percentile</span>
                  <div className="h-9 w-9 rounded-lg bg-primary-50 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold">94.2</p>
                <div className="flex items-center gap-1 text-xs text-success-600">
                  <ChevronUp className="h-3 w-3" /> Up from 90.8 last month
                </div>
              </div>
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Score Trend</span>
                  <div className="h-9 w-9 rounded-lg bg-success-50 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-success-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-success-600">+4.7%</p>
                <p className="text-xs text-text-tertiary">Consistent improvement over 6 months</p>
              </div>
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Predicted Rank</span>
                  <div className="h-9 w-9 rounded-lg bg-accent-50 flex items-center justify-center">
                    <Award className="h-5 w-5 text-accent-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold">~4,500</p>
                <p className="text-xs text-text-tertiary">Based on current percentile trends</p>
              </div>
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Study Hours/Week</span>
                  <div className="h-9 w-9 rounded-lg bg-warning-50 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-warning-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold">38.5</p>
                <p className="text-xs text-text-tertiary">Target: 42 hours/week</p>
              </div>
            </>
          )}
        </div>

        {/* Score Progression Chart */}
        <div className="card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h3 className="font-semibold text-base">Score Progression</h3>
            <div className="flex items-center gap-3 flex-wrap">
              {Object.entries(subjectColors).map(([subject, color]) => (
                <div key={subject} className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs text-text-secondary">{subject}</span>
                </div>
              ))}
            </div>
          </div>
          {loading ? (
            <Skeleton className="h-48 md:h-64 w-full rounded-lg" />
          ) : data ? (
            <div className="relative">
              {/* Y-axis labels */}
              <div className="flex">
                <div className="w-8 flex flex-col justify-between text-[10px] text-text-tertiary pr-1" style={{ height: 200 }}>
                  <span>100</span>
                  <span>80</span>
                  <span>60</span>
                  <span>40</span>
                  <span>20</span>
                </div>
                <div className="flex-1 relative" style={{ height: 200 }}>
                  {/* Grid lines */}
                  {[0, 20, 40, 60, 80].map((val) => (
                    <div
                      key={val}
                      className="absolute w-full border-t border-dashed border-border-light"
                      style={{ bottom: `${val}%` }}
                    />
                  ))}

                  {/* Bar groups */}
                  <div className="absolute inset-0 flex items-end justify-around px-1">
                    {data.progression.map((month) => (
                      <div key={month.month} className="flex items-end gap-[2px] sm:gap-1 justify-center">
                        {(["physics", "chemistry", "mathematics", "overall"] as const).map((key) => (
                          <div
                            key={key}
                            className="w-2 sm:w-3 md:w-4 rounded-t-sm transition-all duration-700"
                            style={{
                              height: `${(month[key] / maxScore) * 100}%`,
                              backgroundColor: subjectColors[key.charAt(0).toUpperCase() + key.slice(1)],
                              minHeight: 4,
                            }}
                            title={`${key}: ${month[key]}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* X-axis labels */}
              <div className="flex ml-8 mt-2">
                {data.progression.map((month) => (
                  <div key={month.month} className="flex-1 text-center text-[10px] text-text-tertiary">
                    {month.month.split(" ")[0].substring(0, 3)}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Topic Heatmap */}
          <div className="card">
            <h3 className="font-semibold text-base mb-4">Topic-wise Heatmap</h3>
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-lg" />
                ))}
              </div>
            ) : data ? (
              <div className="space-y-4">
                {["Physics", "Chemistry", "Mathematics"].map((subject) => {
                  const topics = data.heatmap.filter((t) => t.subject === subject);
                  return (
                    <div key={subject}>
                      <p className="text-xs font-semibold text-text-secondary mb-2">{subject}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {topics.map((topic) => (
                          <div
                            key={topic.topic}
                            className={cn(
                              "p-2 md:p-3 rounded-lg border text-center transition-colors",
                              topic.score > 80 ? "bg-success-50 border-success-200" :
                              topic.score >= 60 ? "bg-warning-50 border-warning-200" :
                              "bg-danger-50 border-danger-200"
                            )}
                          >
                            <p className="text-xs font-medium truncate">{topic.topic}</p>
                            <p className={cn(
                              "text-lg font-bold mt-1",
                              topic.score > 80 ? "text-success-600" :
                              topic.score >= 60 ? "text-warning-600" :
                              "text-danger-600"
                            )}>
                              {topic.score}
                            </p>
                            <p className={cn(
                              "text-[10px] font-medium",
                              topic.score > 80 ? "text-success-500" :
                              topic.score >= 60 ? "text-warning-500" :
                              "text-danger-500"
                            )}>
                              {topic.level === "strong" ? "Strong" : topic.level === "moderate" ? "Moderate" : "Needs Work"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* Accuracy vs Attempts + Percentile Trend */}
          <div className="space-y-6">
            {/* Percentile Trend */}
            <div className="card">
              <h3 className="font-semibold text-base mb-4">Percentile Trend</h3>
              {loading ? (
                <Skeleton className="h-32 w-full rounded-lg" />
              ) : data ? (
                <div>
                  <div className="flex items-end gap-3" style={{ height: 120 }}>
                    {data.tests.slice().reverse().map((test, i) => (
                      <div key={test.id} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-semibold text-primary-600">{test.percentile}</span>
                        <div
                          className="w-full bg-primary-500 rounded-t-sm transition-all duration-500"
                          style={{ height: `${test.percentile}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-2">
                    {data.tests.slice().reverse().map((test) => (
                      <div key={test.id} className="flex-1 text-center text-[9px] text-text-tertiary truncate">
                        {test.date.split("-").slice(1).join("/")}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Accuracy vs Attempts */}
            <div className="card">
              <h3 className="font-semibold text-base mb-4">Accuracy vs Attempts</h3>
              {loading ? (
                <Skeleton className="h-32 w-full rounded-lg" />
              ) : data ? (
                <div className="space-y-3">
                  {data.tests.map((test) => (
                    <div key={test.id} className="flex items-center gap-3">
                      <span className="text-[10px] text-text-secondary w-20 truncate shrink-0" title={test.testName}>
                        {test.testName.split(" — ")[0].substring(0, 15)}
                      </span>
                      <div className="flex-1 flex gap-1 items-center">
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden flex">
                          <div
                            className="h-full bg-success-500 transition-all duration-500"
                            style={{ width: `${test.accuracy}%` }}
                            title={`Accuracy: ${test.accuracy}%`}
                          />
                        </div>
                        <span className="text-[10px] font-medium text-text-secondary w-10 text-right">
                          {formatPercent(test.accuracy)}
                        </span>
                      </div>
                      <span className="text-[10px] text-text-tertiary w-12 text-right">
                        {test.attempted}/{test.totalQuestions}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Topper Comparison */}
        <div className="card">
          <h3 className="font-semibold text-base mb-4">Comparison with Batch Topper (Anonymized)</h3>
          {loading ? (
            <Skeleton className="h-40 w-full rounded-lg" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-text-secondary">Metric</th>
                    <th className="text-center py-2 px-3 text-xs font-semibold text-primary-600">You</th>
                    <th className="text-center py-2 px-3 text-xs font-semibold text-success-600">Batch Topper</th>
                    <th className="text-center py-2 px-3 text-xs font-semibold text-text-tertiary">Batch Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {topperComparison.map((row) => (
                    <tr key={row.metric} className="border-b border-border-light">
                      <td className="py-2.5 px-3 text-sm font-medium">{row.metric}</td>
                      <td className="py-2.5 px-3 text-center font-semibold text-primary-600">{row.you}</td>
                      <td className="py-2.5 px-3 text-center font-semibold text-success-600">{row.topper}</td>
                      <td className="py-2.5 px-3 text-center text-text-tertiary">{row.batch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Weak Area Recommendations */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-accent-600" />
            <h3 className="font-semibold text-base">AI-Powered Recommendations</h3>
          </div>
          {recLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-6 w-6 rounded" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : recData ? (
            <div className="space-y-3">
              {recData.map((rec, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-4 rounded-lg border-l-4",
                    rec.priority === "High" ? "border-l-danger-500 bg-danger-50/30" : "border-l-warning-500 bg-warning-50/30"
                  )}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={cn(
                        "badge text-[10px] shrink-0",
                        rec.subject === "Physics" ? "badge-primary" :
                        rec.subject === "Chemistry" ? "badge-success" : "badge-warning"
                      )}>
                        {rec.subject}
                      </span>
                      <span className="text-sm font-semibold truncate">{rec.topic}</span>
                    </div>
                    <span className={cn(
                      "badge text-[10px] shrink-0 whitespace-nowrap",
                      rec.priority === "High" ? "badge-danger" : "badge-warning"
                    )}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">Current Score: <span className="font-semibold">{rec.score}/100</span></p>
                  <p className="text-xs text-text-secondary mt-1">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
