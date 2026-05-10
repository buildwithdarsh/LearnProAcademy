import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EZEnglish Gwalior — Spoken English & Personality Development Courses",
  description:
    "Join EZEnglish in Gwalior — 2000+ students trained over 8+ years. Daily speaking practice, 1-on-1 mentorship, and interview preparation. Enquire now for EST, EBDS & CYPSF programmes.",
  alternates: {
    canonical: "/ezenglish",
  },
  openGraph: {
    title: "EZEnglish Gwalior — Spoken English & Personality Development Courses",
    description:
      "Join EZEnglish in Gwalior — 2000+ students trained over 8+ years. Daily speaking practice, 1-on-1 mentorship, and interview preparation. Enquire now.",
    url: "/ezenglish",
  },
  twitter: {
    card: "summary_large_image",
    title: "EZEnglish Gwalior — Spoken English & Personality Development",
    description:
      "2000+ students trained over 8+ years. Daily speaking practice, mentorship, and interview prep in Gwalior.",
  },
};

function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "EZEnglish",
    url: "https://learn-pro-academy.vercel.app/ezenglish",
    description:
      "English communication institute in Gwalior offering spoken English, public speaking, and personality development courses. 2000+ students trained over 8+ years.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "42, MG Road, Near City Centre Mall, Lashkar",
      addressLocality: "Gwalior",
      addressRegion: "Madhya Pradesh",
      postalCode: "474009",
      addressCountry: "IN",
    },
    telephone: "+919876543210",
    email: "hello@ezenglish.in",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      ratingCount: 2000,
      bestRating: 5,
      worstRating: 1,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function CourseListJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "EZEnglish Courses",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Course",
          name: "EST — English Speaking Training",
          description:
            "Build a strong foundation in spoken English. Daily speaking practice, vocabulary building, pronunciation fundamentals, and real-life conversation simulations.",
          provider: {
            "@type": "EducationalOrganization",
            name: "EZEnglish",
            url: "https://learn-pro-academy.vercel.app/ezenglish",
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Blended",
            courseSchedule: {
              "@type": "Schedule",
              duration: "P3M",
            },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Course",
          name: "EBDS — English + Public Speaking",
          description:
            "Develop stage presence, persuasion skills, and the ability to think on your feet during group discussions and debates.",
          provider: {
            "@type": "EducationalOrganization",
            name: "EZEnglish",
            url: "https://learn-pro-academy.vercel.app/ezenglish",
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Blended",
            courseSchedule: {
              "@type": "Schedule",
              duration: "P4M",
            },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Course",
          name: "CYPSF — Complete Personality Development",
          description:
            "The complete transformation programme — from confident speaker to interview-ready professional. Covers communication, personality, and career readiness.",
          provider: {
            "@type": "EducationalOrganization",
            name: "EZEnglish",
            url: "https://learn-pro-academy.vercel.app/ezenglish",
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Blended",
            courseSchedule: {
              "@type": "Schedule",
              duration: "P5M",
            },
          },
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function EZEnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalBusinessJsonLd />
      <CourseListJsonLd />
      {children}
    </>
  );
}
