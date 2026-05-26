"use client";

import { useEffect, useState } from "react";

/**
 * Returns a human "X ago" string for an ISO timestamp, re-computed every second
 * so it ticks live regardless of poll cadence. Handles null → "—" and clamps
 * negative deltas (visitor clock behind server) → "just now".
 */
export function useTimeAgo(iso: string | null | undefined): string {
	const [now, setNow] = useState(() => Date.now());

	useEffect(() => {
		const id = window.setInterval(() => setNow(Date.now()), 1000);
		return () => window.clearInterval(id);
	}, []);

	if (!iso) return "—";
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
