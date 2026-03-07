"use client";

import { aboutSection } from "@/content/home";
import { useRef, useState } from "react";

export default function AboutSection() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	return (
		<section className="relative w-full min-h-[calc(100vh-4rem)] sm:h-auto py-8 sm:py-10">
			{/* Content Container */}
			<div className="relative z-10 mx-auto max-w-7xl h-full px-6 flex items-center">
				<div className="flex flex-col items-center justify-center gap-4 sm:gap-6 w-full text-center py-8">
					{/* Badge */}
					<div className="inline-flex">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							{aboutSection.headerTitle}
						</span>
					</div>

					{/* Main Heading */}
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
						{aboutSection.title}
					</h2>

					{/* Description */}
					<p className="text-base sm:text-lg text-text/90 max-w-3xl leading-relaxed">
						{aboutSection.paragraph}
					</p>

					{/* Video Container */}
					<div className="relative w-full max-w-4xl mt-4 sm:mt-6">
						{/* Glow effect behind video */}
						<div className="absolute inset-0 bg-light-contrast/20 blur-[80px] rounded-3xl scale-110" />

						{/* Video Wrapper */}
						<div className="relative rounded-2xl overflow-hidden shadow-2xl border border-light-contrast/20">
							<video
								ref={videoRef}
								className="w-full h-auto"
								controls
								onClick={handlePlayPause}
								onPlay={() => setIsPlaying(true)}
								onPause={() => setIsPlaying(false)}
							>
								<source src="/videos/octisight-video.mp4" type="video/mp4" />
								Your browser does not support the video tag.
							</video>

							{/* Custom Play Button Overlay (shows when paused) */}
							{!isPlaying && (
								<button
									onClick={handlePlayPause}
									className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300 group"
									aria-label="Play video"
								>
									<div className="w-20 h-20 rounded-full bg-accent/90 hover:bg-accent flex items-center justify-center shadow-lg shadow-accent/50 group-hover:scale-110 transition-transform duration-300">
										<svg
											className="w-10 h-10 text-white ml-1"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M8 5v14l11-7z" />
										</svg>
									</div>
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
