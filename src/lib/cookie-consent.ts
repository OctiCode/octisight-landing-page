/**
 * Cookie-consent storage + cross-component signalling.
 *
 * The banner persists a single JSON blob in localStorage. The footer's
 * "Cookie preferences" link re-opens the banner via a window CustomEvent.
 */

export const COOKIE_CONSENT_KEY = "ocs_cookie_consent";
export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_PREFS_EVENT = "ocs:open-cookie-preferences";

export type CookieCategory = "analytics" | "marketing";

export type CookieConsent = {
	version: number;
	/** Strictly-necessary cookies are always on and cannot be rejected. */
	necessary: true;
	analytics: boolean;
	marketing: boolean;
	/** ISO timestamp of when consent was recorded. */
	updatedAt: string;
};

/** Read the stored consent, or null if the user hasn't chosen yet. */
export function getStoredConsent(): CookieConsent | null {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as CookieConsent;
		// Treat an older schema version as "not chosen" so we re-ask.
		if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
		return parsed;
	} catch {
		return null;
	}
}

/** Persist a consent decision. */
export function storeConsent(consent: {
	analytics: boolean;
	marketing: boolean;
}): CookieConsent {
	const value: CookieConsent = {
		version: COOKIE_CONSENT_VERSION,
		necessary: true,
		analytics: consent.analytics,
		marketing: consent.marketing,
		updatedAt: new Date().toISOString(),
	};
	try {
		window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
	} catch {
		/* ignore quota / privacy-mode errors */
	}
	return value;
}

/** Re-open the banner (used by the footer "Cookie preferences" link). */
export function openCookiePreferences(): void {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new CustomEvent(COOKIE_PREFS_EVENT));
}
