"use client";

import { useState, useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Skeleton, CardSkeleton, TableSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection } from "@/hooks/useAsyncData";
import {
  FileText, Upload, BookOpen, ClipboardList, Database, CheckSquare,
  Download, Eye, Plus, BarChart3, ChevronRight, File, Video,
  Image as ImageIcon, FileSpreadsheet,
} from "lucide-react";

interface MaterialItem {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  type: "PDF Notes" | "Video" | "Formula Sheet" | "DPP" | "Mind Map";
  batch: string;
  uploadDate: string;
  downloads: number;
  size: string;
}

interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  dueDate: string;
  submissionCount: number;
  totalStudents: number;
  gradedCount: number;
  avgMarks: number;
  maxMarks: number;
}

interface TestPaper {
  id: string;
  name: string;
  type: string;
  date: string;
  questionCount: number;
  batch: string;
  resultsStatus: "Published" | "Pending" | "Grading";
}

interface QuestionBankStats {
  total: number;
  bySubject: { subject: string; count: number }[];
  byDifficulty: { level: string; count: number; color: string }[];
}

interface SyllabusItem {
  id: string;
  subject: string;
  chapter: string;
  covered: boolean;
}

const materials: MaterialItem[] = [
  { id: "m-1", title: "Rotational Motion — Complete Notes", subject: "Physics", chapter: "Rotational Motion", type: "PDF Notes", batch: "JEE Adv — Morning", uploadDate: "2026-03-25", downloads: 142, size: "4.2 MB" },
  { id: "m-2", title: "Electrostatics Formula Sheet", subject: "Physics", chapter: "Electrostatics", type: "Formula Sheet", batch: "All Batches", uploadDate: "2026-03-22", downloads: 236, size: "1.1 MB" },
  { id: "m-3", title: "Waves — Standing Waves Video Lecture", subject: "Physics", chapter: "Waves", type: "Video", batch: "JEE Adv — Evening", uploadDate: "2026-03-20", downloads: 89, size: "320 MB" },
  { id: "m-4", title: "DPP #12 — Mechanics Problems", subject: "Physics", chapter: "Mechanics", type: "DPP", batch: "JEE Adv — Morning", uploadDate: "2026-03-18", downloads: 178, size: "2.8 MB" },
  { id: "m-5", title: "Modern Physics Mind Map", subject: "Physics", chapter: "Modern Physics", type: "Mind Map", batch: "All Batches", uploadDate: "2026-03-15", downloads: 305, size: "800 KB" },
  { id: "m-6", title: "Optics — Ray Optics Notes", subject: "Physics", chapter: "Optics", type: "PDF Notes", batch: "JEE Main — Online", uploadDate: "2026-03-12", downloads: 164, size: "3.6 MB" },
];

const assignments: AssignmentItem[] = [
  { id: "a-1", title: "Rotational Motion — Problem Set", subject: "Physics", chapter: "Rotational Motion", dueDate: "2026-03-30", submissionCount: 42, totalStudents: 58, gradedCount: 28, avgMarks: 34, maxMarks: 50 },
  { id: "a-2", title: "Electrostatics DPP #8", subject: "Physics", chapter: "Electrostatics", dueDate: "2026-03-27", submissionCount: 55, totalStudents: 58, gradedCount: 55, avgMarks: 38, maxMarks: 50 },
  { id: "a-3", title: "Waves Numerical Assignment", subject: "Physics", chapter: "Waves", dueDate: "2026-04-02", submissionCount: 12, totalStudents: 45, gradedCount: 0, avgMarks: 0, maxMarks: 40 },
  { id: "a-4", title: "Mechanics — Constraint Motion Problems", subject: "Physics", chapter: "Mechanics", dueDate: "2026-03-24", submissionCount: 57, totalStudents: 58, gradedCount: 57, avgMarks: 42, maxMarks: 60 },
];

const testPapers: TestPaper[] = [
  { id: "t-1", name: "Rotational Motion Chapter Test", type: "Chapter Test", date: "2026-03-26", questionCount: 30, batch: "JEE Adv — Morning", resultsStatus: "Published" },
  { id: "t-2", name: "Physics Weekly Test #12", type: "Weekly Test", date: "2026-03-23", questionCount: 25, batch: "JEE Adv — Morning", resultsStatus: "Published" },
  { id: "t-3", name: "Electrostatics + Magnetism", type: "Chapter Test", date: "2026-03-29", questionCount: 35, batch: "JEE Main — Online", resultsStatus: "Pending" },
  { id: "t-4", name: "Full Mock — Physics Section", type: "Monthly Mock", date: "2026-04-01", questionCount: 30, batch: "All Batches", resultsStatus: "Pending" },
];

const questionBankStats: QuestionBankStats = {
  total: 1248,
  bySubject: [
    { subject: "Mechanics", count: 312 },
    { subject: "Electrostatics", count: 198 },
    { subject: "Magnetism", count: 156 },
    { subject: "Optics", count: 142 },
    { subject: "Waves", count: 178 },
    { subject: "Modern Physics", count: 124 },
    { subject: "Thermodynamics", count: 138 },
  ],
  byDifficulty: [
    { level: "Easy", count: 312, color: "bg-green-500" },
    { level: "Medium", count: 524, color: "bg-amber-500" },
    { level: "Hard", count: 298, color: "bg-red-500" },
    { level: "Advanced", count: 114, color: "bg-purple-500" },
  ],
};

const syllabusItems: SyllabusItem[] = [
  { id: "s-1", subject: "Physics", chapter: "Kinematics", covered: true },
  { id: "s-2", subject: "Physics", chapter: "Laws of Motion", covered: true },
  { id: "s-3", subject: "Physics", chapter: "Work, Energy & Power", covered: true },
  { id: "s-4", subject: "Physics", chapter: "Rotational Motion", covered: true },
  { id: "s-5", subject: "Physics", chapter: "Gravitation", covered: true },
  { id: "s-6", subject: "Physics", chapter: "Mechanical Properties", covered: true },
  { id: "s-7", subject: "Physics", chapter: "Thermodynamics", covered: true },
  { id: "s-8", subject: "Physics", chapter: "Waves", covered: false },
  { id: "s-9", subject: "Physics", chapter: "Electrostatics", covered: false },
  { id: "s-10", subject: "Physics", chapter: "Current Electricity", covered: false },
  { id: "s-11", subject: "Physics", chapter: "Magnetism", covered: false },
  { id: "s-12", subject: "Physics", chapter: "EMI & AC", covered: false },
  { id: "s-13", subject: "Physics", chapter: "Optics", covered: false },
  { id: "s-14", subject: "Physics", chapter: "Modern Physics", covered: false },
];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "PDF Notes": FileText,
  "Video": Video,
  "Formula Sheet": FileSpreadsheet,
  "DPP": ClipboardList,
  "Mind Map": ImageIcon,
};

const typeColors: Record<string, string> = {
  "PDF Notes": "bg-red-50 text-red-700",
  "Video": "bg-purple-50 text-purple-700",
  "Formula Sheet": "bg-blue-50 text-blue-700",
  "DPP": "bg-amber-50 text-amber-700",
  "Mind Map": "bg-teal-50 text-teal-700",
};

const resultsColors: Record<string, string> = {
  Published: "badge-success",
  Pending: "badge-warning",
  Grading: "badge-primary",
};

export default function TeacherContentPage() {
  const [activeTab, setActiveTab] = useState<"materials" | "assignments" | "tests" | "questionbank">("materials");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [syllabusState, setSyllabusState] = useState(syllabusItems);

  const { data: materialsData, loading: materialsLoading } = useAsyncData(
    useCallback(() => materials, []),
    800
  );

  const { data: assignmentsData, loading: assignmentsLoading } = useAsyncData(
    useCallback(() => assignments, []),
    800
  );

  const { data: testsData, loading: testsLoading } = useLazySection(
    useCallback(() => testPapers, []),
    700
  );

  const { data: qbData, loading: qbLoading } = useLazySection(
    useCallback(() => questionBankStats, []),
    600
  );

  const coveredCount = syllabusState.filter((s) => s.covered).length;
  const completionPct = Math.round((coveredCount / syllabusState.length) * 100);

  const tabs = [
    { key: "materials" as const, label: "Study Material", icon: BookOpen },
    { key: "assignments" as const, label: "Assignments", icon: ClipboardList },
    { key: "tests" as const, label: "Test Papers", icon: FileText },
    { key: "questionbank" as const, label: "Question Bank", icon: Database },
  ];

  return (
    <>
      <TopBar title="Content & Assessment" subtitle="Manage study materials, assignments, and tests" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-border p-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-emerald-600 text-white"
                    : "text-text-secondary hover:bg-surface-secondary"
                }`}
              >
                <Icon className="h-4 w-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Study Material Tab */}
        {activeTab === "materials" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Uploaded Materials</h3>
              <button onClick={() => setShowUploadForm(!showUploadForm)} className="btn-primary flex items-center gap-2">
                <Upload className="h-4 w-4" /> Upload Material
              </button>
            </div>

            {showUploadForm && (
              <div className="card border-2 border-dashed border-emerald-300 bg-emerald-50/50">
                <h4 className="font-semibold mb-4">Upload New Material</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary block mb-1">Title</label>
                    <input type="text" className="input w-full" placeholder="e.g., Thermodynamics Complete Notes" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary block mb-1">Subject</label>
                    <select className="select w-full">
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Mathematics</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary block mb-1">Chapter</label>
                    <input type="text" className="input w-full" placeholder="e.g., Thermodynamics" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary block mb-1">File Type</label>
                    <select className="select w-full">
                      <option>PDF Notes</option>
                      <option>Video</option>
                      <option>Formula Sheet</option>
                      <option>DPP</option>
                      <option>Mind Map</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary block mb-1">Batch</label>
                    <select className="select w-full">
                      <option>All Batches</option>
                      <option>JEE Adv — Morning</option>
                      <option>JEE Main — Online</option>
                      <option>JEE Adv — Evening</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary block mb-1">File</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-3 text-center cursor-pointer hover:border-emerald-400 transition-colors">
                      <File className="h-5 w-5 text-text-tertiary mx-auto mb-1" />
                      <span className="text-xs text-text-tertiary">Click to browse or drag and drop</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="btn-primary">Upload</button>
                  <button onClick={() => setShowUploadForm(false)} className="btn-secondary">Cancel</button>
                </div>
              </div>
            )}

            {materialsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : materialsData && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materialsData.map((item) => {
                  const Icon = typeIcons[item.type] || FileText;
                  return (
                    <div key={item.id} className="card hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg ${typeColors[item.type]}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] text-text-tertiary">{item.uploadDate}</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-1 line-clamp-2">{item.title}</h4>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="badge badge-primary">{item.chapter}</span>
                        <span className="badge">{item.batch}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-text-secondary">
                        <span className="flex items-center gap-1"><Download className="h-3 w-3" /> {item.downloads} downloads</span>
                        <span>{item.size}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === "assignments" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Created Assignments</h3>
              <button className="btn-primary flex items-center gap-2">
                <Plus className="h-4 w-4" /> Create Assignment
              </button>
            </div>

            {assignmentsLoading ? (
              <TableSkeleton rows={4} columns={6} />
            ) : assignmentsData && (
              <div className="space-y-3">
                {assignmentsData.map((item) => {
                  const submitPct = Math.round((item.submissionCount / item.totalStudents) * 100);
                  const gradePct = item.submissionCount > 0 ? Math.round((item.gradedCount / item.submissionCount) * 100) : 0;
                  return (
                    <div key={item.id} className="card hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="badge badge-primary">{item.subject}</span>
                            <span className="badge">{item.chapter}</span>
                            <span className="text-xs text-text-secondary">Due: {item.dueDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm shrink-0">
                          {/* Submissions */}
                          <div className="text-center">
                            <div className="font-bold text-emerald-700">{item.submissionCount}/{item.totalStudents}</div>
                            <div className="text-[10px] text-text-tertiary">submitted</div>
                          </div>

                          {/* Grading Progress */}
                          <div className="w-32">
                            <div className="flex justify-between text-[10px] text-text-secondary mb-1">
                              <span>Grading</span>
                              <span>{gradePct}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${gradePct}%` }} />
                            </div>
                          </div>

                          {/* Avg Marks */}
                          <div className="text-center">
                            <div className="font-bold">{item.avgMarks > 0 ? `${item.avgMarks}/${item.maxMarks}` : "—"}</div>
                            <div className="text-[10px] text-text-tertiary">avg marks</div>
                          </div>

                          <button className="btn-secondary text-xs flex items-center gap-1">
                            <Eye className="h-3 w-3" /> View
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Test Papers Tab */}
        {activeTab === "tests" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Test Papers</h3>
              <button className="btn-primary flex items-center gap-2">
                <Plus className="h-4 w-4" /> Create Test
              </button>
            </div>

            {testsLoading ? (
              <TableSkeleton rows={4} columns={6} />
            ) : testsData && (
              <div className="card overflow-hidden p-0">
                <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface-secondary">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary">Test Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary">Date</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-text-secondary">Questions</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary">Batch</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-text-secondary">Results</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-text-secondary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testsData.map((test) => (
                      <tr key={test.id} className="border-b border-border-light hover:bg-surface-secondary transition-colors">
                        <td className="px-4 py-3 text-sm font-medium">{test.name}</td>
                        <td className="px-4 py-3"><span className="badge">{test.type}</span></td>
                        <td className="px-4 py-3 text-sm text-text-secondary">{test.date}</td>
                        <td className="px-4 py-3 text-sm text-center font-medium">{test.questionCount}</td>
                        <td className="px-4 py-3 text-sm text-text-secondary">{test.batch}</td>
                        <td className="px-4 py-3 text-center"><span className={`badge ${resultsColors[test.resultsStatus]}`}>{test.resultsStatus}</span></td>
                        <td className="px-4 py-3 text-right">
                          <button className="btn-secondary text-xs">View <ChevronRight className="h-3 w-3 inline" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Question Bank Tab */}
        {activeTab === "questionbank" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Question Bank</h3>
              <button className="btn-primary flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Question
              </button>
            </div>

            {qbLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : qbData && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* By Subject */}
                  <div className="card">
                    <h4 className="font-semibold mb-4 flex items-center justify-between">
                      <span>Questions by Topic</span>
                      <span className="text-2xl font-bold text-emerald-700">{qbData.total}</span>
                    </h4>
                    <div className="space-y-3">
                      {qbData.bySubject.map((s) => (
                        <div key={s.subject} className="flex items-center gap-3">
                          <span className="text-sm text-text-secondary w-32 shrink-0">{s.subject}</span>
                          <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(s.count / qbData.total) * 100}%` }} />
                          </div>
                          <span className="text-sm font-medium w-10 text-right">{s.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* By Difficulty */}
                  <div className="card">
                    <h4 className="font-semibold mb-4">Questions by Difficulty</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {qbData.byDifficulty.map((d) => (
                        <div key={d.level} className="p-4 rounded-xl bg-surface-secondary text-center">
                          <div className={`h-3 w-3 rounded-full ${d.color} mx-auto mb-2`} />
                          <div className="text-xl font-bold">{d.count}</div>
                          <div className="text-xs text-text-secondary">{d.level}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Add Question Form */}
                <div className="card">
                  <h4 className="font-semibold mb-4">Add New Question</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-text-secondary block mb-1">Topic</label>
                      <select className="select w-full">
                        {qbData.bySubject.map((s) => <option key={s.subject}>{s.subject}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary block mb-1">Difficulty</label>
                      <select className="select w-full">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary block mb-1">Question Type</label>
                      <select className="select w-full">
                        <option>Single Correct MCQ</option>
                        <option>Multiple Correct MCQ</option>
                        <option>Integer Type</option>
                        <option>Assertion-Reason</option>
                        <option>Match the Column</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm font-medium text-text-secondary block mb-1">Question Text</label>
                    <textarea className="input w-full h-24 resize-none" placeholder="Enter the question text..." />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="text-sm font-medium text-text-secondary block mb-1">Option A</label>
                      <input type="text" className="input w-full" placeholder="Option A" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary block mb-1">Option B</label>
                      <input type="text" className="input w-full" placeholder="Option B" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary block mb-1">Option C</label>
                      <input type="text" className="input w-full" placeholder="Option C" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary block mb-1">Option D</label>
                      <input type="text" className="input w-full" placeholder="Option D" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-text-secondary block mb-1">Correct Answer</label>
                      <select className="select">
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary block mb-1">Marks</label>
                      <input type="number" className="input w-20" defaultValue={4} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary block mb-1">Negative Marks</label>
                      <input type="number" className="input w-20" defaultValue={1} />
                    </div>
                  </div>
                  <button className="btn-primary">Add to Question Bank</button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Curriculum Tracking - always visible at bottom */}
        <div className="card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-600 shrink-0" /> Curriculum Tracking — Physics
            </h3>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm text-text-secondary whitespace-nowrap">{coveredCount}/{syllabusState.length} chapters</span>
              <div className="w-24 sm:w-32 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${completionPct}%` }} />
              </div>
              <span className="text-sm font-bold text-emerald-700">{completionPct}%</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {syllabusState.map((item) => (
              <label
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  item.covered ? "bg-emerald-50 border border-emerald-200" : "bg-white border border-border-light hover:border-border"
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.covered}
                  onChange={() => {
                    setSyllabusState((prev) =>
                      prev.map((s) => s.id === item.id ? { ...s, covered: !s.covered } : s)
                    );
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <CheckSquare className={`h-4 w-4 ${item.covered ? "text-emerald-600" : "text-gray-300"}`} />
                <span className={`text-sm ${item.covered ? "text-emerald-800 font-medium" : "text-text-secondary"}`}>
                  {item.chapter}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
