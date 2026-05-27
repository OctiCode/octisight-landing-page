import type { Metadata } from "next";
import HeroSection from "@/components/sections/home/HeroSection";
import FeaturesSection from "@/components/sections/home/FeaturesSection";
import HowItWorksSection from "@/components/sections/home/HowItWorksSection";
import ProblemSection from "@/components/sections/home/ProblemSection";
import ContactSection from "@/components/sections/contact/ContactSection";
import GetStartedSection from "@/components/sections/home/GetStartedSection";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FAQSection from "@/components/sections/home/FAQSection";
import { LandingStatsProvider } from "@/components/providers/LandingStatsProvider";
import { fetchLandingStats } from "@/lib/landing-stats";
import { faqSection } from "@/content/home";
import { JsonLd } from "@/components/seo/JsonLd";
import {
	faqPageSchema,
	softwareApplicationSchema,
} from "@/lib/structured-data";
import { localeAlternates } from "@/lib/i18n";

export const revalidate = 60;

export const metadata: Metadata = {
	// `absolute` because the root page isn't a child segment, so the layout's
	// "%s | OctiSight" template doesn't apply here — we add the brand ourselves.
	title: { absolute: "Vulnerability Management for Small Teams | OctiSight" },
	description:
		"OctiSight scans your repos, prioritizes the CVEs attackers actually exploit (CISA KEV + EPSS), and ships step-by-step AI remediation — vulnerability management for teams of 5–50, no security engineer required.",
	alternates: localeAlternates("/"),
	openGraph: {
		url: "/",
		title: "Vulnerability Management for Small Teams | OctiSight",
		description:
			"Scan your repos, see only what attackers actually exploit, and fix it with AI remediation. Findings in 90 seconds — no security engineer required.",
	},
};

export default async function Home() {
	// SSR first paint with real numbers; the client poll takes over for "live".
	const initialStats = await fetchLandingStats();

	return (
		<div className="bg-background">
			<JsonLd
				schema={[
					softwareApplicationSchema(),
					faqPageSchema(
						faqSection.faqs.map((f) => ({
							question: f.question,
							answer: f.answer,
						})),
					),
				]}
			/>
			<Navbar />
			<main id="main-content" tabIndex={-1} className="focus:outline-none">
				<LandingStatsProvider initialStats={initialStats}>
					<HeroSection />
					<HowItWorksSection />
					<ProblemSection />
					<GetStartedSection />

					<FeaturesSection />
					<FAQSection />
					<ContactSection />
				</LandingStatsProvider>
			</main>
			<Footer />
		</div>
	);
}
