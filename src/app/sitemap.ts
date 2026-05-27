import type { MetadataRoute } from "next";
import { LEGAL_SLUGS } from "@/lib/legal-docs";
import { SITE_URL as BASE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();
	return [
		{
			url: BASE,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${BASE}/trust`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		...LEGAL_SLUGS.map((slug) => ({
			url: `${BASE}/legal/${slug}`,
			lastModified: now,
			changeFrequency: "yearly" as const,
			priority: 0.3,
		})),
	];
}
