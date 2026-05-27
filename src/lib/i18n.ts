import type { Metadata } from "next";
import { SITE_URL } from "./site";

/**
 * Internationalisation config.
 *
 * French is planned. The SEO rule: only emit hreflang once the alternate-locale
 * pages actually exist — hreflang pointing at not-yet-built /fr pages is an
 * error Google Search Console flags. So `localeAlternates()` emits ONLY the
 * canonical until 2+ locales are live, then automatically adds the full
 * hreflang set. To ship French:
 *   1. Add the localized routes (e.g. /fr via a [locale] segment or middleware).
 *   2. Add "fr" to LIVE_LOCALES below.
 *   3. Make <html lang> reflect the active locale.
 * Everything else (canonicals + hreflang) updates automatically.
 */
export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Locales whose routes are deployed + translated. Add "fr" when it ships. */
export const LIVE_LOCALES: readonly Locale[] = ["en"];

/** Default locale lives at the root; others under a /<locale> subpath. */
function localePath(locale: Locale, path: string): string {
	const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
	if (path === "/") return `${SITE_URL}${prefix || ""}` || SITE_URL;
	return `${SITE_URL}${prefix}${path}`;
}

/**
 * Build a Metadata `alternates` block for a route path (e.g. "/", "/trust",
 * "/legal/terms"). Returns the self-canonical always, plus hreflang languages
 * only when more than one locale is live.
 */
export function localeAlternates(path: string): Metadata["alternates"] {
	const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

	if (LIVE_LOCALES.length < 2) {
		return { canonical };
	}

	const languages: Record<string, string> = {};
	for (const locale of LIVE_LOCALES) {
		languages[locale] = localePath(locale, path);
	}
	languages["x-default"] = localePath(DEFAULT_LOCALE, path);

	return { canonical, languages };
}
