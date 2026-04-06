import { CheckCircle2 } from "lucide-react";
import StepMockupImage from "@/components/ui/custom/StepMockupImage";
import { howItWorksContent } from "@/content/howItWorks";

/**
 * Shared step-by-step rendering used by both:
 *  - /how-it-works page  (StepsSection)
 *  - Home page           (HowItWorksSection)
 *
 * Accepts an optional `firstStepPriority` flag so the home page can defer
 * all image loads (below the fold), while the dedicated page can preload step 1.
 */
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
								{/* ─── Text ─── */}
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

									<ul className="flex flex-col gap-2.5 sm:gap-3" role="list">
										{step.bullets.map((bullet) => (
											<li
												key={bullet}
												className="flex items-center gap-2.5 sm:gap-3"
											>
												<CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
												<span className="text-sm sm:text-base text-text/80">
													{bullet}
												</span>
											</li>
										))}
									</ul>
								</div>

								{/* ─── Mockup ─── */}
								<div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-none">
									<StepMockupImage
										src={step.mockupImage}
										alt={step.mockupAlt}
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
