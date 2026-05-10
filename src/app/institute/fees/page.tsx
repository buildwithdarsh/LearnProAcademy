"use client";

import { useState, useCallback, useMemo } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { StatSkeleton, TableSkeleton, ChartSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection } from "@/hooks/useAsyncData";
import { feeRecords } from "@/lib/mock-data";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import {
  IndianRupee, AlertTriangle, CheckCircle2, Clock, Send, FileText,
  Filter, CreditCard, Banknote, Smartphone, Globe, Building,
} from "lucide-react";

const feeOverview = [
  { label: "Total Collected", value: "₹1.52Cr", raw: 15200000, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Outstanding", value: "₹38.4L", raw: 3840000, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Overdue", value: "₹12.8L", raw: 1280000, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  { label: "Collection Ratio", value: "89.2%", raw: 89.2, icon: IndianRupee, color: "text-primary-600", bg: "bg-primary-50" },
];

const agingAnalysis = [
  { bracket: "0–30 days", amount: 1860000, students: 142, color: "bg-emerald-500" },
  { bracket: "31–60 days", amount: 980000, students: 67, color: "bg-amber-500" },
  { bracket: "61–90 days", amount: 640000, students: 34, color: "bg-orange-500" },
  { bracket: "90+ days", amount: 360000, students: 18, color: "bg-red-500" },
];

const paymentMethods = [
  { method: "UPI", amount: 6840000, pct: 45, icon: Smartphone, color: "bg-violet-500" },
  { method: "Net Banking", amount: 3800000, pct: 25, icon: Globe, color: "bg-blue-500" },
  { method: "Card", amount: 2280000, pct: 15, icon: CreditCard, color: "bg-emerald-500" },
  { method: "Cash", amount: 1520000, pct: 10, icon: Banknote, color: "bg-amber-500" },
  { method: "EMI", amount: 760000, pct: 5, icon: Building, color: "bg-rose-500" },
];

const statusColors: Record<string, string> = {
  Paid: "badge-success",
  Pending: "badge-warning",
  Overdue: "badge-danger",
  "Partially Paid": "bg-orange-100 text-orange-700",
};

export default function FeesPage() {
  const overviewData = useAsyncData(useCallback(() => feeOverview, []), 1000);
  const feesData = useAsyncData(useCallback(() => feeRecords, []), 1200);
  const agingData = useLazySection(useCallback(() => agingAnalysis, []), 1500);
  const methodData = useLazySection(useCallback(() => paymentMethods, []), 1400);

  const [statusFilter, setStatusFilter] = useState("All");
  const statuses = ["All", "Paid", "Pending", "Overdue", "Partially Paid"];

  const filtered = useMemo(() => {
    if (!feesData.data) return [];
    if (statusFilter === "All") return feesData.data;
    return feesData.data.filter((f) => f.status === statusFilter);
  }, [feesData.data, statusFilter]);

  const maxAging = Math.max(...agingAnalysis.map((a) => a.amount));

  return (
    <>
      <TopBar title="Fee Collection & Tracking" subtitle="Monitor revenue, outstanding fees, and collections" />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Overview Stats */}
        {overviewData.loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {overviewData.data?.map((stat) => {
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

        {/* Fee Records Table */}
        <div className="card overflow-hidden p-0">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-base font-semibold text-text-primary">Fee Records</h2>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-text-tertiary" />
              <select
                className="select text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>
                ))}
              </select>
            </div>
          </div>

          {feesData.loading ? (
            <div className="p-4">
              <TableSkeleton rows={7} columns={8} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border">
                    <th className="text-left px-4 py-2.5 font-medium text-text-secondary text-xs">Student</th>
                    <th className="text-left px-4 py-2.5 font-medium text-text-secondary text-xs">Batch</th>
                    <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Installment</th>
                    <th className="text-right px-4 py-2.5 font-medium text-text-secondary text-xs">Amount</th>
                    <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Due Date</th>
                    <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Paid Date</th>
                    <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Status</th>
                    <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Method</th>
                    <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((record) => (
                    <tr key={record.id} className="border-b border-border-light hover:bg-surface-secondary/50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-medium text-text-primary text-xs">{record.studentName}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-text-secondary">{record.batch}</td>
                      <td className="text-center px-4 py-3 text-xs">
                        {record.installment}/{record.totalInstallments}
                      </td>
                      <td className="text-right px-4 py-3 text-xs font-medium">
                        {formatCurrency(record.amount)}
                        {record.discount && (
                          <div className="text-[10px] text-emerald-600">-{formatCurrency(record.discount.amount)} ({record.discount.type})</div>
                        )}
                      </td>
                      <td className="text-center px-4 py-3 text-xs text-text-secondary">{record.dueDate}</td>
                      <td className="text-center px-4 py-3 text-xs text-text-secondary">{record.paidDate || "—"}</td>
                      <td className="text-center px-4 py-3">
                        <span className={cn("badge text-[10px]", statusColors[record.status])}>{record.status}</span>
                      </td>
                      <td className="text-center px-4 py-3 text-xs text-text-secondary">{record.method || "—"}</td>
                      <td className="text-center px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          {(record.status === "Pending" || record.status === "Overdue") && (
                            <button className="p-1.5 rounded-md hover:bg-amber-50 text-amber-600 transition-colors" title="Send Reminder">
                              <Send className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {record.receiptNo && (
                            <button className="p-1.5 rounded-md hover:bg-primary-50 text-primary-600 transition-colors" title="Generate Receipt">
                              <FileText className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Aging Analysis */}
          {agingData.loading ? (
            <ChartSkeleton height="h-56" />
          ) : (
            <div className="card">
              <h2 className="text-base font-semibold text-text-primary mb-4">Aging Analysis</h2>
              <div className="space-y-3">
                {agingData.data?.map((item) => {
                  const barW = (item.amount / maxAging) * 100;
                  return (
                    <div key={item.bracket}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary">{item.bracket}</span>
                        <span className="font-medium">{formatCurrency(item.amount)} ({item.students} students)</span>
                      </div>
                      <div className="h-6 bg-gray-100 rounded overflow-hidden">
                        <div
                          className={cn("h-full rounded flex items-center pl-2 transition-all", item.color)}
                          style={{ width: `${barW}%` }}
                        >
                          <span className="text-[10px] font-bold text-white">₹{formatNumber(item.amount)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-border-light">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Total Outstanding</span>
                  <span className="font-bold text-text-primary">{formatCurrency(agingAnalysis.reduce((s, a) => s + a.amount, 0))}</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method Distribution */}
          {methodData.loading ? (
            <ChartSkeleton height="h-56" />
          ) : (
            <div className="card">
              <h2 className="text-base font-semibold text-text-primary mb-4">Payment Method Distribution</h2>

              {/* Stacked bar */}
              <div className="flex h-8 rounded-lg overflow-hidden mb-4">
                {methodData.data?.map((m) => (
                  <div
                    key={m.method}
                    className={cn("flex items-center justify-center text-[10px] font-bold text-white transition-all", m.color)}
                    style={{ width: `${m.pct}%` }}
                    title={`${m.method}: ${m.pct}%`}
                  >
                    {m.pct >= 10 && `${m.pct}%`}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {methodData.data?.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.method} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn("h-3 w-3 rounded-full", m.color)} />
                        <Icon className="h-4 w-4 text-text-tertiary" />
                        <span className="text-xs text-text-secondary">{m.method}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-text-primary">{formatCurrency(m.amount)}</span>
                        <span className="text-[10px] text-text-tertiary ml-2">({m.pct}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
