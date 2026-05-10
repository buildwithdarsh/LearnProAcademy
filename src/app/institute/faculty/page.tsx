"use client";

import { useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CardSkeleton, StatSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData } from "@/hooks/useAsyncData";
import { faculty } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Users, Star, Award, Clock, GraduationCap, BookOpen, MessageCircle,
  TrendingUp, Eye,
} from "lucide-react";

const summaryStats = [
  { label: "Total Faculty", value: "48", icon: Users, color: "text-primary-600", bg: "bg-primary-50" },
  { label: "Avg Rating", value: "4.63", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Avg Experience", value: "15.6 yrs", icon: Award, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Utilization", value: "78%", icon: Clock, color: "text-violet-600", bg: "bg-violet-50" },
];

const facultyExtended = faculty.map((f, i) => ({
  ...f,
  teachingHours: [32, 36, 28, 30, 38, 24, 20, 34][i] || 30,
  maxHours: 40,
  avgStudentScore: [78.5, 74.2, 81.3, 82.1, 72.8, 88.4, 76.9, 68.5][i] || 75,
  doubtResolutionRate: [94, 91, 88, 96, 85, 92, 98, 87][i] || 90,
}));

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-3.5 w-3.5",
            star <= Math.floor(rating) ? "fill-amber-400 text-amber-400" :
            star - 0.5 <= rating ? "fill-amber-200 text-amber-400" :
            "text-gray-200"
          )}
        />
      ))}
      <span className="text-xs font-medium text-text-secondary ml-1">{rating}</span>
    </div>
  );
}

export default function FacultyPage() {
  const facultyData = useAsyncData(useCallback(() => facultyExtended, []), 1000);

  return (
    <>
      <TopBar title="Faculty Management" subtitle="Manage your teaching team and track performance" />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Summary Stats */}
        {facultyData.loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {summaryStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="stat-card">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", stat.bg)}>
                      <Icon className={cn("h-4 w-4", stat.color)} />
                    </div>
                    <span className="text-xs text-text-secondary">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Faculty Grid */}
        {facultyData.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {facultyData.data?.map((member) => {
              const workloadPct = (member.teachingHours / member.maxHours) * 100;
              return (
                <div key={member.id} className="card hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm text-text-primary truncate">{member.name}</h3>
                      <p className="text-xs text-text-secondary">{member.subject}</p>
                      <StarRating rating={member.rating} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{member.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Award className="h-3.5 w-3.5 shrink-0" />
                      <span>{member.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <BookOpen className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{member.specialization}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Users className="h-3.5 w-3.5 shrink-0" />
                      <span>{member.studentsCount.toLocaleString()} students taught</span>
                    </div>
                  </div>

                  {/* Workload */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-secondary">Workload</span>
                      <span className="font-medium">{member.teachingHours}/{member.maxHours} hrs/week</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          workloadPct >= 90 ? "bg-red-500" : workloadPct >= 75 ? "bg-amber-500" : "bg-emerald-500"
                        )}
                        style={{ width: `${workloadPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-surface-secondary rounded-lg p-2 text-center">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                        <span className="text-xs font-bold text-text-primary">{member.avgStudentScore}%</span>
                      </div>
                      <span className="text-[10px] text-text-tertiary">Avg Score</span>
                    </div>
                    <div className="bg-surface-secondary rounded-lg p-2 text-center">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <MessageCircle className="h-3 w-3 text-blue-500" />
                        <span className="text-xs font-bold text-text-primary">{member.doubtResolutionRate}%</span>
                      </div>
                      <span className="text-[10px] text-text-tertiary">Doubts Resolved</span>
                    </div>
                  </div>

                  {/* Action */}
                  <button className="btn-secondary w-full text-xs flex items-center justify-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" /> View Full Profile
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
