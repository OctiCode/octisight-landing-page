"use client";

import { useEffect, useState } from "react";
import {
	Activity,
	Bug,
	Clock,
	type LucideIcon,
	TriangleAlert,
} from "lucide-react";
import { heroSection } from "@/content/home";

type StatKey = "tracked" | "exploited" | "critical";

const COUNTUP_MS = 1400;
const TICK_MIN_MS = 6000;
const TICK_MAX_MS = 11000;
const FLASH_MS = 900;

function useCountUp(target: number, durationMs = COUNTUP_MS) {
	const [value, setValue] = useState(0);

	useEffect(() => {
		const start = performance.now();
		const startValue = value;
		const delta = target - startValue;
		let raf = 0;

		const tick = (now: number) => {
			const t = Math.min((now - start) / durationMs, 1);
			const eased = 1 - (1 - t) ** 3;
			setValue(Math.round(startValue + delta * eased));
			if (t < 1) raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [target, durationMs]);

	return value;
}

function formatRelative(seconds: number) {
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
	return `${Math.floor(seconds / 3600)}h ago`;
}

export default function HeroLiveStats() {
	const { tracked, exploited, critical, lastSyncSeconds } = heroSection.stats;

	const [trackedTarget, setTrackedTarget] = useState<number>(tracked.initial);
	const [exploitedTarget, setExploitedTarget] = useState<number>(
		exploited.initial,
	);
	const [criticalTarget, setCriticalTarget] = useState<number>(
		critical.initial,
	);
	const [syncSec, setSyncSec] = useState<number>(lastSyncSeconds);
	const [flash, setFlash] = useState<StatKey | null>(null);

	const trackedValue = useCountUp(trackedTarget);
	const exploitedValue = useCountUp(exploitedTarget);
	const criticalValue = useCountUp(criticalTarget);

	// Tick the "last sync" counter every second
	useEffect(() => {
		const id = window.setInterval(() => setSyncSec((s) => s + 1), 1000);
		return () => window.clearInterval(id);
	}, []);

	// Periodically bump a stat to simulate live updates from an API
	useEffect(() => {
		let timeoutId = 0;
		let flashTimeoutId = 0;

		const scheduleNext = () => {
			const wait = TICK_MIN_MS + Math.random() * (TICK_MAX_MS - TICK_MIN_MS);
			timeoutId = window.setTimeout(() => {
				const pick = Math.random();
				let key: StatKey;
				if (pick < 0.7) {
					key = "tracked";
					setTrackedTarget((v) => v + Math.floor(Math.random() * 4) + 1);
				} else if (pick < 0.88) {
					key = "exploited";
					setExploitedTarget((v) => v + 1);
				} else {
					key = "critical";
					setCriticalTarget((v) => v + 1);
				}
				setFlash(key);
				setSyncSec(0);
				flashTimeoutId = window.setTimeout(() => setFlash(null), FLASH_MS);
				scheduleNext();
			}, wait);
		};

		scheduleNext();
		return () => {
			window.clearTimeout(timeoutId);
			window.clearTimeout(flashTimeoutId);
		};
	}, []);

	const lastSyncText = syncSec < 120 ? "<2 min ago" : formatRelative(syncSec);

	return (
		<div className="relative rounded-xl border border-light-contrast/15 bg-background/55 backdrop-blur-md px-3 py-2.5 sm:px-4 sm:py-3 shadow-lg shadow-primary/10">
			{/* Header — compact, single row */}
			<div className="flex items-center gap-2 mb-2.5 sm:mb-3">
				<span className="relative flex h-2 w-2 shrink-0">
					<span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
					<span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
				</span>
				<span className="text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] text-success uppercase">
					Live
				</span>
				<span className="text-[0.65rem] sm:text-xs text-text/40 truncate">
					· Security telemetry
				</span>
			</div>

			{/* Stats grid — horizontal card layout for compactness */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
				<StatCard
					icon={Bug}
					label={tracked.label}
					value={trackedValue}
					flash={flash === "tracked"}
				/>
				<StatCard
					icon={Activity}
					label={exploited.label}
					value={exploitedValue}
					flash={flash === "exploited"}
					accent="warn"
				/>
				<StatCard
					icon={TriangleAlert}
					label={critical.label}
					value={criticalValue}
					flash={flash === "critical"}
					accent="danger"
				/>
				<StatCard
					icon={Clock}
					label="Last sync"
					textValue={lastSyncText}
				/>
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
