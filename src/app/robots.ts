import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/static", "/ezenglish"],
        disallow: ["/student/", "/institute/", "/teacher/", "/parent/", "/auth/"],
      },
    ],
    sitemap: "https://learn-pro-academy.vercel.app/sitemap.xml",
  };
}
