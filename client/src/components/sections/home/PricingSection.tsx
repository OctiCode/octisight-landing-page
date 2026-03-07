"use client";

import { pricingSection } from "@/content/home";
import { Check, Database, User } from "lucide-react";
import Link from "next/link";

const PRICING_FEATURES = {
	seats: "4 free seats available",
	storage: "1GB of cloud storage",
	dividerLabel: "Turquoise Trek +",
} as const;

export default function PricingSection() {
	return (
		<section className="relative w-full min-h-[calc(100vh-4rem)] sm:h-auto py-6 sm:py-8 md:py-10">
			<div className="relative z-10 mx-auto max-w-7xl h-full px-4 sm:px-6 flex items-center">
				<div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full text-center py-3 sm:py-4">
					<div className="inline-flex">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							{pricingSection.headerTitle}
						</span>
					</div>

					<h2 className="text-2xl sm:text-3xl my-3 md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-4xl">
						{pricingSection.title}
					</h2>

					<p className="text-sm sm:text-base md:text-lg text-text/90 max-w-3xl leading-relaxed px-2">
						{pricingSection.paragraph}
					</p>

					<div className="grid grid-cols-1 py-4 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-6 md:gap-8 lg:gap-10 w-full mt-3 sm:mt-4 md:mt-6">
						{pricingSection.plans.map((plan) => (
							<div
								key={plan.id}
								className={`relative flex flex-col py-10 px-7 sm:px-6 md:px-8 bg-gradient-to-br from-primary/10 to-contrast/20 backdrop-blur-sm border-[1px] rounded-3xl transition-all duration-300 ${
									plan.highlighted
										? "border-accent shadow-md shadow-accent/20 scale-105"
										: "border-light-contrast/40 hover:border-light-contrast/80"
								}`}
							>
								{plan.highlighted && (
									<div className="absolute -top-3 left-1/2 -translate-x-1/2">
										<span className="px-4 py-1 rounded-full bg-accent text-white text-xs font-semibold">
											Most popular
										</span>
									</div>
								)}

								<div className="mb-5 sm:mb-6 md:mb-8">
									<h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
										{plan.target}
									</h3>
									<p className="text-sm text-text/60">{plan.description}</p>
								</div>

								<div className="mb-5 sm:mb-6 md:mb-8">
									{plan.price.amount ? (
										<div className="flex items-baseline gap-1">
											<span className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
												$ {plan.price.amount.toLocaleString()}
											</span>
											<span className="text-text/60 text-sm sm:text-base">
												/{plan.price.period}
											</span>
										</div>
									) : (
										<div className="flex items-baseline gap-1">
											<span className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
												$ {plan.price.customLabel}
											</span>
										</div>
									)}
								</div>

								<Link href={plan.cta.href} className="mb-5 sm:mb-6 md:mb-8">
									<button
										type="button"
										className="w-full cursor-pointer py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-white transition-all duration-300 bg-accent hover:bg-accent/80 shadow-md text-sm sm:text-base"
									>
										{plan.cta.text}
									</button>
								</Link>

								<div className="mb-4 sm:mb-5 md:mb-6">
									<div className="flex items-center gap-3 text-sm text-text/70 mb-3">
										<User className="w-5 h-5 text-text/50" />
										<span>{PRICING_FEATURES.seats}</span>
									</div>
									<div className="flex items-center gap-3 text-sm text-text/70">
										<Database className="w-5 h-5 text-text/50" />
										<span>{PRICING_FEATURES.storage}</span>
									</div>
								</div>

								<div className="relative my-4 sm:my-5 md:my-6">
									<div className="absolute inset-0 flex items-center">
										<div className="w-full border-t border-light-contrast/20" />
									</div>
									<div className="relative flex justify-center">
										<span className="px-4 text-xs text-text/40 bg-gradient-to-br from-primary/10 to-contrast/20 uppercase tracking-wider">
											{PRICING_FEATURES.dividerLabel}
										</span>
									</div>
								</div>

								<div className="flex-1">
									<ul className="space-y-3">
										<li className="flex items-start gap-3 text-sm text-text/70">
											<Check className="w-5 h-5 text-text/50 flex-shrink-0 mt-0.5" />
											<span>Up to 50 assets</span>
										</li>
										<li className="flex items-start gap-3 text-sm text-text/70">
											<Check className="w-5 h-5 text-text/50 flex-shrink-0 mt-0.5" />
											<span>Unlimited vulnerabilities</span>
										</li>
										<li className="flex items-start gap-3 text-sm text-text/70">
											<Check className="w-5 h-5 text-text/50 flex-shrink-0 mt-0.5" />
											<span>Basic integrations</span>
										</li>
									</ul>
								</div>
							</div>
						))}
					</div>

					<p className="text-sm text-text/60 mt-6 max-w-2xl">
						All plans include our core security features and 24/7 uptime
						monitoring.
					</p>
				</div>
			</div>
		</section>
	);
}
