"use client";

import Link from "next/link";
import Image from "next/image";
import { LogIn, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const APP_LOGIN_URL = "https://app.octisight.io/auth/login";

const NAV_LINKS = [
	{ href: "/#how-it-works", label: "How it works" },
	{ href: "/#problem", label: "Problem" },
	{ href: "/#pricing", label: "Pricing" },
	{ href: "/#contact", label: "Contact" },
] as const;

/**
 * Anchor-link handler: smooth-scroll if we're already on /, otherwise let
 * Next.js navigate and the browser handle the hash.
 */
function useAnchorNav() {
	const pathname = usePathname();
	return (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
		onDone?: () => void,
	) => {
		if (!href.startsWith("/#")) {
			onDone?.();
			return;
		}
		const id = href.slice(2);
		if (pathname === "/") {
			e.preventDefault();
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
			onDone?.();
		} else {
			onDone?.();
		}
	};
}

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const handleAnchor = useAnchorNav();

	// Close mobile menu on route change.
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsOpen(false);
	}, [pathname]);

	// Close on Escape.
	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [isOpen]);

	// Lock body scroll while the mobile menu is open.
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<header className="sticky top-0 left-0 right-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
				{/* Logo — smaller on mobile so the toggle has breathing room. */}
				<Link
					href="/"
					className="relative z-[55] flex items-center shrink-0"
					aria-label="OctiSight home"
				>
					<Image
						src="/images/logo/octisight-white-logo.png"
						alt="OctiSight"
						width={180}
						height={60}
						className="h-12 md:h-12 lg:h-14 w-auto"
						sizes="180px"
						priority
					/>
				</Link>

				{/* Desktop nav */}
				<nav
					className="hidden md:flex items-center gap-6 text-sm font-book"
					aria-label="Main navigation"
				>
					{NAV_LINKS.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							onClick={(e) => handleAnchor(e, href)}
							className="text-text/80 hover:text-light-contrast transition-colors duration-200"
						>
							{label}
						</Link>
					))}
				</nav>

				{/* Desktop sign-in (icon-only) */}
				<a
					href={APP_LOGIN_URL}
					aria-label="Sign in"
					title="Sign in"
					className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent hover:bg-secondary text-white transition-colors duration-200"
				>
					<LogIn className="w-4 h-4" />
				</a>

				{/* Mobile toggle — high z-index so it sits above the open menu. */}
				<button
					type="button"
					onClick={() => setIsOpen((v) => !v)}
					aria-label={isOpen ? "Close menu" : "Open menu"}
					aria-expanded={isOpen}
					aria-controls="mobile-nav"
					className="md:hidden relative z-[55] -mr-1 inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/5 active:bg-white/10 transition-colors"
				>
					{isOpen ? (
						<X className="w-6 h-6" strokeWidth={2.2} />
					) : (
						<Menu className="w-6 h-6" strokeWidth={2.2} />
					)}
				</button>
			</div>

			{/* Mobile menu — full-screen overlay below the nav bar. Uses 100dvh so
			    iOS Safari's URL bar doesn't push items below the fold. */}
			<div
				id="mobile-nav"
				role="dialog"
				aria-label="Mobile navigation"
				aria-hidden={!isOpen}
				className={`md:hidden fixed inset-x-0 top-16 z-40 bg-background h-[calc(100dvh-4rem)] transition-opacity duration-300 ease-out ${
					isOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
			>
				<nav
					aria-label="Mobile navigation links"
					className="flex h-full flex-col px-6 py-6 sm:py-8"
				>
					{/* Items — vertically centered in the available space. */}
					<ul className="flex flex-col gap-1 my-auto">
						{NAV_LINKS.map(({ href, label }) => (
							<li key={href}>
								<Link
									href={href}
									onClick={(e) => handleAnchor(e, href, () => setIsOpen(false))}
									className="block w-full py-4 text-center text-2xl font-medium text-white hover:text-light-contrast border-b border-light-contrast/10 transition-colors duration-200"
								>
									{label}
								</Link>
							</li>
						))}
					</ul>

					<a
						href={APP_LOGIN_URL}
						onClick={() => setIsOpen(false)}
						className="flex items-center justify-center gap-2 w-full py-4 rounded-lg bg-accent hover:bg-light-contrast text-white font-semibold text-base shadow-lg shadow-accent/25 transition-colors duration-200"
					>
						<LogIn className="w-5 h-5" />
						Sign in
					</a>
				</nav>
			</div>
		</header>
	);
}
