"use client";

import { TopBar } from "@/components/layout/TopBar";
import { TrendingUp, TrendingDown, Minus, Award, Target, BookOpen } from "lucide-react";

const subjects = [
  { name: "Physics", latest: 87, previous: 82, grade: "A" },
  { name: "Chemistry", latest: 79, previous: 84, grade: "B+" },
  { name: "Mathematics", latest: 92, previous: 88, grade: "A+" },
  { name: "Biology", latest: 85, previous: 80, grade: "A" },
  { name: "English", latest: 91, previous: 89, grade: "A+" },
];

const recentTests = [
  { name: "Unit Test 4 — Physics", date: "22 Mar 2026", score: 87, total: 100 },
  { name: "Unit Test 4 — Chemistry", date: "20 Mar 2026", score: 79, total: 100 },
  { name: "Weekly Quiz — Mathematics", date: "18 Mar 2026", score: 46, total: 50 },
  { name: "Unit Test 4 — Biology", date: "15 Mar 2026", score: 85, total: 100 },
  { name: "Mid-Term — English", date: "10 Mar 2026", score: 91, total: 100 },
];

function TrendIcon({ latest, previous }: { latest: number; previous: number }) {
  if (latest > previous) return <TrendingUp size={14} className="text-success-500" />;
  if (latest < previous) return <TrendingDown size={14} className="text-danger-500" />;
  return <Minus size={14} className="text-text-tertiary" />;
}

export default function ParentPerformancePage() {
  const avg = Math.round(subjects.reduce((s, sub) => s + sub.latest, 0) / subjects.length);

  return (
    <>
      <TopBar title="Performance" subtitle="Arjun Mehta — Class 11 Science" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
              <Target size={20} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-text-primary">{avg}%</div>
              <div className="text-xs text-text-tertiary">Average Score</div>
            </div>
          </div>
          <div className="card flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-50 text-accent-600 flex items-center justify-center">
              <Award size={20} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-text-primary">A</div>
              <div className="text-xs text-text-tertiary">Overall Grade</div>
            </div>
          </div>
          <div className="card flex items-center gap-3 col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-full bg-success-50 text-success-500 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-text-primary">12</div>
              <div className="text-xs text-text-tertiary">Tests This Month</div>
            </div>
          </div>
        </div>

        {/* Subject-wise performance */}
        <div className="card p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-bold text-text-primary">Subject-wise Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-secondary text-text-tertiary text-xs uppercase tracking-wide">
                  <th className="px-5 py-3 text-left font-semibold">Subject</th>
                  <th className="px-5 py-3 text-center font-semibold">Latest</th>
                  <th className="px-5 py-3 text-center font-semibold">Previous</th>
                  <th className="px-5 py-3 text-center font-semibold">Trend</th>
                  <th className="px-5 py-3 text-center font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {subjects.map((sub) => (
                  <tr key={sub.name} className="hover:bg-surface-secondary/50">
                    <td className="px-5 py-3 font-medium text-text-primary">{sub.name}</td>
                    <td className="px-5 py-3 text-center font-semibold text-text-primary">{sub.latest}%</td>
                    <td className="px-5 py-3 text-center text-text-tertiary">{sub.previous}%</td>
                    <td className="px-5 py-3 text-center">
                      <span className="inline-flex items-center gap-1">
                        <TrendIcon latest={sub.latest} previous={sub.previous} />
                        <span
                          className={`text-xs font-medium ${
                            sub.latest > sub.previous
                              ? "text-success-500"
                              : sub.latest < sub.previous
                              ? "text-danger-500"
                              : "text-text-tertiary"
                          }`}
                        >
                          {sub.latest > sub.previous ? "+" : ""}
                          {sub.latest - sub.previous}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="badge badge-primary">{sub.grade}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent tests */}
        <div className="card p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-bold text-text-primary">Recent Tests</h3>
          </div>
          <div className="divide-y divide-border-light">
            {recentTests.map((test) => (
              <div key={test.name} className="px-5 py-3.5 flex items-center justify-between hover:bg-surface-secondary/50">
                <div>
                  <div className="font-medium text-text-primary text-sm">{test.name}</div>
                  <div className="text-text-tertiary text-xs mt-0.5">{test.date}</div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-text-primary">
                    {test.score}<span className="text-text-tertiary font-normal">/{test.total}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
