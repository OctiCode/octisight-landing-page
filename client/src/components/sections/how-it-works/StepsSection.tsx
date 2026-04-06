"use client";

import Link from "next/link";
import { ScanSearch } from "lucide-react";
import { howItWorksContent } from "@/content/howItWorks";
import StepsList from "./StepsList";

export default function StepsSection() {
	const { hero, steps } = howItWorksContent;

	return (
		<>
			{/* ─── Page hero ─── */}
			<section className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 md:pb-16">
				<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 text-center">
					<div className="inline-flex mb-4">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							{hero.badge}
						</span>
					</div>

					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white max-w-4xl mx-auto mb-4">
						{hero.title}
					</h1>

					<p className="text-sm sm:text-base md:text-lg text-text/80 max-w-2xl mx-auto leading-relaxed">
						{hero.description}
					</p>

					<div
						className="flex justify-center gap-2 mt-6 sm:mt-8"
						aria-hidden="true"
					>
						{steps.map((step) => (
							<span
								key={step.id}
								className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-light-contrast/30"
							/>
						))}
					</div>
				</div>
			</section>

			{/* ─── Steps (shared) ─── */}
			<StepsList firstStepPriority />

			{/* ─── Bottom CTA ─── */}
			<section className="relative w-full py-10 sm:py-14 md:py-16 lg:py-20 text-center">
				<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-light-contrast/20 to-transparent" />
				<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
					<div className="inline-flex mb-4">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							Let&apos;s go!
						</span>
					</div>

					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-3xl mx-auto mb-4">
						Stop guessing your security risks.
					</h2>

					<p className="text-sm sm:text-base md:text-lg text-text/80 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
						Start knowing exactly what affects your business and how to fix it.
					</p>

					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
						<Link href="/signup">
							<button
								type="button"
								className="cursor-pointer px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-accent hover:bg-accent/80 shadow-md text-sm sm:text-base flex items-center gap-2"
							>
								Scan My Systems
								<ScanSearch className="w-4 h-4 sm:w-5 sm:h-5" />
							</button>
						</Link>
						<Link href="/demo">
							<button
								type="button"
								className="cursor-pointer px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-transparent border-2 border-light-contrast/40 hover:border-light-contrast/80 hover:bg-primary/10 text-sm sm:text-base"
							>
								Book a Demo
							</button>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
