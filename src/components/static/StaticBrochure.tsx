"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Users,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  Quote,
  Menu,
  X,
  Video,
  Camera,
  Send,
  CheckCircle,
  ArrowRight,
  Trophy,
  Target,
  Sparkles,
  Building2,
  FlaskConical,
  Library,
  Dumbbell,
  Monitor,
} from "lucide-react";
import { useAsyncData, useLazySection, useSlowSection, useActionDelay } from "@/hooks/useAsyncData";
import { Skeleton } from "@/components/ui/Skeleton";
import { siteContent } from "@/lib/static-data";
import type { FAQ } from "@/lib/static-data";
import { cn, getAvatarUrl } from "@/lib/utils";

// ─── Sticky Navigation ───────────────────────────────────────────────
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Results", href: "#results" },
  { label: "Faculty", href: "#faculty" },
  { label: "Campus", href: "#campus" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#about"
            onClick={(e) => handleClick(e, "#about")}
            className={cn("font-bold text-lg", scrolled ? "text-primary-700" : "text-white")}
          >
            LearnPro Academy
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  activeSection === link.href.slice(1)
                    ? scrolled
                      ? "bg-primary-50 text-primary-700"
                      : "bg-white/20 text-white"
                    : scrolled
                    ? "text-text-secondary hover:text-primary-600 hover:bg-primary-50/50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="ml-2 btn-primary btn-sm"
            >
              Enquire Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={cn("md:hidden p-2", scrolled ? "text-text-primary" : "text-white")}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="btn-primary w-full mt-2 text-center"
            >
              Enquire Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────
function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function SectionHeader({
  overline,
  title,
  subtitle,
  light,
}: {
  overline?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-12">
      {overline && (
        <span
          className={cn(
            "inline-block text-xs font-semibold uppercase tracking-widest mb-2",
            light ? "text-primary-200" : "text-primary-600"
          )}
        >
          {overline}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl font-extrabold",
          light ? "text-white" : "text-text-primary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-base sm:text-lg max-w-2xl mx-auto",
            light ? "text-white/70" : "text-text-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── 1. Hero Section ──────────────────────────────────────────────────
function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={siteContent.hero.backgroundImage}
          alt="LearnPro Academy campus with students and faculty"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-accent-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
          <Sparkles size={14} className="text-yellow-300" />
          <span className="text-white/90 text-sm font-medium">
            Admissions Open for 2026-27 Session
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
          LearnPro Academy — Proven Coaching for JEE, NEET & Board Exams
        </h1>
        <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-white/80 font-light">
          {siteContent.hero.tagline}
        </p>
        <p className="mt-6 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
          {siteContent.hero.subtext}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary btn-lg text-base px-8 py-3.5 shadow-lg shadow-primary-600/30"
          >
            {siteContent.hero.ctaText}
            <ArrowRight size={18} />
          </a>
          <a
            href="#courses"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn btn-lg text-base px-8 py-3.5 bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
          >
            Explore Courses
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={28} className="text-white/40" />
      </div>
    </div>
  );
}

// ─── 2. About Us Section ──────────────────────────────────────────────
const statIcons: Record<string, React.ReactNode> = {
  calendar: <Calendar size={24} />,
  users: <Users size={24} />,
  "trending-up": <TrendingUp size={24} />,
  award: <Award size={24} />,
};

function AboutSkeleton() {
  return (
    <div className="py-20 bg-white">
      <Section>
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-32 mx-auto mb-3" />
          <Skeleton className="h-10 w-72 mx-auto mb-3" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-5 w-24 mt-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center space-y-3">
              <Skeleton className="h-12 w-12 rounded-full mx-auto" />
              <Skeleton className="h-8 w-20 mx-auto" />
              <Skeleton className="h-4 w-28 mx-auto" />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function AboutSection() {
  const { data, loading } = useAsyncData(() => siteContent.about, 1000);

  if (loading || !data) return <AboutSkeleton />;

  return (
    <div className="py-20 bg-white" id="about">
      <Section>
        <SectionHeader
          overline="Who We Are"
          title="About LearnPro Academy"
          subtitle="Two decades of shaping India's brightest minds with a relentless focus on results, mentorship, and holistic development."
        />

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-text-secondary leading-relaxed text-base">{data.story}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {data.accreditations.map((a) => (
                <span key={a} className="badge badge-primary text-xs">{a}</span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-text-primary mb-1.5 flex items-center gap-2">
                <Target size={18} className="text-primary-600" /> Our Mission
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">{data.mission}</p>
            </div>
            <div>
              <h3 className="font-bold text-text-primary mb-1.5 flex items-center gap-2">
                <Sparkles size={18} className="text-accent-600" /> Our Vision
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">{data.vision}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-50 text-primary-600 mb-3">
                {statIcons[s.icon]}
              </div>
              <div className="text-3xl font-extrabold text-text-primary">{s.value}</div>
              <div className="text-text-secondary text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── 3. Courses Section ──────────────────────────────────────────────
function CoursesSkeleton() {
  return (
    <div className="py-20 bg-surface-secondary">
      <Section>
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-40 mx-auto mb-3" />
          <Skeleton className="h-10 w-64 mx-auto mb-3" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card p-0 overflow-hidden">
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="p-5 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function CoursesSection() {
  const { data, loading } = useLazySection(() => siteContent.courses, 400);

  if (loading || !data) return <CoursesSkeleton />;

  return (
    <div className="py-20 bg-surface-secondary" id="courses">
      <Section>
        <SectionHeader
          overline="What We Offer"
          title="Our Programs"
          subtitle="Structured, exam-focused courses designed by experienced educators — from foundation to advanced levels."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((course) => (
            <div
              key={course.id}
              className="card p-0 overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-primary-700 flex items-center gap-1">
                  <Clock size={12} /> {course.duration}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-text-primary text-lg mb-2">{course.name}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                  {course.description}
                </p>
                <ul className="space-y-1.5">
                  {course.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle size={14} className="text-success-500 mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── 4. Results & Achievements Section ────────────────────────────────
function ResultsSkeleton() {
  return (
    <div className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900">
      <Section>
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-40 mx-auto mb-3 opacity-30" />
          <Skeleton className="h-10 w-72 mx-auto mb-3 opacity-30" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl p-5 bg-white/5 space-y-3">
              <Skeleton className="h-12 w-12 rounded-full opacity-20" />
              <Skeleton className="h-5 w-32 opacity-20" />
              <Skeleton className="h-4 w-24 opacity-20" />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function ResultsSection() {
  const { data, loading } = useLazySection(() => siteContent.results, 450);

  if (loading || !data) return <ResultsSkeleton />;

  return (
    <div className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" id="results">
      <Section>
        <SectionHeader
          overline="Our Track Record"
          title="Results & Achievements"
          subtitle="Numbers don't lie — our students consistently outperform at the national level."
          light
        />

        {/* Toppers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {data.toppers.map((topper) => (
            <div
              key={topper.id}
              className="rounded-xl p-5 bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={getAvatarUrl(topper.avatarSeed)}
                  alt={topper.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-yellow-400"
                />
                <div>
                  <div className="text-white font-semibold">{topper.name}</div>
                  <div className="text-white/50 text-xs">{topper.exam}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-yellow-300 font-extrabold text-xl">{topper.rankOrScore}</span>
                <span className="text-white/40 text-xs">{topper.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {data.metrics.map((m) => (
            <div
              key={m.label}
              className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="text-2xl font-extrabold text-white">{m.value}</div>
              <div className="text-white/50 text-xs mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Scrolling Ticker */}
        <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 py-3">
          <div className="ticker-track flex gap-12 whitespace-nowrap">
            {[...data.ticker, ...data.ticker].map((item, i) => (
              <span key={i} className="text-white/70 text-sm flex items-center gap-2">
                <Trophy size={14} className="text-yellow-400 shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

// ─── 5. Faculty Section ───────────────────────────────────────────────
function FacultySkeleton() {
  return (
    <div className="py-20 bg-white">
      <Section>
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-32 mx-auto mb-3" />
          <Skeleton className="h-10 w-56 mx-auto mb-3" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card text-center space-y-3">
              <Skeleton className="h-24 w-24 rounded-full mx-auto" />
              <Skeleton className="h-5 w-40 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
              <Skeleton className="h-3 w-48 mx-auto" />
              <Skeleton className="h-6 w-24 mx-auto rounded-full" />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function FacultySection() {
  const { data, loading } = useSlowSection(() => siteContent.faculty);

  if (loading || !data) return <FacultySkeleton />;

  return (
    <div className="py-20 bg-white" id="faculty">
      <Section>
        <SectionHeader
          overline="Expert Educators"
          title="Learn from the Best"
          subtitle="Our faculty comprises IIT, AIIMS, and IAS alumni with decades of teaching experience and a passion for student success."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((f) => (
            <div
              key={f.id}
              className="card text-center group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative mx-auto w-24 h-24 mb-4">
                <Image
                  src={getAvatarUrl(f.avatarSeed)}
                  alt={f.name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover border-4 border-primary-100 group-hover:border-primary-300 transition-colors"
                />
              </div>
              <h3 className="font-bold text-text-primary text-lg">{f.name}</h3>
              <p className="text-primary-600 text-sm font-medium mt-0.5">{f.subject}</p>
              <p className="text-text-tertiary text-xs mt-1">{f.qualifications}</p>
              <span className="inline-flex items-center gap-1 mt-3 badge badge-primary">
                <Clock size={12} /> {f.yearsOfExperience} years experience
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── 6. Campus & Facilities Section ───────────────────────────────────
const facilityIcons: Record<string, React.ReactNode> = {
  fac1: <Monitor size={20} />,
  fac2: <FlaskConical size={20} />,
  fac3: <Library size={20} />,
  fac4: <Building2 size={20} />,
  fac5: <Dumbbell size={20} />,
};

function CampusSkeleton() {
  return (
    <div className="py-20 bg-surface-secondary">
      <Section>
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-40 mx-auto mb-3" />
          <Skeleton className="h-10 w-64 mx-auto" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card p-0 overflow-hidden">
              <Skeleton className="h-52 w-full rounded-none" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function CampusSection() {
  const { data, loading } = useLazySection(() => siteContent.facilities, 350);

  if (loading || !data) return <CampusSkeleton />;

  return (
    <div className="py-20 bg-surface-secondary" id="campus">
      <Section>
        <SectionHeader
          overline="Our Infrastructure"
          title="Campus & Facilities"
          subtitle="A learning environment designed to inspire focus, collaboration, and excellence."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((fac) => (
            <div
              key={fac.id}
              className="card p-0 overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={fac.image}
                  alt={fac.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                  <span className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                    {facilityIcons[fac.id]}
                  </span>
                  <span className="font-semibold text-sm">{fac.name}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-text-secondary text-sm leading-relaxed">{fac.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── 7. Testimonials Section ──────────────────────────────────────────
function TestimonialsSkeleton() {
  return (
    <div className="py-20 bg-white">
      <Section>
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-32 mx-auto mb-3" />
          <Skeleton className="h-10 w-64 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex items-center gap-3 pt-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function TestimonialsSection() {
  const { data, loading } = useLazySection(() => siteContent.testimonials, 400);

  if (loading || !data) return <TestimonialsSkeleton />;

  return (
    <div className="py-20 bg-white" id="testimonials">
      <Section>
        <SectionHeader
          overline="What They Say"
          title="Student & Parent Testimonials"
          subtitle="Don't take our word for it — hear from the students and families who've experienced LearnPro firsthand."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((t) => (
            <div
              key={t.id}
              className="card hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <Quote size={24} className="text-primary-200 mb-3" />
              <p className="text-text-secondary text-sm leading-relaxed flex-1">{t.quote}</p>
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border-light">
                <Image
                  src={getAvatarUrl(t.avatarSeed)}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-text-primary text-sm">{t.name}</div>
                  <div className="text-text-tertiary text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── 8. FAQ Section ───────────────────────────────────────────────────
function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-secondary transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-text-primary pr-4">{faq.question}</span>
        <ChevronDown
          size={18}
          className={cn(
            "text-text-tertiary shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-5 pb-5 text-text-secondary text-sm leading-relaxed">{faq.answer}</div>
      </div>
    </div>
  );
}

function FAQSection() {
  const { data, loading } = useLazySection(() => siteContent.faqs, 300);

  if (loading || !data) {
    return (
      <div className="py-20 bg-surface-secondary">
        <Section>
          <div className="text-center mb-12">
            <Skeleton className="h-4 w-40 mx-auto mb-3" />
            <Skeleton className="h-10 w-72 mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="py-20 bg-surface-secondary" id="faq">
      <Section>
        <SectionHeader
          overline="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about admissions, programs, and campus life."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {data.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── 9. Contact Us Section ────────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseInterest: "",
    grade: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { loading: submitting, execute } = useActionDelay();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(() => setSubmitted(true));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contact = siteContent.contact;

  return (
    <div className="py-20 bg-white" id="contact">
      <Section>
        <SectionHeader
          overline="Get In Touch"
          title="Contact Us"
          subtitle="Have questions about admissions? Fill out the inquiry form and our counsellors will get back to you within 24 hours."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="card text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-50 text-success-500 mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Inquiry Submitted!</h3>
                <p className="text-text-secondary text-sm max-w-md mx-auto">
                  Thank you for your interest in LearnPro Academy. Our admissions team will contact
                  you within 24 hours. Check your email for a confirmation.
                </p>
                <button
                  className="btn-secondary mt-6"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", courseInterest: "", grade: "", message: "" });
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card space-y-5">
                <h3 className="font-bold text-lg text-text-primary mb-1">Admission Inquiry Form</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Full Name <span className="text-danger-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Arjun Mehta"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Email Address <span className="text-danger-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="arjun@example.com"
                      className="input"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Phone Number <span className="text-danger-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Student Class / Grade <span className="text-danger-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="grade"
                      required
                      value={formData.grade}
                      onChange={handleChange}
                      placeholder="e.g., Class 11, Graduate"
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    Course Interest <span className="text-danger-500">*</span>
                  </label>
                  <select
                    name="courseInterest"
                    required
                    value={formData.courseInterest}
                    onChange={handleChange}
                    className="select"
                  >
                    <option value="">Select a program...</option>
                    {contact.courseInterests.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    Message <span className="text-danger-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your goals, preferred batch timing, or any questions you have..."
                    className="input resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div className="card p-0 overflow-hidden">
              <iframe
                src={contact.mapEmbedUrl}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LearnPro Academy Location"
              />
            </div>

            {/* Contact Details */}
            <div className="card space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-50 text-primary-600 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="font-semibold text-text-primary text-sm">Address</div>
                  <div className="text-text-secondary text-sm">{contact.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-50 text-primary-600 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="font-semibold text-text-primary text-sm">Phone</div>
                  <div className="text-text-secondary text-sm">{contact.phone}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-50 text-primary-600 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="font-semibold text-text-primary text-sm">Email</div>
                  <div className="text-text-secondary text-sm">{contact.email}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-50 text-primary-600 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="font-semibold text-text-primary text-sm">Office Hours</div>
                  <div className="text-text-secondary text-sm">{contact.officeHours}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ─── 10. Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-bold">LearnPro Academy</div>
            <div className="text-gray-400 text-sm mt-1">{siteContent.footer.tagline}</div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href={siteContent.footer.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors"
              aria-label="Visit our YouTube channel"
            >
              <Video size={18} />
            </a>
            <a
              href={siteContent.footer.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors"
              aria-label="Visit our Instagram page"
            >
              <Camera size={18} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <div>&copy; {new Date().getFullYear()} LearnPro Academy. All rights reserved.</div>
          <div>
            Powered by{" "}
            <span className="text-primary-400 font-medium">{siteContent.footer.poweredBy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function StaticBrochure() {
  return (
    <div className="min-h-screen bg-white">
      <StickyNav />
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <ResultsSection />
      <FacultySection />
      <CampusSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
