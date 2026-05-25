"use client";

import Image from "next/image";
import Link from "next/link";
import { heroSection } from "@/content/home";
import { Play, ScanSearch } from "lucide-react";
import { useEffect, useRef } from "react";
import HeroLiveStats from "./HeroLiveStats";

const NETWORK_CONFIG = {
	nodeCount: 50,
	connectionDistance: 170,
	nodeColor: "rgba(224, 113, 245, 1)",
	connectionOpacity: 0.5,
} as const;

export default function HeroSection() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resizeCanvas = () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		};
		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const nodes: Array<{
			x: number;
			y: number;
			vx: number;
			vy: number;
			radius: number;
		}> = [];

		for (let i = 0; i < NETWORK_CONFIG.nodeCount; i++) {
			nodes.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.5,
				vy: (Math.random() - 0.5) * 0.5,
				radius: Math.random() * 2 + 1,
			});
		}

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			nodes.forEach((node, i) => {
				node.x += node.vx;
				node.y += node.vy;

				if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
				if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

				nodes.forEach((otherNode, j) => {
					if (i === j) return;
					const dx = node.x - otherNode.x;
					const dy = node.y - otherNode.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < NETWORK_CONFIG.connectionDistance) {
						ctx.beginPath();
						ctx.strokeStyle = `rgba(224, 113, 245, ${
							NETWORK_CONFIG.connectionOpacity *
							(1 - distance / NETWORK_CONFIG.connectionDistance)
						})`;
						ctx.lineWidth = 0.5;
						ctx.moveTo(node.x, node.y);
						ctx.lineTo(otherNode.x, otherNode.y);
						ctx.stroke();
					}
				});

				ctx.beginPath();
				ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
				ctx.fillStyle = NETWORK_CONFIG.nodeColor;
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
		<section className="relative w-full min-h-[calc(100vh-4rem)] overflow-hidden bg-linear-to-b from-background via-contrast to-background pt-8 sm:pt-10 lg:pt-14 pb-0 sm:pb-12 lg:pb-16">
			<canvas
				ref={canvasRef}
				className="absolute inset-0 w-full h-full"
				aria-hidden="true"
			/>

			<div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/0" />

			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 flex flex-col gap-8 sm:gap-10 lg:gap-12">
				<div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 sm:gap-10 lg:gap-12 items-center">
					{/* Left — copy */}
					<div className="flex flex-col gap-4 sm:gap-5 md:gap-6 text-white">
						<div className="inline-flex">
							<span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] uppercase backdrop-blur-sm">
								{heroSection.eyebrow}
							</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1]">
							{heroSection.title}
						</h1>

						<p className="text-base sm:text-lg md:text-xl text-text/85 max-w-xl leading-relaxed">
							{heroSection.paragraph}
						</p>

						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-1 sm:mt-2">
							<Link
								href={heroSection.buttons.primary.href}
								className="bg-accent hover:bg-light-contrast text-white px-6 sm:px-7 py-3 sm:py-3.5 text-base sm:text-lg font-medium rounded-lg transition-all duration-300 shadow-sm shadow-accent/30 hover:shadow-accent/50 w-full sm:w-auto flex items-center justify-center gap-2"
							>
								{heroSection.buttons.primary.text}
								<ScanSearch className="w-5 h-5" />
							</Link>
							<button
								type="button"
								onClick={() =>
									document
										.getElementById(
											heroSection.buttons.secondary.href.replace("#", ""),
										)
										?.scrollIntoView({ behavior: "smooth" })
								}
								className="cursor-pointer bg-white/5 hover:bg-white/10 text-white border border-light-contrast/30 hover:border-light-contrast/60 px-6 sm:px-7 py-3 sm:py-3.5 text-base sm:text-lg font-medium rounded-lg backdrop-blur-sm transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
							>
								{heroSection.buttons.secondary.text}
								<Play className="w-4 h-4 fill-current" />
							</button>
						</div>

						<p className="flex items-center gap-2 text-sm text-text/65">
							<span
								className="inline-block h-1.5 w-1.5 rounded-full bg-success shrink-0"
								aria-hidden="true"
							/>
							{heroSection.trustLine}
						</p>
					</div>

					{/* Right — dashboard screenshot */}
					<div className="flex items-center justify-center mt-2 lg:mt-0">
						<div className="relative w-full max-w-xl">
							<div className="absolute inset-0 bg-light-contrast/20 blur-[80px] rounded-full scale-150" />

							<div className="relative rounded-xl overflow-hidden shadow-2xl shadow-accent/20 border border-light-contrast/20">
								<Image
									src={heroSection.dashboardImage.src}
									alt={heroSection.dashboardImage.alt}
									width={heroSection.dashboardImage.width}
									height={heroSection.dashboardImage.height}
									className="w-full h-auto"
									sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 576px"
									priority
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Live stats — full width below the grid */}
				<HeroLiveStats />

				{/* Scroll cue */}
				<button
					type="button"
					onClick={() =>
						document
							.getElementById("about")
							?.scrollIntoView({ behavior: "smooth" })
					}
					aria-label="Scroll to next section"
					className="group self-center mt-2 sm:mt-3 flex flex-col items-center gap-2 text-text/55 hover:text-text/90 transition-colors cursor-pointer"
				>
					<span
						aria-hidden="true"
						className="relative w-5 h-8 rounded-full border-2 border-current"
					>
						<span className="absolute left-1/2 top-1.5 w-0.5 h-1.5 bg-current rounded-full -translate-x-1/2 animate-scroll-dot" />
					</span>
					<span className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.25em] font-medium">
						Scroll
					</span>
				</button>
			</div>
		</section>
	);
}
