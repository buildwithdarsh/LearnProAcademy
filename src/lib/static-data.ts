// Mock data for LearnPro Academy Static Brochure Site
// All data is domain-accurate for an Indian coaching institute

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  image: string;
  highlights: string[];
}

export interface Topper {
  id: string;
  name: string;
  exam: string;
  rankOrScore: string;
  year: number;
  avatarSeed: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  subject: string;
  qualifications: string;
  yearsOfExperience: number;
  avatarSeed: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarSeed: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const siteContent = {
  hero: {
    instituteName: "LearnPro Academy",
    tagline: "Where Learning Meets Excellence",
    subtext:
      "Empowering students since 2004 with world-class coaching for JEE, NEET, Board Exams, and competitive examinations. Join 50,000+ successful alumni who trusted us with their future.",
    ctaText: "Enquire Now",
    backgroundImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&h=1080&fit=crop&auto=format&q=80",
  },

  about: {
    story:
      "Founded in 2004 by a group of IIT and AIIMS alumni, LearnPro Academy began with a simple mission — to make quality education accessible to every aspiring student. What started as a 20-student classroom in Kota has grown into a nationally recognized coaching institute with 12 centres across Rajasthan, Delhi NCR, and Maharashtra. Our pedagogy blends rigorous academic training with personalized mentorship, ensuring that each student receives the attention they deserve.",
    mission:
      "To nurture academic excellence and build confident, capable individuals through innovative teaching, mentorship, and a results-driven curriculum.",
    vision:
      "To be India's most trusted coaching institute — known not just for results, but for shaping well-rounded, resilient learners ready for the challenges of tomorrow.",
    accreditations: [
      "ISO 9001:2015 Certified",
      "Affiliated with National Testing Agency (NTA) as a Practice Centre",
      "Recognized by Rajasthan Board of Secondary Education",
      "Member, Indian Coaching Industry Association (ICIA)",
    ],
    stats: [
      { label: "Years of Excellence", value: "20+", icon: "calendar" },
      { label: "Successful Alumni", value: "50,000+", icon: "users" },
      { label: "Success Rate", value: "98%", icon: "trending-up" },
      { label: "Selections in Top Exams", value: "500+", icon: "award" },
    ],
  },

  courses: [
    {
      id: "jee",
      name: "JEE Main & Advanced Preparation",
      description:
        "Comprehensive 2-year and 1-year programs covering Physics, Chemistry, and Mathematics with daily practice tests, doubt-clearing sessions, and full-length mock exams modelled on NTA patterns. Includes exclusive access to our AI-powered performance tracker.",
      duration: "1–2 Years",
      image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&h=400&fit=crop&auto=format&q=80",
      highlights: [
        "Daily problem-solving sessions",
        "Weekly full-length mock tests",
        "One-on-one mentorship from IITians",
      ],
    },
    {
      id: "neet",
      name: "NEET-UG Preparation",
      description:
        "Focused Biology, Physics, and Chemistry coaching designed around the latest NMC syllabus. Regular NCERT-based revision workshops, specimen-based practical sessions, and topic-wise test series ensure thorough conceptual clarity.",
      duration: "1–2 Years",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop&auto=format&q=80",
      highlights: [
        "NCERT-focused revision cycles",
        "Biology specimen sessions",
        "Previous year paper analysis",
      ],
    },
    {
      id: "boards",
      name: "Board Exam Coaching (CBSE, ICSE, State)",
      description:
        "Targeted coaching for Class 11 and 12 board examinations across CBSE, ICSE, and major state boards. Our board-specific curriculum ensures students master exam patterns while building a strong conceptual foundation for competitive exams.",
      duration: "1 Year",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&auto=format&q=80",
      highlights: [
        "Board-specific question banks",
        "Sample paper marathon sessions",
        "Practical & project guidance",
      ],
    },
    {
      id: "foundation",
      name: "Foundation Courses (Class 8–10)",
      description:
        "Early preparation programs that build analytical thinking and problem-solving skills from Class 8 onwards. Covers Olympiad training (NSO, IMO, NTSE) alongside school curriculum to create a strong academic base for future competitive exams.",
      duration: "1–3 Years",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&auto=format&q=80",
      highlights: [
        "Olympiad & NTSE preparation",
        "Conceptual learning approach",
        "Regular parent-teacher meetings",
      ],
    },
    {
      id: "competitive",
      name: "Competitive Exams (UPSC, SSC, Banking)",
      description:
        "Structured programs for government exam aspirants covering General Studies, Quantitative Aptitude, Reasoning, and English. Includes current affairs workshops, essay writing clinics, and interview preparation for UPSC CSE candidates.",
      duration: "6–18 Months",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop&auto=format&q=80",
      highlights: [
        "Current affairs daily digest",
        "Answer writing practice",
        "Mock interview panels",
      ],
    },
    {
      id: "language",
      name: "Language & Communication Skills",
      description:
        "Spoken English, public speaking, and communication workshops designed for students and working professionals. Covers grammar fundamentals, vocabulary building, group discussion techniques, and presentation skills with real-world practice scenarios.",
      duration: "3–6 Months",
      image: "https://images.unsplash.com/photo-1543165796-5426273eaab3?w=600&h=400&fit=crop&auto=format&q=80",
      highlights: [
        "Small batch sizes (max 15)",
        "Weekly GD & debate practice",
        "Personality development modules",
      ],
    },
    {
      id: "skill",
      name: "Skill Development Programs",
      description:
        "Industry-relevant courses in Digital Literacy, Basic Coding (Python & Scratch), Financial Literacy, and Critical Thinking. Designed to supplement academic learning with 21st-century skills that colleges and employers value.",
      duration: "2–4 Months",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop&auto=format&q=80",
      highlights: [
        "Hands-on project-based learning",
        "Industry expert guest lectures",
        "Certification on completion",
      ],
    },
    {
      id: "crash",
      name: "Crash Courses & Test Series",
      description:
        "Intensive short-duration programs for last-minute revision before JEE, NEET, and board exams. Includes topic-wise test series with detailed analytics, rapid-fire doubt sessions, and formula revision marathons led by senior faculty.",
      duration: "1–3 Months",
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&h=400&fit=crop&auto=format&q=80",
      highlights: [
        "50+ full-length mock tests",
        "Real-time performance analytics",
        "Daily rapid revision sessions",
      ],
    },
  ] as Course[],

  results: {
    toppers: [
      {
        id: "t1",
        name: "Arjun Mehta",
        exam: "JEE Advanced 2025",
        rankOrScore: "AIR 47",
        year: 2025,
        avatarSeed: "arjun-mehta",
      },
      {
        id: "t2",
        name: "Priya Sharma",
        exam: "NEET-UG 2025",
        rankOrScore: "710/720",
        year: 2025,
        avatarSeed: "priya-sharma",
      },
      {
        id: "t3",
        name: "Rohan Gupta",
        exam: "JEE Main 2025",
        rankOrScore: "99.87 Percentile",
        year: 2025,
        avatarSeed: "rohan-gupta",
      },
      {
        id: "t4",
        name: "Sneha Iyer",
        exam: "CBSE Class 12 — 2025",
        rankOrScore: "99.2%",
        year: 2025,
        avatarSeed: "sneha-iyer",
      },
      {
        id: "t5",
        name: "Karthik Reddy",
        exam: "UPSC CSE 2024",
        rankOrScore: "AIR 112",
        year: 2024,
        avatarSeed: "karthik-reddy",
      },
      {
        id: "t6",
        name: "Ananya Verma",
        exam: "NEET-UG 2024",
        rankOrScore: "705/720",
        year: 2024,
        avatarSeed: "ananya-verma",
      },
    ] as Topper[],
    metrics: [
      { label: "JEE Selections (2025)", value: "142" },
      { label: "NEET Selections (2025)", value: "218" },
      { label: "Average Score Improvement", value: "37%" },
      { label: "Students in Top 1000 (JEE)", value: "23" },
      { label: "Government Exam Selections", value: "85+" },
      { label: "University Placements", value: "1,200+" },
    ],
    ticker: [
      "Arjun Mehta — AIR 47 in JEE Advanced 2025",
      "Priya Sharma — 710/720 in NEET-UG 2025",
      "142 students selected in JEE 2025",
      "218 NEET selections — highest ever!",
      "Sneha Iyer — 99.2% in CBSE Class 12",
      "Karthik Reddy — AIR 112 in UPSC CSE 2024",
      "23 students in JEE Top 1000 ranks",
      "LearnPro Academy recognized as a leading institute in Kota by Education Times",
      "85+ government exam selections this year",
      "37% average score improvement across all programs",
    ],
  },

  faculty: [
    {
      id: "f1",
      name: "Dr. Rajesh Kumar Singh",
      subject: "Physics (JEE/NEET)",
      qualifications: "Ph.D. IIT Delhi, M.Sc. IIT Bombay",
      yearsOfExperience: 18,
      avatarSeed: "rajesh-singh",
    },
    {
      id: "f2",
      name: "Prof. Meena Krishnamurthy",
      subject: "Chemistry (JEE/NEET)",
      qualifications: "M.Sc. IISc Bangalore, B.Sc. Loyola College",
      yearsOfExperience: 15,
      avatarSeed: "meena-krishnamurthy",
    },
    {
      id: "f3",
      name: "Amit Tiwari",
      subject: "Mathematics (JEE)",
      qualifications: "M.Tech IIT Kanpur, B.Tech NIT Allahabad",
      yearsOfExperience: 12,
      avatarSeed: "amit-tiwari",
    },
    {
      id: "f4",
      name: "Dr. Sunita Agarwal",
      subject: "Biology (NEET)",
      qualifications: "MBBS AIIMS Delhi, M.Sc. Botany DU",
      yearsOfExperience: 14,
      avatarSeed: "sunita-agarwal",
    },
    {
      id: "f5",
      name: "Vikram Chauhan",
      subject: "General Studies (UPSC)",
      qualifications: "IAS (Retd.), M.A. History JNU",
      yearsOfExperience: 20,
      avatarSeed: "vikram-chauhan",
    },
    {
      id: "f6",
      name: "Neha Patel",
      subject: "English & Communication",
      qualifications: "M.A. English Literature, Cambridge CELTA",
      yearsOfExperience: 10,
      avatarSeed: "neha-patel",
    },
  ] as FacultyMember[],

  facilities: [
    {
      id: "fac1",
      name: "Smart Classrooms",
      description:
        "40 digitally-equipped classrooms with interactive whiteboards, HD projectors, and live-streaming capability for hybrid learning. Each room seats 40 students with ergonomic furniture and noise-isolated walls.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&auto=format&q=80",
    },
    {
      id: "fac2",
      name: "Computer Lab",
      description:
        "State-of-the-art lab with 120 workstations running the latest simulation software for Physics and Chemistry practicals. High-speed fibre internet enables seamless access to our online test platform.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format&q=80",
    },
    {
      id: "fac3",
      name: "Library & Reading Room",
      description:
        "A 15,000-volume library covering NCERT, reference textbooks, previous year papers, and competitive exam guides. The silent reading room stays open 7 AM to 10 PM with dedicated study cubicles.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop&auto=format&q=80",
    },
    {
      id: "fac4",
      name: "Auditorium",
      description:
        "500-seat air-conditioned auditorium used for guest lectures, motivational seminars, parent orientation programs, and annual prize distribution ceremonies.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format&q=80",
    },
    {
      id: "fac5",
      name: "Sports & Recreation",
      description:
        "Because all work and no play doesn't work — our campus features a basketball court, table tennis room, indoor badminton court, and a meditation zone for stress management.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&auto=format&q=80",
    },
  ] as Facility[],

  testimonials: [
    {
      id: "test1",
      name: "Aditya Rajan",
      role: "JEE Advanced 2024 — AIR 189",
      quote:
        "LearnPro didn't just teach me Physics and Maths — they taught me how to think. The structured revision cycles and mock tests made me confident walking into the exam hall. My mentors here genuinely cared about my progress beyond just marks.",
      avatarSeed: "aditya-rajan",
    },
    {
      id: "test2",
      name: "Kavitha Sundaram",
      role: "Parent of NEET 2025 Aspirant",
      quote:
        "As a parent, what impressed me most was the transparency. Regular PTMs, detailed performance reports, and a counsellor I could actually reach on the phone. My daughter's confidence has grown tremendously since joining LearnPro.",
      avatarSeed: "kavitha-sundaram",
    },
    {
      id: "test3",
      name: "Mohit Bansal",
      role: "UPSC CSE 2023 — AIR 234",
      quote:
        "The General Studies program here is outstanding. Vikram Sir's approach to answer writing and Meena Ma'am's essay workshops were game-changers. The mock interview panels felt exactly like the real UPSC board.",
      avatarSeed: "mohit-bansal",
    },
    {
      id: "test4",
      name: "Deepa Nair",
      role: "CBSE 12th — 98.4% (2025)",
      quote:
        "I was struggling with Organic Chemistry before joining LearnPro. Within three months, it became my strongest subject. The faculty breaks down complex topics into simple, memorable frameworks. Couldn't have asked for better guidance.",
      avatarSeed: "deepa-nair",
    },
    {
      id: "test5",
      name: "Ramesh Gupta",
      role: "Parent of two LearnPro students",
      quote:
        "Both my children studied here — one cleared JEE and the other is preparing for NEET. The consistency in teaching quality over the years is remarkable. It feels like an extended family that genuinely invests in each child's success.",
      avatarSeed: "ramesh-gupta",
    },
  ] as Testimonial[],

  faqs: [
    {
      question: "When do admissions open?",
      answer:
        "Admissions for the new academic session open in March every year. Early bird registrations (January–February) receive a 10% fee concession. Limited seats are available for mid-session entry in July and October, subject to a qualifying entrance test.",
    },
    {
      question: "Do you offer demo or trial classes?",
      answer:
        "Absolutely! We offer a free 3-day trial for all programs. You can attend live classes, interact with faculty, and experience our teaching methodology before making a commitment. No payment or documents required for the trial — just walk in with a valid ID.",
    },
    {
      question: "What are the batch timings?",
      answer:
        "We run morning batches (7:00 AM – 10:00 AM), afternoon batches (1:00 PM – 4:00 PM), and evening batches (5:00 PM – 8:00 PM) for most programs. Weekend-only batches are available for working professionals and school students who prefer Sunday classes.",
    },
    {
      question: "Is there a scholarship program?",
      answer:
        "Yes. We award merit-based scholarships (up to 100% tuition waiver) based on our annual Scholarship Aptitude Test (SAT-LP). Additionally, students from economically weaker sections can apply for our Need-Based Financial Aid covering up to 75% of fees.",
    },
    {
      question: "Do you provide study material?",
      answer:
        "All enrolled students receive our proprietary study modules, topic-wise question banks, formula sheets, and previous year paper compilations — both in print and digital format. NEET students also get a biology specimen atlas and lab manual.",
    },
    {
      question: "Is hostel facility available?",
      answer:
        "We have tie-ups with verified hostels and PGs within 1 km of each centre. Options include AC and non-AC rooms, mess facilities with home-style meals, and 24/7 security with biometric entry. Our student welfare team assists with hostel placement.",
    },
  ] as FAQ[],

  contact: {
    address: "LearnPro Academy, 42 Knowledge Park, Vigyan Nagar, Kota, Rajasthan 324005",
    phone: "+91 98765 43210",
    email: "admissions@learnproacademy.in",
    officeHours: "Monday – Saturday: 8:00 AM – 7:00 PM | Sunday: 10:00 AM – 2:00 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.0!2d75.8648!3d25.2138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzQ5LjciTiA3NcKwNTEnNTMuMyJF!5e0!3m2!1sen!2sin!4v1",
    courseInterests: ["JEE Preparation", "NEET Preparation", "Board Exams", "Foundation (Class 8–10)", "Competitive Exams (UPSC/SSC)", "Language & Communication", "Skill Development", "Other"],
  },

  footer: {
    tagline: "Where Learning Meets Excellence",
    socialLinks: {
      youtube: "https://youtube.com/@learnproacademy",
      instagram: "https://instagram.com/learnproacademy",
    },
    poweredBy: "Darsh Gupta",
  },
};
