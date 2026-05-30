export const heroSection = {
	eyebrow: "Built for small teams",
	title: "Vulnerability management, from insight to action",
	paragraph:
		"OctiSight connects to your systems, analyzes thousands of vulnerabilities, and shows you only what truly matters with clear actions to fix them.",
	trustLine: "No credit card. Connect a repo and get findings in 90s.",
	buttons: {
		primary: {
			text: "Start free scan",
			href: "https://app.octisight.io/auth/login",
			variant: "primary" as const,
		},
		secondary: {
			text: "See it in Action",
			href: "#contact",
			variant: "secondary" as const,
		},
	},
	dashboardImage: {
		src: "/images/hero/overview-screen-octisight.png",
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
		lead: "Vulnerabilities are growing faster than your team can",
		accent: "triage them.",
	},
	description:
		"Every month, thousands of new vulnerabilities are published. But the real challenge is not detection, it is knowing which ones expose your business, which ones matter now, and who should fix them.",
	chart: {
		title: "CVEs published per year",
		source: "Source: NVD, with CISA KEV overlay.",
		// Static fallback used only when the live API is unreachable. Same shape
		// as YearPoint (count + kev per year). KEV counts pre-2021 are CISA's
		// retroactive estimates.
		data: [
			{ year: 2010, count: 4653, kev: 5 },
			{ year: 2011, count: 4154, kev: 7 },
			{ year: 2012, count: 5297, kev: 10 },
			{ year: 2013, count: 5191, kev: 8 },
			{ year: 2014, count: 7946, kev: 12 },
			{ year: 2015, count: 6488, kev: 14 },
			{ year: 2016, count: 6447, kev: 16 },
			{ year: 2017, count: 14645, kev: 22 },
			{ year: 2018, count: 16556, kev: 28 },
			{ year: 2019, count: 17308, kev: 35 },
			{ year: 2020, count: 18325, kev: 80 },
			{ year: 2021, count: 20171, kev: 110 },
			{ year: 2022, count: 25084, kev: 145 },
			{ year: 2023, count: 28902, kev: 168 },
			{ year: 2024, count: 40290, kev: 187 },
			{ year: 2025, count: 42150, kev: 210 },
		],
	},
	annotations: [
		{
			yearStart: 2020,
			yearEnd: 2021,
			tone: "neutral",
			label: "Stack expansion",
			body: "Modern software stacks expand: cloud, APIs, open source, containers.",
		},
		{
			yearStart: 2024,
			yearEnd: 2025,
			tone: "warn",
			label: "Volume accelerates",
			body: "CVE volume accelerates. More findings, more dependencies, more tools.",
		},
		{
			yearStart: null,
			yearEnd: null,
			tone: "muted",
			label: "2026 YTD",
			body: "Partial year, still growing.",
		},
	],
	insights: [
		{
			headline: "45,000+ vulnerabilities expected in 2025",
			body: "Published vulnerabilities are growing faster than most internal security teams can manually review.",
			footnote:
				"Coalition forecasted over 45,000 software vulnerabilities in 2025, around 4,000 per month.",
		},
		{
			headline: "7 days is too slow for critical exposure",
			body: "A critical vulnerability on a public-facing system can become a business risk before the next weekly review.",
			footnote: null,
		},
		{
			headline: "Only a small fraction becomes urgent",
			body: "The problem is not fixing everything. The problem is identifying the few vulnerabilities that are exploitable, exposed, and relevant to your environment.",
			footnote:
				"Coalition reported that its policyholders received critical alerts for only 0.15% of vulnerabilities published in the first ten months of 2024.",
		},
	],
	beforePipeline: {
		title: "What this looks like today",
		steps: [
			{ icon: "Rss", label: "CVE feeds" },
			{ icon: "BellRing", label: "Scanner alerts" },
			{ icon: "FileText", label: "PDF reports" },
			{ icon: "MessageSquare", label: "Notification Channel" },
			{ icon: "ListChecks", label: "Manual triage" },
			{ icon: "Hourglass", label: "Delayed fixes" },
		],
		footer: "This is where risk gets lost.",
	},
	conclusion: {
		problem:
			"The result: teams spend time reviewing thousands of findings while the few vulnerabilities that actually matter remain open.",
		solution:
			"OctiSight exists to solve this gap: prioritize what matters, explain why it matters, and move it into remediation.",
	},
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
				{ text: "Contact", href: "/#contact" },
				{ text: "Trust Center", href: "/trust" },
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

