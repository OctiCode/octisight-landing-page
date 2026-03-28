import { GraphQLClient } from "graphql-request";

const endpoint = process.env.WORDPRESS_GRAPHQL_URL;

if (!endpoint) {
	throw new Error("Missing WORDPRESS_GRAPHQL_URL environment variable.");
}

/** ISR revalidation period shared across blog pages (seconds) */
const REVALIDATE_SECONDS = 300;

/**
 * Shared, server-only GraphQL client for WordPress.
 *
 * Uses Next.js `fetch` with `next.revalidate` so every GraphQL call
 * goes through the framework's Data Cache, enabling:
 *   - ISR (stale-while-revalidate every 5 min)
 *   - Automatic request deduplication within a single render
 */
export const wpClient = new GraphQLClient(endpoint, {
	headers: { "Content-Type": "application/json" },
	fetch: (input: RequestInfo | URL, init?: RequestInit) =>
		fetch(input, {
			...init,
			next: { revalidate: REVALIDATE_SECONDS },
		}),
});
