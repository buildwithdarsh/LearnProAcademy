import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Parent Dashboard",
  robots: { index: false, follow: false },
};

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <Sidebar
        role="parent"
        userName="Rajesh Mehta"
        userAvatar="https://picsum.photos/seed/rajesh-mehta/200/200"
      />
      <main className="md:ml-64 min-h-screen transition-all duration-300 pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}
