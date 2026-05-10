"use client";

import { useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Skeleton, StatSkeleton, TableSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection } from "@/hooks/useAsyncData";
import { feeRecords } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  CreditCard, Download, CheckCircle2, Clock, AlertTriangle,
  IndianRupee, Receipt, BadgePercent,
} from "lucide-react";

export default function ParentFeesPage() {
  const studentFees = feeRecords.filter((f) => f.studentId === "stu-1");

  const { data: fees, loading } = useAsyncData(
    useCallback(() => studentFees, []),
    800
  );

  const { data: summary, loading: summaryLoading } = useLazySection(
    useCallback(() => {
      const totalFee = studentFees.reduce((s, f) => s + f.amount, 0);
      const totalPaid = studentFees.filter((f) => f.status === "Paid").reduce((s, f) => s + f.amount, 0);
      const totalDiscount = studentFees.reduce((s, f) => s + (f.discount?.amount || 0), 0);
      const pendingFee = studentFees.find((f) => f.status === "Pending");
      return { totalFee, totalPaid, totalDiscount, pendingFee };
    }, []),
    500
  );

  const statusColor: Record<string, string> = {
    Paid: "badge-success",
    Pending: "badge-warning",
    Overdue: "badge-danger",
    "Partially Paid": "badge-primary",
  };

  const statusIcon: Record<string, React.ComponentType<{ className?: string }>> = {
    Paid: CheckCircle2,
    Pending: Clock,
    Overdue: AlertTriangle,
  };

  return (
    <>
      <TopBar title="Fee Payments" subtitle="View payment history and manage dues" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Current Dues */}
        {summaryLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </div>
        ) : summary && (
          <>
            {/* Current Dues Card */}
            {summary.pendingFee && (
              <div className="card bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="text-amber-100 text-sm mb-1">Current Due — Installment {summary.pendingFee.installment} of {summary.pendingFee.totalInstallments}</div>
                    <div className="text-3xl font-bold">{formatCurrency(summary.pendingFee.amount)}</div>
                    <div className="text-amber-100 text-sm mt-1">
                      Due Date: {new Date(summary.pendingFee.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </div>
                  </div>
                  <button className="bg-white text-amber-700 font-bold px-8 py-3 rounded-xl hover:bg-amber-50 transition-colors text-sm">
                    Pay Now
                  </button>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-amber-600" /> Payment Progress
                </h3>
                <span className="text-sm text-text-secondary">
                  {formatCurrency(summary.totalPaid)} / {formatCurrency(summary.totalFee)}
                </span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all"
                  style={{ width: `${(summary.totalPaid / summary.totalFee) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>{Math.round((summary.totalPaid / summary.totalFee) * 100)}% paid</span>
                <span>Remaining: {formatCurrency(summary.totalFee - summary.totalPaid)}</span>
              </div>

              {/* Discount Info */}
              {summary.totalDiscount > 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 flex items-center gap-3">
                  <BadgePercent className="h-5 w-5 text-green-600 shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-green-800">Discount Applied</div>
                    <div className="text-xs text-green-600">You saved {formatCurrency(summary.totalDiscount)} through early payment discounts</div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Payment History Table */}
        <div className="card">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Receipt className="h-5 w-5 text-amber-600" /> Payment History
          </h3>
          {loading ? (
            <TableSkeleton rows={4} columns={7} />
          ) : fees && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary whitespace-nowrap">Installment</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-text-secondary whitespace-nowrap">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary whitespace-nowrap">Due Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary whitespace-nowrap">Paid Date</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-text-secondary whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-text-secondary whitespace-nowrap">Method</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-text-secondary whitespace-nowrap">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((fee) => {
                    const Icon = statusIcon[fee.status] || Clock;
                    return (
                      <tr key={fee.id} className="border-b border-border-light hover:bg-surface-secondary transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 shrink-0 ${fee.status === "Paid" ? "text-emerald-500" : fee.status === "Overdue" ? "text-red-500" : "text-amber-500"}`} />
                            <span className="text-sm font-medium">
                              Installment {fee.installment}/{fee.totalInstallments}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <div className="text-sm font-bold">{formatCurrency(fee.amount)}</div>
                          {fee.discount && (
                            <div className="text-[10px] text-green-600 whitespace-nowrap">-{formatCurrency(fee.discount.amount)} ({fee.discount.type})</div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-text-secondary whitespace-nowrap">
                          {new Date(fee.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-4 py-3 text-sm text-text-secondary whitespace-nowrap">
                          {fee.paidDate
                            ? new Date(fee.paidDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                            : "—"
                          }
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`badge ${statusColor[fee.status]}`}>{fee.status}</span>
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-text-secondary">
                          {fee.method || "—"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {fee.receiptNo ? (
                            <button className="btn-secondary text-xs flex items-center gap-1 ml-auto">
                              <Download className="h-3 w-3" /> {fee.receiptNo}
                            </button>
                          ) : (
                            <span className="text-xs text-text-tertiary">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
