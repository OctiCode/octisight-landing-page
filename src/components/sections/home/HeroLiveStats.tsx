"use client";

import { useEffect, useRef, useState } from "react";
import {
	Activity,
	Bug,
	Clock,
	type LucideIcon,
	TriangleAlert,
} from "lucide-react";
import { heroSection } from "@/content/home";
import { useLandingStats } from "@/components/providers/LandingStatsProvider";
import { useTimeAgo } from "@/hooks/useTimeAgo";

type StatKey = "tracked" | "exploited" | "critical";

const COUNTUP_MS = 1400;
const FLASH_MS = 1000;

/**
 * Starts AT the target (so SSR renders the real number — no 0→animate jank and
 * no hydration mismatch), then animates old→new whenever the polled value
 * changes. The live delta animation is the meaningful signal, not a one-off
 * count-from-zero.
 */
function useCountUp(target: number, durationMs = COUNTUP_MS) {
	const [value, setValue] = useState(target);
	const fromRef = useRef(target);

	useEffect(() => {
		const from = fromRef.current;
		fromRef.current = target;
		if (from === target) return;

		const start = performance.now();
		let raf = 0;
		const tick = (now: number) => {
			const t = Math.min((now - start) / durationMs, 1);
			const eased = 1 - (1 - t) ** 3;
			setValue(Math.round(from + (target - from) * eased));
			if (t < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [target, durationMs]);

	return value;
}

export default function HeroLiveStats() {
	const { stats, lastUpdatedAt } = useLandingStats();
	const hero = stats?.hero;
	const fallback = heroSection.stats;

	// Live values with static fallbacks (section must never look broken).
	const tracked = hero?.vulnerabilitiesTracked ?? fallback.tracked.initial;
	const exploited = hero?.activelyExploited ?? fallback.exploited.initial;
	const critical = hero?.criticalFindings ?? fallback.critical.initial;

	const trackedValue = useCountUp(tracked);
	const exploitedValue = useCountUp(exploited);
	const criticalValue = useCountUp(critical);

	const updatedAgo = useTimeAgo(lastUpdatedAt);
	const lastSyncAgo = useTimeAgo(hero?.lastSyncAt ?? null);

	// Flash the card whose value just ticked up after a poll.
	const [flash, setFlash] = useState<StatKey | null>(null);
	const prev = useRef({ tracked, exploited, critical });
	useEffect(() => {
		let key: StatKey | null = null;
		if (tracked > prev.current.tracked) key = "tracked";
		else if (exploited > prev.current.exploited) key = "exploited";
		else if (critical > prev.current.critical) key = "critical";
		prev.current = { tracked, exploited, critical };
		if (!key) return;
		setFlash(key);
		const id = window.setTimeout(() => setFlash(null), FLASH_MS);
		return () => window.clearTimeout(id);
	}, [tracked, exploited, critical]);

	return (
		<div className="relative rounded-xl border border-light-contrast/15 bg-background/55 backdrop-blur-md px-3 py-2.5 sm:px-4 sm:py-3 shadow-lg shadow-primary/10">
			{/* Header — LIVE + updated-ago ticker */}
			<div className="flex items-center gap-2 mb-2.5 sm:mb-3">
				<span className="relative flex h-2 w-2 shrink-0">
					<span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
					<span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
				</span>
				<span className="text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] text-success uppercase">
					Live
				</span>
				<span className="text-[0.65rem] sm:text-xs text-text/40 truncate">
					· Updated {updatedAgo}
				</span>
			</div>

			{/* Stats grid — horizontal card layout for compactness */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
				<StatCard
					icon={Bug}
					label={fallback.tracked.label}
					value={trackedValue}
					flash={flash === "tracked"}
				/>
				<StatCard
					icon={Activity}
					label={fallback.exploited.label}
					value={exploitedValue}
					flash={flash === "exploited"}
					accent="warn"
				/>
				<StatCard
					icon={TriangleAlert}
					label={fallback.critical.label}
					value={criticalValue}
					flash={flash === "critical"}
					accent="danger"
				/>
				<StatCard icon={Clock} label="Last sync" textValue={lastSyncAgo} />
			</div>
		</div>
	);
}

type StatCardProps = {
	icon: LucideIcon;
	label: string;
	value?: number;
	textValue?: string;
	flash?: boolean;
	accent?: "default" | "warn" | "danger";
};

function StatCard({
	icon: Icon,
	label,
	value,
	textValue,
	flash = false,
	accent = "default",
}: StatCardProps) {
	const accentClass =
		accent === "danger"
			? "text-red-300"
			: accent === "warn"
				? "text-light-2-contrast"
				: "text-light-contrast/70";

	return (
		<div
			className={`relative rounded-lg border bg-white/[0.03] px-2.5 py-2 sm:px-3 sm:py-2.5 transition-all duration-500 overflow-hidden flex items-center gap-2.5 ${
				flash
					? "border-accent/60 bg-accent/10 shadow-[0_0_18px_-4px_rgba(197,48,219,0.55)]"
					: "border-white/8"
			}`}
		>
			{flash && (
				<span
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent"
				/>
			)}

			<Icon
				className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${accentClass}`}
				aria-hidden="true"
			/>

			<div className="min-w-0 flex-1">
				<div className="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight tabular-nums truncate">
					{textValue ?? value?.toLocaleString("en-US") ?? "—"}
				</div>
				<div className="text-[0.6rem] sm:text-[0.65rem] text-text/55 leading-tight truncate">
					{label}
				</div>
			</div>

			{flash && (
				<span className="text-[0.55rem] font-bold tracking-wider text-accent uppercase animate-pulse shrink-0">
					+1
				</span>
			)}
		</div>
	);
}
