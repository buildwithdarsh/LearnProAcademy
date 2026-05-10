"use client";

import { useState, useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Skeleton, CardSkeleton, ListSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection } from "@/hooks/useAsyncData";
import { parentChildData } from "@/lib/mock-data";
import {
  Calendar, Clock, Users, Video, MapPin, CheckCircle2,
  MessageSquare, Plus, ChevronRight,
} from "lucide-react";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface PastPTM {
  id: string;
  date: string;
  faculty: string;
  summary: string;
  remarks: string;
}

const availableSlots: TimeSlot[] = [
  { id: "slot-1", time: "9:00 AM — 9:30 AM", available: true },
  { id: "slot-2", time: "9:30 AM — 10:00 AM", available: false },
  { id: "slot-3", time: "10:00 AM — 10:30 AM", available: true },
  { id: "slot-4", time: "10:30 AM — 11:00 AM", available: true },
  { id: "slot-5", time: "11:00 AM — 11:30 AM", available: true },
];

const pastPTMs: PastPTM[] = [
  {
    id: "ptm-1",
    date: "2026-02-15",
    faculty: "Dr. Anil Verma",
    summary: "Discussed overall progress in Physics. Arjun is performing well in Mechanics but needs improvement in Electrostatics. Recommended extra practice sets for weak areas.",
    remarks: "Focus on HC Verma problems for Electrostatics. Increase daily practice to 2 hours for Physics.",
  },
  {
    id: "ptm-2",
    date: "2026-01-10",
    faculty: "Prof. Sunita Rao",
    summary: "Chemistry performance review. Good grasp of Organic Chemistry but Physical Chemistry needs more attention. Attendance has been consistent.",
    remarks: "Refer to N. Awasthi for Physical Chemistry numericals. Continue maintaining good attendance.",
  },
  {
    id: "ptm-3",
    date: "2025-12-08",
    faculty: "Dr. Anil Verma",
    summary: "Mid-term review. Overall performance is above average. Arjun is among the top 30 students in the batch. Time management in mock tests needs improvement.",
    remarks: "Practice timed mock tests at home on weekends. Consider joining the weekend problem-solving workshop.",
  },
];

export default function ParentPTMPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const { data: ptm, loading: ptmLoading } = useAsyncData(
    useCallback(() => parentChildData.upcomingPTM, []),
    700
  );

  const { data: slots, loading: slotsLoading } = useLazySection(
    useCallback(() => availableSlots, []),
    500
  );

  const { data: pastData, loading: pastLoading } = useLazySection(
    useCallback(() => pastPTMs, []),
    900
  );

  return (
    <>
      <TopBar title="PTM Schedule" subtitle="Parent-teacher meetings and communication" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Upcoming PTM */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-600" /> Upcoming PTM
              </h3>
              {ptmLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-10 w-40 rounded-lg" />
                </div>
              ) : ptm && (
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <Calendar className="h-6 w-6 text-blue-700" />
                        </div>
                        <div>
                          <div className="text-sm text-text-secondary">Date</div>
                          <div className="font-bold text-lg">
                            {new Date(ptm.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <Clock className="h-6 w-6 text-blue-700" />
                        </div>
                        <div>
                          <div className="text-sm text-text-secondary">Time</div>
                          <div className="font-bold text-lg">{ptm.time}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <Users className="h-6 w-6 text-blue-700" />
                        </div>
                        <div>
                          <div className="text-sm text-text-secondary">Faculty</div>
                          <div className="font-bold text-lg">{ptm.faculty}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          {(ptm.mode as string) === "Online" ? (
                            <Video className="h-6 w-6 text-blue-700" />
                          ) : (
                            <MapPin className="h-6 w-6 text-blue-700" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm text-text-secondary">Mode</div>
                          <div className="font-bold text-lg flex items-center gap-2">
                            {ptm.mode}
                            {ptm.mode === "Offline" && (
                              <span className="text-xs text-text-tertiary font-normal">— Kota, Talwandi Campus</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn-primary mt-6">
                    <CheckCircle2 className="h-4 w-4 inline mr-2" />
                    Confirm Attendance
                  </button>
                </div>
              )}
            </div>

            {/* Past PTMs */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-amber-600" /> Past PTMs
              </h3>
              {pastLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2 p-4 bg-surface-secondary rounded-lg">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  ))}
                </div>
              ) : pastData && (
                <div className="space-y-4">
                  {pastData.map((ptm) => (
                    <div key={ptm.id} className="p-4 bg-surface-secondary rounded-xl border border-border-light">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-text-tertiary" />
                          <span className="text-sm font-semibold">
                            {new Date(ptm.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                        </div>
                        <span className="text-xs text-text-secondary">with {ptm.faculty}</span>
                      </div>
                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Summary</h4>
                        <p className="text-sm text-text-secondary">{ptm.summary}</p>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Remarks &amp; Action Items</h4>
                        <p className="text-sm text-amber-800">{ptm.remarks}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Book PTM Slot */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-600" /> Book PTM Slot
              </h3>
              <p className="text-xs text-text-secondary mb-4">
                Select an available slot for April 12, 2026
              </p>
              {slotsLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-lg" />
                  ))}
                </div>
              ) : slots && (
                <div className="space-y-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedSlot(slot.id)}
                      disabled={!slot.available}
                      className={`w-full p-3 rounded-lg border text-sm font-medium transition-all text-left flex items-center justify-between ${
                        selectedSlot === slot.id
                          ? "bg-amber-50 border-amber-400 text-amber-800"
                          : slot.available
                          ? "bg-white border-border-light hover:border-amber-300 text-text-primary"
                          : "bg-gray-50 border-border-light text-text-tertiary cursor-not-allowed"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        {slot.time}
                      </span>
                      {selectedSlot === slot.id && <CheckCircle2 className="h-4 w-4 text-amber-600" />}
                      {!slot.available && <span className="text-[10px] text-text-tertiary">Booked</span>}
                    </button>
                  ))}
                  <button
                    className="btn-primary w-full mt-3"
                    disabled={!selectedSlot}
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </div>

            {/* Request Additional Meeting */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Plus className="h-4 w-4 text-amber-600" /> Request Additional Meeting
              </h3>
              {!showRequestForm ? (
                <div className="text-center py-4">
                  <p className="text-sm text-text-secondary mb-3">
                    Need to discuss something specific? Request an additional meeting with the faculty.
                  </p>
                  <button
                    onClick={() => setShowRequestForm(true)}
                    className="btn-secondary flex items-center gap-2 mx-auto"
                  >
                    <Plus className="h-4 w-4" /> Request Meeting
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-text-secondary block mb-1">Faculty</label>
                    <select className="select w-full">
                      <option>Dr. Anil Verma (Physics)</option>
                      <option>Prof. Sunita Rao (Chemistry)</option>
                      <option>Dr. R.K. Sharma (Mathematics)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary block mb-1">Preferred Date</label>
                    <input type="date" className="input w-full" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary block mb-1">Mode</label>
                    <select className="select w-full">
                      <option>Online (Video Call)</option>
                      <option>Offline (In-Person)</option>
                      <option>Phone Call</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary block mb-1">Reason / Topic</label>
                    <textarea
                      className="input w-full h-20 resize-none"
                      placeholder="Briefly describe what you'd like to discuss..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-primary flex-1">Submit Request</button>
                    <button onClick={() => setShowRequestForm(false)} className="btn-secondary">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
