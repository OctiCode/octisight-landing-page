/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HOW IT WORKS PAGE — CONTENT CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * All content for the /how-it-works page.
 * Each step maps to a full-width section with a visual mockup.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const howItWorksContent = {
	hero: {
		badge: "How It Works",
		title: "See OctiSight Into Action",
		description:
			"From connecting your systems to continuous protection — discover how OctiSight keeps your business secure in four simple steps.",
	},

	steps: [
		{
			id: "connect",
			number: "01",
			badge: "Connect your systems",
			title: "See exactly which vulnerabilities affect your systems",
			description:
				"No more generic alerts. OctiSight maps vulnerabilities directly to your applications, so you instantly know what impacts your business.",
			bullets: [
				"Real-time vulnerability mapping",
				"Linked to your actual stack",
				"No irrelevant noise",
			],
			mockupImage: "/images/mockups/vulnerabilities-mockup.jpg",
			mockupAlt:
				"OctiSight system connection dashboard showing connected integrations and discovered assets",
		},
		{
			id: "prioritize",
			number: "02",
			badge: "Smart Prioritization",
			title: "Focus only on what matters",
			description:
				"Thousands of vulnerabilities exist but only a few truly matter. OctiSight highlights the most critical risks based on real impact.",
			bullets: [
				"Risk-based prioritization",
				"Business impact scoring",
				"Critical issues surfaced instantly",
			],
			mockupImage: "/images/mockups/alert.jpg",
			mockupAlt:
				"OctiSight alerts dashboard showing prioritized vulnerabilities with business impact scores and risk levels",
		},
		{
			id: "remediate",
			number: "03",
			badge: "AI Remediation",
			title: "Get clear, actionable steps to fix issues",
			description:
				"No more guessing. OctiSight gives you precise actions to resolve vulnerabilities quickly and efficiently.",
			bullets: [
				"Step-by-step remediation",
				"Practical, actionable guidance",
				"No complex documentation needed",
			],
			mockupImage: "/images/mockups/remediation.jpg",
			mockupAlt:
				"OctiSight AI remediation interface showing step-by-step fix instructions for a vulnerability",
		},
		{
			id: "monitor",
			number: "04",
			badge: "Continuous Monitoring",
			title: "Stay protected continuously",
			description:
				"Your environment evolves, and so do threats. OctiSight keeps monitoring and alerts you only when it matters.",
			bullets: [
				"Real-time updates",
				"Smart alerts (no spam)",
				"Continuous protection",
			],
			mockupImage: "/images/mockups/secondalerts.jpg",
			mockupAlt:
				"OctiSight continuous monitoring dashboard with real-time alerts and system health status",
		},
	],
} as const;

export type HowItWorksContent = typeof howItWorksContent;
export type HowItWorksStep = (typeof howItWorksContent.steps)[number];
