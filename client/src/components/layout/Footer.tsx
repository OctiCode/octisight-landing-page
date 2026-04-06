"use client";

import { footerSection } from "@/content/home";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const iconMap = {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
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
				<div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
					{/* Logo + tagline */}
					<div className="col-span-2 lg:col-span-2">
						<Link href="/" className="inline-block mb-4">
							<Image
								src={footerSection.logo.src}
								alt={footerSection.logo.alt}
								width={160}
								height={40}
								className="h-10 w-auto"
							/>
						</Link>
						<p className="text-text/60 text-sm leading-relaxed max-w-xs">
							{footerSection.tagline}
						</p>
					</div>

					{/* Nav columns */}
					{(
						[
							footerSection.navigation.product,
							footerSection.navigation.company,
							footerSection.navigation.resources,
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
				</div>

				{/* ─── Bottom bar ─── */}
				<div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-text/50 text-xs sm:text-sm">
						© {currentYear} OctiSight. All rights reserved.
					</p>

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
