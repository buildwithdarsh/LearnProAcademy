"use client";

import { useState, useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData } from "@/hooks/useAsyncData";
import { courses } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import {
  BookOpen, Clock, Users, Star, Layers, Monitor, ChevronDown, ChevronRight,
  Plus, Copy, Globe, MapPin, Wifi,
} from "lucide-react";

const modeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Online: Wifi,
  Offline: MapPin,
  Hybrid: Globe,
};

const modeColors: Record<string, string> = {
  Online: "badge-primary",
  Offline: "badge-success",
  Hybrid: "badge-warning",
};

export default function CoursesPage() {
  const courseData = useAsyncData(useCallback(() => courses, []), 1000);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  return (
    <>
      <TopBar title="Course Management" subtitle={`${courses.length} courses across all programs`} />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary-600" />
              <span className="text-sm text-text-secondary">{courses.length} courses</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-600" />
              <span className="text-sm text-text-secondary">{courses.reduce((s, c) => s + c.enrolledCount, 0).toLocaleString()} enrolled</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="btn-secondary btn-sm">
              <Copy className="h-4 w-4" /> Clone Course
            </button>
            <button className="btn-primary btn-sm">
              <Plus className="h-4 w-4" /> Create Course
            </button>
          </div>
        </div>

        {/* Course Cards */}
        {courseData.loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="space-y-4">
            {courseData.data?.map((course) => {
              const isExpanded = expandedCourse === course.id;
              const ModeIcon = modeIcons[course.mode] || Globe;
              const totalLectures = course.syllabus.reduce((s, ch) => s + ch.lectures, 0);
              const completedLectures = course.syllabus.reduce((s, ch) => s + ch.completed, 0);
              const progressPct = totalLectures > 0 ? (completedLectures / totalLectures) * 100 : 0;

              return (
                <div key={course.id} className="card hover:shadow-md transition-shadow p-0 overflow-hidden">
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="h-20 w-32 rounded-lg object-cover shrink-0 hidden sm:block"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-text-primary">{course.name}</h3>
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              <span className="badge badge-primary text-[10px]">{course.exam}</span>
                              <span className={cn("badge text-[10px]", modeColors[course.mode])}>
                                <ModeIcon className="h-3 w-3 mr-0.5 inline" />{course.mode}
                              </span>
                              {course.isCrashCourse && (
                                <span className="badge badge-danger text-[10px]">Crash Course</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {isExpanded ? <ChevronDown className="h-5 w-5 text-text-tertiary" /> : <ChevronRight className="h-5 w-5 text-text-tertiary" />}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                            <Users className="h-3.5 w-3.5" />
                            <span>{course.enrolledCount.toLocaleString()} enrolled</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span>{course.rating}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                            <Layers className="h-3.5 w-3.5" />
                            <span>{course.batchOptions.length} batches</span>
                          </div>
                          <div className="text-xs font-semibold text-text-primary">
                            {formatCurrency(course.feeTotal)}
                          </div>
                        </div>

                        {/* Syllabus Progress */}
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-text-secondary">Syllabus Progress</span>
                            <span className="font-medium">{completedLectures}/{totalLectures} lectures ({progressPct.toFixed(0)}%)</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-500 rounded-full transition-all"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded: Curriculum Breakdown */}
                  {isExpanded && (
                    <div className="border-t border-border bg-surface-secondary/50 p-5">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                        {/* Syllabus Chapters */}
                        <div>
                          <h4 className="text-sm font-semibold text-text-primary mb-3">Curriculum Breakdown</h4>
                          <div className="space-y-2">
                            {course.syllabus.map((ch) => {
                              const chPct = ch.lectures > 0 ? (ch.completed / ch.lectures) * 100 : 0;
                              return (
                                <div key={ch.id} className="flex items-center gap-3 py-1.5">
                                  <span className={cn(
                                    "text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0",
                                    ch.subject === "Physics" ? "bg-blue-100 text-blue-700" :
                                    ch.subject === "Chemistry" ? "bg-emerald-100 text-emerald-700" :
                                    ch.subject === "Mathematics" ? "bg-violet-100 text-violet-700" :
                                    ch.subject === "Biology" ? "bg-rose-100 text-rose-700" :
                                    "bg-gray-100 text-gray-700"
                                  )}>
                                    {ch.subject}
                                  </span>
                                  <span className="text-xs text-text-primary flex-1 truncate">{ch.chapter}</span>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-primary-500 rounded-full" style={{ width: `${chPct}%` }} />
                                    </div>
                                    <span className="text-[10px] text-text-tertiary w-10 text-right">{ch.completed}/{ch.lectures}</span>
                                    {ch.testScheduled && (
                                      <span className="text-[10px] text-amber-600 font-medium">Test</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Batch Options & Features */}
                        <div>
                          <h4 className="text-sm font-semibold text-text-primary mb-3">Batch Options</h4>
                          <div className="space-y-2 mb-4">
                            {course.batchOptions.map((batch) => (
                              <div key={batch.id} className="bg-white rounded-lg p-3 border border-border-light">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <span className="text-xs font-medium text-text-primary">{batch.name}</span>
                                    <div className="text-[10px] text-text-tertiary mt-0.5">{batch.timing} | {batch.days}</div>
                                  </div>
                                  <span className="text-[10px] font-medium">
                                    {batch.seatsFilled}/{batch.seatsTotal} seats
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <h4 className="text-sm font-semibold text-text-primary mb-2">Features</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {course.features.map((f) => (
                              <span key={f} className="badge bg-gray-100 text-gray-700 text-[10px]">{f}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
