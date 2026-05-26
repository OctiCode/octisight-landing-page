import HeroSection from "@/components/sections/home/HeroSection";
import FeaturesSection from "@/components/sections/home/FeaturesSection";
import HowItWorksSection from "@/components/sections/home/HowItWorksSection";
import ProblemSection from "@/components/sections/home/ProblemSection";
import ContactSection from "@/components/sections/contact/ContactSection";
import GetStartedSection from "@/components/sections/home/GetStartedSection";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FAQSection from "@/components/sections/home/FAQSection";

export const revalidate = 300;

export default function Home() {
	return (
		<div className="bg-background">
			<Navbar />
			<HeroSection />
			<HowItWorksSection />
			<ProblemSection />
			<GetStartedSection />

			<FeaturesSection />
			<FAQSection />
			<ContactSection />
			<Footer />
		</div>
	);
}
