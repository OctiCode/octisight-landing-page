import { Clock, Lock, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { benefitsSection } from "@/content/home";

const iconMap: Record<string, LucideIcon> = {
	ShieldCheck,
	Clock,
	Lock,
	Zap,
};

export default function BenefitsSection() {
	return (
		<section className="relative w-full py-10 sm:py-14 md:py-16 lg:py-20">
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
				{/* ─── Header ─── */}
				<div className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
					<div className="inline-flex">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							{benefitsSection.headerTitle}
						</span>
					</div>

					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-3xl">
						{benefitsSection.title}
					</h2>
				</div>

				{/* ─── Grid ─── */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
					{benefitsSection.blocks.map((block) => {
						const Icon = iconMap[block.icon];

						return (
							<div
								key={block.id}
								className="group relative bg-linear-to-br from-primary/10 to-contrast/20 backdrop-blur-sm border border-light-contrast/40 rounded-2xl p-5 sm:p-6 md:p-7 hover:border-light-contrast/80 hover:from-primary/15 hover:to-contrast/25 transition-all duration-300"
							>
								<div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-4 sm:mb-5 group-hover:border-accent/60 transition-colors duration-300">
									<Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
								</div>

								<h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
									{block.title}
								</h3>

								<p className="text-xs sm:text-sm text-text/70 leading-relaxed">
									{block.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
