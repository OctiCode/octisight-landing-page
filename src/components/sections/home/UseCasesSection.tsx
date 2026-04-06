import {
	Building2,
	Monitor,
	Rocket,
	Users2,
	type LucideIcon,
} from "lucide-react";
import { useCasesSection } from "@/content/home";

const iconMap: Record<string, LucideIcon> = {
	Building2,
	Monitor,
	Rocket,
	Users2,
};

export default function UseCasesSection() {
	return (
		<section className="relative w-full py-10 sm:py-14 md:py-16 lg:py-20">
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
				{/* ─── Header ─── */}
				<div className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-14">
					<div className="inline-flex">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							{useCasesSection.headerTitle}
						</span>
					</div>

					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-3xl">
						{useCasesSection.title}
					</h2>
				</div>

				{/* ─── 2×2 Grid ─── */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
					{useCasesSection.cases.map((item) => {
						const Icon = iconMap[item.icon];

						return (
							<div
								key={item.id}
								className="group relative bg-linear-to-br from-primary/10 to-contrast/20 backdrop-blur-sm border border-light-contrast/40 rounded-2xl p-6 sm:p-7 md:p-8 hover:border-light-contrast/80 hover:from-primary/15 hover:to-contrast/25 transition-all duration-300 overflow-hidden"
							>
								{/* Decorative glow blob */}
								<div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-colors duration-500" />

								{/* Icon */}
								<div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-5 sm:mb-6 group-hover:border-accent/60 group-hover:bg-accent/15 transition-all duration-300">
									<Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
								</div>

								{/* Audience label */}
								<h3 className="relative text-lg sm:text-xl md:text-2xl font-black text-white mb-2 sm:mb-3 leading-snug">
									{item.audience}
								</h3>

								{/* Description */}
								<p className="relative text-sm sm:text-base text-text/70 leading-relaxed">
									{item.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
