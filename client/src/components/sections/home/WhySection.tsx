"use client";

import { whyOctiSightSection } from "@/content/home";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function WhySection() {
	return (
		<section className="relative w-full min-h-[calc(100vh-4rem)] sm:h-auto py-8 sm:py-10">
			<div className="relative z-10 mx-auto max-w-7xl h-full px-6 flex items-center">
				<div className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full text-center py-4">
					<div className="inline-flex">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							{whyOctiSightSection.headerTitle}
						</span>
					</div>

					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white max-w-4xl">
						{whyOctiSightSection.title}
					</h2>

					<p className="text-base sm:text-lg text-text/90 max-w-3xl leading-relaxed">
						{whyOctiSightSection.paragraph}
					</p>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full mt-4 sm:mt-6 items-center">
						<div className="flex flex-col gap-3 sm:gap-4">
							{whyOctiSightSection.cards.map((card) => (
								<div
									key={card.id}
									className="group relative bg-gradient-to-br from-primary/10 to-contrast/20 backdrop-blur-sm border-1 border-light-contrast/40 rounded-xl p-5 hover:border-light-contrast/80 hover:from-primary/15 hover:to-contrast/25 transition-all duration-300"
								>
									<h3 className="text-base sm:text-lg font-bold text-white mb-2 text-left uppercase tracking-wide">
										{card.title}
									</h3>

									<p className="text-xs sm:text-sm text-text/70 leading-relaxed mb-3 text-left">
										{card.paragraph}
									</p>

									<button
										type="button"
										className="flex cursor-pointer items-center gap-2 text-white hover:text-light-contrast transition-colors duration-300 text-xs sm:text-sm font-semibold"
									>
										<span>Read more</span>
										<ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
									</button>
								</div>
							))}
						</div>

						<div className="relative flex items-center justify-center">
							<Image
								src="/images/elements/guardicon.png"
								alt="Security Shield"
								width={600}
								height={600}
								className="w-full max-w-lg h-auto drop-shadow-2xl"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
