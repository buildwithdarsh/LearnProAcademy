import type { Metadata } from "next";
import LandingPage from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "LearnPro Academy — Coaching Institute Platform | Free Trial",
  description:
    "Trusted by 200+ institutes across India. Digitize enrollment, live classes, mock exams, and fee management. Start your free 14-day trial today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LearnPro Academy — Coaching Institute Platform | Free Trial",
    description:
      "Trusted by 200+ institutes across India. Digitize enrollment, live classes, mock exams, and fee management. Start your free 14-day trial today.",
    url: "/",
  },
};

function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LearnPro Academy",
    url: "https://learn-pro-academy.vercel.app",
    description:
      "Full-stack SaaS platform for coaching institutes, tuition centers, and test-preparation academies.",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://learn-pro-academy.vercel.app/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LearnPro Academy",
    url: "https://learn-pro-academy.vercel.app",
    logo: "https://learn-pro-academy.vercel.app/icon.svg",
    description:
      "Full-stack SaaS platform for coaching institutes, tuition centers, and test-preparation academies. Digitize enrollment, classes, assessments, and fee management.",
    founder: {
      "@type": "Organization",
      name: "Darsh Gupta",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98765-43210",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "42 Knowledge Park, Vigyan Nagar",
      addressLocality: "Kota",
      addressRegion: "Rajasthan",
      postalCode: "324005",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.youtube.com/@learnproacademy",
      "https://www.instagram.com/learnproacademy",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <WebSiteJsonLd />
      <OrganizationJsonLd />
      <LandingPage />
    </>
  );
}
