"use client";

import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap, Users, BookOpen, BarChart3, CreditCard, Building2,
  Star, ChevronRight, PlayCircle, Shield, Smartphone, Globe,
  TrendingUp, Clock, MessageCircle, Award, ArrowRight, CheckCircle,
  Zap, Target, Brain, Layers, Menu, X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { institutes, courses, EXAMS, CITIES } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

const stats = [
  { label: "Active Students", value: "50,000+", icon: Users },
  { label: "Partner Institutes", value: "200+", icon: Building2 },
  { label: "Courses Available", value: "1,500+", icon: BookOpen },
  { label: "Success Rate", value: "94%", icon: Award },
];

const features = [
  { icon: GraduationCap, title: "Institute Discovery", description: "Search and compare coaching institutes by exam, location, fees, and results. Read verified student reviews.", color: "bg-blue-50 text-blue-600" },
  { icon: PlayCircle, title: "Live & Recorded Classes", description: "Attend live classes with interactive tools or watch recordings at your own pace. Support for 0.5x to 2x speed.", color: "bg-purple-50 text-purple-600" },
  { icon: BarChart3, title: "Performance Analytics", description: "AI-powered score tracking, topic-wise heatmaps, percentile ranks, and predicted exam scores.", color: "bg-emerald-50 text-emerald-600" },
  { icon: MessageCircle, title: "Doubt Resolution", description: "Get doubts cleared within hours via text, image, or video. AI-assisted initial solutions with faculty validation.", color: "bg-amber-50 text-amber-600" },
  { icon: CreditCard, title: "Fee Management", description: "Flexible payment plans — UPI, cards, EMI. Automated reminders, receipts, and GST-compliant invoices.", color: "bg-rose-50 text-rose-600" },
  { icon: Building2, title: "Multi-Branch Management", description: "Unified dashboard across all branches. Compare performance, manage faculty, and track revenue in one place.", color: "bg-cyan-50 text-cyan-600" },
  { icon: Shield, title: "Exam Integrity", description: "Proctored online exams with webcam monitoring, tab-switch detection, and AI cheat detection.", color: "bg-indigo-50 text-indigo-600" },
  { icon: Smartphone, title: "Mobile-First Experience", description: "70%+ students learn on mobile. Our app-first design ensures a seamless experience across all devices.", color: "bg-orange-50 text-orange-600" },
];

const examCategories = [
  { name: "JEE Main & Advanced", icon: "🔬", students: "12,000+", color: "from-blue-500 to-blue-700" },
  { name: "NEET UG", icon: "🩺", students: "8,500+", color: "from-green-500 to-green-700" },
  { name: "UPSC CSE", icon: "🏛️", students: "3,200+", color: "from-amber-500 to-amber-700" },
  { name: "CAT / MBA", icon: "📊", students: "4,100+", color: "from-purple-500 to-purple-700" },
  { name: "GATE", icon: "⚙️", students: "5,400+", color: "from-cyan-500 to-cyan-700" },
  { name: "Board Exams", icon: "📖", students: "15,000+", color: "from-rose-500 to-rose-700" },
];

const pricingTiers = [
  { name: "Starter", price: "₹2,999", period: "/month", students: "Up to 100", branches: "1", features: ["Basic enrollment & attendance", "Fee collection", "Recorded lectures", "Parent dashboard", "Email support"], popular: false },
  { name: "Growth", price: "₹9,999", period: "/month", students: "Up to 500", branches: "Up to 3", features: ["Everything in Starter", "Live classes (Zoom/Meet)", "Test series & mock exams", "Doubt clearing module", "Parent dashboard", "WhatsApp notifications"], popular: true },
  { name: "Pro", price: "₹24,999", period: "/month", students: "Up to 2,000", branches: "Up to 10", features: ["Everything in Growth", "AI analytics & predictions", "Adaptive tests", "Lead CRM & management", "Multi-faculty scheduling", "Priority support"], popular: false },
  { name: "Enterprise", price: "₹49,999+", period: "/month", students: "Unlimited", branches: "Unlimited", features: ["Everything in Pro", "White-label branding", "API access", "Franchise management", "Dedicated account manager", "Custom integrations"], popular: false },
];

const testimonials = [
  { name: "Arjun Mehta", role: "JEE Advanced — AIR 847", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format", text: "LearnPro's mock tests are identical to the real JEE interface. The topic-wise analytics helped me focus on my weak areas in Chemistry. Went from 68 percentile to 99.2 in 8 months.", rating: 5 },
  { name: "Vikram Agarwal", role: "Director, Pinnacle IIT Academy", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format", text: "Managing 5 branches was a nightmare before LearnPro. Now I have real-time visibility into every branch's performance, fee collection, and student progress from a single dashboard.", rating: 5 },
  { name: "Dr. Priya Sharma", role: "NEET Faculty, MedPrep Institute", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format", text: "The doubt resolution module saves me 2 hours daily. Common doubts are auto-answered by AI, and I focus on unique conceptual questions. My students' scores have improved by 23%.", rating: 5 },
  { name: "Rajesh Mehta", role: "Parent of Class 11 Student", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format", text: "Finally, I can see exactly what my son is learning, his attendance, test scores, and upcoming fees — all on my phone. The weekly WhatsApp report is incredibly useful.", rating: 4 },
];

const portalLinks = [
  { href: "/student/dashboard", label: "Student Portal", description: "Dashboard, classes, tests, analytics", icon: GraduationCap, color: "from-blue-600 to-blue-800" },
  { href: "/institute/dashboard", label: "Institute Dashboard", description: "Students, batches, fees, leads, branches", icon: Building2, color: "from-purple-600 to-purple-800" },
  { href: "/teacher/dashboard", label: "Teacher Panel", description: "Schedule, content, doubts, classes", icon: BookOpen, color: "from-emerald-600 to-emerald-800" },
  { href: "/parent/dashboard", label: "Parent Dashboard", description: "Attendance, scores, fees, PTM", icon: Users, color: "from-amber-600 to-amber-800" },
];

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold text-sm">
              LP
            </div>
            <span className="text-lg font-bold text-text-primary">LearnPro Academy</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Features</a>
            <a href="#exams" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Exams</a>
            <a href="#pricing" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Testimonials</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/student/dashboard" className="btn-secondary btn-sm">Log In</Link>
            <Link href="/student/discovery" className="btn-primary btn-sm">Get Started</Link>
          </div>
          <button
            className="md:hidden p-2 text-text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {/* Mobile menu drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-100 flex flex-col gap-3">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2">Features</a>
            <a href="#exams" onClick={() => setMobileMenuOpen(false)} className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2">Exams</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2">Pricing</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2">Testimonials</a>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <Link href="/student/dashboard" className="btn-secondary btn-sm flex-1 text-center">Log In</Link>
              <Link href="/student/discovery" className="btn-primary btn-sm flex-1 text-center">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-12 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-100/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Zap className="h-4 w-4" />
                <span>Trusted by 200+ Coaching Institutes Across India</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-text-primary leading-tight mb-6">
                Digitize Your{" "}
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Coaching Institute
                </span>{" "}
                End-to-End
              </h1>
              <p className="text-lg text-text-secondary mb-8 max-w-lg">
                From student inquiry to enrollment, live classes to mock exams, fee collection to performance analytics — manage everything on one platform.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/student/discovery" className="btn-primary btn-lg">
                  Explore Institutes <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/institute/dashboard" className="btn-secondary btn-lg">
                  Institute Demo <PlayCircle className="h-5 w-5" />
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-sm text-text-secondary">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success-500" /> Free 14-day trial</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success-500" /> No credit card required</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success-500" /> 200+ institutes trust us</span>
              </div>
            </div>
            <div className={`transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&h=500&fit=crop&auto=format"
                  alt="Students in a coaching classroom attending a live lecture"
                  width={700}
                  height={500}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  priority
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-success-50 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-success-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">94% Pass Rate</div>
                    <div className="text-xs text-text-tertiary">Across all partner institutes</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">50,000+ Students</div>
                    <div className="text-xs text-text-tertiary">Active on platform</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
                  <Icon className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portal Quick Access */}
      <section className="py-10 md:py-16 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Explore the Platform</h2>
            <p className="text-text-secondary">Jump into any portal to see the full experience</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {portalLinks.map((portal) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={portal.href}
                  href={portal.href}
                  className="group relative bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-text-primary mb-1">{portal.label}</h3>
                  <p className="text-sm text-text-secondary">{portal.description}</p>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary group-hover:text-primary-600 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-text-primary mb-3">Everything Your Institute Needs</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">From student discovery to result showcase, LearnPro handles every aspect of coaching operations.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`h-11 w-11 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exam Categories */}
      <section id="exams" className="py-12 md:py-20 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-text-primary mb-3">Exam-Specific Modules</h2>
            <p className="text-text-secondary">Purpose-built for every major Indian competitive and board examination</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {examCategories.map((exam) => (
              <div key={exam.name} className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-3xl">{exam.icon}</span>
                  <div>
                    <h3 className="font-bold text-text-primary">{exam.name}</h3>
                    <p className="text-sm text-text-secondary">{exam.students} students preparing</p>
                  </div>
                </div>
                <div className={`h-1.5 rounded-full bg-gradient-to-r ${exam.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Institutes Preview */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-2">Trending Institutes</h2>
              <p className="text-text-secondary">Top-rated coaching centers on our platform</p>
            </div>
            <Link href="/student/discovery" className="btn-secondary btn-sm">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {institutes.slice(0, 3).map((inst) => (
              <div key={inst.id} className="rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-44">
                  <Image src={inst.coverImage} alt={`${inst.name} campus in ${inst.location.area}, ${inst.location.city}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg">{inst.name}</h3>
                    <p className="text-white/80 text-sm">{inst.location.area}, {inst.location.city}</p>
                  </div>
                  {inst.trending && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      🔥 Trending
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold">{inst.rating}</span>
                    </div>
                    <span className="text-xs text-text-tertiary">({inst.reviewCount} reviews)</span>
                    {inst.verified && <span className="badge badge-success text-[10px]">✓ Verified</span>}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {inst.exams.map((exam) => (
                      <span key={exam} className="badge badge-primary text-[10px]">{exam}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-sm font-bold text-text-primary">{formatNumber(inst.studentCount)}</div>
                      <div className="text-[11px] text-text-tertiary">Students</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-text-primary">{inst.passRate}%</div>
                      <div className="text-[11px] text-text-tertiary">Pass Rate</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-text-primary">{formatCurrency(inst.feeRange.min)}</div>
                      <div className="text-[11px] text-text-tertiary">Starting Fee</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 md:py-20 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-text-primary mb-3">Simple, Transparent Pricing</h2>
            <p className="text-text-secondary">Start free. Scale as you grow. No hidden charges.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl bg-white p-6 flex flex-col ${
                  tier.popular
                    ? "border-2 border-primary-500 shadow-lg relative"
                    : "border border-gray-100 shadow-sm"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-text-primary mb-1">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-2xl md:text-3xl font-extrabold text-text-primary">{tier.price}</span>
                  <span className="text-sm text-text-tertiary">{tier.period}</span>
                </div>
                <div className="text-sm text-text-secondary mb-1">
                  <span className="font-medium">{tier.students}</span> students
                </div>
                <div className="text-sm text-text-secondary mb-5">
                  <span className="font-medium">{tier.branches}</span> branch{tier.branches !== "1" ? "es" : ""}
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle className="h-4 w-4 text-success-500 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.name === "Enterprise" ? "/static#contact" : "/institute/dashboard"}
                  className={tier.popular ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}
                >
                  {tier.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-text-primary mb-3">Loved by Students, Teachers & Owners</h2>
            <p className="text-text-secondary">Hear from our community across India</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < t.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={40} height={40} className="rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold text-text-primary">{t.name}</div>
                    <div className="text-xs text-text-tertiary">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">Ready to Transform Your Coaching Institute?</h2>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join 200+ coaching institutes across India. Start your free 14-day trial — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <Link href="/institute/dashboard" className="bg-white text-primary-700 font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              Start Free Trial <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/student/discovery" className="border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              Explore as Student <Globe className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">LP</div>
                <span className="text-lg font-bold text-white">LearnPro Academy</span>
              </div>
              <p className="text-sm leading-relaxed">
                Full-stack SaaS platform for coaching institutes, tuition centers, and test-preparation academies operating in hybrid mode.
              </p>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-4">For Students</h2>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/student/discovery" className="hover:text-white transition-colors">Discover Institutes</Link></li>
                <li><Link href="/student/courses" className="hover:text-white transition-colors">Browse Courses</Link></li>
                <li><Link href="/student/tests" className="hover:text-white transition-colors">Free Mock Tests</Link></li>
                <li><Link href="/student/materials" className="hover:text-white transition-colors">Study Material</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-4">For Institutes</h2>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/institute/dashboard" className="hover:text-white transition-colors">Institute Dashboard</Link></li>
                <li><Link href="/institute/leads" className="hover:text-white transition-colors">Lead Management</Link></li>
                <li><Link href="/institute/fees" className="hover:text-white transition-colors">Fee Collection</Link></li>
                <li><Link href="/institute/branches" className="hover:text-white transition-colors">Multi-Branch</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-4">Company</h2>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/static#about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><Link href="/static#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/static#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">&copy; 2026 LearnPro Academy by Darsh Gupta. All rights reserved.</p>
            <p className="text-sm">Made with ❤️ for Indian coaching institutes</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
