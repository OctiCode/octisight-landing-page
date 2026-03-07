"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const navLinks = [
		{ href: "#products", label: "Products" },
		{ href: "#how-it-works", label: "How it works" },
		{ href: "#security", label: "Security" },
		{ href: "#pricing", label: "Pricing" },
		{ href: "#about", label: "About" },
		{ href: "#contact", label: "Contact us" },
	];

	return (
		<header className="w-full border-b bg-white relative z-50">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
				{/* Logo */}
				<Link href="/" className="flex items-center z-50">
					<Image
						src="/images/logo/OctiSight_logo-01.svg"
						alt="OctiSight"
						width={140}
						height={32}
						className="h-8 w-auto"
						priority
					/>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden items-center gap-6 text-sm font-book text-gray-600 md:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-contrast hover:text-primary transition-colors"
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Desktop Right Side */}
				<div className="hidden md:flex items-center gap-4">
					<Link
						href="/login"
						className="text-sm font-medium text-gray-600 hover:text-primary"
					>
						Sign in
					</Link>

					<Button className="bg-accent hover:bg-secondary text-white">
						Get Started
					</Button>
				</div>

				{/* Mobile Menu Button */}
				<button
					onClick={toggleMenu}
					className="md:hidden z-50 p-2 text-gray-600 hover:text-primary transition-colors"
					aria-label="Toggle menu"
				>
					{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Menu - Full Screen Dropdown */}
			<div
				className={`fixed inset-0 top-16 bg-white md:hidden transition-all duration-300 ease-in-out z-50 ${
					isMenuOpen
						? "opacity-100 translate-y-0"
						: "opacity-0 -translate-y-full pointer-events-none"
				}`}
			>
				<nav className="flex flex-col h-full px-6 py-8 overflow-y-auto">
					{/* Mobile Navigation Links */}
					<div className="flex flex-col justify-center items-center my-10 gap-6">
						{navLinks.map((link, index) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={toggleMenu}
								className="text-2xl font-medium text-contrast hover:text-primary transition-colors"
								style={{
									animation: isMenuOpen
										? `slideIn 0.3s ease-out ${index * 0.05}s forwards`
										: "none",
									opacity: 0,
								}}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Mobile Auth Buttons */}
					<div className="mt-auto flex flex-col gap-4 pb-8">
						<Link
							href="/login"
							onClick={toggleMenu}
							className="text-center py-3 text-lg font-medium text-gray-600 hover:text-primary transition-colors"
						>
							Sign in
						</Link>

						<Button
							onClick={toggleMenu}
							className="bg-accent hover:bg-secondary text-white py-6 text-lg"
						>
							Get Started
						</Button>
					</div>
				</nav>
			</div>

			<style jsx>{`
				@keyframes slideIn {
					from {
						opacity: 0;
						transform: translateY(-20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</header>
	);
}
