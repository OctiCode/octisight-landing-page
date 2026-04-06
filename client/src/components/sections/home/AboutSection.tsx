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
		<section
			id="about"
			className="relative w-full sm:min-h-[calc(100vh-4rem)] sm:h-auto py-6 sm:py-8 md:py-10"
		>
			<div className="relative z-10 mx-auto max-w-7xl h-full px-4 sm:px-6 flex items-center">
				<div className="flex flex-col items-center justify-center gap-2 w-full text-center py-4 sm:py-6 md:py-8">
					<div className="inline-flex">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							{aboutSection.headerTitle}
						</span>
					</div>

					<h2 className="text-2xl my-3 sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white">
						{aboutSection.title}
					</h2>

					<p className="text-sm sm:text-base md:text-lg text-text/90 max-w-3xl leading-relaxed px-2">
						{aboutSection.paragraph}
					</p>

					<div className="relative w-full max-w-4xl mt-3">
						<div className="absolute inset-0 bg-light-contrast/20 blur-[80px] rounded-2xl scale-90" />

						<div className="relative rounded-2xl overflow-hidden shadow-2xl border border-light-contrast/20">
							<video
								ref={videoRef}
								className="w-full h-auto"
								controls
								onPlay={() => setIsPlaying(true)}
								onPause={() => setIsPlaying(false)}
							>
								<source src="/videos/octisight-video.mp4" type="video/mp4" />
								Your browser does not support the video tag.
							</video>

							{/* Custom play button overlay - only visible when video is paused */}
							{!isPlaying && (
								<button
									onClick={handlePlayPause}
									className="absolute cursor-pointer inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300 group"
									aria-label="Play video"
								>
									<div className="sm:w-20 sm:h-20 w-16 h-16 rounded-full bg-accent/90 hover:bg-accent flex items-center justify-center shadow-lg shadow-accent/50 group-hover:scale-110 transition-transform duration-300">
										<svg
											className="sm:w-10 sm:h-10 w-8 h-8 text-white"
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
