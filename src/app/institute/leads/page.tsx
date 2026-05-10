"use client";

import { useState, useCallback, useMemo } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CardSkeleton, StatSkeleton, ChartSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection } from "@/hooks/useAsyncData";
import { leads } from "@/lib/mock-data";
import { cn, timeAgo } from "@/lib/utils";
import {
  UserPlus, Percent, Clock, TrendingUp, Plus, Phone, Mail,
  ChevronDown, ChevronRight, MessageSquare, Calendar,
} from "lucide-react";

type LeadStatus = "New" | "Contacted" | "Demo Booked" | "Demo Done" | "Enrolled" | "Lost";

const pipelineColumns: { status: LeadStatus; label: string; color: string; bg: string }[] = [
  { status: "New", label: "New", color: "border-blue-400", bg: "bg-blue-50" },
  { status: "Contacted", label: "Contacted", color: "border-sky-400", bg: "bg-sky-50" },
  { status: "Demo Booked", label: "Demo Booked", color: "border-violet-400", bg: "bg-violet-50" },
  { status: "Demo Done", label: "Demo Done", color: "border-amber-400", bg: "bg-amber-50" },
  { status: "Enrolled", label: "Enrolled", color: "border-emerald-400", bg: "bg-emerald-50" },
  { status: "Lost", label: "Lost", color: "border-red-400", bg: "bg-red-50" },
];

const sourceColors: Record<string, string> = {
  "Google Ads": "bg-blue-100 text-blue-700",
  "Referral": "bg-emerald-100 text-emerald-700",
  "Walk-in": "bg-violet-100 text-violet-700",
  "Website": "bg-sky-100 text-sky-700",
  "Marketplace": "bg-amber-100 text-amber-700",
  "Social Media": "bg-rose-100 text-rose-700",
  "WhatsApp": "bg-green-100 text-green-700",
};

const sourceDistribution = [
  { source: "Google Ads", count: 98, pct: 28.7, color: "bg-blue-500" },
  { source: "Referral", count: 72, pct: 21.1, color: "bg-emerald-500" },
  { source: "Walk-in", count: 58, pct: 17.0, color: "bg-violet-500" },
  { source: "Website", count: 45, pct: 13.2, color: "bg-sky-500" },
  { source: "Social Media", count: 38, pct: 11.1, color: "bg-rose-500" },
  { source: "WhatsApp", count: 18, pct: 5.3, color: "bg-green-500" },
  { source: "Marketplace", count: 13, pct: 3.6, color: "bg-amber-500" },
];

const statsData = [
  { label: "Total Leads", value: "342", icon: UserPlus, color: "text-primary-600", bg: "bg-primary-50" },
  { label: "Conversion Rate", value: "26%", icon: Percent, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Avg Response Time", value: "2.4 hrs", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "This Week", value: "47", icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
];

export default function LeadsPage() {
  const leadsData = useAsyncData(useCallback(() => leads, []), 1000);
  const sourceData = useLazySection(useCallback(() => sourceDistribution, []), 1400);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  const groupedLeads = useMemo(() => {
    if (!leadsData.data) return {};
    const groups: Record<string, typeof leads> = {};
    for (const col of pipelineColumns) {
      groups[col.status] = leadsData.data.filter((l) => l.status === col.status);
    }
    return groups;
  }, [leadsData.data]);

  const maxSource = sourceDistribution[0]?.count || 1;

  return (
    <>
      <TopBar title="Lead Management (CRM)" subtitle="Track, nurture, and convert your leads" />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Stats */}
        {leadsData.loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statsData.map((stat) => {
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

        {/* Add Lead Button */}
        <div className="flex justify-end">
          <button className="btn-primary btn-sm">
            <Plus className="h-4 w-4" /> Add Lead
          </button>
        </div>

        {/* Kanban Pipeline */}
        {leadsData.loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {pipelineColumns.map((col) => {
              const colLeads = groupedLeads[col.status] || [];
              return (
                <div key={col.status} className="flex-1 min-w-[220px]">
                  <div className={cn("rounded-t-lg px-3 py-2 border-t-3 flex items-center justify-between", col.bg, col.color)}>
                    <span className="text-xs font-semibold text-text-primary">{col.label}</span>
                    <span className="text-xs font-bold bg-white/80 rounded-full px-2 py-0.5">{colLeads.length}</span>
                  </div>
                  <div className="bg-surface-secondary/50 rounded-b-lg p-2 space-y-2 min-h-[200px]">
                    {colLeads.map((lead) => {
                      const isExpanded = expandedLead === lead.id;
                      return (
                        <div key={lead.id} className="bg-white rounded-lg border border-border-light shadow-sm hover:shadow-md transition-shadow">
                          <div
                            className="p-3 cursor-pointer"
                            onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                          >
                            <div className="flex items-start justify-between mb-1.5">
                              <h4 className="text-xs font-semibold text-text-primary">{lead.name}</h4>
                              {isExpanded ? <ChevronDown className="h-3 w-3 text-text-tertiary" /> : <ChevronRight className="h-3 w-3 text-text-tertiary" />}
                            </div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <span className="badge badge-primary text-[9px]">{lead.exam}</span>
                              <span className={cn("badge text-[9px]", sourceColors[lead.source])}>{lead.source}</span>
                            </div>
                            <div className="text-[10px] text-text-tertiary space-y-0.5">
                              <div>Counselor: {lead.assignedTo}</div>
                              <div className="flex items-center justify-between">
                                <span>Score: <span className={cn(
                                  "font-semibold",
                                  lead.score >= 70 ? "text-emerald-600" : lead.score >= 40 ? "text-amber-600" : "text-red-600"
                                )}>{lead.score}</span></span>
                                <span>{timeAgo(lead.lastFollowUp)}</span>
                              </div>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="border-t border-border-light p-3 space-y-2">
                              <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                                <Phone className="h-3 w-3" />
                                <span>{lead.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                                <Mail className="h-3 w-3" />
                                <span className="truncate">{lead.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                                <Calendar className="h-3 w-3" />
                                <span>Next: {lead.nextFollowUp.toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                              </div>

                              <div className="bg-surface-secondary rounded-md p-2 mt-2">
                                <div className="flex items-start gap-1.5">
                                  <MessageSquare className="h-3 w-3 text-text-tertiary mt-0.5 shrink-0" />
                                  <p className="text-[10px] text-text-secondary leading-relaxed">{lead.notes}</p>
                                </div>
                              </div>

                              {lead.lostReason && (
                                <div className="bg-red-50 rounded-md p-2">
                                  <span className="text-[10px] text-red-600 font-medium">Lost Reason: {lead.lostReason}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {colLeads.length === 0 && (
                      <div className="flex items-center justify-center h-20 text-xs text-text-tertiary">
                        No leads
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Source Distribution */}
        {sourceData.loading ? (
          <ChartSkeleton height="h-56" />
        ) : (
          <div className="card">
            <h2 className="text-base font-semibold text-text-primary mb-4">Lead Source Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2.5">
                {sourceData.data?.map((item) => {
                  const barW = (item.count / maxSource) * 100;
                  return (
                    <div key={item.source} className="flex items-center gap-3">
                      <span className="text-xs text-text-secondary w-24 shrink-0">{item.source}</span>
                      <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                        <div
                          className={cn("h-full rounded flex items-center pl-2 transition-all", item.color)}
                          style={{ width: `${barW}%` }}
                        >
                          <span className="text-[10px] font-bold text-white">{item.count}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-text-tertiary w-10 text-right">{item.pct}%</span>
                    </div>
                  );
                })}
              </div>

              {/* Donut-style display */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="h-40 w-40 rounded-full border-[20px] border-blue-500 relative" style={{
                    background: `conic-gradient(
                      #3b82f6 0% 28.7%,
                      #10b981 28.7% 49.8%,
                      #8b5cf6 49.8% 66.8%,
                      #0ea5e9 66.8% 80%,
                      #f43f5e 80% 91.1%,
                      #22c55e 91.1% 96.4%,
                      #f59e0b 96.4% 100%
                    )`,
                    borderColor: "transparent",
                  }}>
                    <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold text-text-primary">342</div>
                        <div className="text-[10px] text-text-tertiary">Total Leads</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
