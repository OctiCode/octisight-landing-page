import type { NewsItem } from "@/types/news";

export const newsData: NewsItem[] = [
	{
		id: "news1",
		title: "OctiSight Raises $50M Series B to Expand Powered Security Platform",
		excerpt:
			"New funding accelerates OctiSight's mission to democratize enterprise-grade vulnerability management with AI and automation.",
		content: `
			<p>We're thrilled to announce that OctiSight has raised $50 million in Series B funding, led by leading venture capital firms focused on cybersecurity innovation. This investment will accelerate our mission to democratize enterprise-grade vulnerability management with AI and automation.</p>

			<h2>Transforming Vulnerability Management</h2>
			<p>Since our founding, we've been committed to making security accessible to organizations of all sizes. Traditional vulnerability management tools are complex, expensive, and require extensive security expertise. OctiSight changes that by combining artificial intelligence with intuitive design to deliver enterprise-grade security that anyone can use.</p>

			<p>Our platform has already helped hundreds of organizations reduce their vulnerability backlog by an average of 70% while cutting remediation time in half. This funding will enable us to expand our capabilities and reach even more teams worldwide.</p>

			<h2>What's Next</h2>
			<p>With this new funding, we're focused on three key areas:</p>
			<ul>
				<li><strong>Product Innovation:</strong> Expanding our AI-powered remediation recommendations and adding new integrations with popular development tools.</li>
				<li><strong>Global Expansion:</strong> Opening new offices in Europe and Asia-Pacific to better serve our international customers.</li>
				<li><strong>Team Growth:</strong> Doubling our engineering and customer success teams to accelerate product development and support.</li>
			</ul>

			<h2>Thank You</h2>
			<p>This milestone wouldn't be possible without our customers, partners, and team members who believe in our vision. We're just getting started, and we're excited to continue building the future of vulnerability management together.</p>
		`,
		date: "2024-03-15",
		category: "Company News",
		image: "/images/elements/newsimage.jpg",
		slug: "octisight-raises-50m-series-b",
		author: {
			name: "Sarah Chen",
			role: "CEO & Co-founder",
		},
	},
	{
		id: "news2",
		title: "New Report: The State of Vulnerability Management 2026",
		excerpt:
			"OctiSight releases comprehensive industry report analyzing vulnerability management trends, challenges, and best practices.",
		content: `
			<p>Today, we're releasing our comprehensive State of Vulnerability Management 2026 report, based on analysis of over 10,000 organizations and millions of vulnerabilities tracked through our platform.</p>

			<h2>Key Findings</h2>
			<p>The report reveals several critical trends shaping the vulnerability management landscape:</p>
			<ul>
				<li>The average organization faces 2,300+ vulnerabilities at any given time, a 35% increase from 2024.</li>
				<li>AI-powered remediation tools reduce fix time by 60% compared to manual processes.</li>
				<li>Organizations using automated prioritization see 3x faster vulnerability resolution.</li>
				<li>Cloud-native applications introduce unique security challenges requiring specialized tools.</li>
			</ul>

			<h2>Industry Insights</h2>
			<p>Our research shows that successful vulnerability management programs share common characteristics: they prioritize based on business context, automate repetitive tasks, and integrate security into development workflows.</p>

			<p>Download the full report to access detailed analysis, benchmarks, and actionable recommendations for improving your vulnerability management program.</p>
		`,
		date: "2024-03-10",
		category: "Research",
		image: "/images/elements/newsimage.jpg",
		slug: "vulnerability-management-report-2026",
		author: {
			name: "Dr. Michael Torres",
			role: "Head of Research",
		},
	},
	{
		id: "news3",
		title: "OctiSight Achieves SOC 2 Type II Compliance",
		excerpt:
			"Enterprise customers can now trust OctiSight with their most sensitive security data with our latest certification.",
		content: `
			<p>We're proud to announce that OctiSight has achieved SOC 2 Type II compliance, demonstrating our commitment to maintaining the highest standards of security, availability, and confidentiality for our customers' data.</p>

			<h2>What This Means for You</h2>
			<p>SOC 2 Type II certification validates that our security controls are not only properly designed but also operating effectively over time. This certification provides enterprise customers with the assurance they need to trust OctiSight with their most sensitive security data.</p>

			<h2>Our Security Commitment</h2>
			<p>Security isn't just what we help our customers achieve—it's fundamental to how we operate. Our SOC 2 Type II compliance demonstrates:</p>
			<ul>
				<li>Robust security controls protecting customer data</li>
				<li>Continuous monitoring and improvement of our security posture</li>
				<li>Compliance with industry best practices and standards</li>
				<li>Regular third-party audits validating our security measures</li>
			</ul>

			<p>This certification joins our existing GDPR, HIPAA, and ISO 27001 compliance, providing comprehensive coverage for organizations in regulated industries.</p>
		`,
		date: "2024-03-05",
		category: "Product",
		image: "/images/elements/newsimage.jpg",
		slug: "octisight-soc2-type-ii-compliance",
		author: {
			name: "James Wilson",
			role: "Chief Security Officer",
		},
	},
	{
		id: "news4",
		title: "Introducing AI-Powered Remediation Recommendations",
		excerpt:
			"Our latest feature uses machine learning to provide context-aware fix suggestions, reducing remediation time by 60%.",
		content: `
			<p>Today we're launching AI-Powered Remediation Recommendations, a breakthrough feature that uses machine learning to provide context-aware fix suggestions, reducing remediation time by an average of 60%.</p>

			<h2>The Challenge</h2>
			<p>Security teams spend countless hours researching how to fix vulnerabilities, reading documentation, and testing solutions. This manual process is time-consuming and error-prone, especially for complex vulnerabilities or unfamiliar technologies.</p>

			<h2>Our Solution</h2>
			<p>Our AI analyzes millions of successful vulnerability fixes to provide tailored remediation guidance that considers your specific environment, technology stack, and business context. The system learns from each fix, continuously improving its recommendations.</p>

			<h2>Key Features</h2>
			<ul>
				<li><strong>Context-Aware Suggestions:</strong> Recommendations tailored to your specific environment and constraints.</li>
				<li><strong>Step-by-Step Guidance:</strong> Clear, actionable instructions that anyone can follow.</li>
				<li><strong>Risk Assessment:</strong> Understanding of potential impacts before applying fixes.</li>
				<li><strong>Automated Testing:</strong> Verification that fixes work without breaking functionality.</li>
			</ul>

			<p>This feature is available now to all OctiSight customers at no additional cost.</p>
		`,
		date: "2024-02-28",
		category: "Product",
		image: "/images/elements/newsimage.jpg",
		slug: "ai-powered-remediation-recommendations",
		author: {
			name: "Dr. Emily Zhang",
			role: "VP of Product",
		},
	},
	{
		id: "news5",
		title: "OctiSight Partners with Leading Cloud Providers",
		excerpt:
			"Strategic partnerships with AWS, Azure, and GCP enable seamless integration and enhanced security coverage for enterprise customers.",
		content: `
			<p>We're excited to announce strategic partnerships with Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP), enabling seamless integration and enhanced security coverage for our enterprise customers.</p>

			<h2>Enhanced Cloud Security</h2>
			<p>These partnerships bring native integrations that provide deeper visibility into cloud infrastructure, automated discovery of cloud assets, and real-time vulnerability scanning across all major cloud platforms.</p>

			<h2>What's Included</h2>
			<ul>
				<li>One-click deployment through cloud marketplaces</li>
				<li>Native API integrations for automated asset discovery</li>
				<li>Cloud-specific vulnerability detection and remediation</li>
				<li>Unified dashboard for multi-cloud environments</li>
			</ul>

			<p>These integrations are available now through the AWS Marketplace, Azure Marketplace, and Google Cloud Marketplace.</p>
		`,
		date: "2024-02-20",
		category: "Partnerships",
		image: "/images/elements/newsimage.jpg",
		slug: "cloud-provider-partnerships",
		author: {
			name: "Marcus Rodriguez",
			role: "VP of Partnerships",
		},
	},
	{
		id: "news6",
		title: "Q1 2024 Platform Updates: Enhanced Dashboard and Reporting",
		excerpt:
			"Our latest release includes a redesigned dashboard, advanced reporting capabilities, and improved performance across all modules.",
		content: `
			<p>We're rolling out our Q1 2024 platform updates, featuring a completely redesigned dashboard, advanced reporting capabilities, and significant performance improvements across all modules.</p>

			<h2>New Dashboard</h2>
			<p>Our redesigned dashboard provides at-a-glance insights into your security posture with customizable widgets, real-time metrics, and intelligent alerts that help you focus on what matters most.</p>

			<h2>Advanced Reporting</h2>
			<p>New reporting capabilities include:</p>
			<ul>
				<li>Custom report builder with drag-and-drop interface</li>
				<li>Scheduled report delivery via email</li>
				<li>Executive summaries with trend analysis</li>
				<li>Compliance-focused reports for SOC 2, ISO 27001, and more</li>
			</ul>

			<h2>Performance Improvements</h2>
			<p>We've optimized our platform for speed, with 50% faster scan times, 3x faster report generation, and improved responsiveness across the entire application.</p>

			<p>These updates are rolling out automatically to all customers over the next week.</p>
		`,
		date: "2024-02-15",
		category: "Product",
		image: "/images/elements/newsimage.jpg",
		slug: "q1-2024-platform-updates",
		author: {
			name: "Alex Kumar",
			role: "Head of Engineering",
		},
	},
];
