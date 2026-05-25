import HeroSection from "@/components/sections/home/HeroSection";
import AboutSection from "@/components/sections/home/AboutSection";
import FeaturesSection from "@/components/sections/home/FeaturesSection";
import WhySection from "@/components/sections/home/WhySection";
import HowItWorksSection from "@/components/sections/home/HowItWorksSection";
import BenefitsSection from "@/components/sections/home/BenefitsSection";
import UseCasesSection from "@/components/sections/home/UseCasesSection";
import MidCTASection from "@/components/sections/home/MidCTASection";
import PricingSection from "@/components/sections/home/PricingSection";
import ObjectionHandlingSection from "@/components/sections/home/ObjectionHandlingSection";
import ContactSection from "@/components/sections/contact/ContactSection";
import EarlyAccessPricingSection from "@/components/sections/home/EarlyAccessPricingSection";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ReviewsSection from "@/components/sections/home/ReviewsSection";
import FAQSection from "@/components/sections/home/FAQSection";
import LatestBlogsSection from "@/components/sections/home/LatestBlogsSection";

export const revalidate = 300;

export default function Home() {
	return (
		<div className="bg-background">
			<Navbar />
			<HeroSection />
			<AboutSection />
			<HowItWorksSection />
			<FeaturesSection />
			<WhySection />
			<BenefitsSection />
			<UseCasesSection />
			<MidCTASection />
			<ObjectionHandlingSection />
			<PricingSection />
			<EarlyAccessPricingSection />
			<ReviewsSection />
			<FAQSection />
			<ContactSection />
			<LatestBlogsSection />
			<Footer />
		</div>
	);
}
