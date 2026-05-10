"use client";

import { useState, useCallback, useMemo } from "react";
import { useAsyncData } from "@/hooks/useAsyncData";
import { Skeleton } from "@/components/ui/Skeleton";
import { TopBar } from "@/components/layout/TopBar";
import { courses } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Star,
  Users,
  Clock,
  Monitor,
  MapPin,
  BookOpen,
  Zap,
  ChevronDown,
  ChevronUp,
  Calendar,
  GraduationCap,
  Wifi,
  Building,
} from "lucide-react";

const examTabs = ["All", "JEE", "NEET", "UPSC", "Board", "GATE"];

const modeColors: Record<string, string> = {
  Online: "bg-primary-100 text-primary-700",
  Offline: "bg-warning-50 text-warning-600",
  Hybrid: "bg-accent-100 text-accent-700",
};

const modeIcons: Record<string, React.ReactNode> = {
  Online: <Wifi className="h-3 w-3" />,
  Offline: <Building className="h-3 w-3" />,
  Hybrid: <Monitor className="h-3 w-3" />,
};

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetcher = useCallback(() => courses, []);
  const { data, loading } = useAsyncData(fetcher, 1000);

  const filteredCourses = useMemo(() => {
    if (!data) return [];
    if (activeTab === "All") return data;
    return data.filter((c) => c.exam.toUpperCase().includes(activeTab));
  }, [data, activeTab]);

  return (
    <>
      <TopBar title="Course Catalog" subtitle="Explore and enroll in courses" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {examTabs.map((tab) => (
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

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card p-0 overflow-hidden">
                <Skeleton className="h-36 md:h-48 w-full rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-5 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {filteredCourses.map((course) => {
              const expanded = expandedId === course.id;
              const totalSeats = course.batchOptions.reduce((s, b) => s + b.seatsTotal, 0);
              const filledSeats = course.batchOptions.reduce((s, b) => s + b.seatsFilled, 0);
              const seatsLeft = totalSeats - filledSeats;

              return (
                <div key={course.id} className="card p-0 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Image */}
                  <div className="relative h-36 md:h-48">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {course.isCrashCourse && (
                      <span className="absolute top-3 left-3 badge bg-orange-500 text-white text-[10px] gap-1">
                        <Zap className="h-3 w-3" /> Crash Course
                      </span>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={cn("badge text-[10px] gap-1", modeColors[course.mode])}>
                        {modeIcons[course.mode]} {course.mode}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <p className="text-white/80 text-xs">{course.instituteName}</p>
                      <h3 className="text-white font-bold text-base leading-tight mt-0.5">{course.name}</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    {/* Exam & Duration */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="badge badge-primary">{course.exam}</span>
                      <div className="flex items-center gap-1 text-xs text-text-secondary">
                        <Clock className="h-3 w-3" /> {course.duration}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-text-secondary">
                        <Calendar className="h-3 w-3" /> Starts {course.startDate}
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="flex flex-wrap gap-1.5">
                      {course.subjects.map((subj) => (
                        <span key={subj} className="badge bg-surface-tertiary text-text-secondary text-[10px]">
                          {subj}
                        </span>
                      ))}
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 py-2 border-y border-border-light text-xs text-text-secondary flex-wrap">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-warning-500 fill-warning-500" />
                        <span className="font-semibold text-text-primary">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{course.enrolledCount} enrolled</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-3.5 w-3.5" />
                        <span>{course.batchOptions.length} batches, {seatsLeft} seats left</span>
                      </div>
                    </div>

                    {/* Fee */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-text-primary">{formatCurrency(course.feeMonthly)}</span>
                        <span className="text-xs text-text-tertiary">/month</span>
                      </div>
                      <span className="text-sm text-text-secondary">
                        Total: {formatCurrency(course.feeTotal)}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setExpandedId(expanded ? null : course.id)}
                        className="btn-secondary btn-sm flex-1"
                      >
                        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        View Details
                      </button>
                      <button className="btn-primary btn-sm flex-1">Enroll Now</button>
                    </div>

                    {/* Expanded Details */}
                    {expanded && (
                      <div className="pt-4 border-t border-border-light space-y-4">
                        {/* Batch Options */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Batch Options</h4>
                          <div className="space-y-2">
                            {course.batchOptions.map((batch) => {
                              const seatPercent = (batch.seatsFilled / batch.seatsTotal) * 100;
                              return (
                                <div key={batch.id} className="p-3 rounded-lg border border-border-light bg-surface-secondary">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">{batch.name}</p>
                                    <span className={cn(
                                      "text-xs font-medium",
                                      seatPercent > 90 ? "text-danger-500" : "text-success-600"
                                    )}>
                                      {batch.seatsTotal - batch.seatsFilled} seats left
                                    </span>
                                  </div>
                                  <p className="text-xs text-text-secondary mt-1">
                                    {batch.timing} &bull; {batch.days} &bull; Starts {batch.startDate}
                                  </p>
                                  <p className="text-xs text-text-tertiary mt-1">
                                    Faculty: {batch.faculty.join(", ")}
                                  </p>
                                  <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                                    <div
                                      className={cn(
                                        "h-full rounded-full",
                                        seatPercent > 90 ? "bg-danger-500" : seatPercent > 70 ? "bg-warning-500" : "bg-success-500"
                                      )}
                                      style={{ width: `${seatPercent}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Syllabus Progress */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Syllabus Progress</h4>
                          <div className="space-y-2">
                            {course.syllabus.map((ch) => {
                              const progress = ch.lectures > 0 ? (ch.completed / ch.lectures) * 100 : 0;
                              return (
                                <div key={ch.id} className="flex items-center gap-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p className="text-xs font-medium truncate">{ch.chapter}</p>
                                      <span className="text-[10px] text-text-tertiary ml-2 shrink-0">
                                        {ch.completed}/{ch.lectures}
                                      </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                                      <div
                                        className={cn(
                                          "h-full rounded-full",
                                          progress === 100 ? "bg-success-500" : progress > 50 ? "bg-primary-500" : "bg-warning-500"
                                        )}
                                        style={{ width: `${progress}%` }}
                                      />
                                    </div>
                                  </div>
                                  {ch.testScheduled && (
                                    <span className="badge badge-primary text-[9px]">Test</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Features</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {course.features.map((feat) => (
                              <span key={feat} className="badge bg-success-50 text-success-600 text-[10px]">
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filteredCourses.length === 0 && (
          <div className="card text-center py-12">
            <BookOpen className="h-12 w-12 text-text-tertiary mx-auto mb-3" />
            <p className="text-text-secondary">No courses found for this exam category.</p>
          </div>
        )}
      </div>
    </>
  );
}
