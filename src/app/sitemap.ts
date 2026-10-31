import type { MetadataRoute } from "next";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://printforex.com";
export default function sitemap(): MetadataRoute.Sitemap { return ["/", "/privacy", "/terms", "/risk-disclaimer"].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() })); }
