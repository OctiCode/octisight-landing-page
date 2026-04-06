import type { MetadataRoute } from "next";

const BASE = "https://octisight.io";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: BASE,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${BASE}/how-it-works`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${BASE}/blog`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.8,
		},
		{
			url: `${BASE}/news`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.7,
		},
		{
			url: `${BASE}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
	];
}
