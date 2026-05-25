export const howItWorksContent = {
	hero: {
		badge: "WHY OCTISIGHT",
		title: "Less noise. More fixed.",
		description:
			"OctiSight cuts through the CVE flood with AI-prioritized findings,\n" +
			"remediation steps written for your code and a kanban view your\n" +
			"team will actually use. Here's what each piece looks like.",
	},

	steps: [
		{
			id: "kanban",
			number: "01",
			badge: "TRIAGE",
			title: "Findings flow like work, not like reports.",
			description:
				"OctiSight turns vulnerabilities into actionable kanban cards your team can triage, assign, review and close. No PDF dumps, no inbox-zero rituals.",
			image: "/images/why-octisight/kanban-screen-octisight.png",
			imageAlt:
				"OctiSight kanban board showing vulnerability cards organized by status, severity and project.",
		},
		{
			id: "remediation",
			number: "02",
			badge: "REMEDIATION",
			title: "Every finding comes with a fix.",
			description:
				"Get step-by-step remediation guidance for every finding, adapted to your team’s technical level. The same vulnerability, explained for the right reader.",
			image: "/images/why-octisight/remediation-screen-octisight.png",
			imageAlt:
				"OctiSight remediation panel showing AI-generated fix instructions for a security vulnerability.",
		},
		{
			id: "coverage",
			number: "03",
			badge: "COVERAGE",
			title: "500,000+ vulnerabilities. Multiple sources. One view.",
			description:
				"Search the full vulnerability catalog OctiSight tracks, cross-referenced with CISA KEV, FIRST.org EPSS and trusted threat intelligence signals.",
			image: "/images/why-octisight/global-catalog-screen-octisight.png",
			imageAlt:
				"OctiSight global vulnerability catalog showing searchable CVEs with severity, CVSS score and publication date.",
		},
		{
			id: "setup",
			number: "04",
			badge: "SETUP",
			title: "Connect your code repositories in minutes.",
			description:
				"Connect GitHub, GitLab or Bitbucket, choose the repositories you want to monitor, and let OctiSight keep your security findings up to date.",
			image: "/images/why-octisight/integration-screen-octisight.png",
			imageAlt:
				"OctiSight integrations screen showing GitHub, GitLab and Bitbucket source code provider connections.",
		},
	],
} as const;