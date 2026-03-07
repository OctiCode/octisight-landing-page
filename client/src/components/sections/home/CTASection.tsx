"use client";

import Link from "next/link";

const CTA_CONTENT = {
	badge: "Let's go!",
	title: "Ready to get started?",
	description:
		"Join hundreds of organizations securing their infrastructure with OctiSight.",
	buttons: {
		primary: {
			text: "Start Free Trial",
			href: "/signup",
		},
		secondary: {
			text: "Schedule a Demo",
			href: "/demo",
		},
	},
} as const;

export default function CTASection() {
	return (
		<section className="relative w-full min-h-[calc(50vh-4rem)] sm:h-auto py-10 sm:py-14 md:py-16 lg:py-20">
			<div className="relative z-10 mx-auto max-w-7xl h-full px-4 sm:px-6 flex items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 w-full text-center">
					<div className="inline-flex">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							{CTA_CONTENT.badge}
						</span>
					</div>

					<h2 className="text-2xl my-3 sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-3xl">
						{CTA_CONTENT.title}
					</h2>

					<p className="text-sm sm:text-base md:text-lg text-text/80 max-w-2xl leading-relaxed px-2">
						{CTA_CONTENT.description}
					</p>

					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-4">
						<Link href={CTA_CONTENT.buttons.primary.href}>
							<button
								type="button"
								className="cursor-pointer px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-accent hover:bg-accent/80 shadow-md text-sm sm:text-base"
							>
								{CTA_CONTENT.buttons.primary.text} →
							</button>
						</Link>

						<Link href={CTA_CONTENT.buttons.secondary.href}>
							<button
								type="button"
								className="cursor-pointer px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-transparent border-2 border-light-contrast/40 hover:border-light-contrast/80 hover:bg-primary/10 text-sm sm:text-base"
							>
								{CTA_CONTENT.buttons.secondary.text}
							</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
