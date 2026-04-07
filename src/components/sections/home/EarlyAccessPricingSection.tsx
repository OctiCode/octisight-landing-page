"use client";

import { Phone, ScanSearch, Sparkles } from "lucide-react";

export default function EarlyAccessPricingSection() {
	return (
		<section
			id="pricing"
			className="relative w-full py-10 sm:py-14 md:py-16 lg:py-20"
		>
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
				{/* ─── Header ─── */}
				<div className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-14">
					<div className="inline-flex">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							Pricing
						</span>
					</div>

					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-3xl">
						Simple pricing,{" "}
						<span className="text-light-contrast">built for your growth.</span>
					</h2>

					<p className="text-sm sm:text-base md:text-lg text-text/70 max-w-xl leading-relaxed">
						We&apos;re rolling out access carefully. Get in early and lock your
						rate before public launch.
					</p>
				</div>

				{/* ─── Cards ─── */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
					{/* Whitelist card */}
					<div className="group relative bg-linear-to-br from-accent/20 to-primary/30 border border-accent/40 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 hover:border-accent/70 hover:from-accent/25 hover:to-primary/35 transition-all duration-300 overflow-hidden">
						<div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/20 blur-2xl group-hover:bg-accent/30 transition-colors duration-500" />

						<div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center">
							<Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
						</div>

						<div className="relative flex-1">
							<p className="text-[11px] sm:text-xs font-bold text-accent uppercase tracking-widest mb-1.5">
								Early Access
							</p>
							<h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
								Join the whitelist today
							</h3>
							<p className="text-xs sm:text-sm text-text/60 leading-relaxed">
								Be first in line. Get exclusive early-adopter pricing and
								priority onboarding before we open to everyone.
							</p>
						</div>

						<button
							type="button"
							onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
							className="relative w-full cursor-pointer flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-accent hover:bg-accent/80 shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 text-sm sm:text-base"
						>
							<ScanSearch className="w-4 h-4 sm:w-5 sm:h-5" />
							Join the Whitelist
						</button>
					</div>

					{/* Sales card */}
					<div className="group relative bg-linear-to-br from-primary/10 to-contrast/20 border border-light-contrast/40 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 hover:border-light-contrast/80 hover:from-primary/15 hover:to-contrast/25 transition-all duration-300 overflow-hidden">
						<div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-light-contrast/10 blur-2xl group-hover:bg-light-contrast/15 transition-colors duration-500" />

						<div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-light-contrast/10 border border-light-contrast/30 flex items-center justify-center">
							<Phone className="w-5 h-5 sm:w-6 sm:h-6 text-light-contrast" />
						</div>

						<div className="relative flex-1">
							<p className="text-[11px] sm:text-xs font-bold text-light-contrast/80 uppercase tracking-widest mb-1.5">
								Enterprise
							</p>
							<h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
								Call our sales team
							</h3>
							<p className="text-xs sm:text-sm text-text/60 leading-relaxed">
								Need a custom plan, volume pricing, or dedicated support? Our
								team will build the right package for your organisation.
							</p>
						</div>

						<button
							type="button"
							onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
							className="relative w-full cursor-pointer flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-transparent border-2 border-light-contrast/40 hover:border-light-contrast/80 hover:bg-primary/10 transition-all duration-300 text-sm sm:text-base"
						>
							<Phone className="w-4 h-4 sm:w-5 sm:h-5" />
							Talk to Sales
						</button>
					</div>
				</div>

				{/* ─── Trust line ─── */}
				<div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 mt-6 sm:mt-8">
					{(
						[
							"No credit card required",
							"Cancel anytime",
							"Spots are limited",
						] as const
					).map((item, i, arr) => (
						<span key={item} className="flex items-center gap-3">
							<span className="text-xs sm:text-sm text-text/50 font-book">
								{item}
							</span>
							{i < arr.length - 1 && (
								<span
									className="w-1 h-1 rounded-full bg-light-contrast/25"
									aria-hidden="true"
								/>
							)}
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
