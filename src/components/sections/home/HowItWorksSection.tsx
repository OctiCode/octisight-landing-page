import { howItWorksContent } from "@/content/howItWorks";
import StepsList from "@/components/sections/how-it-works/StepsList";

export default function HowItWorksSection() {
	const { hero } = howItWorksContent;

	return (
		<section
			id="how-it-works"
			aria-labelledby="how-it-works-heading"
			className="relative w-full"
		>
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 text-center">
				<div className="inline-flex mb-4">
					<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
						{hero.badge}
					</span>
				</div>

				<h2
					id="how-it-works-heading"
					className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-4xl mx-auto mb-4"
				>
					{hero.title}
				</h2>

				<p className="text-sm sm:text-base md:text-lg text-text/80 max-w-2xl mx-auto leading-relaxed">
					{hero.description}
				</p>
			</div>

			<StepsList firstStepPriority={false} />
		</section>
	);
}
