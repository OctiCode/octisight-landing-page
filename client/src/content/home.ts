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
	headerTitle: "Next-Generation Cybersecurity",
	title: "Security, From Insight to Action",
	paragraph:
		"Modern vulnerability management powered by AI. Get complete visibility, contextual intelligence, and actionable remediation guidance—all in one platform.",
	buttons: {
		primary: {
			text: "Get Started Free →",
			href: "/signup",
			variant: "primary" as const,
		},
		secondary: {
			text: "See how it works",
			href: "/how-it-works",
			variant: "secondary" as const,
		},
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
		path: "/assets/videos/octisight-video.mp4",
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
			question: "How long does it take to set up OctiSight?",
			answer:
				"Most teams are up and running within 30 minutes. Our guided onboarding process walks you through connecting your first assets, and our support team is available to help if needed.",
		},
		{
			id: "faq2",
			question: "Do you offer a free trial?",
			answer:
				"Yes! We offer a 14-day free trial with full access to all features. No credit card required to start, and you can cancel anytime during or after the trial period.",
		},
		{
			id: "faq3",
			question: "What integrations does OctiSight support?",
			answer:
				"OctiSight integrates with popular tools including Jira, Slack, GitHub, GitLab, AWS, Azure, GCP, and many more. Enterprise plans include custom integration support and full API access.",
		},
		{
			id: "faq4",
			question: "Is my data secure with OctiSight?",
			answer:
				"Absolutely. We use bank-level encryption (AES-256) for data at rest and TLS 1.3 for data in transit. We're SOC 2 Type II certified and compliant with GDPR, HIPAA, and ISO 27001 standards.",
		},
		{
			id: "faq5",
			question: "Can I upgrade or downgrade my plan?",
			answer:
				"Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades will be applied at the start of your next billing cycle. No penalties for changing plans.",
		},
		{
			id: "faq6",
			question: "What kind of support do you provide?",
			answer:
				"All plans include email support. Professional plans get priority support with faster response times. Enterprise customers receive dedicated support with a named account manager and 24/7 emergency support.",
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
	headerTitle: "Blog",
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
 * COMPLETE HOME CONTENT EXPORT
 * ───────────────────────────────────────────────────────────────────────────
 * Aggregated content object for easy import
 */
export const homeContent = {
	hero: heroSection,
	about: aboutSection,
	platformFeatures: platformFeaturesSection,
	whyOctiSight: whyOctiSightSection,
	pricing: pricingSection,
	customerReviews: customerReviewsSection,
	faq: faqSection,
	latestNews: latestNewsSection,
	blog: blogSection,
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
export type PricingSection = typeof pricingSection;
export type CustomerReviewsSection = typeof customerReviewsSection;
export type FAQSection = typeof faqSection;
export type LatestNewsSection = typeof latestNewsSection;
export type BlogSection = typeof blogSection;
