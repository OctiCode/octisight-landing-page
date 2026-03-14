"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { latestNewsSection } from "@/content/home";
import type { NewsListItem } from "@/types/news";

export default function LatestNewsSection() {
	const [news, setNews] = useState<NewsListItem[]>([]);
	// Logical index in [0, N-1] — drives the opacity highlight only
	const [activeReal, setActiveReal] = useState(0);

	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	// Current DOM index (accounts for clone offset)
	const domIndexRef = useRef(0);
	// Block new presses while a transition is running
	const isAnimatingRef = useRef(false);

	useEffect(() => {
		fetch("/api/news")
			.then((res) => res.json())
			.then((data) => setNews(data.slice(0, 4)))
			.catch((err) => console.error("Error fetching news:", err));
	}, []);

	const n = news.length;

	/** translateX that centres the card at `domIdx` inside the container. */
	const offsetForDomIndex = useCallback(
		(domIdx: number): number => {
			const track = trackRef.current;
			const container = containerRef.current;
			if (!track || !container || !n) return 0;
			const card = track.children[domIdx] as HTMLElement | undefined;
			if (!card) return 0;
			const centred =
				card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
			return -centred;
		},
		[n],
	);

	/** Slide track to `domIdx`. `animated = false` → instant (teleport). */
	const moveTo = useCallback(
		(domIdx: number, animated: boolean) => {
			const track = trackRef.current;
			if (!track) return;
			domIndexRef.current = domIdx;
			track.style.transition = animated
				? "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)"
				: "none";
			track.style.transform = `translateX(${offsetForDomIndex(domIdx)}px)`;
		},
		[offsetForDomIndex],
	);

	// Once news is available, position on real[0] (DOM index = N), no animation
	useEffect(() => {
		if (!n) return;
		const id = requestAnimationFrame(() => {
			domIndexRef.current = n;
			moveTo(n, false);
		});
		return () => cancelAnimationFrame(id);
	}, [n, moveTo]);

	// Re-centre on resize (no animation)
	useEffect(() => {
		if (!n) return;
		const ro = new ResizeObserver(() => moveTo(domIndexRef.current, false));
		if (containerRef.current) ro.observe(containerRef.current);
		return () => ro.disconnect();
	}, [n, moveTo]);

	/**
	 * Called after every CSS transition ends.
	 * If we landed on a clone, teleport to the matching real card.
	 */
	const onTransitionEnd = useCallback(
		(e: React.TransitionEvent<HTMLDivElement>) => {
			// Only care about the transform transition on the track itself
			if (e.propertyName !== "transform") return;

			const domIdx = domIndexRef.current;

			if (domIdx >= 2 * n) {
				const realIdx = domIdx - n;
				moveTo(realIdx, false);
				setActiveReal(realIdx - n);
			} else if (domIdx < n) {
				const realIdx = domIdx + n;
				moveTo(realIdx, false);
				setActiveReal(realIdx - n);
			}

			isAnimatingRef.current = false;
		},
		[n, moveTo],
	);

	const handleNext = useCallback(() => {
		if (!n || isAnimatingRef.current) return;
		isAnimatingRef.current = true;
		const next = domIndexRef.current + 1;
		moveTo(next, true);
		setActiveReal((prev) => (prev + 1) % n);
	}, [n, moveTo]);

	const handlePrev = useCallback(() => {
		if (!n || isAnimatingRef.current) return;
		isAnimatingRef.current = true;
		const prev = domIndexRef.current - 1;
		moveTo(prev, true);
		setActiveReal((prev) => (prev - 1 + n) % n);
	}, [n, moveTo]);

	// Flatten into DOM order: left-clones | real | right-clones
	const allItems = useMemo(
		() => [
			...news.map((item) => ({
				item,
				key: `lc-${item.id}`,
				isClone: true,
				realIdx: undefined,
			})),
			...news.map((item, i) => ({
				item,
				key: `real-${item.id}`,
				isClone: false,
				realIdx: i,
			})),
			...news.map((item) => ({
				item,
				key: `rc-${item.id}`,
				isClone: true,
				realIdx: undefined,
			})),
		],
		[news],
	);

	const canNavigate = n > 1;

	return (
		<section className="relative w-full pt-8 sm:pt-10 md:pt-14 pb-4 sm:pb-6 md:pb-8">
			<div className="relative z-10 mx-auto max-w-7xl h-full px-4 sm:px-6 flex items-center">
				<div className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full text-center py-4 sm:py-6">
					{/* Badge */}
					<div className="inline-flex">
						<span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-xs sm:text-sm font-book backdrop-blur-sm">
							{latestNewsSection.headerTitle}
						</span>
					</div>

					{/* Heading */}
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-4xl mt-1 mb-1">
						{latestNewsSection.title}
					</h2>

					{/* Sub-paragraph */}
					<p className="text-sm sm:text-base md:text-lg text-text/90 max-w-2xl leading-relaxed px-1">
						{latestNewsSection.paragraph}
					</p>

					{/* Carousel */}
					<div ref={containerRef} className="relative w-full overflow-hidden">
						{/* Left fade */}
						<div
							className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"
							aria-hidden="true"
						/>
						{/* Right fade */}
						<div
							className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"
							aria-hidden="true"
						/>

						<div
							ref={trackRef}
							className="news-carousel-track"
							onTransitionEnd={onTransitionEnd}
						>
							{allItems.map(({ item, key, isClone, realIdx = 0 }) => (
								<NewsCard
									key={key}
									news={item}
									isActive={!isClone && realIdx === activeReal}
									ariaHidden={isClone}
								/>
							))}
						</div>
					</div>

					{/* CTA row: ← | View All News | → */}
					<div className="mt-6 sm:mt-8 flex items-center gap-3">
						{canNavigate && (
							<button
								type="button"
								onClick={handlePrev}
								aria-label="Previous news"
								className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white border border-primary hover:border-white transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
							>
								<ChevronLeft className="w-5 h-5" />
							</button>
						)}

						<Link
							href={latestNewsSection.cta.href}
							className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm sm:text-base border border-primary hover:border-white transition-all duration-300 hover:scale-105"
						>
							{latestNewsSection.cta.text}
							<ArrowRight className="w-4 h-4" />
						</Link>

						{canNavigate && (
							<button
								type="button"
								onClick={handleNext}
								aria-label="Next news"
								className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white border border-primary hover:border-white transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
							>
								<ChevronRight className="w-5 h-5" />
							</button>
						)}
					</div>
				</div>
			</div>

			<style>{`
				.news-carousel-track {
					display: flex;
					gap: 1.25rem;
					width: max-content;
					will-change: transform;
				}

				.news-card-item {
					flex: 0 0 calc(100vw - 3rem);
					max-width: calc(100vw - 3rem);
				}
				@media (min-width: 420px) {
					.news-card-item { flex: 0 0 80vw; max-width: 80vw; }
				}
				@media (min-width: 540px) {
					.news-card-item { flex: 0 0 70vw; max-width: 70vw; }
				}
				@media (min-width: 640px) {
					.news-card-item { flex: 0 0 62vw; max-width: 62vw; }
				}
				@media (min-width: 768px) {
					.news-card-item { flex: 0 0 48vw; max-width: 48vw; }
				}
				@media (min-width: 1024px) {
					.news-card-item { flex: 0 0 35vw; max-width: 35vw; }
				}
				@media (min-width: 1280px) {
					.news-card-item { flex: 0 0 32vw; max-width: 32vw; }
				}

				@media (prefers-reduced-motion: reduce) {
					.news-carousel-track { transition: none !important; }
				}
			`}</style>
		</section>
	);
}

interface NewsCardProps {
	news: NewsListItem;
	isActive?: boolean;
	ariaHidden?: boolean;
}

function NewsCard({ news, isActive, ariaHidden }: NewsCardProps) {
	const formattedDate = useMemo(() => {
		const date = new Date(news.date);
		return date.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	}, [news.date]);

	return (
		<article
			className={`news-card-item transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-50"}`}
			aria-hidden={ariaHidden}
		>
			<Link href={`/news/${news.slug}`} className="block h-full group">
				<div className="relative bg-gradient-to-br from-primary/10 to-contrast/20 backdrop-blur-sm border border-light-contrast/40 rounded-2xl overflow-hidden hover:border-light-contrast/70 transition-all duration-300 h-full">
					<div className="relative w-full aspect-[16/10] bg-gradient-to-br from-primary/20 to-contrast/30 overflow-hidden">
						<Image
							src={news.image}
							alt={news.title}
							fill
							className="object-cover pointer-events-none select-none"
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							draggable={false}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

						<div className="absolute bottom-0 text-left left-0 right-0 p-5 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4">
							<time
								dateTime={news.date}
								className="text-text/70 text-xs sm:text-sm font-medium"
							>
								{formattedDate}
							</time>

							<h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-tight">
								{news.title}
							</h3>

							<p className="text-text/85 text-sm sm:text-base leading-relaxed line-clamp-2">
								{news.excerpt}
							</p>

							<div className="flex items-center gap-1.5 text-accent text-sm sm:text-base font-medium group-hover:gap-2 transition-all duration-300">
								<span>Read more</span>
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
							</div>
						</div>
					</div>
				</div>
			</Link>
		</article>
	);
}
