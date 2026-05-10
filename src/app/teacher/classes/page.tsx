"use client";

import { useState, useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Skeleton, CardSkeleton, ListSkeleton } from "@/components/ui/Skeleton";
import { useAsyncData, useLazySection } from "@/hooks/useAsyncData";
import { teacherSchedule } from "@/lib/mock-data";
import {
  Video, Play, Pause, Square, Mic, MicOff, MonitorUp, MonitorOff,
  Pen, Shapes, Type, Eraser, ImageIcon, Hand, MessageCircle,
  Trash2, AlertTriangle, Send, Plus, Clock, Users, Circle,
  BarChart3, CheckCircle2,
} from "lucide-react";

interface ChatMessage {
  id: string;
  studentName: string;
  studentAvatar: string;
  message: string;
  time: string;
  flagged: boolean;
}

interface HandRaise {
  id: string;
  studentName: string;
  studentAvatar: string;
  time: string;
}

const chatMessages: ChatMessage[] = [
  { id: "c-1", studentName: "Arjun Mehta", studentAvatar: "https://picsum.photos/seed/arjun-m/200/200", message: "Sir, can you repeat the derivation for angular momentum conservation?", time: "10:32 AM", flagged: false },
  { id: "c-2", studentName: "Priya Sharma", studentAvatar: "https://picsum.photos/seed/priya-sh/200/200", message: "Is this formula valid for non-inertial frames too?", time: "10:33 AM", flagged: false },
  { id: "c-3", studentName: "Rohit Gupta", studentAvatar: "https://picsum.photos/seed/rohit-g/200/200", message: "Thank you sir, very clear explanation!", time: "10:34 AM", flagged: false },
  { id: "c-4", studentName: "Vikram Reddy", studentAvatar: "https://picsum.photos/seed/vikram-r/200/200", message: "Sir please solve one more numerical on this topic", time: "10:35 AM", flagged: false },
  { id: "c-5", studentName: "Ananya Patel", studentAvatar: "https://picsum.photos/seed/ananya-p/200/200", message: "Can we get the PDF of these notes?", time: "10:36 AM", flagged: false },
];

const handRaises: HandRaise[] = [
  { id: "h-1", studentName: "Meera Krishnan", studentAvatar: "https://picsum.photos/seed/meera-k/200/200", time: "10:34 AM" },
  { id: "h-2", studentName: "Arjun Mehta", studentAvatar: "https://picsum.photos/seed/arjun-m/200/200", time: "10:35 AM" },
  { id: "h-3", studentName: "Siddharth Nair", studentAvatar: "https://picsum.photos/seed/siddharth-n/200/200", time: "10:36 AM" },
];

export default function TeacherClassesPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", "", "", ""]);
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizOptions, setQuizOptions] = useState(["", "", "", ""]);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [messages, setMessages] = useState(chatMessages);
  const [raises, setRaises] = useState(handRaises);

  const { data: todayClasses, loading: classesLoading } = useAsyncData(
    useCallback(() => teacherSchedule.filter((s) => s.type === "Live Class" || s.type === "Doubt Session"), []),
    700
  );

  const { data: chatData, loading: chatLoading } = useLazySection(
    useCallback(() => true, []),
    500
  );

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const statusColor: Record<string, string> = {
    Completed: "badge-success",
    Live: "badge-danger",
    Upcoming: "badge-warning",
  };

  return (
    <>
      <TopBar title="Live Class Tools" subtitle="Prepare and manage your live classes" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Today's Live Classes */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Video className="h-5 w-5 text-emerald-600" /> Today&apos;s Classes
          </h3>
          {classesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : todayClasses && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {todayClasses.map((cls) => (
                <div
                  key={cls.id}
                  className={`p-4 rounded-xl border transition-all ${
                    cls.status === "Live"
                      ? "border-green-300 bg-green-50 shadow-sm shadow-green-100"
                      : "border-border-light bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`badge ${statusColor[cls.status]}`}>{cls.status}</span>
                    {cls.status === "Live" && (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-sm mb-1 line-clamp-2">{cls.title}</h4>
                  <div className="text-xs text-text-secondary space-y-1">
                    <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {cls.time} &middot; {cls.duration}</div>
                    <div className="flex items-center gap-1"><Users className="h-3 w-3" /> {cls.batch}</div>
                    <div>{cls.room}</div>
                  </div>
                  {cls.status === "Live" && (
                    <button className="btn-primary w-full text-xs mt-3 flex items-center justify-center gap-1">
                      <Play className="h-3 w-3" /> Join Class
                    </button>
                  )}
                  {cls.status === "Upcoming" && (
                    <button className="btn-secondary w-full text-xs mt-3">Prepare</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column — Main Tools */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Whiteboard Preview */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Pen className="h-4 w-4 text-emerald-600" /> Whiteboard
              </h3>
              <div className="border-2 border-dashed border-border rounded-xl bg-white min-h-[280px] relative">
                {/* Toolbar */}
                <div className="absolute top-3 left-3 flex gap-1.5 bg-white rounded-lg shadow-md border border-border p-1.5">
                  <button className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors" title="Pen">
                    <Pen className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-surface-secondary transition-colors" title="Shapes">
                    <Shapes className="h-4 w-4 text-text-secondary" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-surface-secondary transition-colors" title="Text">
                    <Type className="h-4 w-4 text-text-secondary" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-surface-secondary transition-colors" title="Eraser">
                    <Eraser className="h-4 w-4 text-text-secondary" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-surface-secondary transition-colors" title="Insert Image">
                    <ImageIcon className="h-4 w-4 text-text-secondary" />
                  </button>
                  <div className="w-px bg-border mx-1" />
                  <div className="flex gap-1 items-center">
                    <button className="h-5 w-5 rounded-full bg-black border-2 border-white shadow" />
                    <button className="h-5 w-5 rounded-full bg-red-500 border-2 border-white shadow" />
                    <button className="h-5 w-5 rounded-full bg-blue-500 border-2 border-white shadow" />
                    <button className="h-5 w-5 rounded-full bg-green-500 border-2 border-white shadow" />
                  </div>
                </div>
                <div className="flex items-center justify-center h-[280px] text-text-tertiary text-sm">
                  Whiteboard canvas area — draw, annotate, and explain concepts
                </div>
              </div>
            </div>

            {/* Controls Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Screen Sharing */}
              <div className="card text-center">
                <h4 className="text-sm font-semibold mb-3">Screen Sharing</h4>
                <button
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={`p-4 rounded-xl transition-all mx-auto flex items-center justify-center ${
                    isScreenSharing ? "bg-emerald-600 text-white" : "bg-surface-secondary text-text-secondary hover:bg-gray-200"
                  }`}
                >
                  {isScreenSharing ? <MonitorUp className="h-6 w-6" /> : <MonitorOff className="h-6 w-6" />}
                </button>
                <p className="text-xs text-text-tertiary mt-2">
                  {isScreenSharing ? "Sharing Active" : "Not Sharing"}
                </p>
              </div>

              {/* Mic Control */}
              <div className="card text-center">
                <h4 className="text-sm font-semibold mb-3">Microphone</h4>
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-4 rounded-xl transition-all mx-auto flex items-center justify-center ${
                    isMicOn ? "bg-emerald-600 text-white" : "bg-red-100 text-red-600"
                  }`}
                >
                  {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                </button>
                <p className="text-xs text-text-tertiary mt-2">
                  {isMicOn ? "Mic On" : "Mic Muted"}
                </p>
              </div>

              {/* Recording */}
              <div className="card text-center">
                <h4 className="text-sm font-semibold mb-3">Recording</h4>
                <div className="flex items-center justify-center gap-2">
                  {!isRecording ? (
                    <button
                      onClick={() => setIsRecording(true)}
                      className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      title="Start Recording"
                    >
                      <Circle className="h-5 w-5 fill-red-500" />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="p-3 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                        title={isPaused ? "Resume" : "Pause"}
                      >
                        {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => { setIsRecording(false); setIsPaused(false); setRecordingTime(0); }}
                        className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Stop"
                      >
                        <Square className="h-5 w-5 fill-red-500" />
                      </button>
                    </>
                  )}
                </div>
                <p className="text-xs mt-2 font-mono">
                  {isRecording ? (
                    <span className="text-red-600 flex items-center justify-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      {isPaused ? "PAUSED" : "REC"} {formatTime(recordingTime)}
                    </span>
                  ) : (
                    <span className="text-text-tertiary">Not recording</span>
                  )}
                </p>
              </div>
            </div>

            {/* Live Poll Creator */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-emerald-600" /> Live Poll Creator
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-text-secondary block mb-1">Poll Question</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="e.g., Which concept was hardest to understand?"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {pollOptions.map((opt, i) => (
                    <div key={i}>
                      <label className="text-xs font-medium text-text-tertiary block mb-1">Option {String.fromCharCode(65 + i)}</label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        value={opt}
                        onChange={(e) => {
                          const next = [...pollOptions];
                          next[i] = e.target.value;
                          setPollOptions(next);
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button className="btn-primary flex items-center gap-2">
                  <Send className="h-4 w-4" /> Launch Poll
                </button>
              </div>
            </div>

            {/* Quiz Pop-up Creator */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Quick Quiz Creator
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-text-secondary block mb-1">Question</label>
                  <textarea
                    className="input w-full h-20 resize-none"
                    placeholder="Enter the MCQ question..."
                    value={quizQuestion}
                    onChange={(e) => setQuizQuestion(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {quizOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correct"
                        checked={quizCorrect === i}
                        onChange={() => setQuizCorrect(i)}
                        className="h-4 w-4 text-emerald-600"
                      />
                      <input
                        type="text"
                        className="input flex-1"
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        value={opt}
                        onChange={(e) => {
                          const next = [...quizOptions];
                          next[i] = e.target.value;
                          setQuizOptions(next);
                        }}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-tertiary">Select the radio button next to the correct answer</p>
                <button className="btn-primary flex items-center gap-2">
                  <Send className="h-4 w-4" /> Pop Quiz to Students
                </button>
              </div>
            </div>
          </div>

          {/* Right Column — Chat & Hands */}
          <div className="space-y-4 md:space-y-6">
            {/* Hand Raise Queue */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Hand className="h-4 w-4 text-amber-500" /> Hand Raise Queue
                <span className="badge badge-warning ml-auto">{raises.length}</span>
              </h3>
              {chatLoading ? (
                <ListSkeleton items={3} />
              ) : (
                <div className="space-y-2">
                  {raises.length === 0 ? (
                    <p className="text-sm text-text-tertiary text-center py-4">No hands raised</p>
                  ) : (
                    raises.map((h, idx) => (
                      <div key={h.id} className={`flex items-center gap-3 p-2.5 rounded-lg ${
                        idx === 0 ? "bg-amber-50 border border-amber-200" : "bg-surface-secondary"
                      }`}>
                        <img src={h.studentAvatar} alt={h.studentName} className="h-8 w-8 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{h.studentName}</div>
                          <div className="text-[10px] text-text-tertiary">{h.time}</div>
                        </div>
                        <button
                          onClick={() => setRaises((prev) => prev.filter((r) => r.id !== h.id))}
                          className="btn-secondary text-[10px] px-2 py-1"
                        >
                          Dismiss
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Chat Moderation */}
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-blue-500" /> Live Chat
              </h3>
              {chatLoading ? (
                <ListSkeleton items={5} />
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2.5 rounded-lg ${
                        msg.flagged ? "bg-red-50 border border-red-200" : "bg-surface-secondary"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <img src={msg.studentAvatar} alt={msg.studentName} className="h-6 w-6 rounded-full object-cover mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold">{msg.studentName}</span>
                            <span className="text-[10px] text-text-tertiary">{msg.time}</span>
                          </div>
                          <p className="text-xs text-text-secondary mt-0.5">{msg.message}</p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button
                            onClick={() => {
                              setMessages((prev) =>
                                prev.map((m) => m.id === msg.id ? { ...m, flagged: !m.flagged } : m)
                              );
                            }}
                            className="p-1 rounded hover:bg-amber-100 transition-colors"
                            title="Flag message"
                          >
                            <AlertTriangle className={`h-3 w-3 ${msg.flagged ? "text-amber-600" : "text-text-tertiary"}`} />
                          </button>
                          <button
                            onClick={() => {
                              setMessages((prev) => prev.filter((m) => m.id !== msg.id));
                            }}
                            className="p-1 rounded hover:bg-red-100 transition-colors"
                            title="Delete message"
                          >
                            <Trash2 className="h-3 w-3 text-text-tertiary" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
