import type { Metadata } from "next";
import StaticBrochure from "@/components/static/StaticBrochure";
import { siteContent } from "@/lib/static-data";

export const metadata: Metadata = {
  title: "LearnPro Academy Kota — Proven JEE, NEET & Board Coaching",
  description:
    "Established in 2004 with 50,000+ alumni. Expert coaching for JEE, NEET, UPSC, and Board Exams in Kota, Rajasthan. Enquire now for 2026-27 admissions.",
  alternates: {
    canonical: "/static",
  },
  openGraph: {
    title: "LearnPro Academy Kota — Proven JEE, NEET & Board Coaching",
    description:
      "Established in 2004 with 50,000+ alumni. Expert coaching for JEE, NEET, UPSC, and Board Exams in Kota, Rajasthan. Enquire now for 2026-27 admissions.",
    url: "/static",
  },
};

function EducationalOrganizationJsonLd() {
  const contact = siteContent.contact;
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "LearnPro Academy",
    url: "https://learn-pro-academy.vercel.app/static",
    description:
      "Coaching institute for JEE, NEET, UPSC, and Board Exams in Kota, Rajasthan. Established in 2004 with 50,000+ successful alumni.",
    foundingDate: "2004",
    address: {
      "@type": "PostalAddress",
      streetAddress: "42 Knowledge Park, Vigyan Nagar",
      addressLocality: "Kota",
      addressRegion: "Rajasthan",
      postalCode: "324005",
      addressCountry: "IN",
    },
    telephone: contact.phone,
    email: contact.email,
    logo: "https://learn-pro-academy.vercel.app/icon.svg",
    sameAs: [
      siteContent.footer.socialLinks.youtube,
      siteContent.footer.socialLinks.instagram,
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function FAQPageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteContent.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
    name: "Courses at LearnPro Academy",
    itemListElement: siteContent.courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: course.name,
        description: course.description,
        provider: {
          "@type": "EducationalOrganization",
          name: "LearnPro Academy",
          url: "https://learn-pro-academy.vercel.app/static",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Blended",
          courseSchedule: {
            "@type": "Schedule",
            duration: course.duration,
          },
        },
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function StaticPage() {
  return (
    <>
      <EducationalOrganizationJsonLd />
      <FAQPageJsonLd />
      <CourseListJsonLd />
      <StaticBrochure />
    </>
  );
}
