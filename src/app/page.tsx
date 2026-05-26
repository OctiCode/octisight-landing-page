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

export const revalidate = 60;

export default async function Home() {
	// SSR first paint with real numbers; the client poll takes over for "live".
	const initialStats = await fetchLandingStats();

	return (
		<div className="bg-background">
			<Navbar />
			<LandingStatsProvider initialStats={initialStats}>
				<HeroSection />
				<HowItWorksSection />
				<ProblemSection />
				<GetStartedSection />

				<FeaturesSection />
				<FAQSection />
				<ContactSection />
			</LandingStatsProvider>
			<Footer />
		</div>
	);
}
