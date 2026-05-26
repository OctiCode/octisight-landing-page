"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import type { LandingStats } from "@/lib/landing-stats";

type LandingStatsContextValue = {
	stats: LandingStats | null;
	lastUpdatedAt: string | null;
};

const LandingStatsContext = createContext<LandingStatsContextValue>({
	stats: null,
	lastUpdatedAt: null,
});

/** Poll cadence — matches the upstream's 60s cache; faster wouldn't be fresher. */
const POLL_INTERVAL_MS = 60_000;

export function LandingStatsProvider({
	initialStats,
	children,
}: {
	initialStats: LandingStats | null;
	children: ReactNode;
}) {
	const [stats, setStats] = useState<LandingStats | null>(initialStats);

	useEffect(() => {
		let cancelled = false;

		const poll = async () => {
			// Don't poll a hidden tab — it refreshes on focus anyway.
			if (typeof document !== "undefined" && document.hidden) return;
			try {
				const res = await fetch("/api/landing-stats");
				// 429 / 5xx → keep last-good, skip this tick silently.
				if (!res.ok) return;
				const json = await res.json();
				if (!cancelled && json?.success && json?.data) {
					setStats(json.data as LandingStats);
				}
			} catch {
				// Network failure → keep last-good.
			}
		};

		// If SSR couldn't seed us, fetch right away; otherwise wait for the tick.
		if (!initialStats) poll();

		const intervalId = window.setInterval(poll, POLL_INTERVAL_MS);
		const onFocusOrVisible = () => {
			if (!document.hidden) poll();
		};
		document.addEventListener("visibilitychange", onFocusOrVisible);
		window.addEventListener("focus", onFocusOrVisible);

		return () => {
			cancelled = true;
			window.clearInterval(intervalId);
			document.removeEventListener("visibilitychange", onFocusOrVisible);
			window.removeEventListener("focus", onFocusOrVisible);
		};
		// initialStats is a one-time seed; we intentionally run this once.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<LandingStatsContext.Provider
			value={{ stats, lastUpdatedAt: stats?.lastUpdatedAt ?? null }}
		>
			{children}
		</LandingStatsContext.Provider>
	);
}

export function useLandingStats(): LandingStatsContextValue {
	return useContext(LandingStatsContext);
}
