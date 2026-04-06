import Link from "next/link";
import { ScanSearch } from "lucide-react";

export default function MidCTASection() {
	return (
		<section className="relative w-full py-10 sm:py-14 md:py-16">
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
				<div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-primary/30 via-contrast/40 to-primary/20 border border-light-contrast/30 px-6 sm:px-10 md:px-16 py-10 sm:py-12 md:py-14 text-center">
					{/* Glow blobs */}
					<div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-accent/15 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-16 left-1/4 w-48 h-48 rounded-full bg-primary/30 blur-3xl" />

					<h2 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-2xl mx-auto mb-4 sm:mb-5">
						Start seeing your real risks today
					</h2>

					<p className="relative text-sm sm:text-base text-text/60 mb-6 sm:mb-8">
						No setup complexity. No commitment.
					</p>

					<Link href="/signup">
						<button
							type="button"
							className="cursor-pointer px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-semibold text-white bg-accent hover:bg-accent/80 shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 text-sm sm:text-base"
						>
							Scan My Systems{" "}
							<ScanSearch className="inline w-4 h-4 sm:w-5 sm:h-5 ml-1.5 -mt-0.5" />
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}
