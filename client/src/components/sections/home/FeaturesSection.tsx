"use client";

import { platformFeaturesSection } from "@/content/home";
import type { LucideIcon } from "lucide-react";
import {
	ArrowUpRight,
	BarChart3,
	Scan,
	Shield,
	Target,
	Users,
	Zap,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
	Shield,
	Scan,
	Target,
	Zap,
	BarChart3,
	Users,
};

export default function FeaturesSection() {
	return (
		<section className="relative w-full min-h-[calc(100vh-4rem)] sm:h-auto py-6 sm:py-8 md:py-10">
			<div className="relative z-10 mx-auto max-w-7xl h-full px-4 sm:px-6 flex items-center">
				<div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full text-center py-3 sm:py-4">
					<div className="inline-flex">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							{platformFeaturesSection.headerTitle}
						</span>
					</div>

					<h2 className="text-2xl my-3 sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-4xl">
						{platformFeaturesSection.title}
					</h2>

					<p className="text-sm sm:text-base md:text-lg text-text/90 max-w-3xl leading-relaxed px-2">
						{platformFeaturesSection.paragraph}
					</p>

					<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 w-full mt-3 sm:mt-4 md:mt-6">
						{platformFeaturesSection.features.map((feature) => {
							const IconComponent = iconMap[feature.icon];

							return (
								<div
									key={feature.id}
									className="group relative bg-gradient-to-br from-primary/10 to-contrast/20 backdrop-blur-sm border-[1px] border-light-contrast/40 rounded-xl p-4 sm:p-5 md:p-6 hover:border-light-contrast/80 hover:from-primary/15 hover:to-contrast/25 transition-all duration-300"
								>
									<div className="mb-3 sm:mb-4">
										<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-transparent border-2 border-light-contrast/30 flex items-center justify-center">
											<IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-light-contrast" />
										</div>
									</div>

									<h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-2.5 text-left uppercase tracking-wide">
										{feature.title}
									</h3>

									<p className="text-xs sm:text-sm text-text/70 leading-relaxed mb-4 sm:mb-6 text-left">
										{feature.description}
									</p>

									<button
										type="button"
										className="flex cursor-pointer items-center gap-1 sm:gap-2 text-white hover:text-light-contrast transition-colors duration-300 text-xs sm:text-sm font-semibold"
									>
										<span>Read more</span>
										<ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
									</button>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
