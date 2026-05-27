import {
	LINKEDIN_URL,
	SECURITY_EMAIL,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
} from "./site";

/** Sitewide publisher identity → Knowledge Panel eligibility. */
export function organizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: SITE_NAME,
		url: SITE_URL,
		logo: `${SITE_URL}/apple-icon`,
		description: SITE_DESCRIPTION,
		sameAs: [LINKEDIN_URL],
		contactPoint: [
			{
				"@type": "ContactPoint",
				contactType: "security",
				email: SECURITY_EMAIL,
			},
		],
	};
}

/** Site identity for SERP sitename. */
export function websiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SITE_NAME,
		url: SITE_URL,
	};
}

/** The product itself — security SaaS, free to start. No fake ratings. */
export function softwareApplicationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: SITE_NAME,
		applicationCategory: "SecurityApplication",
		operatingSystem: "Web",
		url: SITE_URL,
		description: SITE_DESCRIPTION,
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
			description:
				"Free to start — connect a repo and get findings in 90 seconds.",
		},
	};
}

/** FAQ rich-result eligibility. Pass the home FAQ entries. */
export function faqPageSchema(faqs: { question: string; answer: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((f) => ({
			"@type": "Question",
			name: f.question,
			acceptedAnswer: { "@type": "Answer", text: f.answer },
		})),
	};
}

/** Breadcrumb trail for inner pages. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			item: `${SITE_URL}${item.path}`,
		})),
	};
}
