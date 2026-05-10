"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Search, BookOpen, LayoutDashboard, FileText, BarChart3, MessageCircle,
  PlayCircle, FolderOpen, Calendar, CreditCard, Bell, User, Settings,
  Users, GraduationCap, Building2, DollarSign, UserPlus, GitBranch,
  ClipboardList, Layers, BookOpenCheck, PenTool, MessageSquare, Video,
  Briefcase, Home, Heart, CalendarDays, TrendingUp, ChevronLeft, ChevronRight, LogOut,
  Menu, X,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  mobileShow?: boolean; // show in bottom tab bar
}

interface SidebarProps {
  role: "student" | "institute" | "teacher" | "parent";
  instituteName?: string;
  userName?: string;
  userAvatar?: string;
}

const studentNav: NavItem[] = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard, mobileShow: true },
  { label: "Discover", href: "/student/discovery", icon: Search, mobileShow: true },
  { label: "Courses", href: "/student/courses", icon: BookOpen },
  { label: "Schedule", href: "/student/schedule", icon: Calendar, mobileShow: true },
  { label: "Lectures", href: "/student/lectures", icon: PlayCircle },
  { label: "Material", href: "/student/materials", icon: FolderOpen },
  { label: "Tests", href: "/student/tests", icon: FileText, mobileShow: true },
  { label: "Analytics", href: "/student/analytics", icon: BarChart3 },
  { label: "Doubts", href: "/student/doubts", icon: MessageCircle, badge: "1", mobileShow: true },
];

const instituteNav: NavItem[] = [
  { label: "Dashboard", href: "/institute/dashboard", icon: LayoutDashboard, mobileShow: true },
  { label: "Students", href: "/institute/students", icon: Users, mobileShow: true },
  { label: "Batches", href: "/institute/batches", icon: Layers },
  { label: "Faculty", href: "/institute/faculty", icon: GraduationCap },
  { label: "Courses", href: "/institute/courses", icon: BookOpen },
  { label: "Exams", href: "/institute/exams", icon: ClipboardList },
  { label: "Results", href: "/institute/results", icon: BarChart3 },
  { label: "Fees", href: "/institute/fees", icon: DollarSign, mobileShow: true },
  { label: "Leads", href: "/institute/leads", icon: UserPlus, badge: "3", mobileShow: true },
  { label: "Branches", href: "/institute/branches", icon: Building2, mobileShow: true },
];

const teacherNav: NavItem[] = [
  { label: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard, mobileShow: true },
  { label: "Schedule", href: "/teacher/schedule", icon: Calendar, mobileShow: true },
  { label: "Classes", href: "/teacher/classes", icon: Video, mobileShow: true },
  { label: "Content", href: "/teacher/content", icon: PenTool, mobileShow: true },
  { label: "Doubts", href: "/teacher/doubts", icon: MessageSquare, badge: "4", mobileShow: true },
];

const parentNav: NavItem[] = [
  { label: "Dashboard", href: "/parent/dashboard", icon: Home, mobileShow: true },
  { label: "Attendance", href: "/parent/attendance", icon: CalendarDays, mobileShow: true },
  { label: "Performance", href: "/parent/performance", icon: TrendingUp, mobileShow: true },
  { label: "Fees", href: "/parent/fees", icon: CreditCard, mobileShow: true },
  { label: "PTM", href: "/parent/ptm", icon: Heart, mobileShow: true },
];

const navMap = {
  student: studentNav,
  institute: instituteNav,
  teacher: teacherNav,
  parent: parentNav,
};

const roleLabels = {
  student: "Student Portal",
  institute: "Institute Dashboard",
  teacher: "Teacher Panel",
  parent: "Parent Dashboard",
};

const roleColors = {
  student: "from-primary-600 to-primary-800",
  institute: "from-accent-600 to-accent-800",
  teacher: "from-emerald-600 to-emerald-800",
  parent: "from-amber-600 to-amber-800",
};

export function Sidebar({ role, userName = "User", userAvatar }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = navMap[role];
  const mobileTabItems = navItems.filter((item) => item.mobileShow);

  return (
    <>
      {/* ===== DESKTOP SIDEBAR (hidden on mobile) ===== */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-border flex-col z-40 transition-all duration-300 hidden md:flex",
        collapsed ? "w-[68px]" : "w-64"
      )}>
        {/* Header */}
        <div className={cn("p-4 bg-gradient-to-br text-white", roleColors[role])}>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center text-sm font-bold shrink-0">
              LP
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="font-bold text-sm truncate">LearnPro Academy</div>
                <div className="text-xs text-white/70">{roleLabels[role]}</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn("h-[18px] w-[18px] shrink-0", isActive && "text-primary-600")} />
                {!collapsed && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-danger-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-white border border-border shadow-sm flex items-center justify-center hover:bg-surface-secondary transition-colors"
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>

        {/* Footer / User */}
        <div className="p-3 border-t border-border">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="h-8 w-8 rounded-full object-cover shrink-0" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                <User className="h-4 w-4 text-primary-600" />
              </div>
            )}
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{userName}</div>
                <div className="text-xs text-text-tertiary capitalize">{role}</div>
              </div>
            )}
            {!collapsed && (
              <button className="text-text-tertiary hover:text-text-secondary transition-colors">
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ===== MOBILE BOTTOM TAB BAR ===== */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border md:hidden safe-area-bottom">
        <div className="flex items-center justify-around px-1 pt-1.5 pb-1">
          {mobileTabItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg min-w-0 flex-1 transition-colors",
                  isActive ? "text-primary-600" : "text-text-tertiary"
                )}
              >
                <div className="relative">
                  <Icon className={cn("h-5 w-5", isActive && "text-primary-600")} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 bg-danger-500 text-white text-[8px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-medium truncate max-w-full",
                  isActive && "text-primary-600 font-semibold"
                )}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-600 rounded-full" />
                )}
              </Link>
            );
          })}
          {/* More menu for items beyond 5 */}
          {navItems.filter((i) => !i.mobileShow).length > 0 && (
            <button
              onClick={() => setMobileOpen(true)}
              className="flex flex-col items-center gap-0.5 py-1 px-2 text-text-tertiary"
            >
              <Menu className="h-5 w-5" />
              <span className="text-[10px] font-medium">More</span>
            </button>
          )}
        </div>
      </nav>

      {/* ===== MOBILE SLIDE-OUT DRAWER ===== */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-72 bg-white z-50 md:hidden flex flex-col shadow-2xl animate-slide-in">
            {/* Drawer Header */}
            <div className={cn("p-4 bg-gradient-to-br text-white flex items-center justify-between", roleColors[role])}>
              <div className="flex items-center gap-3 min-w-0">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="h-9 w-9 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-bold text-sm truncate">{userName}</div>
                  <div className="text-xs text-white/70">{roleLabels[role]}</div>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1 rounded-lg hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* All Nav Items */}
            <nav className="flex-1 overflow-y-auto py-2 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-text-secondary active:bg-surface-secondary"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary-600")} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-danger-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-border">
              <button className="flex items-center gap-3 text-sm text-text-secondary w-full px-3 py-2 rounded-lg active:bg-surface-secondary">
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
