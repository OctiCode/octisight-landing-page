import HeroSection from "@/components/sections/home/HeroSection";
import AboutSection from "@/components/sections/home/AboutSection";
import FeaturesSection from "@/components/sections/home/FeaturesSection";
import WhySection from "@/components/sections/home/WhySection";
import PricingSection from "@/components/sections/home/PricingSection";
import CTASection from "@/components/sections/home/CTASection";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ReviewsSection from "@/components/sections/home/ReviewsSection";
import FAQSection from "@/components/sections/home/FAQSection";
import LatestNewsSection from "@/components/sections/home/LatestNewsSection";
import LatestBlogsSection from "@/components/sections/home/LatestBlogsSection";

export const revalidate = 300;

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
			<FAQSection />
			<LatestNewsSection />
			<LatestBlogsSection />
			<CTASection />
			<Footer />
		</div>
	);
}
