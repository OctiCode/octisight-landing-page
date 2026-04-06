"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
	{ href: "/#about", label: "About" },
	{ href: "/#how-it-works", label: "How it works" },
	{ href: "/#pricing", label: "Pricing" },
	{ href: "/#contact", label: "Contact" },
] as const;

/**
 * Handles anchor links correctly whether the user is already on the home page
 * or navigating from another page.
 *
 * - Same page  → preventDefault + smooth scroll via scrollIntoView
 * - Other page → navigate to /#hash, browser handles scroll on load
 */
function useAnchorNav() {
	const pathname = usePathname();

	return (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
		onDone?: () => void,
	) => {
		const isAnchor = href.startsWith("/#");
		if (!isAnchor) {
			onDone?.();
			return;
		}

		const id = href.slice(2); // strip "/#"

		if (pathname === "/") {
			e.preventDefault();
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
			onDone?.();
		} else {
			// Let Next.js navigate; scroll happens after page load via hash
			onDone?.();
		}
	};
}

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const handleAnchor = useAnchorNav();

	// Close mobile menu on route change
	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<header className="w-full border-b bg-white sticky top-0 left-0 right-0 z-50">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
				{/* Logo */}
				<Link href="/" className="flex items-center z-50 shrink-0">
					<Image
						src="/images/logo/OctiSight_logo-01.svg"
						alt="OctiSight"
						width={140}
						height={32}
						className="h-8 w-auto"
						sizes="140px"
					/>
				</Link>

				{/* Desktop nav */}
				<nav
					className="hidden md:flex items-center gap-6 text-sm font-book text-gray-600"
					aria-label="Main navigation"
				>
					{NAV_LINKS.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							onClick={(e) => handleAnchor(e, href)}
							className="text-contrast hover:text-primary transition-colors duration-200"
						>
							{label}
						</Link>
					))}
				</nav>

				{/* Desktop actions */}
				<div className="hidden md:flex items-center gap-4">
					<Link
						href="/login"
						className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200"
					>
						Sign in
					</Link>
					<Link href="/signup">
						<Button className="bg-accent hover:bg-secondary text-white cursor-pointer">
							Get Started
						</Button>
					</Link>
				</div>

				{/* Mobile toggle */}
				<button
					type="button"
					onClick={() => setIsOpen((v) => !v)}
					className="md:hidden z-50 p-2 text-gray-600 hover:text-primary transition-colors"
					aria-label={isOpen ? "Close menu" : "Open menu"}
					aria-expanded={isOpen}
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile menu */}
			<div
				className={`fixed inset-0 top-16 bg-white md:hidden transition-all duration-300 ease-in-out z-40 ${
					isOpen
						? "opacity-100 translate-y-0 pointer-events-auto"
						: "opacity-0 -translate-y-4 pointer-events-none"
				}`}
				aria-hidden={!isOpen}
			>
				<nav
					className="flex flex-col h-full px-6 py-8 overflow-y-auto"
					aria-label="Mobile navigation"
				>
					<div className="flex flex-col items-center gap-2 my-8">
						{NAV_LINKS.map(({ href, label }, index) => (
							<Link
								key={href}
								href={href}
								onClick={(e) => handleAnchor(e, href, () => setIsOpen(false))}
								className="w-full text-center py-3 text-xl font-medium text-contrast hover:text-primary transition-colors duration-200 border-b border-gray-100 last:border-0"
								style={{
									opacity: isOpen ? 1 : 0,
									transform: isOpen ? "translateY(0)" : "translateY(-12px)",
									transition: `opacity 0.25s ease ${index * 0.05}s, transform 0.25s ease ${index * 0.05}s`,
								}}
							>
								{label}
							</Link>
						))}
					</div>

					<div className="mt-auto flex flex-col gap-3 pb-8">
						<Link
							href="/login"
							onClick={() => setIsOpen(false)}
							className="text-center py-3 text-base font-medium text-gray-600 hover:text-primary transition-colors"
						>
							Sign in
						</Link>
						<Link href="/signup" onClick={() => setIsOpen(false)}>
							<Button className="w-full bg-accent hover:bg-secondary text-white py-6 text-lg cursor-pointer">
								Get Started
							</Button>
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
