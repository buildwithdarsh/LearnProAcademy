import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Institute Dashboard",
  robots: { index: false, follow: false },
};

export default function InstituteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <Sidebar role="institute" userName="Vikram Agarwal" />
      <main className="md:ml-64 min-h-screen transition-all duration-300 pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}
