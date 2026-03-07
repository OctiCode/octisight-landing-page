"use client";

import { platformFeaturesSection } from "@/content/home";
import {
	Shield,
	Scan,
	Target,
	Zap,
	BarChart3,
	Users,
	ArrowUpRight,
} from "lucide-react";

const iconMap = {
	Shield,
	Scan,
	Target,
	Zap,
	BarChart3,
	Users,
};

export default function FeaturesSection() {
	return (
		<section className="relative w-full min-h-[calc(100vh-4rem)] sm:h-auto py-8 sm:py-10">
			{/* Content Container */}
			<div className="relative z-10 mx-auto max-w-7xl h-full px-6 flex items-center">
				<div className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full text-center py-4">
					{/* Badge */}
					<div className="inline-flex">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							{platformFeaturesSection.headerTitle}
						</span>
					</div>

					{/* Main Heading */}
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white max-w-4xl">
						{platformFeaturesSection.title}
					</h2>

					{/* Description */}
					<p className="text-base sm:text-lg text-text/90 max-w-3xl leading-relaxed">
						{platformFeaturesSection.paragraph}
					</p>

					{/* Features Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full mt-4 sm:mt-6">
						{platformFeaturesSection.features.map((feature) => {
							const IconComponent =
								iconMap[feature.icon as keyof typeof iconMap];

							return (
								<div
									key={feature.id}
									className="group relative bg-gradient-to-br from-primary/10 to-contrast/20 backdrop-blur-sm border-[1px] border-light-contrast/40 rounded-xl p-6 hover:border-light-contrast/80 hover:from-primary/15 hover:to-contrast/25 transition-all duration-300"
								>
									{/* Icon */}
									<div className="mb-4">
										<div className="w-12 h-12 rounded-lg bg-transparent border-2 border-light-contrast/30 flex items-center justify-center">
											<IconComponent className="w-6 h-6 text-light-contrast" />
										</div>
									</div>

									{/* Title */}
									<h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 text-left uppercase tracking-wide">
										{feature.title}
									</h3>

									{/* Description */}
									<p className="text-sm text-text/70 leading-relaxed mb-6 text-left">
										{feature.description}
									</p>

									{/* Read More Link */}
									<button
										type="button"
										className="flex cursor-pointer items-center gap-2 text-white hover:text-light-contrast transition-colors duration-300 text-sm font-semibold"
									>
										<span>Read more</span>
										<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
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
