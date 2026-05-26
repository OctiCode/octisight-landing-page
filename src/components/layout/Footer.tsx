"use client";

import { footerSection } from "@/content/home";
import { LEGAL_FOOTER_LINKS } from "@/lib/legal-docs";
import { openCookiePreferences } from "@/lib/cookie-consent";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

function LinkedinIcon({ size = 18 }: { size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
		</svg>
	);
}

const iconMap = {
	Linkedin: LinkedinIcon,
} as const;

/** Same anchor-scroll helper as Navbar — keeps behaviour consistent. */
function useAnchorNav() {
	const pathname = usePathname();
	return (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		if (!href.startsWith("/#")) return;
		const id = href.slice(2);
		if (pathname === "/") {
			e.preventDefault();
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		}
	};
}

export default function Footer() {
	const currentYear = useMemo(() => new Date().getFullYear(), []);
	const handleAnchor = useAnchorNav();

	return (
		<footer className="bg-linear-to-br from-background via-contrast to-background border-t border-primary/20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12">
				{/* ─── Main grid ─── */}
				<div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
					{/* Logo + tagline */}
					<div className="col-span-2 lg:col-span-2">
						<Link href="/" className="inline-block mb-4">
							<Image
								src={footerSection.logo.src}
								alt={footerSection.logo.alt}
								width={240}
								height={80}
								className="h-20 w-auto"
								sizes="240px"
							/>
						</Link>
						<p className="text-text/60 text-sm leading-relaxed max-w-xs">
							{footerSection.tagline}
						</p>
					</div>

					{/* Platform + Company — single-column lists */}
					{(
						[
							footerSection.navigation.product,
						] as const
					).map((col) => (
						<div key={col.title}>
							<h3 className="text-text text-sm font-medium mb-4 uppercase tracking-wide">
								{col.title}
							</h3>
							<ul className="space-y-3">
								{col.links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											onClick={(e) => handleAnchor(e, link.href)}
											className="text-text/60 hover:text-light-contrast text-sm transition-colors duration-200"
										>
											{link.text}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}

					{/* Legal — wider, 2-column list to absorb the longer labels */}
					<div className="col-span-2 lg:col-span-2">
						<h3 className="text-text text-sm font-medium mb-4 uppercase tracking-wide">
							Legal
						</h3>
						<ul className="grid grid-cols-2 gap-x-4 gap-y-3">
							{LEGAL_FOOTER_LINKS.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-text/60 hover:text-light-contrast text-sm transition-colors duration-200"
									>
										{link.text}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* ─── Bottom bar ─── */}
				<div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
						<p className="text-text/50 text-xs sm:text-sm">
							© {currentYear} OctiSight. All rights reserved.
						</p>
						<button
							type="button"
							onClick={openCookiePreferences}
							className="text-text/50 hover:text-light-contrast text-xs sm:text-sm transition-colors duration-200 cursor-pointer"
						>
							Cookie preferences
						</button>
					</div>

					{/* Social icons */}
					<div className="flex items-center gap-2 sm:gap-3">
						{footerSection.social.map((social) => {
							const Icon = iconMap[social.icon as keyof typeof iconMap];
							return (
								<Link
									key={social.name}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-text/50 hover:text-light-contrast transition-colors duration-200 p-2 hover:bg-primary/20 rounded-full"
									aria-label={social.name}
								>
									<Icon size={18} />
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</footer>
	);
}
