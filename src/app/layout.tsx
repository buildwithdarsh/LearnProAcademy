import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://learn-pro-academy.vercel.app"
  ),
  title: {
    default: "LearnPro Academy — Coaching Institute Platform | Free Trial",
    template: "%s | LearnPro Academy",
  },
  description:
    "Trusted by 200+ institutes across India. Digitize enrollment, live classes, mock exams, and fee management. Start your free 14-day trial today.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "LearnPro Academy",
    title: "LearnPro Academy — Coaching Institute Platform | Free Trial",
    description:
      "Trusted by 200+ institutes across India. Digitize enrollment, live classes, mock exams, and fee management. Start your free 14-day trial today.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=630&fit=crop&auto=format&q=80",
        width: 1200,
        height: 630,
        alt: "LearnPro Academy — Coaching Institute Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnPro Academy — Coaching Institute Platform | Free Trial",
    description:
      "Trusted by 200+ institutes across India. Digitize enrollment, live classes, mock exams, and fee management.",
    images: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=630&fit=crop&auto=format&q=80",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
