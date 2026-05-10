"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CalendarDays, CheckCircle2, XCircle, Clock } from "lucide-react";

const attendanceData = [
  { month: "March 2026", present: 22, absent: 2, late: 1, total: 25 },
  { month: "February 2026", present: 19, absent: 1, late: 2, total: 22 },
  { month: "January 2026", present: 23, absent: 3, late: 0, total: 26 },
  { month: "December 2025", present: 18, absent: 2, late: 1, total: 21 },
  { month: "November 2025", present: 24, absent: 0, late: 1, total: 25 },
];

export default function ParentAttendancePage() {
  const overall = attendanceData.reduce(
    (acc, m) => ({
      present: acc.present + m.present,
      absent: acc.absent + m.absent,
      late: acc.late + m.late,
      total: acc.total + m.total,
    }),
    { present: 0, absent: 0, late: 0, total: 0 }
  );
  const percentage = Math.round((overall.present / overall.total) * 100);

  return (
    <>
      <TopBar title="Attendance" subtitle="Arjun Mehta — Class 11 Science" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
              <CalendarDays size={20} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-text-primary">{percentage}%</div>
              <div className="text-xs text-text-tertiary">Overall</div>
            </div>
          </div>
          <div className="card flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success-50 text-success-500 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-text-primary">{overall.present}</div>
              <div className="text-xs text-text-tertiary">Present</div>
            </div>
          </div>
          <div className="card flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-danger-50 text-danger-500 flex items-center justify-center">
              <XCircle size={20} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-text-primary">{overall.absent}</div>
              <div className="text-xs text-text-tertiary">Absent</div>
            </div>
          </div>
          <div className="card flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warning-50 text-warning-500 flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-text-primary">{overall.late}</div>
              <div className="text-xs text-text-tertiary">Late</div>
            </div>
          </div>
        </div>

        {/* Monthly breakdown */}
        <div className="card p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-bold text-text-primary">Monthly Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-secondary text-text-tertiary text-xs uppercase tracking-wide">
                  <th className="px-5 py-3 text-left font-semibold">Month</th>
                  <th className="px-5 py-3 text-center font-semibold">Present</th>
                  <th className="px-5 py-3 text-center font-semibold">Absent</th>
                  <th className="px-5 py-3 text-center font-semibold">Late</th>
                  <th className="px-5 py-3 text-center font-semibold">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {attendanceData.map((m) => {
                  const rate = Math.round((m.present / m.total) * 100);
                  return (
                    <tr key={m.month} className="hover:bg-surface-secondary/50">
                      <td className="px-5 py-3 font-medium text-text-primary">{m.month}</td>
                      <td className="px-5 py-3 text-center text-success-600 font-semibold">{m.present}</td>
                      <td className="px-5 py-3 text-center text-danger-500 font-semibold">{m.absent}</td>
                      <td className="px-5 py-3 text-center text-warning-500 font-semibold">{m.late}</td>
                      <td className="px-5 py-3 text-center">
                        <span
                          className={`badge ${
                            rate >= 90 ? "badge-success" : rate >= 75 ? "badge-warning" : "badge-danger"
                          }`}
                        >
                          {rate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
