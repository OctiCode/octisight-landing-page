"use client";

import { Button } from "@/components/ui/button";
import { heroSection } from "@/content/home";
import Image from "next/image";
import Link from "next/link";
import { ScanSearch } from "lucide-react";
import { useEffect, useRef } from "react";

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
		<section className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-linear-to-b from-background via-contrast to-background pb-0">
			<canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

			<div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/50 to-black/0" />

			<div className="relative z-10 mx-auto max-w-7xl h-full px-4 sm:px-6 flex items-center">
				<div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 sm:gap-10 lg:gap-12 items-center w-full">
					<div className="flex flex-col gap-4 sm:gap-5 md:gap-6 text-white">
						{/* <div className="inline-flex">
							<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
								{heroSection.headerTitle}
							</span>
						</div> */}

						<h1 className="text-3xl my-2 sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
							{heroSection.title}
						</h1>

						<p className="text-base sm:text-lg md:text-xl text-text/90 max-w-xl leading-relaxed">
							{heroSection.paragraph}
						</p>

						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-4">
							<Link href={heroSection.buttons.primary.href}>
								<Button className="bg-accent hover:bg-light-contrast text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium rounded-lg transition-all duration-300 shadow-sm shadow-accent/30 hover:shadow-accent/50 w-full sm:w-auto flex items-center gap-2">
									{heroSection.buttons.primary.text}
									<ScanSearch className="w-5 h-5" />
								</Button>
							</Link>

							<Link href={heroSection.buttons.secondary.href}>
								<Button className="bg-transparent hover:bg-text/10 text-text border-2 border-text/30 hover:border-text/50 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium rounded-lg transition-all duration-300 w-full sm:w-auto">
									{heroSection.buttons.secondary.text}
								</Button>
							</Link>
						</div>
						<p className="text-sm sm:text-base text-text/70 mt-2 sm:mt-4">
							Built for SMBs. Powered by AI. No security team required.
						</p>
					</div>

					<div className="hidden lg:flex items-center justify-center">
						<div className="relative">
							<div className="absolute inset-0 bg-light-contrast/20 blur-[80px] rounded-full scale-150" />

							<div className="relative">
								<Image
									src="/images/logo/OctiSight_logo-02.svg"
									alt="OctiSight"
									width={500}
									height={200}
									className="w-full max-w-md h-auto drop-shadow-2xl animate-float"
									sizes="(max-width: 1024px) 0px, 448px"
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
