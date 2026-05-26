import Image from "next/image";
import ContactForm from "./ContactForm";

interface ContactSectionProps {
	/**
	 * Use "h1" on the dedicated /contact page (standalone).
	 * Use "h2" when embedded in the home page (default).
	 */
	headingLevel?: "h1" | "h2";
	/** Eagerly load the background image only when above the fold. */
	priority?: boolean;
}

export default function ContactSection({
	headingLevel: Tag = "h2",
	priority = false,
}: ContactSectionProps) {
	return (
		<section
			id="contact"
			aria-labelledby="contact-heading"
			className="relative w-full py-10 sm:py-14 md:py-16 lg:py-20"
		>
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
				{/* ─── Header ─── */}
				<div className="text-center mb-6 sm:mb-8">
					<div className="inline-flex mb-4">
						<span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs sm:text-sm font-medium backdrop-blur-sm">
							Get in Touch
						</span>
					</div>

					<Tag
						id="contact-heading"
						className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white max-w-4xl mx-auto mb-4"
					>
						We&apos;d love to hear from you
					</Tag>
				</div>

				{/* ─── Background image + form ─── */}
				<div className="relative rounded-2xl overflow-hidden min-h-125 sm:min-h-140 mb-6 sm:mb-8">
					<Image
						src="/images/background/contact-bg.jpg"
						alt="Team working together at OctiSight"
						fill
						className="object-cover"
						priority={priority}
						sizes="(max-width: 1280px) 100vw, 1280px"
					/>
					<div className="absolute inset-0 bg-background/60" />
					<div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />

					<div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full min-h-125 sm:min-h-140">
						{/* Left — logo */}
						<div className="hidden lg:flex items-center justify-center p-8 sm:p-10 md:p-12">
							<Image
								src="/images/logo/octisight-white-logo.png"
								alt="OctiSight, Security, from insight to action"
								width={360}
								height={120}
								className="w-56 sm:w-64 md:w-72 h-auto"
							/>
						</div>

						{/* Right — form card */}
						<div className="flex items-center justify-center lg:justify-end p-4 sm:p-6 md:p-8 lg:p-10">
							<div className="w-full max-w-md rounded-2xl bg-white/6 backdrop-blur-md border border-white/12 p-6 sm:p-8 md:p-10">
								<h3 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">
									Send us a message
								</h3>
								<p className="text-text/60 text-sm sm:text-base mb-6 sm:mb-8 text-center">
									Fill out the form and we&apos;ll get back to you shortly.
								</p>
								<ContactForm />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
