"use client";

import { useState, useCallback } from "react";
import { useAsyncData } from "@/hooks/useAsyncData";
import { Skeleton } from "@/components/ui/Skeleton";
import { TopBar } from "@/components/layout/TopBar";
import { studentTestResults } from "@/lib/mock-data";
import { cn, formatPercent } from "@/lib/utils";
import {
  Clock,
  Calendar,
  Target,
  TrendingUp,
  Award,
  Users,
  FileText,
  Play,
  BarChart3,
  CheckCircle2,
  Timer,
  Brain,
  Zap,
} from "lucide-react";

const tabs = ["Upcoming Tests", "Completed Tests", "Practice Mode"];

const upcomingTests = [
  {
    id: "ut-1",
    name: "Monthly Mock Test #15 — Full JEE Main Pattern",
    type: "Monthly Mock",
    subject: "All Subjects",
    date: "April 2, 2026",
    time: "10:00 AM",
    duration: "3 hours",
    totalMarks: 300,
    syllabus: "Full Syllabus (Physics + Chemistry + Mathematics)",
    daysLeft: 5,
  },
  {
    id: "ut-2",
    name: "Physics — Electrostatics Chapter Test",
    type: "Chapter Test",
    subject: "Physics",
    date: "March 31, 2026",
    time: "10:00 AM",
    duration: "45 min",
    totalMarks: 60,
    syllabus: "Electric Charges, Coulomb's Law, Electric Field, Gauss's Law",
    daysLeft: 3,
  },
  {
    id: "ut-3",
    name: "Weekly Test — Week 39",
    type: "Weekly Test",
    subject: "PCM",
    date: "March 30, 2026",
    time: "6:30 AM",
    duration: "90 min",
    totalMarks: 150,
    syllabus: "Rotational Motion, Organic Alcohols, Coordinate Geometry",
    daysLeft: 2,
  },
];

const practiceTopics = [
  { id: "p1", subject: "Physics", topic: "Mechanics", questions: 120, difficulty: "Mixed", avgTime: "2 min/Q" },
  { id: "p2", subject: "Physics", topic: "Electrostatics", questions: 80, difficulty: "Hard", avgTime: "3 min/Q" },
  { id: "p3", subject: "Chemistry", topic: "Organic Chemistry", questions: 95, difficulty: "Medium", avgTime: "2 min/Q" },
  { id: "p4", subject: "Chemistry", topic: "Thermodynamics", questions: 65, difficulty: "Hard", avgTime: "2.5 min/Q" },
  { id: "p5", subject: "Mathematics", topic: "Calculus", questions: 110, difficulty: "Hard", avgTime: "3 min/Q" },
  { id: "p6", subject: "Mathematics", topic: "Coordinate Geometry", questions: 85, difficulty: "Medium", avgTime: "2.5 min/Q" },
];

function CircularProgress({ percent, size = 72, strokeWidth = 6 }: { percent: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const color = percent >= 80 ? "#22c55e" : percent >= 60 ? "#3b82f6" : percent >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <span className="absolute text-sm font-bold">{Math.round(percent)}%</span>
    </div>
  );
}

export default function TestsPage() {
  const [activeTab, setActiveTab] = useState("Completed Tests");

  const fetcher = useCallback(() => studentTestResults, []);
  const { data, loading } = useAsyncData(fetcher, 1000);

  return (
    <>
      <TopBar title="Tests & Assessments" subtitle="Track your test performance" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeTab === tab
                  ? "bg-primary-600 text-white"
                  : "bg-white text-text-secondary border border-border hover:bg-surface-secondary"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Upcoming Tests */}
        {activeTab === "Upcoming Tests" && (
          <div className="space-y-4">
            {upcomingTests.map((test) => (
              <div key={test.id} className="card hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="badge badge-primary">{test.type}</span>
                      <span className="badge bg-surface-tertiary text-text-secondary">{test.subject}</span>
                    </div>
                    <h3 className="text-base font-semibold mt-2">{test.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-text-secondary flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {test.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {test.time} &bull; {test.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" /> {test.totalMarks} marks
                      </span>
                    </div>
                    <p className="text-xs text-text-tertiary mt-1">{test.syllabus}</p>
                  </div>

                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600">{test.daysLeft}</div>
                      <p className="text-xs text-text-secondary">days left</p>
                    </div>
                    <button className="btn-primary text-xs w-full">
                      <Timer className="h-3 w-3" /> Set Reminder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Tests */}
        {activeTab === "Completed Tests" && (
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card space-y-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                </div>
              ))
            ) : data ? (
              data.map((test) => {
                const scorePercent = (test.marksObtained / test.totalMarks) * 100;
                return (
                  <div key={test.id} className="card hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row gap-5">
                      {/* Score Circle */}
                      <div className="flex items-center gap-5">
                        <CircularProgress percent={scorePercent} size={80} strokeWidth={7} />
                        <div className="md:hidden">
                          <h3 className="text-base font-semibold">{test.testName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="badge badge-primary text-[10px]">{test.type}</span>
                            <span className="text-xs text-text-tertiary">{test.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="hidden md:block">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="badge badge-primary text-[10px]">{test.type}</span>
                            <span className="badge bg-surface-tertiary text-text-secondary text-[10px]">{test.subject}</span>
                            <span className="text-xs text-text-tertiary">{test.date}</span>
                          </div>
                          <h3 className="text-base font-semibold mt-1">{test.testName}</h3>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                          <div className="p-2 rounded-lg bg-surface-secondary text-center">
                            <p className="text-lg font-bold text-text-primary">{test.marksObtained}<span className="text-sm text-text-tertiary">/{test.totalMarks}</span></p>
                            <p className="text-[10px] text-text-tertiary">Score</p>
                          </div>
                          <div className="p-2 rounded-lg bg-surface-secondary text-center">
                            <p className="text-lg font-bold text-primary-600">{test.percentile}</p>
                            <p className="text-[10px] text-text-tertiary">Percentile</p>
                          </div>
                          <div className="p-2 rounded-lg bg-surface-secondary text-center">
                            <p className="text-lg font-bold text-text-primary">#{test.rank}<span className="text-sm text-text-tertiary">/{test.totalStudents}</span></p>
                            <p className="text-[10px] text-text-tertiary">Rank</p>
                          </div>
                          <div className="p-2 rounded-lg bg-surface-secondary text-center">
                            <p className="text-lg font-bold text-success-600">{formatPercent(test.accuracy)}</p>
                            <p className="text-[10px] text-text-tertiary">Accuracy</p>
                          </div>
                        </div>

                        {/* Section-wise bars */}
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-text-secondary mb-2">Section-wise Performance</p>
                          <div className="space-y-2">
                            {test.sectionWise.map((sec) => {
                              const pct = (sec.marks / sec.total) * 100;
                              return (
                                <div key={sec.section} className="flex items-center gap-3">
                                  <span className="text-xs text-text-secondary w-24 shrink-0">{sec.section}</span>
                                  <div className="flex-1 h-2 bg-gray-100 rounded-full">
                                    <div
                                      className={cn(
                                        "h-full rounded-full",
                                        pct >= 80 ? "bg-success-500" : pct >= 60 ? "bg-primary-500" : "bg-warning-500"
                                      )}
                                      style={{ width: `${pct}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-text-tertiary w-16 text-right">{sec.marks}/{sec.total}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Extra info */}
                        <div className="flex items-center gap-4 mt-3 text-xs text-text-tertiary">
                          <span>Time: {test.timeTaken}/{test.totalTime} min</span>
                          <span>Attempted: {test.attempted}/{test.totalQuestions}</span>
                          <span>Negative: -{test.negativeMarks}</span>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex md:flex-col items-center gap-2 shrink-0">
                        <button className="btn-secondary text-xs">
                          <BarChart3 className="h-3 w-3" /> View Analysis
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : null}
          </div>
        )}

        {/* Practice Mode */}
        {activeTab === "Practice Mode" && (
          <div className="space-y-6">
            <div className="card bg-gradient-to-r from-accent-600 to-accent-800 text-white border-0">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Brain className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Practice Mode</h3>
                  <p className="text-accent-100 text-sm">Untimed practice — focus on understanding, not speed</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {practiceTopics.map((topic) => (
                <div key={topic.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className={cn(
                      "badge",
                      topic.subject === "Physics" ? "badge-primary" :
                      topic.subject === "Chemistry" ? "badge-success" : "badge-warning"
                    )}>
                      {topic.subject}
                    </span>
                    <span className={cn(
                      "badge text-[10px]",
                      topic.difficulty === "Hard" ? "badge-danger" :
                      topic.difficulty === "Medium" ? "badge-warning" : "bg-surface-tertiary text-text-secondary"
                    )}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm">{topic.topic}</h4>
                  <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                    <span>{topic.questions} questions</span>
                    <span>&bull;</span>
                    <span>{topic.avgTime}</span>
                  </div>
                  <button className="btn-primary btn-sm w-full mt-4">
                    <Play className="h-3.5 w-3.5" /> Start Practice
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
