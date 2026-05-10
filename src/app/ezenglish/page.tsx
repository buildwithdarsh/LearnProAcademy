"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  MessageCircle,
  UserCheck,
  Mic,
  Target,
  Clock,
  Sparkles,
  Send,
  BookOpen,
  Trophy,
  Headphones,
  Video,
  Camera,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Courses", href: "#courses" },
  { label: "Why Us", href: "#why" },
  { label: "Method", href: "#method" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const courses = [
  {
    id: "est",
    name: "EST — English Speaking Training",
    duration: "3–4 Months",
    level: "Beginner",
    description:
      "Build a strong foundation in spoken English. Designed for those who want to overcome hesitation and start speaking confidently in daily conversations.",
    highlights: [
      "Daily speaking practice (1 hour)",
      "Listening & vocabulary building sessions",
      "Pronunciation fundamentals & accent clarity",
      "Real-life conversation simulations",
    ],
    color: "from-blue-500 to-cyan-500",
    icon: <MessageCircle size={24} />,
  },
  {
    id: "ebds",
    name: "EBDS — English + Public Speaking",
    duration: "4–5 Months",
    level: "Intermediate",
    description:
      "Go beyond basic English — develop stage presence, persuasion skills, and the ability to think on your feet during group discussions and debates.",
    highlights: [
      "Impromptu speaking & speech structure",
      "Stage practice with live feedback",
      "Group discussions & structured debates",
      "Body language & presentation coaching",
    ],
    color: "from-violet-500 to-purple-500",
    icon: <Mic size={24} />,
  },
  {
    id: "cypsf",
    name: "CYPSF — Complete Personality Development",
    duration: "5–6 Months",
    level: "Advanced",
    description:
      "The complete transformation programme — from confident speaker to interview-ready professional. Covers communication, personality, and career readiness.",
    highlights: [
      "Advanced speaking & professional role-plays",
      "Mock interviews (HR + Technical rounds)",
      "CV writing & communication coaching",
      "Leadership exercises & soft skills mastery",
    ],
    color: "from-amber-500 to-orange-500",
    icon: <Trophy size={24} />,
  },
];

const usps = [
  {
    icon: <Headphones size={28} />,
    title: "Daily Speaking Practice",
    description: "Everyday sessions to build fluency fast — not once a week, every single day.",
  },
  {
    icon: <Users size={28} />,
    title: "Real Group Discussions",
    description: "Practice real-time thinking and articulation with peers in live debate sessions.",
  },
  {
    icon: <UserCheck size={28} />,
    title: "1-on-1 Mentorship",
    description: "Personalised feedback and a customised growth plan tailored to your weak areas.",
  },
  {
    icon: <Mic size={28} />,
    title: "Confidence Building",
    description: "Stage practice, role-plays, and presentations to crush your fear of public speaking.",
  },
  {
    icon: <Target size={28} />,
    title: "Fully Practical Approach",
    description: "Hands-on tasks and real scenarios. No textbook theory — just results.",
  },
  {
    icon: <BookOpen size={28} />,
    title: "Interview Preparation",
    description: "Mock HR & technical interviews, CV coaching, and professional communication training.",
  },
];

const methodSteps = [
  {
    step: 1,
    title: "Assess Your Level",
    description: "We evaluate your current English proficiency and identify areas for improvement through a conversational assessment.",
  },
  {
    step: 2,
    title: "Personalised Plan",
    description: "A customised learning path is created based on your goals — whether it's daily conversation, interviews, or public speaking.",
  },
  {
    step: 3,
    title: "Daily Practice",
    description: "Structured daily sessions with speaking drills, vocabulary building, listening exercises, and peer discussions.",
  },
  {
    step: 4,
    title: "Real-World Application",
    description: "Stage presentations, mock interviews, group debates, and role-plays to apply skills in realistic settings.",
  },
];

const testimonials = [
  {
    name: "Riya Sharma",
    course: "Spoken English (EST)",
    rating: 5,
    quote:
      "I used to freeze every time I had to speak in English. After 3 months at EZEnglish, I gave a full presentation at my college fest — in English! The daily practice sessions completely changed my confidence level.",
  },
  {
    name: "Arjun Verma",
    course: "Group Discussions (EBDS)",
    rating: 5,
    quote:
      "The debate sessions were incredible. I learned how to structure my thoughts quickly and present them convincingly. My GD rounds in placements became my strongest area.",
  },
  {
    name: "Sneha Gupta",
    course: "Interview Mastery (CYPSF)",
    rating: 5,
    quote:
      "The mock interview sessions with real HR questions were game-changing. I cracked my first job interview with confidence I never thought I'd have. EZEnglish doesn't just teach English — they build personalities.",
  },
  {
    name: "Kunal Singh",
    course: "1-on-1 Mentorship",
    rating: 5,
    quote:
      "My mentor identified my exact weak points and designed exercises specifically for me. The personalised attention made all the difference — I improved faster than I expected.",
  },
  {
    name: "Aditi Jain",
    course: "Confidence Activities",
    rating: 5,
    quote:
      "Stage fright was my biggest enemy. The weekly presentations and role-plays at EZEnglish helped me overcome it completely. Now I volunteer to speak first in every meeting.",
  },
  {
    name: "Mohammed Ali",
    course: "Online Live Classes",
    rating: 5,
    quote:
      "Even though I attended online, the sessions felt just as engaging as being in a classroom. The live practice with other students kept me motivated throughout the course.",
  },
];

const stats = [
  { value: "2000+", label: "Students Trained" },
  { value: "95%", label: "Confidence Improvement" },
  { value: "8+", label: "Years Experience" },
  { value: "4.9", label: "Student Rating" },
];

// ─── Sticky Navigation ──────────────────────────────────────────────────────

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

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
      setActiveSection("hero");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#hero");
            }}
            className={cn("font-bold text-lg tracking-tight", scrolled ? "text-blue-700" : "text-white")}
          >
            EZ<span className="font-light ml-0.5">English</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  activeSection === link.href.slice(1)
                    ? scrolled
                      ? "bg-blue-50 text-blue-700"
                      : "bg-white/20 text-white"
                    : scrolled
                    ? "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+919876543210"
              className="ml-2 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Phone size={14} />
              Call Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={cn("md:hidden p-2", scrolled ? "text-gray-800" : "text-white")}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg mt-2 w-full"
            >
              <Phone size={14} />
              Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Section Helpers ─────────────────────────────────────────────────────────

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
    <div className="text-center mb-14">
      {overline && (
        <span
          className={cn(
            "inline-block text-xs font-semibold uppercase tracking-widest mb-2",
            light ? "text-blue-300" : "text-blue-600"
          )}
        >
          {overline}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl font-extrabold",
          light ? "text-white" : "text-gray-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed",
            light ? "text-white/70" : "text-gray-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <div id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80"
          alt="Students in an English communication classroom at EZEnglish Gwalior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-blue-900/75 to-indigo-900/80" />
      </div>

      {/* Floating accent shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
          <Sparkles size={14} className="text-yellow-300" />
          <span className="text-white/90 text-sm font-medium">
            Admissions Open — Limited Seats Available
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
          Speak English{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Confidently
          </span>
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-white/80 font-light">
          Express Yourself with EZEnglish
        </p>
        <p className="mt-6 text-base sm:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
          Gwalior&apos;s established English communication institute — 2000+ students trained over 8+ years. Daily practice, 1-on-1 mentorship,
          and a fully practical approach to transform your confidence and fluency.
        </p>

        {/* Stats strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</div>
              <div className="text-white/50 text-xs sm:text-sm mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-colors"
          >
            <Phone size={18} />
            Call Now — 98765 43210
          </a>
          <a
            href="#courses"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-base font-medium px-8 py-3.5 rounded-xl border border-white/20 backdrop-blur-sm transition-colors"
          >
            Explore Courses
            <ArrowRight size={18} />
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

// ─── 2. Courses ──────────────────────────────────────────────────────────────

function CoursesSection() {
  return (
    <div className="py-20 bg-white" id="courses">
      <Section>
        <SectionHeader
          overline="Our Programmes"
          title="Choose Your Path to Fluency"
          subtitle="Three structured programmes designed to take you from hesitant speaker to confident communicator."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient top bar */}
              <div className={cn("h-1.5 bg-gradient-to-r shrink-0", course.color)} />

              <div className="p-7 flex flex-col flex-1">
                {/* Icon + Level badge */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shrink-0",
                      course.color
                    )}
                  >
                    {course.icon}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                      {course.level}
                    </span>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock size={11} /> {course.duration}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-2">{course.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{course.description}</p>

                <ul className="space-y-2.5 flex-1">
                  {course.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle size={15} className="text-green-500 mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <a
                  href="tel:+919876543210"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Enroll Now <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── 3. Why EZEnglish ─────────────────────────────────────────────────────────────

function WhySection() {
  return (
    <div className="py-20 bg-gray-50" id="why">
      <Section>
        <SectionHeader
          overline="Why Choose EZEnglish"
          title="Real Communication, Not Just Theory"
          subtitle="We focus on practical, daily practice that builds genuine fluency — not memorising grammar rules from a textbook."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp) => (
            <div
              key={usp.title}
              className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {usp.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{usp.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{usp.description}</p>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-bold">Ready to start speaking?</h3>
            <p className="text-blue-100 text-sm mt-1">
              Book a free assessment call and get your personalised learning plan.
            </p>
          </div>
          <a
            href="tel:+919876543210"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
          >
            <Phone size={16} />
            Call Now
          </a>
        </div>
      </Section>
    </div>
  );
}

// ─── 4. Our Method ───────────────────────────────────────────────────────────

function MethodSection() {
  return (
    <div className="py-20 bg-white" id="method">
      <Section>
        <SectionHeader
          overline="Our Approach"
          title="How We Transform Your English"
          subtitle="A structured, results-driven method refined over 8+ years of teaching English communication."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodSteps.map((item, idx) => (
            <div key={item.step} className="relative">
              {/* Connector line (desktop) */}
              {idx < methodSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+32px)] right-0 h-0.5 bg-gradient-to-r from-blue-300 to-blue-100" />
              )}

              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-xl font-extrabold mb-4 shadow-lg shadow-blue-200">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── 5. Testimonials ─────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900" id="testimonials">
      <Section>
        <SectionHeader
          overline="What Students Say"
          title="Real Results from Real Students"
          subtitle="Don't just take our word for it — hear from students who transformed their English and their confidence."
          light
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-colors"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-white/80 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.course}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── 6. Contact ──────────────────────────────────────────────────────────────

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="py-20 bg-gray-50" id="contact">
      <Section>
        <SectionHeader
          overline="Get In Touch"
          title="Start Your English Journey Today"
          subtitle="Fill the form or call us directly — our team will help you choose the right programme."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl border border-gray-200 bg-white text-center py-16 px-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Inquiry Submitted!</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Thank you for your interest in EZEnglish. Our team will call you within a few hours
                  to discuss the best programme for you.
                </p>
                <button
                  className="mt-6 inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", phone: "", course: "", message: "" });
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-5"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-1">Quick Enquiry Form</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Course Interest <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleChange}
                    className="select"
                  >
                    <option value="">Select a programme...</option>
                    <option value="EST">EST — English Speaking Training (3–4 Months)</option>
                    <option value="EBDS">EBDS — English + Public Speaking (4–5 Months)</option>
                    <option value="CYPSF">CYPSF — Complete Personality Development (5–6 Months)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Message <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your goals or any questions..."
                    className="input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors w-full sm:w-auto justify-center"
                >
                  <Send size={16} /> Submit Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Info — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.2!2d78.1698!3d26.2183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEzJzA2LjAiTiA3OMKwMTAnMTEuMyJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EZEnglish Location — 42 MG Road, Lashkar, Gwalior"
              />
              <noscript>
                <p className="p-4 text-sm text-gray-500">
                  EZEnglish is located at 42, MG Road, Near City Centre Mall, Lashkar, Gwalior, MP 474009.{" "}
                  <a href="https://maps.google.com/?q=26.2183,78.1698" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    View on Google Maps
                  </a>
                </p>
              </noscript>
            </div>

            {/* Contact Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-600 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Address</div>
                  <div className="text-gray-500 text-sm">
                    42, MG Road, Near City Centre Mall,
                    Lashkar, Gwalior, MP&nbsp;-&nbsp;474009
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-600 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Phone</div>
                  <a href="tel:+919876543210" className="text-blue-600 text-sm hover:underline">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-600 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Email</div>
                  <a href="mailto:hello@ezenglish.in" className="text-blue-600 text-sm hover:underline">
                    hello@ezenglish.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-600 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Timings</div>
                  <div className="text-gray-500 text-sm">Mon–Sat, 9:00 AM – 7:00 PM</div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20know%20about%20EZEnglish%20courses"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-bold">
              EZ<span className="font-light ml-0.5">English</span>
            </div>
            <div className="text-gray-400 text-sm mt-1">
              Speak English. Speak Confidently.
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/ezenglish"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors"
              aria-label="EZEnglish on Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ezenglish"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors"
              aria-label="EZEnglish on Instagram"
            >
              <Camera size={18} />
            </a>
            <a
              href="https://www.youtube.com/@ezenglish"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors"
              aria-label="EZEnglish on YouTube"
            >
              <Video size={18} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <div>&copy; {new Date().getFullYear()} EZEnglish. All rights reserved.</div>
          <div>
            Redesigned by{" "}
            <span className="text-blue-400 font-medium">Darsh Gupta</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function EZEnglishEnglishPage() {
  return (
    <div className="min-h-screen bg-white">
      <StickyNav />
      <HeroSection />
      <CoursesSection />
      <WhySection />
      <MethodSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
