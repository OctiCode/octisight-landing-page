/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HOME PAGE CONTENT CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This file contains all content for the OctiSight landing page.
 * Organized by sections for easy maintenance and localization.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * ───────────────────────────────────────────────────────────────────────────
 * HERO SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Primary landing section - First impression for visitors
 * Contains main value proposition and primary CTAs
 */
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
			href: "#about",
			variant: "secondary" as const,
		},
	},
	dashboardImage: {
		src: "/images/dashboard/screenshot-vulns.png",
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

/**
 * ───────────────────────────────────────────────────────────────────────────
 * ABOUT SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Company mission and introduction
 * Includes video demonstration
 */
export const aboutSection = {
	headerTitle: "About OctiSight",
	title: "Security that's human-first",
	paragraph:
		"We're on a mission to make cybersecurity accessible, understandable, and actionable for teams of all sizes and skill levels.",
	video: {
		path: "/assets/videos/octisight-pitch.mp4",
		poster: "/assets/images/video-poster.jpg", // Optional: Add poster image
		alt: "OctiSight platform demonstration",
	},
} as const;

/**
 * ───────────────────────────────────────────────────────────────────────────
 * PLATFORM FEATURES SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Core platform capabilities and features
 * Grid layout with icon-based feature cards
 */
export const platformFeaturesSection = {
	headerTitle: "Platform Features",
	title: "Everything you need to secure your infrastructure",
	paragraph:
		"From detection to remediation, OctiSight provides a complete security platform that grows with your organization.",
	features: [
		{
			id: "ft1",
			icon: "Shield", // Lucide icon name
			title: "AI-Powered Detection",
			description:
				"Advanced machine learning algorithms identify vulnerabilities before they become threats.",
		},
		{
			id: "ft2",
			icon: "Scan",
			title: "Continuous Monitoring",
			description:
				"Real-time scanning and monitoring across your entire infrastructure, 24/7.",
		},
		{
			id: "ft3",
			icon: "Target",
			title: "Contextual Intelligence",
			description:
				"Understand the business impact of each vulnerability with contextual risk scoring.",
		},
		{
			id: "ft4",
			icon: "Zap",
			title: "Automated Remediation",
			description:
				"Get actionable remediation guidance and automate fixes where possible.",
		},
		{
			id: "ft5",
			icon: "BarChart3",
			title: "Comprehensive Reporting",
			description:
				"Executive dashboards and detailed reports for compliance and stakeholder communication.",
		},
		{
			id: "ft6",
			icon: "Users",
			title: "Team Collaboration",
			description:
				"Seamless workflows for security teams to prioritize, assign, and track remediation.",
		},
	],
} as const;

/**
 * ───────────────────────────────────────────────────────────────────────────
 * WHY OCTISIGHT SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Value propositions and differentiators
 * Highlights what makes OctiSight unique
 */
export const whyOctiSightSection = {
	headerTitle: "Why OctiSight",
	title: "Security that makes sense",
	paragraph: "We believe security should empower teams, not overwhelm them.",
	cards: [
		{
			id: "why1",
			title: "Built for Teams",
			paragraph:
				"Designed with collaboration in mind. From security analysts to developers, everyone gets the context they need to act fast.",
		},
		{
			id: "why2",
			title: "AI That Actually Helps",
			paragraph:
				"No more alert fatigue. Our AI prioritizes what matters, reduces false positives, and provides clear remediation paths.",
		},
		{
			id: "why3",
			title: "Scale with Confidence",
			paragraph:
				"Whether you're a startup or an enterprise, OctiSight grows with you. One platform, unlimited potential.",
		},
	],
} as const;

/**
 * ───────────────────────────────────────────────────────────────────────────
 * OBJECTION HANDLING SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Q&A format addressing the most common concerns
 */
export const objectionHandlingSection = {
	headerTitle: "Objection Handling",
	title: "You don't need to be a cybersecurity expert",
	items: [
		{
			id: "obj1",
			question: "Is this complicated to set up?",
			answerOpener: "No,",
			answerRest: "you can connect your systems in minutes.",
		},
		{
			id: "obj2",
			question: "Do I need a security team?",
			answerOpener: "No,",
			answerRest: "OctiSight is designed for non-experts.",
		},
		{
			id: "obj3",
			question: "Will I get overwhelmed with alerts?",
			answerOpener: "No,",
			answerRest: "we filter and prioritize only what matters.",
		},
		{
			id: "obj4",
			question: "Is my data secure?",
			answerOpener: "Yes,",
			answerRest: "security and privacy are built into everything we do.",
		},
	],
} as const;

/**
 * ───────────────────────────────────────────────────────────────────────────
 * USE CASES SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Audience segments — who OctiSight is built for
 */
export const useCasesSection = {
	headerTitle: "Use Cases",
	title: "Built for modern businesses",
	cases: [
		{
			id: "smb",
			icon: "Building2",
			audience: "SMBs & Founders",
			description: "Stay secure without hiring a full security team.",
		},
		{
			id: "it-managers",
			icon: "Monitor",
			audience: "IT Managers",
			description: "Get clear visibility without wasting time on noise.",
		},
		{
			id: "startups",
			icon: "Rocket",
			audience: "Startups & SaaS",
			description: "Scale fast without compromising security.",
		},
		{
			id: "agencies",
			icon: "Users2",
			audience: "Agencies & Service Providers",
			description: "Protect your clients and your reputation.",
		},
	],
} as const;

/**
 * ───────────────────────────────────────────────────────────────────────────
 * BENEFITS SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Core business value props — why OctiSight matters for the customer
 */
export const benefitsSection = {
	headerTitle: "Why OctiSight",
	title: "Focus on growth, we handle the risk.",
	blocks: [
		{
			id: "reduce-exposure",
			icon: "ShieldCheck",
			title: "Reduce your exposure",
			description: "Identify and fix the vulnerabilities that actually matter.",
		},
		{
			id: "save-time",
			icon: "Clock",
			title: "Save time",
			description: "No more manual analysis or reading complex reports.",
		},
		{
			id: "avoid-incidents",
			icon: "Lock",
			title: "Avoid costly incidents",
			description: "Prevent breaches before they happen.",
		},
		{
			id: "stay-focused",
			icon: "Zap",
			title: "Stay focused on your business",
			description: "Security becomes simple, not a distraction.",
		},
	],
} as const;

/**
 * ───────────────────────────────────────────────────────────────────────────
 * PRICING SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Pricing tiers and plan details
 * Includes trial information and feature comparison
 */
export const pricingSection = {
	headerTitle: "Simple, Transparent Pricing",
	title: "Security for teams of all sizes",
	paragraph:
		"Start with a 14-day free trial. No credit card required. Cancel anytime.",
	plans: [
		{
			id: "starter",
			target: "Starter",
			description: "For small teams getting started with security",
			price: {
				amount: 49,
				currency: "USD",
				period: "month",
				billingCycle: "monthly",
			},
			features: [
				"Up to 10 assets",
				"Basic vulnerability scanning",
				"Email support",
				"7-day data retention",
				"Community access",
			],
			cta: {
				text: "Start Free Trial",
				href: "/signup?plan=starter",
			},
			highlighted: false,
		},
		{
			id: "professional",
			target: "Professional",
			description: "For growing teams with advanced security needs",
			price: {
				amount: 199,
				currency: "USD",
				period: "month",
				billingCycle: "monthly",
			},
			features: [
				"Up to 100 assets",
				"Advanced AI-powered scanning",
				"Priority support",
				"90-day data retention",
				"Custom integrations",
				"Team collaboration tools",
				"Compliance reporting",
			],
			cta: {
				text: "Start Free Trial",
				href: "/signup?plan=professional",
			},
			highlighted: true,
		},
		{
			id: "enterprise",
			target: "Enterprise",
			description: "For organizations requiring enterprise-grade security",
			price: {
				amount: null, // Custom pricing
				currency: "USD",
				period: "month",
				billingCycle: "custom",
				customLabel: "Custom",
			},
			features: [
				"Unlimited assets",
				"Full platform access",
				"Dedicated support team",
				"Unlimited data retention",
				"Custom integrations & API",
				"Advanced team management",
				"SLA guarantees",
				"On-premise deployment option",
			],
			cta: {
				text: "Contact Sales",
				href: "/contact?inquiry=enterprise",
			},
			highlighted: false,
		},
	],
} as const;

/**
 * ───────────────────────────────────────────────────────────────────────────
 * CUSTOMER REVIEWS SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Social proof and testimonials
 * Builds trust through customer success stories
 */
export const customerReviewsSection = {
	headerTitle: "Customer Reviews",
	title: "Trusted by security leaders",
	paragraph:
		"See how organizations like yours are using OctiSight to secure their infrastructure.",
	reviews: [
		{
			id: "review1",
			message:
				"OctiSight transformed how we approach security. The AI-powered insights helped us reduce our vulnerability backlog by 70% in just three months.",
			username: "Sarah Chen",
			role: "CISO",
			company: "TechCorp International",
			avatar: "/assets/images/avatars/sarah-chen.jpg",
			rating: 5,
		},
		{
			id: "review2",
			message:
				"Finally, a security platform that our entire team can use. The contextual intelligence makes prioritization effortless.",
			username: "Marcus Rodriguez",
			role: "Head of Security",
			company: "FinanceSecure Ltd",
			avatar: "/assets/images/avatars/marcus-rodriguez.jpg",
			rating: 5,
		},
		{
			id: "review3",
			message:
				"The automated remediation guidance saved us countless hours. OctiSight pays for itself in time savings alone.",
			username: "Emily Watson",
			role: "Security Engineer",
			company: "CloudNative Systems",
			avatar: "/assets/images/avatars/emily-watson.jpg",
			rating: 5,
		},
	],
} as const;

/**
 * ───────────────────────────────────────────────────────────────────────────
 * FAQ SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Frequently asked questions
 * Addresses common concerns and queries
 */
export const faqSection = {
	headerTitle: "FAQ",
	title: "Frequently asked questions",
	paragraph: "Have a question not answered here? Contact our sales team.",
	contactCta: {
		text: "Contact Sales",
		href: "/contact",
	},
	faqs: [
		{
			id: "faq1",
			question: "What systems can I connect?",
			answer:
				"Modern applications, infrastructure, and environments (expand later)",
		},
		{
			id: "faq2",
			question: "How fast does it work?",
			answer: "You get insights within minutes of connection.",
		},
		{
			id: "faq3",
			question: "Is this suitable for non-technical users?",
			answer: "Yes explanations adapt to your level.",
		},
	],
} as const;

/**
 * ───────────────────────────────────────────────────────────────────────────
 * LATEST NEWS SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Company news and announcements
 * Content fetched dynamically from API
 */
export const latestNewsSection = {
	headerTitle: "Latest News",
	title: "Stay updated with OctiSight news",
	paragraph: "Industry insights, product updates, and company announcements.",
	cta: {
		text: "View All News",
		href: "/news",
	},
	apiEndpoint: "/api/news",
	displayLimit: 3,
} as const;

/**
 * ───────────────────────────────────────────────────────────────────────────
 * BLOG SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Educational content and thought leadership
 * Content fetched dynamically from API
 */
export const blogSection = {
	headerTitle: "Blogs & News",
	title: "Security insights and best practices",
	paragraph:
		"Expert articles on vulnerability management, security trends, and OctiSight features.",
	cta: {
		text: "View All Articles",
		href: "/blog",
	},
	apiEndpoint: "/api/blog",
	displayLimit: 3,
} as const;

/**
 * ───────────────────────────────────────────────────────────────────────────
 * FOOTER SECTION
 * ───────────────────────────────────────────────────────────────────────────
 * Site footer with navigation, company info, and social links
 */
export const footerSection = {
	logo: {
		src: "/images/logo/octisight-white-logo.png",
		alt: "OctiSight",
	},
	tagline:
		"Security, From Insight to Action. Modern cybersecurity that's human-first, intelligent, and built for teams of all sizes.",
	navigation: {
		product: {
			title: "Platform",
			links: [
				{ text: "How It Works", href: "/how-it-works" },
				{ text: "Pricing", href: "/#pricing" },
				{ text: "Blog", href: "/blog" },
			],
		},
		company: {
			title: "Company",
			links: [
				{ text: "About Us", href: "/#about" },
				{ text: "Contact", href: "/#contact" },
			],
		},
		resources: {
			title: "Get Started",
			links: [
				{ text: "Create Account", href: "/signup" },
				{ text: "Book a Demo", href: "/demo" },
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

/**
 * ───────────────────────────────────────────────────────────────────────────
 * COMPLETE HOME CONTENT EXPORT
 * ───────────────────────────────────────────────────────────────────────────
 * Aggregated content object for easy import
 */
export const homeContent = {
	hero: heroSection,
	about: aboutSection,
	platformFeatures: platformFeaturesSection,
	whyOctiSight: whyOctiSightSection,
	benefits: benefitsSection,
	pricing: pricingSection,
	customerReviews: customerReviewsSection,
	faq: faqSection,
	latestNews: latestNewsSection,
	blog: blogSection,
	footer: footerSection,
} as const;

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TYPE EXPORTS
 * ═══════════════════════════════════════════════════════════════════════════
 * TypeScript type definitions for type-safe content usage
 */
export type HomeContent = typeof homeContent;
export type HeroSection = typeof heroSection;
export type AboutSection = typeof aboutSection;
export type PlatformFeaturesSection = typeof platformFeaturesSection;
export type WhyOctiSightSection = typeof whyOctiSightSection;
export type BenefitsSection = typeof benefitsSection;
export type UseCasesSection = typeof useCasesSection;
export type ObjectionHandlingSection = typeof objectionHandlingSection;
export type PricingSection = typeof pricingSection;
export type CustomerReviewsSection = typeof customerReviewsSection;
export type FAQSection = typeof faqSection;
export type LatestNewsSection = typeof latestNewsSection;
export type BlogSection = typeof blogSection;
export type FooterSection = typeof footerSection;
