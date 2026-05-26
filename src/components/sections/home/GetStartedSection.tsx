"use client";

import { ArrowRight, Phone, ScanSearch } from "lucide-react";

/**
 * GetStartedSection
 * ---
 * Single conversion block on the landing page — no prices shown.
 * Two paths: self-serve free trial, or contact sales for custom plans.
 */
export default function GetStartedSection() {
	return (
		<section
			id="pricing"
			aria-labelledby="get-started-heading"
			className="relative w-full py-12 sm:py-16 md:py-20"
		>
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
				{/* Header */}
				<div className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-10 sm:mb-12">
					<div className="inline-flex">
						<span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] uppercase backdrop-blur-sm">
							Get started
						</span>
					</div>

					<h2
						id="get-started-heading"
						className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-3xl"
					>
						Two ways to{" "}
						<span className="text-light-contrast">cut through the noise.</span>
					</h2>

					<p className="text-sm sm:text-base md:text-lg text-text/70 max-w-xl leading-relaxed">
						Connect a repo and get findings, or talk to our team
						about a plan tailored to your stack.
					</p>
				</div>

				{/* Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
					{/* Self-serve card */}
					<div className="group relative bg-linear-to-br from-accent/20 to-primary/30 border border-accent/40 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 hover:border-accent/70 hover:from-accent/25 hover:to-primary/35 transition-all duration-300 overflow-hidden">
						<div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/20 blur-2xl group-hover:bg-accent/30 transition-colors duration-500" />

						<div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center">
							<ScanSearch className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
						</div>

						<div className="relative flex-1">
							<p className="text-[11px] sm:text-xs font-bold text-accent uppercase tracking-widest mb-1.5">
								Free to start
							</p>
							<h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
								Run your first scan in 90 seconds
							</h3>
							<p className="text-xs sm:text-sm text-text/65 leading-relaxed">
								Connect a repo, see what actually matters, and fix it. No credit
								card, no security team required.
							</p>
						</div>

						<a
							href="https://app.octisight.io/auth/login"
							className="relative w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-accent hover:bg-accent/80 shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 text-sm sm:text-base"
						>
							<ScanSearch className="w-4 h-4 sm:w-5 sm:h-5" />
							Start free scan
							<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
						</a>
					</div>

					{/* Sales card */}
					<div className="group relative bg-linear-to-br from-primary/10 to-contrast/20 border border-light-contrast/40 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 hover:border-light-contrast/80 hover:from-primary/15 hover:to-contrast/25 transition-all duration-300 overflow-hidden">
						<div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-light-contrast/10 blur-2xl group-hover:bg-light-contrast/15 transition-colors duration-500" />

						<div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-light-contrast/10 border border-light-contrast/30 flex items-center justify-center">
							<Phone className="w-5 h-5 sm:w-6 sm:h-6 text-light-contrast" />
						</div>

						<div className="relative flex-1">
							<p className="text-[11px] sm:text-xs font-bold text-light-contrast/80 uppercase tracking-widest mb-1.5">
								For teams &amp; enterprises
							</p>
							<h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
								Talk to our team
							</h3>
							<p className="text-xs sm:text-sm text-text/65 leading-relaxed">
								Volume pricing, SSO, dedicated support, or a custom rollout? We
								build the right plan for your stack.
							</p>
						</div>

						<button
							type="button"
							onClick={() =>
								document
									.getElementById("contact")
									?.scrollIntoView({ behavior: "smooth" })
							}
							className="relative w-full cursor-pointer flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-transparent border-2 border-light-contrast/40 hover:border-light-contrast/80 hover:bg-primary/10 transition-all duration-300 text-sm sm:text-base"
						>
							<Phone className="w-4 h-4 sm:w-5 sm:h-5" />
							Talk to sales
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
