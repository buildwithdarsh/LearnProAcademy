"use client";

import { useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CardSkeleton, StatSkeleton, TableSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection } from "@/hooks/useAsyncData";
import { branches } from "@/lib/mock-data";
import { cn, formatNumber, formatCurrency } from "@/lib/utils";
import {
  Building2, Users, GraduationCap, IndianRupee, MapPin, Phone,
  TrendingUp, Layers,
} from "lucide-react";

export default function BranchesPage() {
  const branchData = useAsyncData(useCallback(() => branches, []), 1000);
  const tableData = useLazySection(useCallback(() => branches, []), 1400);

  const totalStudents = branches.reduce((s, b) => s + b.studentCount, 0);
  const totalFaculty = branches.reduce((s, b) => s + b.facultyCount, 0);
  const totalRevenue = branches.reduce((s, b) => s + b.revenue, 0);
  const avgCollection = (branches.reduce((s, b) => s + b.collectionRatio, 0) / branches.length).toFixed(1);

  const centralStats = [
    { label: "Total Branches", value: branches.length.toString(), icon: Building2, color: "text-primary-600", bg: "bg-primary-50" },
    { label: "Total Students", value: totalStudents.toLocaleString(), icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Faculty", value: totalFaculty.toString(), icon: GraduationCap, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Total Revenue", value: `₹${formatNumber(totalRevenue)}`, icon: IndianRupee, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <>
      <TopBar title="Multi-Branch Management" subtitle="Monitor and compare performance across all branches" />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Centralized Stats */}
        {branchData.loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {centralStats.map((stat) => {
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

        {/* Branch Cards */}
        {branchData.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branchData.data?.map((branch) => (
              <div key={branch.id} className="card hover:shadow-md transition-shadow p-0 overflow-hidden">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="h-28 md:h-36 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-text-primary mb-1">{branch.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-3">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="truncate">{branch.address}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-surface-secondary rounded-lg p-2.5 text-center">
                      <div className="text-lg font-bold text-text-primary">{branch.studentCount.toLocaleString()}</div>
                      <div className="text-[10px] text-text-tertiary">Students</div>
                    </div>
                    <div className="bg-surface-secondary rounded-lg p-2.5 text-center">
                      <div className="text-lg font-bold text-text-primary">{branch.facultyCount}</div>
                      <div className="text-[10px] text-text-tertiary">Faculty</div>
                    </div>
                    <div className="bg-surface-secondary rounded-lg p-2.5 text-center">
                      <div className="text-lg font-bold text-text-primary">₹{formatNumber(branch.revenue)}</div>
                      <div className="text-[10px] text-text-tertiary">Revenue</div>
                    </div>
                    <div className="bg-surface-secondary rounded-lg p-2.5 text-center">
                      <div className="text-lg font-bold text-text-primary">{branch.batchCount}</div>
                      <div className="text-[10px] text-text-tertiary">Batches</div>
                    </div>
                  </div>

                  {/* Collection Ratio */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-secondary">Collection Ratio</span>
                      <span className={cn(
                        "font-semibold",
                        branch.collectionRatio >= 90 ? "text-emerald-600" : branch.collectionRatio >= 85 ? "text-amber-600" : "text-red-600"
                      )}>
                        {branch.collectionRatio}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          branch.collectionRatio >= 90 ? "bg-emerald-500" : branch.collectionRatio >= 85 ? "bg-amber-500" : "bg-red-500"
                        )}
                        style={{ width: `${branch.collectionRatio}%` }}
                      />
                    </div>
                  </div>

                  {/* Enrollment Rate */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-secondary">Enrollment Rate</span>
                      <span className={cn(
                        "font-semibold",
                        branch.enrollmentRate >= 85 ? "text-emerald-600" : branch.enrollmentRate >= 75 ? "text-amber-600" : "text-red-600"
                      )}>
                        {branch.enrollmentRate}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          branch.enrollmentRate >= 85 ? "bg-blue-500" : branch.enrollmentRate >= 75 ? "bg-amber-500" : "bg-red-500"
                        )}
                        style={{ width: `${branch.enrollmentRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Manager & Contact */}
                  <div className="flex items-center justify-between pt-3 border-t border-border-light">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Users className="h-3.5 w-3.5" />
                      <span>{branch.manager}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-tertiary">
                      <Phone className="h-3 w-3" />
                      <span>{branch.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Branch Comparison Table */}
        {tableData.loading ? (
          <TableSkeleton rows={5} columns={8} />
        ) : (
          <div className="card overflow-hidden p-0">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-base font-semibold text-text-primary">Branch Comparison — All KPIs</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border">
                    <th className="text-left px-4 py-2.5 font-medium text-text-secondary text-xs">Branch</th>
                    <th className="text-left px-4 py-2.5 font-medium text-text-secondary text-xs">City</th>
                    <th className="text-left px-4 py-2.5 font-medium text-text-secondary text-xs">Manager</th>
                    <th className="text-right px-4 py-2.5 font-medium text-text-secondary text-xs">Students</th>
                    <th className="text-right px-4 py-2.5 font-medium text-text-secondary text-xs">Faculty</th>
                    <th className="text-right px-4 py-2.5 font-medium text-text-secondary text-xs">Batches</th>
                    <th className="text-right px-4 py-2.5 font-medium text-text-secondary text-xs">Revenue</th>
                    <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Collection %</th>
                    <th className="text-center px-4 py-2.5 font-medium text-text-secondary text-xs">Enrollment %</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.data?.map((branch) => (
                    <tr key={branch.id} className="border-b border-border-light hover:bg-surface-secondary/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-text-primary text-xs">{branch.name}</td>
                      <td className="px-4 py-3 text-text-secondary text-xs">{branch.city}</td>
                      <td className="px-4 py-3 text-text-secondary text-xs">{branch.manager}</td>
                      <td className="px-4 py-3 text-right text-xs font-medium">{branch.studentCount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-xs">{branch.facultyCount}</td>
                      <td className="px-4 py-3 text-right text-xs">{branch.batchCount}</td>
                      <td className="px-4 py-3 text-right text-xs font-medium">₹{formatNumber(branch.revenue)}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-2 w-12 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                branch.collectionRatio >= 90 ? "bg-emerald-500" : branch.collectionRatio >= 85 ? "bg-amber-500" : "bg-red-500"
                              )}
                              style={{ width: `${branch.collectionRatio}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{branch.collectionRatio}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-2 w-12 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
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
                <tfoot>
                  <tr className="bg-surface-secondary border-t border-border font-semibold">
                    <td className="px-4 py-3 text-xs">Total</td>
                    <td className="px-4 py-3 text-xs text-text-tertiary">{branches.length} cities</td>
                    <td className="px-4 py-3 text-xs text-text-tertiary">{branches.length} managers</td>
                    <td className="px-4 py-3 text-right text-xs">{totalStudents.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-xs">{totalFaculty}</td>
                    <td className="px-4 py-3 text-right text-xs">{branches.reduce((s, b) => s + b.batchCount, 0)}</td>
                    <td className="px-4 py-3 text-right text-xs">₹{formatNumber(totalRevenue)}</td>
                    <td className="px-4 py-3 text-center text-xs">{avgCollection}%</td>
                    <td className="px-4 py-3 text-center text-xs">{(branches.reduce((s, b) => s + b.enrollmentRate, 0) / branches.length).toFixed(1)}%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
