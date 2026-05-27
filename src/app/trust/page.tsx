import Link from "next/link";
import type { Metadata } from "next";
import {
	ArrowRight,
	BadgeCheck,
	Bug,
	FileSignature,
	type LucideIcon,
	Mail,
	MessageSquare,
	Receipt,
	Server,
	ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LEGAL_DOCS, type LegalSlug } from "@/lib/legal-docs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { localeAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
	// Bare title — the root layout template appends " | OctiSight".
	title: "Trust Center",
	description:
		"Everything an auditor, security reviewer, or buyer needs about OctiSight in one place: security overview, customer agreements, subprocessor list, and our responsible disclosure programme.",
	alternates: localeAlternates("/trust"),
	openGraph: {
		title: "Trust Center | OctiSight",
		description:
			"Security overview, customer agreements, subprocessor list, and responsible disclosure programme.",
		url: "/trust",
	},
	robots: { index: true, follow: true },
};

const SECURITY_INBOX = "security@octisight.com";

type Section = {
	eyebrow: string;
	title: string;
	description: string;
	docs: Array<{ slug: LegalSlug; icon: LucideIcon }>;
};

const SECTIONS: Section[] = [
	{
		eyebrow: "Security & disclosure",
		title: "How we secure your data and how to report a flaw",
		description:
			"Our published security posture and the channel security researchers use to reach us.",
		docs: [
			{ slug: "security", icon: ShieldCheck },
			{ slug: "vdp", icon: Bug },
		],
	},
	{
		eyebrow: "Customer agreements",
		title: "The contracts behind your subscription",
		description:
			"GDPR-aligned data terms, our subprocessor list, the uptime SLA, and how billing works.",
		docs: [
			{ slug: "dpa", icon: FileSignature },
			{ slug: "subprocessors", icon: Server },
			{ slug: "sla", icon: BadgeCheck },
			{ slug: "refunds", icon: Receipt },
		],
	},
];

export default function TrustPage() {
	return (
		<div className="bg-background min-h-screen">
			<JsonLd
				schema={breadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Trust Center", path: "/trust" },
				])}
			/>
			<Navbar />

			<main
				id="main-content"
				tabIndex={-1}
				className="relative w-full pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 focus:outline-none"
			>
				<div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
					{/* Header */}
					<header className="text-center mb-12 sm:mb-14 md:mb-16">
						<div className="inline-flex mb-4 sm:mb-5">
							<span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] uppercase backdrop-blur-sm">
								Trust Center
							</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-white max-w-3xl mx-auto mb-5 sm:mb-6">
							Built for{" "}
							<span className="bg-linear-to-r from-accent via-light-contrast to-accent bg-clip-text text-transparent">
								security reviewers.
							</span>
						</h1>

						<p className="text-sm sm:text-base md:text-lg text-text/75 max-w-2xl mx-auto leading-relaxed">
							Everything an auditor, security reviewer, or enterprise buyer
							needs in one place. No login, no NDA, no enterprise sales call.
						</p>
					</header>

					{/* Sections */}
					<div className="space-y-12 sm:space-y-16">
						{SECTIONS.map((section) => (
							<section key={section.eyebrow} aria-labelledby={`s-${section.eyebrow}`}>
								<div className="mb-6 sm:mb-8">
									<p className="text-[0.65rem] sm:text-xs font-bold tracking-[0.2em] uppercase text-light-contrast mb-2">
										{section.eyebrow}
									</p>
									<h2
										id={`s-${section.eyebrow}`}
										className="text-xl sm:text-2xl md:text-3xl font-black leading-tight text-white max-w-3xl mb-2"
									>
										{section.title}
									</h2>
									<p className="text-sm sm:text-base text-text/65 max-w-2xl leading-relaxed">
										{section.description}
									</p>
								</div>

								<div
									className={`grid gap-3 sm:gap-4 ${
										section.docs.length === 2
											? "grid-cols-1 sm:grid-cols-2"
											: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
									}`}
								>
									{section.docs.map(({ slug, icon: Icon }) => {
										const meta = LEGAL_DOCS[slug];
										return (
											<Link
												key={slug}
												href={`/legal/${slug}`}
												className="group relative flex flex-col h-full rounded-2xl border border-light-contrast/15 bg-white/[0.03] hover:border-accent/50 hover:bg-white/[0.05] p-5 sm:p-6 transition-all duration-300"
											>
												<div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center mb-4">
													<Icon className="w-5 h-5 text-light-contrast" />
												</div>

												<h3 className="text-base sm:text-lg font-bold text-white leading-snug mb-1.5">
													{meta.title}
												</h3>
												<p className="text-xs sm:text-sm text-text/65 leading-relaxed mb-5 flex-1">
													{meta.description}
												</p>

												<span className="flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:text-light-contrast transition-colors duration-300">
													Read
													<ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
												</span>
											</Link>
										);
									})}
								</div>
							</section>
						))}
					</div>

					{/* SOC 2 + Sales CTAs */}
					<section
						aria-labelledby="trust-cta"
						className="mt-14 sm:mt-16 md:mt-20 rounded-2xl border border-light-contrast/15 bg-linear-to-br from-primary/15 via-contrast/10 to-accent/10 p-6 sm:p-8 md:p-10"
					>
						<div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-center">
							<div>
								<h2
									id="trust-cta"
									className="text-xl sm:text-2xl md:text-3xl font-black leading-tight text-white mb-2 sm:mb-3"
								>
									Need a report or something custom?
								</h2>
								<p className="text-sm sm:text-base text-text/75 leading-relaxed max-w-xl">
									Our team is happy to walk through any compliance,
									security, or procurement question.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
								<a
									href={`mailto:${SECURITY_INBOX}?subject=${encodeURIComponent("Report request")}`}
									className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-accent hover:bg-light-contrast text-white text-sm font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300"
								>
									<Mail className="w-4 h-4" />
									Request report
								</a>
								<Link
									href="/#contact"
									className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-transparent border border-light-contrast/40 hover:border-light-contrast/80 hover:bg-primary/10 text-white text-sm font-semibold transition-all duration-300"
								>
									<MessageSquare className="w-4 h-4" />
									Talk to sales
								</Link>
							</div>
						</div>
					</section>

					{/* Security inbox callout */}
					<p className="mt-8 text-center text-xs sm:text-sm text-text/55">
						Reporting a vulnerability? Email{" "}
						<a
							href={`mailto:${SECURITY_INBOX}`}
							className="text-accent hover:text-light-contrast underline underline-offset-2 transition-colors duration-200"
						>
							{SECURITY_INBOX}
						</a>{" "}
						or read our{" "}
						<Link
							href="/legal/vdp"
							className="text-accent hover:text-light-contrast underline underline-offset-2 transition-colors duration-200"
						>
							Responsible Disclosure Policy
						</Link>
						.
					</p>
				</div>
			</main>

			<Footer />
		</div>
	);
}
