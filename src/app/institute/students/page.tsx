"use client";

import { useState, useCallback, useMemo } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { TableSkeleton, StatSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData } from "@/hooks/useAsyncData";
import { instituteStudents } from "@/lib/mock-data";
import { cn, formatCurrency, getInitials } from "@/lib/utils";
import {
  Search, Filter, ChevronDown, ChevronUp, ChevronRight, Download, MessageSquare,
  Users, UserCheck, UserX, AlertTriangle, ArrowUpDown,
} from "lucide-react";

type SortField = "name" | "attendance" | "avgScore" | "feePaid" | "status";
type SortDir = "asc" | "desc";

const statusColors: Record<string, string> = {
  Active: "badge-success",
  Paused: "badge-warning",
  Dropped: "badge-danger",
  Completed: "badge-primary",
  Waitlisted: "bg-gray-100 text-gray-700",
};

const riskDot: Record<string, string> = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

export default function StudentsPage() {
  const studentsData = useAsyncData(useCallback(() => instituteStudents, []), 1000);
  const [search, setSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [examFilter, setExamFilter] = useState("All");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const allBatches = useMemo(() => {
    const set = new Set(instituteStudents.map((s) => s.batch));
    return ["All", ...Array.from(set)];
  }, []);
  const allExams = useMemo(() => {
    const set = new Set(instituteStudents.map((s) => s.exam));
    return ["All", ...Array.from(set)];
  }, []);
  const allStatuses = ["All", "Active", "Paused", "Dropped", "Completed", "Waitlisted"];

  const filtered = useMemo(() => {
    if (!studentsData.data) return [];
    let list = [...studentsData.data];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.enrollmentId.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
      );
    }
    if (batchFilter !== "All") list = list.filter((s) => s.batch === batchFilter);
    if (statusFilter !== "All") list = list.filter((s) => s.status === statusFilter);
    if (examFilter !== "All") list = list.filter((s) => s.exam === examFilter);

    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "attendance") cmp = a.attendance - b.attendance;
      else if (sortField === "avgScore") cmp = a.avgScore - b.avgScore;
      else if (sortField === "feePaid") cmp = a.feePaid / a.feeTotal - b.feePaid / b.feeTotal;
      else if (sortField === "status") cmp = a.status.localeCompare(b.status);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [studentsData.data, search, batchFilter, statusFilter, examFilter, sortField, sortDir]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((s) => s.id)));
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 text-text-tertiary" />;
    return sortDir === "asc" ? <ChevronUp className="h-3 w-3 text-primary-600" /> : <ChevronDown className="h-3 w-3 text-primary-600" />;
  };

  const activeCount = instituteStudents.filter((s) => s.status === "Active").length;
  const droppedCount = instituteStudents.filter((s) => s.status === "Dropped").length;
  const atRisk = instituteStudents.filter((s) => s.riskLevel === "high").length;

  return (
    <>
      <TopBar title="Student Management" subtitle={`${instituteStudents.length} students across all branches`} />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Summary Stats */}
        {studentsData.loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-primary-600" />
                <span className="text-xs text-text-secondary">Total Students</span>
              </div>
              <div className="text-2xl font-bold">{instituteStudents.length}</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-1">
                <UserCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-xs text-text-secondary">Active</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600">{activeCount}</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-1">
                <UserX className="h-4 w-4 text-red-600" />
                <span className="text-xs text-text-secondary">Dropped</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{droppedCount}</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="text-xs text-text-secondary">At Risk</span>
              </div>
              <div className="text-2xl font-bold text-amber-600">{atRisk}</div>
            </div>
          </div>
        )}

        {/* Search & Filters */}
        <div className="card">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 bg-surface-secondary rounded-lg px-3 py-2 flex-1 min-w-0 sm:min-w-[200px] max-w-md">
              <Search className="h-4 w-4 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                className="input border-0 bg-transparent p-0 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-text-tertiary" />
              <select className="select text-sm" value={batchFilter} onChange={(e) => setBatchFilter(e.target.value)}>
                {allBatches.map((b) => <option key={b} value={b}>{b === "All" ? "All Batches" : b}</option>)}
              </select>
              <select className="select text-sm" value={examFilter} onChange={(e) => setExamFilter(e.target.value)}>
                {allExams.map((e) => <option key={e} value={e}>{e === "All" ? "All Exams" : e}</option>)}
              </select>
              <select className="select text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                {allStatuses.map((s) => <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedIds.size > 0 && (
          <div className="card bg-primary-50 border-primary-200 flex items-center justify-between">
            <span className="text-sm font-medium text-primary-700">{selectedIds.size} student(s) selected</span>
            <div className="flex gap-2">
              <button className="btn-secondary btn-sm">
                <MessageSquare className="h-3.5 w-3.5" /> Send Message
              </button>
              <button className="btn-secondary btn-sm">
                <Download className="h-3.5 w-3.5" /> Export CSV
              </button>
            </div>
          </div>
        )}

        {/* Student Table */}
        {studentsData.loading ? (
          <TableSkeleton rows={8} columns={9} />
        ) : (
          <div className="card overflow-hidden p-0">
            <div className="px-4 py-3 border-b border-border bg-surface-secondary flex items-center justify-between">
              <span className="text-sm text-text-secondary">
                Showing {filtered.length} of {instituteStudents.length} students
              </span>
              <div className="flex gap-2">
                <button className="btn-secondary text-xs flex items-center gap-1">
                  <Download className="h-3 w-3" /> Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary/50">
                    <th className="px-4 py-3 w-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === filtered.length && filtered.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-text-secondary cursor-pointer select-none" onClick={() => toggleSort("name")}>
                      <span className="flex items-center gap-1">Student <SortIcon field="name" /></span>
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-text-secondary">Enrollment ID</th>
                    <th className="text-left px-4 py-3 font-medium text-text-secondary">Batch</th>
                    <th className="text-left px-4 py-3 font-medium text-text-secondary">Branch</th>
                    <th className="text-center px-4 py-3 font-medium text-text-secondary cursor-pointer select-none" onClick={() => toggleSort("attendance")}>
                      <span className="flex items-center justify-center gap-1">Attend. <SortIcon field="attendance" /></span>
                    </th>
                    <th className="text-center px-4 py-3 font-medium text-text-secondary cursor-pointer select-none" onClick={() => toggleSort("avgScore")}>
                      <span className="flex items-center justify-center gap-1">Avg Score <SortIcon field="avgScore" /></span>
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-text-secondary cursor-pointer select-none" onClick={() => toggleSort("feePaid")}>
                      <span className="flex items-center gap-1">Fee Status <SortIcon field="feePaid" /></span>
                    </th>
                    <th className="text-center px-4 py-3 font-medium text-text-secondary cursor-pointer select-none" onClick={() => toggleSort("status")}>
                      <span className="flex items-center justify-center gap-1">Status <SortIcon field="status" /></span>
                    </th>
                    <th className="text-center px-4 py-3 font-medium text-text-secondary">Risk</th>
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((student) => {
                    const feePct = student.feeTotal > 0 ? (student.feePaid / student.feeTotal) * 100 : 0;
                    const isExpanded = expandedRow === student.id;
                    return (
                      <>
                        <tr
                          key={student.id}
                          className={cn(
                            "border-b border-border-light hover:bg-surface-secondary/50 transition-colors cursor-pointer",
                            isExpanded && "bg-primary-50/30"
                          )}
                          onClick={() => setExpandedRow(isExpanded ? null : student.id)}
                        >
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedIds.has(student.id)}
                              onChange={() => toggleSelect(student.id)}
                              className="rounded"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={student.avatar}
                                alt={student.name}
                                className="h-8 w-8 rounded-full object-cover shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="font-medium text-text-primary truncate max-w-[180px]" title={student.name}>
                                  {student.name}
                                </div>
                                <div className="text-xs text-text-tertiary">{student.exam}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-text-secondary font-mono text-xs">{student.enrollmentId}</td>
                          <td className="px-4 py-3 text-text-secondary text-xs">{student.batch}</td>
                          <td className="px-4 py-3 text-text-secondary text-xs">{student.branch}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={cn(
                              "text-xs font-semibold",
                              student.attendance >= 85 ? "text-emerald-600" : student.attendance >= 70 ? "text-amber-600" : "text-red-600"
                            )}>
                              {student.attendance}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="text-xs font-semibold">{student.avgScore}%</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[60px]">
                                <div
                                  className={cn(
                                    "h-full rounded-full",
                                    feePct >= 90 ? "bg-emerald-500" : feePct >= 50 ? "bg-amber-500" : "bg-red-500"
                                  )}
                                  style={{ width: `${feePct}%` }}
                                />
                              </div>
                              <span className="text-[10px] text-text-tertiary whitespace-nowrap">
                                {formatCurrency(student.feePaid).replace("₹", "₹")}/{formatCurrency(student.feeTotal).replace("₹", "₹")}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={cn("badge text-[10px]", statusColors[student.status])}>{student.status}</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={cn("h-2.5 w-2.5 rounded-full inline-block", riskDot[student.riskLevel])} title={student.riskLevel} />
                          </td>
                          <td className="px-4 py-3">
                            <ChevronRight className={cn("h-4 w-4 text-text-tertiary transition-transform", isExpanded && "rotate-90")} />
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr key={`${student.id}-detail`} className="bg-surface-secondary/50">
                            <td colSpan={11} className="px-6 py-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <h4 className="text-xs font-semibold text-text-secondary uppercase">Contact</h4>
                                  <p className="text-sm">{student.email}</p>
                                  <p className="text-sm">{student.phone}</p>
                                  <p className="text-sm text-text-secondary">Parent: {student.parentName} ({student.parentPhone})</p>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="text-xs font-semibold text-text-secondary uppercase">Attendance Trend</h4>
                                  <div className="flex items-end gap-1 h-12">
                                    {[72, 78, 85, 80, 88, student.attendance].map((val, i) => (
                                      <div
                                        key={i}
                                        className={cn(
                                          "flex-1 rounded-t",
                                          val >= 85 ? "bg-emerald-400" : val >= 70 ? "bg-amber-400" : "bg-red-400"
                                        )}
                                        style={{ height: `${val}%` }}
                                      />
                                    ))}
                                  </div>
                                  <div className="flex justify-between text-[10px] text-text-tertiary">
                                    <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="text-xs font-semibold text-text-secondary uppercase">Fee History</h4>
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span>Total Fee</span>
                                      <span className="font-medium">{formatCurrency(student.feeTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span>Paid</span>
                                      <span className="font-medium text-emerald-600">{formatCurrency(student.feePaid)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span>Outstanding</span>
                                      <span className="font-medium text-red-600">{formatCurrency(student.feeTotal - student.feePaid)}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${feePct}%` }} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-border bg-surface-secondary flex items-center justify-between">
              <span className="text-xs text-text-tertiary">Page 1 of 1 — Showing all results</span>
              <div className="flex gap-1">
                <button className="btn-secondary text-xs px-3 py-1 opacity-50 cursor-not-allowed">Previous</button>
                <button className="btn-primary text-xs px-3 py-1">1</button>
                <button className="btn-secondary text-xs px-3 py-1 opacity-50 cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
