import HeroSection from "@/components/sections/home/HeroSection";
import AboutSection from "@/components/sections/home/AboutSection";
import FeaturesSection from "@/components/sections/home/FeaturesSection";
import WhySection from "@/components/sections/home/WhySection";
import PricingSection from "@/components/sections/home/PricingSection";
import CTASection from "@/components/sections/home/CTASection";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ReviewsSection from "@/components/sections/home/ReviewsSection";

export default function Home() {
	return (
		<div className="bg-background">
			<Navbar />
			<HeroSection />
			<AboutSection />
			<FeaturesSection />
			<WhySection />
			<PricingSection />
			<ReviewsSection />
			<CTASection />
			<Footer />
		</div>
	);
}
