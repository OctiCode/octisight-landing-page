import HeroSection from "@/components/sections/home/HeroSection";
import AboutSection from "@/components/sections/home/AboutSection";
import FeaturesSection from "@/components/sections/home/FeaturesSection";
import WhySection from "@/components/sections/home/WhySection";
import PricingSection from "@/components/sections/home/PricingSection";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Home() {
	return (
		<div className="bg-background">
			<Navbar />
			<HeroSection />
			<AboutSection />
			<FeaturesSection />
			<WhySection />
			<PricingSection />
			<Footer />
		</div>
	);
}
