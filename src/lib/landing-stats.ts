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
	/** Counts EVERY tracked record (CVE + OSV + GHSA + malicious-package…). */
	vulnerabilitiesTracked: number;
	/** CISA KEV count. */
	activelyExploited: number;
	/** Severity = critical across ALL records. */
	criticalFindings: number;
	/** ISO timestamp of the last ingestion write, or null if catalog empty. */
	lastSyncAt: string | null;
}

export interface YearPoint {
	year: number;
	/** Total CVEs published this year (CVE namespace only). */
	count: number;
	/** Of `count`, how many are KEV (actively exploited). API v2 field. */
	kev: number;
}

export interface ProblemStats {
	yearlyTrajectory: YearPoint[];
	/** CVE-namespace total since 2010 — differs from hero.vulnerabilitiesTracked. */
	totalVulns: number;
	/** totalVulns / years-covered, rounded. */
	averageCvesPerYear: number;
	/** (activelyExploited / totalVulns) × 100, two decimals. Typically <1%. */
	percentActivelyExploited: number;
	/** Industry benchmark (Mandiant M-Trends), hardcoded server-side. */
	averageTimeToExploitDays: number;
}

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export interface PublicVulnSummary {
	/** e.g. "CVE-2026-12345". */
	primaryId: string;
	severity: Severity;
	/** CVSS v3 base score, 0.0–10.0. Null if not scored. */
	cvssV3Score: number | null;
	/** On CISA KEV. */
	isKev: boolean;
	/** ISO 8601. */
	publishedAt: string;
	/** Short description. Null on very recent CVEs awaiting analysis. */
	summary: string | null;
}

export interface LandingStats {
	/** When the stats were computed — drives the "Updated X ago" ticker. */
	lastUpdatedAt: string;
	hero: HeroStats;
	problem: ProblemStats;
	/** 10 most-recently-published CVEs, newest first. API v2 field. */
	recentlyPublished: PublicVulnSummary[];
	/** 10 most-recently-published CRITICAL CVEs, newest first. API v2 field. */
	recentlyCritical: PublicVulnSummary[];
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
