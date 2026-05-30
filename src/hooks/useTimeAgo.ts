"use client";

import { useEffect, useState } from "react";

/**
 * Returns a human "X ago" string for an ISO timestamp, re-computed every second
 * so it ticks live regardless of poll cadence. Handles null → "—" and clamps
 * negative deltas (visitor clock behind server) → "just now".
 *
 * Hydration-safe: `now` starts as null so the server-rendered output matches
 * the client's first render. The actual clock-based string only appears after
 * the post-mount effect runs (avoids React error #418 from Date.now() drift
 * between SSR and hydration).
 */
export function useTimeAgo(iso: string | null | undefined): string {
	const [now, setNow] = useState<number | null>(null);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setNow(Date.now());
		const id = window.setInterval(() => setNow(Date.now()), 1000);
		return () => window.clearInterval(id);
	}, []);

	if (!iso) return "—";

	// Pre-mount (SSR + first client render): return a stable placeholder so
	// hydration matches. "just now" is accurate because the stats this timer
	// describes were computed in the same SSR pass.
	if (now === null) return "just now";

	const then = new Date(iso).getTime();
	if (Number.isNaN(then)) return "—";

	let seconds = Math.floor((now - then) / 1000);
	if (seconds < 0) seconds = 0; // clock skew

	if (seconds < 5) return "just now";
	if (seconds < 60) return `${seconds} seconds ago`;

	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

	const days = Math.floor(hours / 24);
	return `${days} day${days === 1 ? "" : "s"} ago`;
}
