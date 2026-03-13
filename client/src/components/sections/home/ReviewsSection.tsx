"use client";

import { customerReviewsSection } from "@/content/home";
import { Star } from "lucide-react";
import {
	useRef,
	useCallback,
	useEffect,
	useState,
	type PointerEvent as ReactPointerEvent,
} from "react";

type Review = {
	id: string | number;
	message: string;
	username: string;
	role: string;
	company: string;
	rating: number;
};

const SCROLL_SPEED_PX_PER_SEC = 60;
const MOMENTUM_FRICTION = 0.92;
const MOMENTUM_MIN_VELOCITY = 0.3;
const RESUME_DELAY_MS = 1200;

export default function ReviewsSection() {
	const reviews = customerReviewsSection.reviews;

	const trackRef = useRef<HTMLDivElement>(null);
	const offsetRef = useRef(0);
	const halfWidthRef = useRef(0);
	const rafIdRef = useRef<number>(0);
	const isAutoRef = useRef(true);
	const isDraggingRef = useRef(false);
	const pointerStartXRef = useRef(0);
	const offsetAtDragStartRef = useRef(0);
	const prevDragXRef = useRef(0);
	const prevDragTimeRef = useRef(0);
	const velocityRef = useRef(0);
	const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [dragging, setDragging] = useState(false);

	const applyOffset = useCallback((px: number) => {
		const track = trackRef.current;
		const half = halfWidthRef.current;
		if (!track || !half) return;

		let o = px % half;
		if (o > 0) o -= half;
		offsetRef.current = o;
		track.style.transform = `translateX(${o}px)`;
	}, []);

	const startAutoScroll = useCallback(() => {
		if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
		isAutoRef.current = true;
		let prev: number | null = null;

		const tick = (now: number) => {
			if (!isAutoRef.current) return;
			if (prev !== null) {
				applyOffset(
					offsetRef.current - SCROLL_SPEED_PX_PER_SEC * ((now - prev) / 1000),
				);
			}
			prev = now;
			rafIdRef.current = requestAnimationFrame(tick);
		};
		rafIdRef.current = requestAnimationFrame(tick);
	}, [applyOffset]);

	const stopAutoScroll = useCallback(() => {
		isAutoRef.current = false;
		if (rafIdRef.current) {
			cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = 0;
		}
	}, []);

	const startMomentum = useCallback(() => {
		if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

		const tick = () => {
			velocityRef.current *= MOMENTUM_FRICTION;
			if (Math.abs(velocityRef.current) < MOMENTUM_MIN_VELOCITY) {
				if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
				resumeTimerRef.current = setTimeout(startAutoScroll, RESUME_DELAY_MS);
				return;
			}
			applyOffset(offsetRef.current + velocityRef.current);
			rafIdRef.current = requestAnimationFrame(tick);
		};
		rafIdRef.current = requestAnimationFrame(tick);
	}, [applyOffset, startAutoScroll]);

	useEffect(() => {
		const measure = () => {
			if (trackRef.current)
				halfWidthRef.current = trackRef.current.scrollWidth / 2;
		};
		measure();
		const ro = new ResizeObserver(measure);
		if (trackRef.current) ro.observe(trackRef.current);
		return () => ro.disconnect();
	}, []);

	useEffect(() => {
		const t = setTimeout(startAutoScroll, 80);
		return () => {
			clearTimeout(t);
			stopAutoScroll();
			if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
		};
	}, [startAutoScroll, stopAutoScroll]);

	const onPointerDown = useCallback(
		(e: ReactPointerEvent<HTMLDivElement>) => {
			if (e.pointerType === "mouse" && e.button !== 0) return;

			stopAutoScroll();
			if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

			isDraggingRef.current = true;
			setDragging(true);
			velocityRef.current = 0;

			pointerStartXRef.current = e.clientX;
			offsetAtDragStartRef.current = offsetRef.current;
			prevDragXRef.current = e.clientX;
			prevDragTimeRef.current = performance.now();

			(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
		},
		[stopAutoScroll],
	);

	const onPointerMove = useCallback(
		(e: ReactPointerEvent<HTMLDivElement>) => {
			if (!isDraggingRef.current) return;

			const dx = e.clientX - pointerStartXRef.current;
			applyOffset(offsetAtDragStartRef.current + dx);

			const now = performance.now();
			const dt = now - prevDragTimeRef.current;
			if (dt > 0)
				velocityRef.current = ((e.clientX - prevDragXRef.current) / dt) * 16;
			prevDragXRef.current = e.clientX;
			prevDragTimeRef.current = now;
		},
		[applyOffset],
	);

	const onPointerUp = useCallback(() => {
		if (!isDraggingRef.current) return;
		isDraggingRef.current = false;
		setDragging(false);

		if (Math.abs(velocityRef.current) > MOMENTUM_MIN_VELOCITY) {
			startMomentum();
		} else {
			if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
			resumeTimerRef.current = setTimeout(startAutoScroll, RESUME_DELAY_MS);
		}
	}, [startMomentum, startAutoScroll]);

	const onClickCapture = useCallback((e: React.MouseEvent) => {
		if (Math.abs(e.clientX - pointerStartXRef.current) > 4) e.stopPropagation();
	}, []);

	return (
		<section className="relative w-full pt-8 sm:pt-10 md:pt-14 pb-4 sm:pb-6 md:pb-8">
			<div className="relative z-10 mx-auto max-w-7xl h-full px-4 sm:px-6 flex items-center">
				<div className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full text-center py-4 sm:py-6">
					<div className="inline-flex">
						<span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-xs sm:text-sm font-book backdrop-blur-sm">
							{customerReviewsSection.headerTitle}
						</span>
					</div>

					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-4xl mt-1 mb-1">
						{customerReviewsSection.title}
					</h2>

					<p className="text-sm sm:text-base md:text-lg text-text/90 max-w-2xl leading-relaxed px-1">
						{customerReviewsSection.paragraph}
					</p>

					<p
						className="flex items-center gap-1.5 text-text/35 text-xs sm:hidden select-none mt-0.5"
						aria-hidden="true"
					>
						<span>←</span>
						<span>Swipe to explore</span>
						<span>→</span>
					</p>

					<div
						className={`reviews-carousel-root relative w-full mt-4 sm:mt-6 md:mt-8 overflow-hidden select-none ${
							dragging ? "cursor-grabbing" : "cursor-grab"
						}`}
						onPointerDown={onPointerDown}
						onPointerMove={onPointerMove}
						onPointerUp={onPointerUp}
						onPointerCancel={onPointerUp}
						onClickCapture={onClickCapture}
						role="region"
						aria-label="Customer reviews — swipe or drag to browse"
					>
						<div
							className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"
							aria-hidden="true"
						/>
						<div
							className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"
							aria-hidden="true"
						/>

						<div
							ref={trackRef}
							className="reviews-carousel-track"
							style={{ transform: "translateX(0px)" }}
						>
							{reviews.map((r) => (
								<ReviewCard key={`a-${r.id}`} review={r} />
							))}
							{reviews.map((r) => (
								<ReviewCard key={`b-${r.id}`} review={r} ariaHidden />
							))}
						</div>
					</div>
				</div>
			</div>

			<style>{`
				.reviews-carousel-root {
					touch-action: pan-y;
					-webkit-tap-highlight-color: transparent;
					padding-bottom: 6px;
				}

				.reviews-carousel-track {
					display: flex;
					gap: 0.875rem;
					width: max-content;
					will-change: transform;
				}

				.review-card-item {
					flex: 0 0 calc(100vw - 3rem);
					max-width: calc(100vw - 3rem);
				}
				@media (min-width: 420px) {
					.review-card-item { flex: 0 0 80vw; max-width: 80vw; }
				}
				@media (min-width: 540px) {
					.review-card-item { flex: 0 0 70vw; max-width: 70vw; }
				}
				@media (min-width: 640px) {
					.reviews-carousel-track { gap: 1.25rem; }
					.review-card-item { flex: 0 0 62vw; max-width: 62vw; }
				}
				@media (min-width: 768px) {
					.review-card-item { flex: 0 0 48vw; max-width: 48vw; }
				}
				@media (min-width: 1024px) {
					.review-card-item { flex: 0 0 35vw; max-width: 35vw; }
				}
				@media (min-width: 1280px) {
					.reviews-carousel-track { gap: 1.5rem; }
					.review-card-item { flex: 0 0 32vw; max-width: 32vw; }
				}
				@media (min-width: 1536px) {
					.review-card-item { flex: 0 0 32vw; max-width: 32vw; }
				}

				@media (prefers-reduced-motion: reduce) {
					.reviews-carousel-track { transition: none !important; }
				}
			`}</style>
		</section>
	);
}

function ReviewCard({
	review,
	ariaHidden,
}: {
	review: Review;
	ariaHidden?: boolean;
}) {
	return (
		<article className="review-card-item" aria-hidden={ariaHidden || undefined}>
			<div className="relative bg-gradient-to-br from-primary/10 to-contrast/20 backdrop-blur-sm border border-light-contrast/40 rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 hover:border-light-contrast/70 hover:from-primary/15 hover:to-contrast/25 transition-colors duration-300 h-full flex flex-col gap-3 sm:gap-4">
				<div
					className="flex gap-0.5"
					aria-label={`${review.rating} out of 5 stars`}
				>
					{Array.from({ length: 5 }).map((_, i) => (
						<Star
							key={i}
							className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
								i < review.rating
									? "fill-accent text-accent"
									: "fill-text/15 text-text/15"
							}`}
						/>
					))}
				</div>

				<p className="text-sm sm:text-base text-text/85 leading-relaxed flex-grow text-left italic">
					&ldquo;{review.message}&rdquo;
				</p>

				<div className="h-px bg-light-contrast/10" aria-hidden="true" />

				<div className="flex items-center gap-2.5 sm:gap-3">
					<div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-light-contrast/25 flex items-center justify-center shrink-0">
						<span className="text-white font-bold text-sm sm:text-base select-none">
							{review.username.charAt(0)}
						</span>
					</div>
					<div className="text-left min-w-0">
						<h4 className="text-white font-bold text-sm sm:text-base truncate leading-tight">
							{review.username}
						</h4>
						<p className="text-text/55 text-xs sm:text-sm truncate leading-tight mt-0.5">
							{review.role}
							<span className="text-text/30 mx-1" aria-hidden="true">
								·
							</span>
							{review.company}
						</p>
					</div>
				</div>
			</div>
		</article>
	);
}
