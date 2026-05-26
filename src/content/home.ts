export const heroSection = {
	eyebrow: "Vulnerability management",
	title: "Security from insight to action",
	paragraph:
		"OctiSight connects to your systems, analyzes thousands of vulnerabilities, and shows you only what truly matters with clear actions to fix them.",
	trustLine: "No credit card. Connect a repo and get findings in 90s.",
	buttons: {
		primary: {
			text: "Start free scan",
			href: "/signup",
			variant: "primary" as const,
		},
		secondary: {
			text: "See it in Action",
			href: "#how-it-works",
			variant: "secondary" as const,
		},
	},
	dashboardImage: {
		src: "/images/why-octisight/kanban-screen-octisight.png",
		alt: "OctiSight vulnerability dashboard",
		width: 2028,
		height: 1208,
	},
	stats: {
		tracked: { label: "Vulnerabilities tracked", initial: 712418 },
		exploited: { label: "Actively exploited", initial: 1234 },
		critical: { label: "Critical findings", initial: 1234 },
		lastSyncSeconds: 90,
	},
} as const;

export const problemSection = {
	eyebrow: "The problem",
	title: {
		line1: "The vulnerability landscape",
		line2: "doubled in 5 years.",
		line3: "Your team isn't growing that fast.",
	},
	description:
		"Every year brings ~30,000 new CVEs. The tools that worked when you had 10 dependencies don't scale to 10,000. OctiSight is built for teams that can't hire a security engineer to keep up.",
	chart: {
		title: "CVEs published per year",
		source: "Source: NVD (National Vulnerability Database)",
		data: [
			{ year: 2010, cves: 4653 },
			{ year: 2011, cves: 4154 },
			{ year: 2012, cves: 5297 },
			{ year: 2013, cves: 5191 },
			{ year: 2014, cves: 7946 },
			{ year: 2015, cves: 6488 },
			{ year: 2016, cves: 6447 },
			{ year: 2017, cves: 14645 },
			{ year: 2018, cves: 16556 },
			{ year: 2019, cves: 17308 },
			{ year: 2020, cves: 18325 },
			{ year: 2021, cves: 20171 },
			{ year: 2022, cves: 25084 },
			{ year: 2023, cves: 28902 },
			{ year: 2024, cves: 40290 },
			{ year: 2025, cves: 42150 },
		],
	},
	stats: [
		{ value: "~30,000", label: "new CVEs published every year" },
		{
			value: "<7 days",
			label: "average time-to-exploit for new critical findings",
		},
		{
			value: "<1%",
			label: "of CVEs are actually exploited in the wild — where OctiSight focuses",
		},
	],
} as const;

export const platformFeaturesSection = {
	headerTitle: "Platform Features",
	title: "Everything you need to secure your infrastructure",
	paragraph:
		"From detection to remediation, OctiSight provides a complete security platform that grows with your organization.",
	features: [
		{
			id: "ft1",
			icon: "GitPullRequest",
			title: "CI-pipeline scans",
			description:
				"Auto-scan on every push and pull request. Works with GitHub Actions, GitLab CI, Bitbucket Pipelines and CircleCI to catch vulnerabilities before they ship.",
		},
		{
			id: "ft2",
			icon: "Wand2",
			title: "AI remediation steps",
			description:
				"Every finding ships with step-by-step fixes, written by AI and tunable for security engineers, developers or non-technical stakeholders.",
		},
		{
			id: "ft3",
			icon: "FileChartLine",
			title: "Branded executive reports",
			description:
				"Generate PDF reports with your logo and brand colors. Schedule monthly summaries to leadership and security progress in language they read, not CVSS spec sheets.",
		},
		{
			id: "ft4",
			icon: "FileSearch",
			title: "AI vulnerability briefs",
			description:
				"One-page PDF for any critical finding, impact, fix steps and reproduction guide written by AI. Share with stakeholders, customers or auditors without exposing your dashboard.",
		},
		{
			id: "ft5",
			icon: "History",
			title: "Audit log + retention",
			description:
				"Every action recorded with actor, timestamp and context. Configurable retention windows per organization. Export-ready when your SOC 2 auditor asks.",
		},
		{
			id: "ft6",
			icon: "Timer",
			title: "Per-project SLAs",
			description:
				"Define remediation deadlines per severity, per project. Overdue findings bubble up automatically and your auditors see proof of timely action.",
		},
	],
} as const;

export const faqSection = {
	headerTitle: "Common questions",
	title: "Things people ask before signing up.",
	paragraph: "Have a question not answered here? Contact our sales team.",
	contactCta: {
		text: "Contact Sales",
		href: "/contact",
	},
	faqs: [
		{
			id: "faq-languages",
			question: "Which languages and package managers do you support?",
			answer:
				"Native support: JavaScript/TypeScript (npm, yarn, pnpm), Python (pip, Poetry, Pipenv), Java and Kotlin (Maven, Gradle), Go, Rust (Cargo), PHP (Composer), Ruby (Bundler), and .NET (NuGet). For ecosystems we don't natively parse Dart, Swift, Docker base images and others upload a CycloneDX or SPDX SBOM and we'll ingest it the same way.",
		},
		{
			id: "faq-github-only",
			question: "Do you only work with GitHub?",
			answer:
				"OctiSight integrates with GitHub, GitLab and Bitbucket. The GitHub flow uses a GitHub App with per-repository permissions (the modern approach); GitLab and Bitbucket use OAuth 2.0. The product features scanning, AI remediation, kanban triage, reports and notifications are identical across all three.",
		},
		{
			id: "faq-vs-competitors",
			question:
				"How is OctiSight different from other providers?",
			answer:
				"Three differences: (1) We prioritize findings using CISA KEV (actively exploited) and FIRST.org EPSS (exploit probability), not just CVSS so \"critical\" actually means \"attackers are exploiting this today.\" (2) Our generated step-by-step remediation tuned to your team's technical level not just a link to an advisory. (3) We're priced for teams of 5–50, not Fortune 500.",
		},
		{
			id: "faq-source-protection",
			question: "How do you protect my source code?",
			answer:
				"OctiSight clones your code into ephemeral containers, scans it, and discards the clone after the scan completes. We never store source code permanently, only the resulting findings and dependency metadata. All credentials are AES-256 encrypted at rest, and the GitHub App installs with per-repository permissions you control (no org-wide tokens, ever).",
		},
		{
			id: "faq-vuln-freshness",
			question: "How fast do you learn about new vulnerabilities?",
			answer:
				"OctiSight monitors many upstream vulnerability databases on 15-minute polling cycles. Newly-published CVEs typically appear in OctiSight within 20 min. Additions to CISA's actively-exploited list usually appear within the same day they're announced.",
		},
		{
			id: "faq-data-on-cancel",
			question: "What happens to my data if I cancel?",
			answer:
				"You own your data. While active, you can export findings, scan results, configurations and audit logs at any time via API or CSV. After cancellation, we retain your data for 30 days in case you want to reactivate, then permanently delete everything including cached source-code workspaces, encrypted credentials and audit logs. Configurable retention windows are available for organizations that need stricter timelines (SOC 2 / customer contractual obligations).",
		},
	],
} as const;

export const footerSection = {
	logo: {
		src: "/images/logo/octisight-white-logo.png",
		alt: "OctiSight",
	},
	tagline:
		"Security, From Insight to Action. Modern cybersecurity that's human-first, intelligent and built for teams of all sizes.",
	navigation: {
		product: {
			title: "Platform",
			links: [
				{ text: "How It Works", href: "/#how-it-works" },
				{ text: "The Problem", href: "/#problem" },
				{ text: "FAQ", href: "/#faq" },
			],
		},
		company: {
			title: "Company",
			links: [
				{ text: "Contact", href: "/#contact" },
				{ text: "Pricing", href: "/#pricing" },
			],
		},
		resources: {
			title: "Get Started",
			links: [
				{ text: "Create Account", href: "/signup" },
				{ text: "Sign In", href: "/login" },
			],
		},
	},
	social: [
		{
			name: "LinkedIn",
			href: "https://www.linkedin.com/company/ostisight/about/?viewAsMember=true",
			icon: "Linkedin",
		},
	],
} as const;

