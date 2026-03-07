"use client";

import { Button } from "@/components/ui/button";
import { heroSection } from "@/content/home";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroSection() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas size
		const resizeCanvas = () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		};
		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		// Network nodes
		const nodes: Array<{
			x: number;
			y: number;
			vx: number;
			vy: number;
			radius: number;
		}> = [];
		const nodeCount = 50;

		// Initialize nodes
		for (let i = 0; i < nodeCount; i++) {
			nodes.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.5,
				vy: (Math.random() - 0.5) * 0.5,
				radius: Math.random() * 2 + 1,
			});
		}

		// Animation loop
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Update and draw nodes
			nodes.forEach((node, i) => {
				// Update position
				node.x += node.vx;
				node.y += node.vy;

				// Bounce off edges
				if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
				if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

				// Draw connections
				nodes.forEach((otherNode, j) => {
					if (i === j) return;
					const dx = node.x - otherNode.x;
					const dy = node.y - otherNode.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < 150) {
						ctx.beginPath();
						// Using light-contrast color: #E071F5
						ctx.strokeStyle = `rgba(224, 113, 245, ${
							0.15 * (1 - distance / 150)
						})`;
						ctx.lineWidth = 0.5;
						ctx.moveTo(node.x, node.y);
						ctx.lineTo(otherNode.x, otherNode.y);
						ctx.stroke();
					}
				});

				// Draw node
				ctx.beginPath();
				ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
				// Using light-contrast color: #E071F5
				ctx.fillStyle = "#E071F5";
				ctx.fill();
			});

			requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);

	return (
		<section className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-background via-contrast to-background pb-0">
			{/* Animated Network Background */}
			<canvas
				ref={canvasRef}
				className="absolute inset-0 w-full h-full opacity-50"
			/>

			{/* Black Overlay for Contrast */}
			<div className="absolute inset-0 bg-black/40" />

			{/* Purple Glow Effects */}
			<div className="absolute top-20 right-20 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-pulse" />
			<div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-1000" />

			{/* Content Container */}
			<div className="relative z-10 mx-auto max-w-7xl h-full px-6 flex items-center">
				<div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-center w-full">
					{/* Left Content */}
					<div className="flex flex-col gap-6 text-white">
						{/* Badge */}
						<div className="inline-flex">
							<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
								{heroSection.headerTitle}
							</span>
						</div>

						{/* Main Heading */}
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
							{heroSection.title}
						</h1>

						{/* Description */}
						<p className="text-lg text-justify sm:text-xl text-text/90 max-w-xl leading-relaxed">
							{heroSection.paragraph}
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 mt-4">
							<Link href={heroSection.buttons.primary.href}>
								<Button className="bg-accent hover:bg-light-contrast text-white px-8 py-6 text-lg font-medium rounded-lg transition-all duration-300 shadow-sm shadow-accent/30 hover:shadow-accent/50 w-full sm:w-auto">
									{heroSection.buttons.primary.text}
								</Button>
							</Link>

							<Link href={heroSection.buttons.secondary.href}>
								<Button className="bg-transparent hover:bg-text/10 text-text border-2 border-text/30 hover:border-text/50 px-8 py-6 text-lg font-medium rounded-lg transition-all duration-300 w-full sm:w-auto">
									{heroSection.buttons.secondary.text}
								</Button>
							</Link>
						</div>
					</div>

					{/* Right Content - Logo */}
					<div className="hidden lg:flex items-center justify-center">
						<div className="relative">
							{/* Glow effect behind logo */}
							<div className="absolute inset-0 bg-light-contrast/20 blur-[80px] rounded-full scale-150" />

							{/* Logo */}
							<div className="relative">
								<Image
									src="/images/logo/OctiSight_logo-02.svg"
									alt="OctiSight"
									width={500}
									height={200}
									className="w-full max-w-md h-auto drop-shadow-2xl animate-float"
									priority
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
