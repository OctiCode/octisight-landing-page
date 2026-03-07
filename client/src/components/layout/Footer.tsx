"use client";

import { footerSection } from "@/content/home";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const iconMap = {
	Facebook: Facebook,
	Twitter: Twitter,
	Instagram: Instagram,
	Linkedin: Linkedin,
};

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gradient-to-br from-background via-contrast to-background border-t border-primary/20">
			<div className="mx-auto max-w-7xl px-6 py-12">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
					{/* Logo and Tagline */}
					<div className="lg:col-span-2">
						<Link href="/" className="inline-block mb-4">
							<Image
								src={footerSection.logo.src}
								alt={footerSection.logo.alt}
								width={160}
								height={40}
								className="h-10 w-auto"
							/>
						</Link>
						<p className="text-text/70 text-sm leading-relaxed max-w-sm">
							{footerSection.tagline}
						</p>
					</div>

					{/* Product Links */}
					<div>
						<h3 className="text-text font-medium mb-4">
							{footerSection.navigation.product.title}
						</h3>
						<ul className="space-y-3">
							{footerSection.navigation.product.links.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-text/60 hover:text-light-contrast text-sm transition-colors"
									>
										{link.text}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Links */}
					<div>
						<h3 className="text-text font-medium mb-4">
							{footerSection.navigation.company.title}
						</h3>
						<ul className="space-y-3">
							{footerSection.navigation.company.links.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-text/60 hover:text-light-contrast text-sm transition-colors"
									>
										{link.text}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Resources Links */}
					<div>
						<h3 className="text-text font-medium mb-4">
							{footerSection.navigation.resources.title}
						</h3>
						<ul className="space-y-3">
							{footerSection.navigation.resources.links.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-text/60 hover:text-light-contrast text-sm transition-colors"
									>
										{link.text}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-12 pt-8 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
					{/* Copyright */}
					<p className="text-text/60 text-sm">Copyright ©{currentYear}</p>

					{/* Social Media Icons */}
					<div className="flex items-center gap-4">
						{footerSection.social.map((social) => {
							const Icon = iconMap[social.icon as keyof typeof iconMap];
							return (
								<Link
									key={social.name}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-text/60 hover:text-light-contrast transition-colors p-2 hover:bg-primary/20 rounded-full"
									aria-label={social.name}
								>
									<Icon size={20} />
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</footer>
	);
}
