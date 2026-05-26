import { NextResponse } from "next/server";
import {
	LANDING_STATS_REVALIDATE,
	LANDING_STATS_UPSTREAM,
} from "@/lib/landing-stats";

/**
 * GET /api/landing-stats
 *
 * Server-side proxy for the public stats endpoint. The browser polls THIS
 * route; we fetch the upstream with Next's data cache (revalidate 60s), so no
 * matter how many visitors poll, the upstream sees ~1 request per minute —
 * comfortably under its 30 req/min/IP limit. On any upstream failure we return
 * a 502 with the standard envelope and the client keeps its last-good data.
 */
// Must be a static literal for Next's segment-config analysis (keep in sync
// with LANDING_STATS_REVALIDATE = 60).
export const revalidate = 60;

export async function GET() {
	try {
		const res = await fetch(LANDING_STATS_UPSTREAM, {
			headers: { Accept: "application/json" },
			next: { revalidate: LANDING_STATS_REVALIDATE },
		});

		if (!res.ok) {
			return NextResponse.json(
				{
					success: false,
					error: {
						code: "UPSTREAM_ERROR",
						message: `Stats service responded ${res.status}.`,
					},
				},
				{ status: 502 },
			);
		}

		const json = await res.json();

		return NextResponse.json(json, {
			headers: {
				"Cache-Control":
					"public, max-age=60, stale-while-revalidate=300",
			},
		});
	} catch {
		return NextResponse.json(
			{
				success: false,
				error: {
					code: "FETCH_FAILED",
					message: "Could not reach the stats service.",
				},
			},
			{ status: 502 },
		);
	}
}
