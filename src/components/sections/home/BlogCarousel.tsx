"use client";

import { ArrowRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { blogSection } from "@/content/home";
import type { BlogListItem } from "@/types/blog";

interface BlogCarouselProps {
	blogs: BlogListItem[];
}

export default function BlogCarousel({ blogs }: BlogCarouselProps) {
	const [activeReal, setActiveReal] = useState(0);

	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const domIndexRef = useRef(0);
	const isAnimatingRef = useRef(false);

	const n = blogs.length;

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

	// Once blogs are available, position on real[0] (DOM index = N), no animation
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
			...blogs.map((item) => ({
				item,
				key: `lc-${item.id}`,
				isClone: true,
				realIdx: undefined as number | undefined,
			})),
			...blogs.map((item, i) => ({
				item,
				key: `real-${item.id}`,
				isClone: false,
				realIdx: i,
			})),
			...blogs.map((item) => ({
				item,
				key: `rc-${item.id}`,
				isClone: true,
				realIdx: undefined as number | undefined,
			})),
		],
		[blogs],
	);

	const canNavigate = n > 1;

	return (
		<>
			{/* Carousel viewport */}
			<div ref={containerRef} className="relative w-full overflow-hidden">
				{/* Left fade */}
				<div
					className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none"
					aria-hidden="true"
				/>
				{/* Right fade */}
				<div
					className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none"
					aria-hidden="true"
				/>

				<div
					ref={trackRef}
					className="blog-carousel-track"
					onTransitionEnd={onTransitionEnd}
				>
					{allItems.map(({ item, key, isClone, realIdx = 0 }) => (
						<BlogCard
							key={key}
							blog={item}
							isActive={!isClone && realIdx === activeReal}
							ariaHidden={isClone}
						/>
					))}
				</div>
			</div>

			{/* Navigation */}
			<div className="mt-6 sm:mt-8 flex items-center justify-center gap-3">
				{canNavigate && (
					<button
						type="button"
						onClick={handlePrev}
						aria-label="Previous blog"
						className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white border border-accent/50 hover:border-accent transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
					>
						<ChevronLeft className="w-5 h-5" />
					</button>
				)}

				<Link
					href={blogSection.cta.href}
					className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm sm:text-base border border-accent/50 hover:border-accent transition-all duration-300 hover:scale-105"
				>
					{blogSection.cta.text}
					<ArrowRight className="w-4 h-4" />
				</Link>

				{canNavigate && (
					<button
						type="button"
						onClick={handleNext}
						aria-label="Next blog"
						className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white border border-accent/50 hover:border-accent transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
					>
						<ChevronRight className="w-5 h-5" />
					</button>
				)}
			</div>

			<style>{`
				.blog-carousel-track {
					display: flex;
					gap: 1.25rem;
					width: max-content;
					will-change: transform;
				}

				.blog-card-item {
					flex: 0 0 calc(100vw - 3rem);
					max-width: calc(100vw - 3rem);
				}
				@media (min-width: 420px) {
					.blog-card-item { flex: 0 0 80vw; max-width: 80vw; }
				}
				@media (min-width: 540px) {
					.blog-card-item { flex: 0 0 70vw; max-width: 70vw; }
				}
				@media (min-width: 640px) {
					.blog-card-item { flex: 0 0 62vw; max-width: 62vw; }
				}
				@media (min-width: 768px) {
					.blog-card-item { flex: 0 0 48vw; max-width: 48vw; }
				}
				@media (min-width: 1024px) {
					.blog-card-item { flex: 0 0 35vw; max-width: 35vw; }
				}
				@media (min-width: 1280px) {
					.blog-card-item { flex: 0 0 32vw; max-width: 32vw; }
				}

				@media (prefers-reduced-motion: reduce) {
					.blog-carousel-track { transition: none !important; }
				}
			`}</style>
		</>
	);
}

/* ─── Blog Card ─────────────────────────────────────────────────── */

interface BlogCardProps {
	blog: BlogListItem;
	isActive?: boolean;
	ariaHidden?: boolean;
}

function BlogCard({ blog, isActive, ariaHidden }: BlogCardProps) {
	return (
		<article
			className={`blog-card-item transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-50"}`}
			aria-hidden={ariaHidden}
		>
			<Link href={`/blog/${blog.slug}`} className="block h-full group">
				<div className="relative h-full rounded-xl overflow-hidden border border-white/8 bg-white/3 hover:border-accent/30 transition-colors duration-300 flex flex-col">
					{/* Image — only render if available */}
					{blog.image && (
						<div className="relative w-full aspect-[2.4/1] overflow-hidden">
							<Image
								src={blog.image}
								alt={blog.title}
								fill
								className="object-cover pointer-events-none select-none group-hover:scale-105 transition-transform duration-700 ease-out"
								sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 28vw"
								draggable={false}
							/>
							<span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 py-0.5 rounded-full bg-accent/20 border border-accent/30 text-white text-[0.6rem] sm:text-xs font-semibold backdrop-blur-md">
								{blog.category}
							</span>
						</div>
					)}

					{/* Category pill when no image */}
					{!blog.image && (
						<div className="px-3.5 pt-3.5 sm:px-4 sm:pt-4">
							<span className="inline-flex px-2 py-0.5 rounded-full bg-accent/20 border border-accent/30 text-white text-[0.6rem] sm:text-xs font-semibold">
								{blog.category}
							</span>
						</div>
					)}

					{/* Body */}
					<div className="flex flex-col grow p-3.5 sm:p-4 gap-2.5">
						{/* Title */}
						<h3 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-accent/90 transition-colors duration-300 text-left">
							{blog.title}
						</h3>

						{/* Excerpt */}
						{blog.excerpt && (
							<p className="text-text/55 text-xs sm:text-sm leading-relaxed line-clamp-2 grow text-left">
								{blog.excerpt}
							</p>
						)}

						{/* Footer */}
						<div className="flex items-center justify-end mt-auto pt-2.5 border-t border-white/6">
							<span className="flex items-center gap-1 text-accent/70 text-[0.65rem] sm:text-xs font-medium group-hover:text-accent group-hover:gap-1.5 transition-all duration-300">
								<BookOpen className="w-3 h-3" />
								Read
								<ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform duration-300" />
							</span>
						</div>
					</div>
				</div>
			</Link>
		</article>
	);
}
