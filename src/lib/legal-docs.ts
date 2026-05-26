/**
 * Pure metadata for /legal/[slug] — safe to import from client components.
 * The MD-file loader lives in `./legal-docs.server.ts` (server-only).
 *
 * `group` controls how docs are grouped in the legal-page sidebar.
 * `showInFooter` controls inclusion in the footer Legal column — we keep
 * that column to 7 consumer-facing docs (regulatory expectation: 1 click
 * from every page) and surface the commercial docs via /trust instead.
 */

export const LEGAL_GROUPS = {
	public: { title: "Public policies", order: 1 },
	trust: { title: "Trust & security", order: 2 },
	customer: { title: "Customer agreements", order: 3 },
} as const;

export type LegalGroup = keyof typeof LEGAL_GROUPS;

type LegalDoc = {
	file: string;
	title: string;
	shortTitle?: string;
	description: string;
	group: LegalGroup;
	showInFooter: boolean;
};

/** Source of truth for the slug set + route order. */
export const LEGAL_SLUGS = [
	"terms",
	"privacy",
	"cookies",
	"aup",
	"imprint",
	"security",
	"vdp",
	"dpa",
	"subprocessors",
	"sla",
	"refunds",
] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export const LEGAL_DOCS: Record<LegalSlug, LegalDoc> = {
	terms: {
		file: "terms-of-service.md",
		title: "Terms of Service",
		description:
			"The agreement governing your use of the OctiSight platform.",
		group: "public",
		showInFooter: true,
	},
	privacy: {
		file: "privacy-policy.md",
		title: "Privacy Policy",
		description:
			"How OctiSight collects, uses, and protects your personal data.",
		group: "public",
		showInFooter: true,
	},
	cookies: {
		file: "cookie-policy.md",
		title: "Cookie Policy",
		description: "How and why we use cookies and similar technologies.",
		group: "public",
		showInFooter: true,
	},
	aup: {
		file: "acceptable-use-policy.md",
		title: "Acceptable Use Policy",
		shortTitle: "AUP",
		description: "What you can and can't do with OctiSight.",
		group: "public",
		showInFooter: true,
	},
	imprint: {
		file: "imprint.md",
		title: "Imprint",
		description: "Legal notice and company information.",
		group: "public",
		showInFooter: true,
	},
	security: {
		file: "security-policy.md",
		title: "Security",
		description:
			"How OctiSight secures your data, infrastructure, and operations.",
		group: "trust",
		showInFooter: true,
	},
	vdp: {
		file: "vulnerability-disclosure-policy.md",
		title: "Responsible Disclosure",
		shortTitle: "Disclosure",
		description:
			"How to report a security issue in OctiSight, and what to expect from us.",
		group: "trust",
		showInFooter: true,
	},
	dpa: {
		file: "data-processing-agreement.md",
		title: "Data Processing Agreement",
		shortTitle: "DPA",
		description:
			"GDPR Article 28 controller-to-processor agreement, signed at order.",
		group: "customer",
		showInFooter: false,
	},
	subprocessors: {
		file: "subprocessors.md",
		title: "Subprocessors",
		description:
			"Third parties that may process customer data on OctiSight's behalf.",
		group: "customer",
		showInFooter: false,
	},
	sla: {
		file: "service-level-agreement.md",
		title: "Service Level Agreement",
		shortTitle: "SLA",
		description: "Uptime commitment and service credit policy.",
		group: "customer",
		showInFooter: false,
	},
	refunds: {
		file: "refund-policy.md",
		title: "Refund Policy",
		description: "Billing, cancellations, and refund terms.",
		group: "customer",
		showInFooter: false,
	},
};

/** Footer Legal column — derived from `showInFooter`. Order matches the tree. */
export const LEGAL_FOOTER_LINKS = (
	[
		"terms",
		"privacy",
		"cookies",
		"aup",
		"security",
		"imprint",
		"vdp",
	] as const
)
	.filter((slug) => LEGAL_DOCS[slug].showInFooter)
	.map((slug) => ({
		text: LEGAL_DOCS[slug].title,
		href: `/legal/${slug}` as const,
	}));

/** Grouped slug list for the legal-page sidebar. */
export function getLegalGroups(): Array<{
	group: LegalGroup;
	title: string;
	slugs: LegalSlug[];
}> {
	const grouped = (Object.keys(LEGAL_GROUPS) as LegalGroup[])
		.sort((a, b) => LEGAL_GROUPS[a].order - LEGAL_GROUPS[b].order)
		.map((group) => ({
			group,
			title: LEGAL_GROUPS[group].title,
			slugs: LEGAL_SLUGS.filter((s) => LEGAL_DOCS[s].group === group),
		}))
		.filter((g) => g.slugs.length > 0);
	return grouped;
}

const FILENAME_TO_SLUG: Record<string, LegalSlug> = Object.fromEntries(
	(Object.entries(LEGAL_DOCS) as [LegalSlug, { file: string }][]).map(
		([slug, meta]) => [meta.file, slug],
	),
);

/** Resolve a slug or in-doc relative link target (`./imprint.md`) to a slug. */
export function slugFromHref(href: string): LegalSlug | null {
	const cleaned = href.replace(/^\.\//, "").replace(/^\//, "");
	if (cleaned in LEGAL_DOCS) return cleaned as LegalSlug;
	if (cleaned in FILENAME_TO_SLUG) return FILENAME_TO_SLUG[cleaned];
	return null;
}
