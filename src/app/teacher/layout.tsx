import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Teacher Panel",
  robots: { index: false, follow: false },
};

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <Sidebar
        role="teacher"
        userName="Dr. Anil Verma"
        userAvatar="https://picsum.photos/seed/dr-anil-verma/200/200"
      />
      <main className="md:ml-64 min-h-screen transition-all duration-300 pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}
