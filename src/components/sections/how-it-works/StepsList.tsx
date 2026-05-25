import StepImage from "@/components/ui/custom/StepImage";
import { howItWorksContent } from "@/content/howItWorks";

interface StepsListProps {
	firstStepPriority?: boolean;
}

export default function StepsList({
	firstStepPriority = false,
}: StepsListProps) {
	const { steps } = howItWorksContent;

	return (
		<>
			{steps.map((step, index) => {
				const isEven = index % 2 === 1;

				return (
					<section
						key={step.id}
						id={`step-${step.id}`}
						className="relative w-full py-10 sm:py-14 md:py-16 lg:py-20"
						aria-label={`Step ${step.number}: ${step.badge}`}
					>
						<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-light-contrast/20 to-transparent" />

						<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
							<div
								className={`flex flex-col ${
									isEven ? "lg:flex-row-reverse" : "lg:flex-row"
								} items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16`}
							>
								<div className="flex-1 w-full">
									<div className="flex items-center gap-3 mb-4 sm:mb-5">
										<span
											className="text-4xl sm:text-5xl md:text-6xl font-black text-light-contrast/15 leading-none select-none"
											aria-hidden="true"
										>
											{step.number}
										</span>
										<span className="px-3 py-1.5 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-xs sm:text-sm font-book backdrop-blur-sm">
											{step.badge}
										</span>
									</div>

									<h3 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white mb-3 sm:mb-4">
										{step.title}
									</h3>

									<p className="text-sm sm:text-base md:text-lg text-text/80 leading-relaxed mb-5 sm:mb-6 max-w-lg">
										{step.description}
									</p>
								</div>

								<div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-none">
									<StepImage
										src={step.image}
										alt={step.imageAlt }
										priority={index === 0 && firstStepPriority}
									/>
								</div>
							</div>
						</div>
					</section>
				);
			})}
		</>
	);
}
