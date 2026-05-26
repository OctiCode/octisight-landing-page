/**
 * Public landing-stats API integration.
 *
 * One upstream endpoint powers both the hero counters and the problem-section
 * chart. We never call it from the browser directly — the browser hits our own
 * /api/landing-stats route, which proxies + caches server-side (so all visitor
 * polls funnel through one cached server fetch, staying far under the upstream
 * 30 req/min/IP limit).
 */

export const LANDING_STATS_UPSTREAM =
	"https://api.octisight.io/public/landing-stats";

/** Seconds the upstream response is cached (matches the API's own cache). */
export const LANDING_STATS_REVALIDATE = 60;

export interface HeroStats {
	vulnerabilitiesTracked: number;
	activelyExploited: number;
	criticalFindings: number;
	/** ISO timestamp of the last ingestion write, or null if catalog empty. */
	lastSyncAt: string | null;
}

export interface YearPoint {
	year: number;
	count: number;
}

export interface ProblemStats {
	yearlyTrajectory: YearPoint[];
	totalVulns: number;
	averageCvesPerYear: number;
	percentActivelyExploited: number;
	averageTimeToExploitDays: number;
}

export interface LandingStats {
	/** When the stats were computed — drives the "Updated X ago" ticker. */
	lastUpdatedAt: string;
	hero: HeroStats;
	problem: ProblemStats;
}

export interface LandingStatsEnvelope {
	success: boolean;
	data?: LandingStats;
	error?: { code: string; message: string };
}

/**
 * Server-side fetch for SSR first paint. Returns null on any failure so the
 * caller can fall back to static placeholder numbers — the section must never
 * look broken to a marketing visitor.
 */
export async function fetchLandingStats(): Promise<LandingStats | null> {
	try {
		const res = await fetch(LANDING_STATS_UPSTREAM, {
			headers: { Accept: "application/json" },
			next: { revalidate: LANDING_STATS_REVALIDATE },
		});
		if (!res.ok) return null;
		const json = (await res.json()) as LandingStatsEnvelope;
		if (!json?.success || !json.data) return null;
		return json.data;
	} catch {
		return null;
	}
}

/* ─── Display formatters ────────────────────────────────────────────────── */

/** 712418 → "712,418" */
export function formatCount(n: number): string {
	return n.toLocaleString("en-US");
}

/** 41906 → "~42,000" (round to a friendly thousand). */
export function formatApproxThousands(n: number): string {
	const rounded = Math.round(n / 1000) * 1000;
	return `~${rounded.toLocaleString("en-US")}`;
}

/** 0.22 → "<1%"; 2.4 → "2.4%". Keeps the punchy "<1%" framing when sub-1. */
export function formatPercentExploited(pct: number): string {
	if (!Number.isFinite(pct)) return "—";
	if (pct < 1) return "<1%";
	// Trim trailing ".00" for whole numbers.
	const fixed = pct.toFixed(2).replace(/\.?0+$/, "");
	return `${fixed}%`;
}

/** N → "7 days" / "1 day". */
export function formatDays(n: number): string {
	if (!Number.isFinite(n) || n <= 0) return "—";
	return `${n} day${n === 1 ? "" : "s"}`;
}
