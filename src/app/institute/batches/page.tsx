"use client";

import { useState, useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CardSkeleton, ChartSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection } from "@/hooks/useAsyncData";
import { courses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Layers, Plus, Users, Clock, Calendar, GraduationCap, AlertTriangle, X,
} from "lucide-react";

interface BatchItem {
  id: string;
  name: string;
  exam: string;
  timing: string;
  days: string;
  faculty: string[];
  seatsTotal: number;
  seatsFilled: number;
  startDate: string;
}

const allBatches: BatchItem[] = [
  ...courses[0].batchOptions.map((b) => ({ ...b, exam: courses[0].exam })),
  ...courses[1].batchOptions.map((b) => ({ ...b, exam: courses[1].exam })),
  ...courses[2].batchOptions.map((b) => ({ ...b, exam: courses[2].exam })),
  ...courses[3].batchOptions.map((b) => ({ ...b, exam: courses[3].exam })),
  ...courses[4].batchOptions.map((b) => ({ ...b, exam: courses[4].exam })),
  {
    id: "b-extra-1", name: "JEE Advanced — Weekend Intensive", exam: "JEE Advanced",
    timing: "9:00 AM – 4:00 PM", days: "Sat–Sun", faculty: ["Dr. Anil Verma", "Prof. Kunal Shah"],
    seatsTotal: 40, seatsFilled: 35, startDate: "2026-04-12",
  },
  {
    id: "b-extra-2", name: "NEET Crash Course — Evening", exam: "NEET UG",
    timing: "5:00 PM – 9:00 PM", days: "Mon–Sat", faculty: ["Dr. Priya Sharma"],
    seatsTotal: 50, seatsFilled: 22, startDate: "2026-04-08",
  },
  {
    id: "b-extra-3", name: "Foundation Batch — Class 9", exam: "CBSE Board",
    timing: "3:30 PM – 6:00 PM", days: "Mon–Fri", faculty: ["Mrs. Anita Desai"],
    seatsTotal: 25, seatsFilled: 25, startDate: "2026-04-01",
  },
];

const timetableSlots = [
  { time: "6:30–8:00", mon: "Physics (Hall A)", tue: "Chemistry (Hall A)", wed: "Physics (Hall A)", thu: "Maths (Hall B)", fri: "Physics (Hall A)", sat: "Mock Test" },
  { time: "8:15–9:30", mon: "Chemistry (Hall A)", tue: "Maths (Hall B)", wed: "Chemistry (Hall A)", thu: "Physics (Hall A)", fri: "Chemistry (Hall A)", sat: "Mock Test" },
  { time: "10:00–11:30", mon: "Maths (Hall B)", tue: "Physics (Hall A)", wed: "Maths (Hall B)", thu: "Chemistry (Hall A)", fri: "Doubt Session", sat: "Review" },
  { time: "11:45–1:00", mon: "DPP Session", tue: "DPP Session", wed: "DPP Session", thu: "DPP Session", fri: "DPP Session", sat: "" },
  { time: "2:00–3:30", mon: "Physics (Eve)", tue: "Chemistry (Eve)", wed: "Physics (Eve)", thu: "Maths (Eve)", fri: "Physics (Eve)", sat: "" },
  { time: "4:00–5:30", mon: "Chemistry (Eve)", tue: "Maths (Eve)", wed: "Chemistry (Eve)", thu: "Physics (Eve)", fri: "Doubt (Eve)", sat: "" },
];

const slotColors: Record<string, string> = {
  Physics: "bg-blue-100 text-blue-700 border-blue-200",
  Chemistry: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Maths: "bg-violet-100 text-violet-700 border-violet-200",
  Mock: "bg-amber-100 text-amber-700 border-amber-200",
  DPP: "bg-rose-50 text-rose-600 border-rose-200",
  Doubt: "bg-sky-100 text-sky-700 border-sky-200",
  Review: "bg-gray-100 text-gray-600 border-gray-200",
};

function getSlotColor(text: string): string {
  for (const key of Object.keys(slotColors)) {
    if (text.includes(key)) return slotColors[key];
  }
  return "bg-gray-50 text-gray-500 border-gray-200";
}

export default function BatchesPage() {
  const batchData = useAsyncData(useCallback(() => allBatches, []), 1000);
  const timetableData = useLazySection(useCallback(() => timetableSlots, []), 1500);
  const [showModal, setShowModal] = useState(false);

  const totalSeats = allBatches.reduce((s, b) => s + b.seatsTotal, 0);
  const totalFilled = allBatches.reduce((s, b) => s + b.seatsFilled, 0);
  const hasConflict = true;

  return (
    <>
      <TopBar title="Batch & Scheduling" subtitle={`${allBatches.length} active batches across all programs`} />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header Stats */}
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary-600" />
              <div>
                <div className="text-xl font-bold">{allBatches.length}</div>
                <div className="text-xs text-text-secondary">Total Batches</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-600" />
              <div>
                <div className="text-xl font-bold">{totalFilled}/{totalSeats}</div>
                <div className="text-xs text-text-secondary">Seats Filled</div>
              </div>
            </div>
          </div>
          <button className="btn-primary flex items-center gap-2" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4" /> Create Batch
          </button>
        </div>

        {/* Batch Cards */}
        {batchData.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {batchData.data?.map((batch) => {
              const fillPct = (batch.seatsFilled / batch.seatsTotal) * 100;
              const available = batch.seatsTotal - batch.seatsFilled;
              const isFull = available === 0;
              return (
                <div key={batch.id} className={cn("card hover:shadow-md transition-shadow", isFull && "border-amber-200")}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-text-primary text-sm">{batch.name}</h3>
                      <span className="badge badge-primary text-[10px] mt-1">{batch.exam}</span>
                    </div>
                    {isFull && (
                      <span className="badge badge-danger text-[10px]">FULL</span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs text-text-secondary mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{batch.timing}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{batch.days} — Starts {batch.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-3.5 w-3.5" />
                      <span className="truncate">{batch.faculty.join(", ")}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Seats</span>
                      <span className="font-medium">
                        <span className="text-text-primary">{batch.seatsFilled}</span>
                        <span className="text-text-tertiary">/{batch.seatsTotal}</span>
                        <span className={cn(
                          "ml-2",
                          available > 10 ? "text-emerald-600" : available > 0 ? "text-amber-600" : "text-red-600"
                        )}>
                          ({available} left)
                        </span>
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          fillPct >= 95 ? "bg-red-500" : fillPct >= 80 ? "bg-amber-500" : "bg-emerald-500"
                        )}
                        style={{ width: `${fillPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Timetable Grid */}
        {timetableData.loading ? (
          <ChartSkeleton height="h-80" />
        ) : (
          <div className="card overflow-hidden p-0">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-base font-semibold text-text-primary">Weekly Timetable — Morning Batch (Kota)</h2>
              {hasConflict && (
                <div className="flex items-center gap-1.5 text-amber-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-medium">1 scheduling conflict detected (Thu 2:00 PM — Hall B overlap)</span>
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border">
                    <th className="px-3 py-2.5 text-left font-medium text-text-secondary w-24">Time</th>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <th key={day} className="px-3 py-2.5 text-left font-medium text-text-secondary">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetableData.data?.map((slot, idx) => (
                    <tr key={idx} className="border-b border-border-light">
                      <td className="px-3 py-2 font-medium text-text-secondary whitespace-nowrap">{slot.time}</td>
                      {[slot.mon, slot.tue, slot.wed, slot.thu, slot.fri, slot.sat].map((cell, ci) => (
                        <td key={ci} className="px-2 py-2">
                          {cell ? (
                            <div className={cn("px-2 py-1.5 rounded-md border text-[11px] font-medium", getSlotColor(cell))}>
                              {cell}
                            </div>
                          ) : (
                            <div className="text-text-tertiary text-center">—</div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Create Batch Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold">Create New Batch</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-surface-secondary rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-text-secondary block mb-1">Batch Name</label>
                <input className="input w-full" placeholder="e.g., JEE Advanced — Morning Batch 2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary block mb-1">Exam</label>
                  <select className="select w-full">
                    <option>JEE Advanced</option>
                    <option>JEE Main</option>
                    <option>NEET UG</option>
                    <option>UPSC CSE</option>
                    <option>CBSE Board</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary block mb-1">Total Seats</label>
                  <input className="input w-full" type="number" placeholder="60" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary block mb-1">Timing</label>
                  <input className="input w-full" placeholder="6:30 AM – 12:30 PM" />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary block mb-1">Days</label>
                  <input className="input w-full" placeholder="Mon–Sat" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary block mb-1">Start Date</label>
                <input className="input w-full" type="date" />
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary block mb-1">Faculty</label>
                <input className="input w-full" placeholder="Dr. Anil Verma, Prof. Sneha Iyer" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>Create Batch</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
