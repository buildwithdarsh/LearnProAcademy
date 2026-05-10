"use client";

import { useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { StatSkeleton, ChartSkeleton, TableSkeleton, ListSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useSlowSection, useLazySection } from "@/hooks/useAsyncData";
import { revenueData, leadFunnelData, branches } from "@/lib/mock-data";
import { formatNumber, cn } from "@/lib/utils";
import {
  Users, IndianRupee, Percent, Layers, UserPlus, GraduationCap,
  TrendingUp, TrendingDown, BookOpen, ClipboardList, MessageCircle, CreditCard,
  ArrowRight,
} from "lucide-react";

const statCards = [
  { label: "Total Students", value: "9,480", icon: Users, change: "+12.3%", up: true, color: "text-primary-600", bg: "bg-primary-50" },
  { label: "Monthly Revenue", value: formatNumber(2434000), prefix: "₹", icon: IndianRupee, change: "+8.1%", up: true, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Collection Ratio", value: "89.2%", icon: Percent, change: "+2.4%", up: true, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Active Batches", value: "36", icon: Layers, change: "+3", up: true, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "New Leads This Week", value: "47", icon: UserPlus, change: "+18%", up: true, color: "text-sky-600", bg: "bg-sky-50" },
  { label: "Faculty Count", value: "48", icon: GraduationCap, change: "+2", up: true, color: "text-rose-600", bg: "bg-rose-50" },
];

const recentActivity = [
  { id: 1, text: "Tanvi Jain enrolled in NEET Regular Batch", time: "10 min ago", type: "enrollment" },
  { id: 2, text: "Fee payment of ₹68,750 received from Arjun Mehta (UPI)", time: "25 min ago", type: "payment" },
  { id: 3, text: "New lead: Manish Tiwari — JEE Advanced (Google Ads)", time: "1 hr ago", type: "lead" },
  { id: 4, text: "Priya Sharma scored 85.7% in Monthly Mock #14", time: "2 hrs ago", type: "result" },
  { id: 5, text: "Dr. Anil Verma completed Rotational Motion — Angular Momentum", time: "3 hrs ago", type: "class" },
  { id: 6, text: "Fee overdue reminder sent to Rohit Gupta (₹68,750)", time: "4 hrs ago", type: "fee" },
  { id: 7, text: "New walk-in lead: Suman Devi — NEET UG", time: "5 hrs ago", type: "lead" },
];

const activityColors: Record<string, string> = {
  enrollment: "bg-emerald-500",
  payment: "bg-blue-500",
  lead: "bg-amber-500",
  result: "bg-violet-500",
  class: "bg-sky-500",
  fee: "bg-rose-500",
};

const quickStats = [
  { label: "Classes Running Now", value: "8", icon: BookOpen, color: "text-emerald-600" },
  { label: "Tests Today", value: "3", icon: ClipboardList, color: "text-blue-600" },
  { label: "Doubts Pending", value: "14", icon: MessageCircle, color: "text-amber-600" },
  { label: "Fees Collected Today", value: "₹2.8L", icon: CreditCard, color: "text-violet-600" },
];

export default function InstituteDashboard() {
  const mainData = useAsyncData(useCallback(() => ({ statCards, quickStats }), []), 1000);
  const revenueChart = useSlowSection(useCallback(() => revenueData, []));
  const funnelData = useLazySection(useCallback(() => leadFunnelData, []), 1200);
  const branchData = useLazySection(useCallback(() => branches, []), 1400);
  const activityData = useLazySection(useCallback(() => recentActivity, []), 800);

  const maxRevenue = Math.max(...revenueData.map((r) => r.due));
  const maxFunnel = leadFunnelData[0]?.count || 1;

  return (
    <>
      <TopBar title="Institute Dashboard" subtitle="Welcome back, Vikram. Here's your overview." />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Stat Cards */}
        {mainData.loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <StatSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="stat-card">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] sm:text-xs font-medium text-text-secondary uppercase tracking-wide leading-tight">{stat.label}</span>
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", stat.bg)}>
                      <Icon className={cn("h-4 w-4", stat.color)} />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-text-primary whitespace-nowrap">
                    {stat.prefix && <span className="text-base sm:text-lg">{stat.prefix}</span>}
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-1 mt-1 whitespace-nowrap">
                    {stat.up ? (
                      <TrendingUp className="h-3 w-3 text-emerald-500 shrink-0" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 shrink-0" />
                    )}
                    <span className={cn("text-[10px] sm:text-xs font-medium", stat.up ? "text-emerald-600" : "text-red-600")}>
                      {stat.change}
                    </span>
                    <span className="text-[10px] sm:text-xs text-text-tertiary">vs last month</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Stats Bar */}
        {mainData.loading ? null : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((qs) => {
              const Icon = qs.icon;
              return (
                <div key={qs.label} className="card flex items-center gap-3 py-3">
                  <Icon className={cn("h-5 w-5", qs.color)} />
                  <div>
                    <div className="text-lg font-bold text-text-primary">{qs.value}</div>
                    <div className="text-xs text-text-secondary">{qs.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Revenue Chart & Lead Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Revenue Chart */}
          {revenueChart.loading ? (
            <ChartSkeleton height="h-72" />
          ) : (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-text-primary">Revenue Overview</h2>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Collected
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-emerald-200" /> Due
                  </span>
                </div>
              </div>
              <div className="flex items-end gap-3 h-40 md:h-56">
                {revenueChart.data?.map((item) => {
                  const dueH = (item.due / maxRevenue) * 100;
                  const collH = (item.collected / maxRevenue) * 100;
                  const monthShort = item.month.split(" ")[0].slice(0, 3);
                  return (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col items-center justify-end h-48 relative">
                        <div
                          className="w-full max-w-[36px] bg-emerald-100 rounded-t-md relative"
                          style={{ height: `${dueH}%` }}
                        >
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-t-md transition-all duration-500"
                            style={{ height: `${(collH / dueH) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-[10px] text-text-tertiary font-medium">{monthShort}</span>
                      <span className="text-[10px] text-text-tertiary">₹{formatNumber(item.collected)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Lead Funnel */}
          {funnelData.loading ? (
            <ChartSkeleton height="h-72" />
          ) : (
            <div className="card">
              <h2 className="text-base font-semibold text-text-primary mb-6">Lead Funnel</h2>
              <div className="space-y-3">
                {funnelData.data?.map((stage) => {
                  const pct = (stage.count / maxFunnel) * 100;
                  return (
                    <div key={stage.stage} className="flex items-center gap-3">
                      <span className="text-sm text-text-secondary w-28 shrink-0 truncate">{stage.stage}</span>
                      <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                        <div
                          className="h-full rounded-lg transition-all duration-700 flex items-center justify-end pr-2"
                          style={{ width: `${pct}%`, backgroundColor: stage.color }}
                        >
                          <span className="text-xs font-bold text-white drop-shadow-sm">{stage.count}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
                <span className="text-xs text-text-tertiary">Conversion Rate</span>
                <span className="text-sm font-bold text-emerald-600">26.0%</span>
              </div>
            </div>
          )}
        </div>

        {/* Branch Performance & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Branch Performance */}
          <div className="lg:col-span-2">
            {branchData.loading ? (
              <TableSkeleton rows={5} columns={6} />
            ) : (
              <div className="card overflow-hidden p-0">
                <div className="px-5 py-4 border-b border-border">
                  <h2 className="text-base font-semibold text-text-primary">Branch Performance</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead>
                      <tr className="bg-surface-secondary border-b border-border">
                        <th className="text-left px-4 py-3 font-medium text-text-secondary whitespace-nowrap">Branch</th>
                        <th className="text-right px-4 py-3 font-medium text-text-secondary whitespace-nowrap">Students</th>
                        <th className="text-right px-4 py-3 font-medium text-text-secondary whitespace-nowrap">Revenue</th>
                        <th className="text-left px-4 py-3 font-medium text-text-secondary whitespace-nowrap">Collection</th>
                        <th className="text-left px-4 py-3 font-medium text-text-secondary whitespace-nowrap">Enrollment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branchData.data?.map((branch) => (
                        <tr key={branch.id} className="border-b border-border-light hover:bg-surface-secondary/50 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium text-text-primary">{branch.name}</div>
                            <div className="text-xs text-text-tertiary">{branch.manager}</div>
                          </td>
                          <td className="px-4 py-3 text-right font-medium">{branch.studentCount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right font-medium">₹{formatNumber(branch.revenue)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[80px]">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-all",
                                    branch.collectionRatio >= 90 ? "bg-emerald-500" : branch.collectionRatio >= 85 ? "bg-amber-500" : "bg-red-500"
                                  )}
                                  style={{ width: `${branch.collectionRatio}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium">{branch.collectionRatio}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[80px]">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-all",
                                    branch.enrollmentRate >= 85 ? "bg-blue-500" : branch.enrollmentRate >= 75 ? "bg-amber-500" : "bg-red-500"
                                  )}
                                  style={{ width: `${branch.enrollmentRate}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium">{branch.enrollmentRate}%</span>
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

          {/* Recent Activity */}
          {activityData.loading ? (
            <ListSkeleton items={6} />
          ) : (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-text-primary">Recent Activity</h2>
                <button className="text-xs text-primary-600 hover:underline flex items-center gap-1">
                  View All <ArrowRight className="h-3 w-3" />
                </button>
              </div>
              <div className="space-y-3">
                {activityData.data?.map((item) => (
                  <div key={item.id} className="flex gap-3 py-2 border-b border-border-light last:border-0">
                    <div className={cn("h-2 w-2 rounded-full mt-1.5 shrink-0", activityColors[item.type] || "bg-gray-400")} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-text-primary leading-snug">{item.text}</p>
                      <p className="text-xs text-text-tertiary mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
