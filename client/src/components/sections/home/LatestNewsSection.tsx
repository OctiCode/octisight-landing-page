"use client";

import { latestNewsSection } from "@/content/home";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
	useRef,
	useCallback,
	useEffect,
	useState,
	useMemo,
	type PointerEvent as ReactPointerEvent,
} from "react";

type NewsItem = {
	id: string | number;
	title: string;
	excerpt: string;
	date: string;
	category: string;
	image: string;
	slug: string;
};

const SCROLL_SPEED_PX_PER_SEC = 30;
const MOMENTUM_FRICTION = 0.92;
const MOMENTUM_MIN_VELOCITY = 0.3;
const RESUME_DELAY_MS = 1200;

const mockNews: NewsItem[] = [
	{
		id: "news1",
		title: "OctiSight Raises $50M Series B to Expand Powered Security Platform",
		excerpt:
			"New funding accelerates OctiSight's mission to democratize enterprise-grade vulnerability management with AI and automation.",
		date: "2024-03-15",
		category: "Company News",
		image: "/images/elements/newsimage.jpg",
		slug: "octisight-raises-50m-series-b",
	},
	{
		id: "news2",
		title: "New Report: The State of Vulnerability Management 2026",
		excerpt:
			"OctiSight releases comprehensive industry report analyzing vulnerability management trends, challenges, and best practices.",
		date: "2024-03-10",
		category: "Research",
		image: "/images/elements/newsimage.jpg",
		slug: "vulnerability-management-report-2026",
	},
	{
		id: "news3",
		title: "OctiSight Achieves SOC 2 Type II Compliance",
		excerpt:
			"Enterprise customers can now trust OctiSight with their most sensitive security data with our latest certification.",
		date: "2024-03-05",
		category: "Product",
		image: "/images/elements/newsimage.jpg",
		slug: "octisight-soc2-type-ii-compliance",
	},
	{
		id: "news4",
		title: "Introducing AI-Powered Remediation Recommendations",
		excerpt:
			"Our latest feature uses machine learning to provide context-aware fix suggestions, reducing remediation time by 60%.",
		date: "2024-02-28",
		category: "Product",
		image: "/images/elements/newsimage.jpg",
		slug: "ai-powered-remediation-recommendations",
	},
];

export default function LatestNewsSection() {
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
							{latestNewsSection.headerTitle}
						</span>
					</div>

					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-4xl mt-1 mb-1">
						{latestNewsSection.title}
					</h2>

					<p className="text-sm sm:text-base md:text-lg text-text/90 max-w-2xl leading-relaxed px-1">
						{latestNewsSection.paragraph}
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
						className={`news-carousel-root relative w-full mt-4 sm:mt-6 md:mt-8 overflow-hidden select-none ${
							dragging ? "cursor-grabbing" : "cursor-grab"
						}`}
						onPointerDown={onPointerDown}
						onPointerMove={onPointerMove}
						onPointerUp={onPointerUp}
						onPointerCancel={onPointerUp}
						onClickCapture={onClickCapture}
						role="region"
						aria-label="Latest news — swipe or drag to browse"
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
							className="news-carousel-track"
							style={{ transform: "translateX(0px)" }}
						>
							{mockNews.map((item) => (
								<NewsCard key={`a-${item.id}`} news={item} />
							))}
							{mockNews.map((item) => (
								<NewsCard key={`b-${item.id}`} news={item} ariaHidden />
							))}
						</div>
					</div>

					<Link
						href={latestNewsSection.cta.href}
						className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm sm:text-base border hover:border-white border-primary transition-all duration-300 hover:scale-105"
					>
						{latestNewsSection.cta.text}
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>

			<style>{`
				.news-carousel-root {
					touch-action: pan-y;
					-webkit-tap-highlight-color: transparent;
					padding-bottom: 6px;
				}

				.news-carousel-track {
					display: flex;
					gap: 0.875rem;
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
					.news-carousel-track { gap: 1.25rem; }
					.news-card-item { flex: 0 0 62vw; max-width: 62vw; }
				}
				@media (min-width: 768px) {
					.news-card-item { flex: 0 0 48vw; max-width: 48vw; }
				}
				@media (min-width: 1024px) {
					.news-card-item { flex: 0 0 35vw; max-width: 35vw; }
				}
				@media (min-width: 1280px) {
					.news-carousel-track { gap: 1.5rem; }
					.news-card-item { flex: 0 0 32vw; max-width: 32vw; }
				}
				@media (min-width: 1536px) {
					.news-card-item { flex: 0 0 32vw; max-width: 32vw; }
				}

				@media (prefers-reduced-motion: reduce) {
					.news-carousel-track { transition: none !important; }
				}
			`}</style>
		</section>
	);
}

function NewsCard({
	news,
	ariaHidden,
}: {
	news: NewsItem;
	ariaHidden?: boolean;
}) {
	const formattedDate = useMemo(() => {
		const date = new Date(news.date);
		return date.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	}, [news.date]);

	const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
		const clickX = e.clientX;
		const startX = (e.currentTarget as any)._startX || clickX;

		if (Math.abs(clickX - startX) > 5) {
			e.preventDefault();
		}
	}, []);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			(e.currentTarget as any)._startX = e.clientX;
		},
		[],
	);

	return (
		<article className="news-card-item" aria-hidden={ariaHidden || undefined}>
			<Link
				href={`/news/${news.slug}`}
				className="block h-full group"
				onClick={handleClick}
				onMouseDown={handleMouseDown}
			>
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
