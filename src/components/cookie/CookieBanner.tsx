"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import {
	COOKIE_PREFS_EVENT,
	getStoredConsent,
	storeConsent,
} from "@/lib/cookie-consent";

type View = "banner" | "customise";

export default function CookieBanner() {
	const [open, setOpen] = useState(false);
	const [view, setView] = useState<View>("banner");
	const [analytics, setAnalytics] = useState(false);
	const [marketing, setMarketing] = useState(false);

	// First-visit detection + re-open listener. localStorage is client-only,
	// so this necessarily runs after mount rather than during render.
	useEffect(() => {
		const existing = getStoredConsent();
		if (!existing) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setOpen(true);
		} else {
			setAnalytics(existing.analytics);
			setMarketing(existing.marketing);
		}

		const reopen = () => {
			const current = getStoredConsent();
			setAnalytics(current?.analytics ?? false);
			setMarketing(current?.marketing ?? false);
			setView("customise");
			setOpen(true);
		};
		window.addEventListener(COOKIE_PREFS_EVENT, reopen);
		return () => window.removeEventListener(COOKIE_PREFS_EVENT, reopen);
	}, []);

	const close = useCallback(() => {
		setOpen(false);
		setView("banner");
	}, []);

	const acceptAll = useCallback(() => {
		storeConsent({ analytics: true, marketing: true });
		close();
	}, [close]);

	const rejectAll = useCallback(() => {
		storeConsent({ analytics: false, marketing: false });
		close();
	}, [close]);

	const saveChoices = useCallback(() => {
		storeConsent({ analytics, marketing });
		close();
	}, [analytics, marketing, close]);

	if (!open) return null;

	return (
		<div
			className="fixed bottom-0 right-0 z-[60] w-full sm:max-w-md p-3 sm:p-4 pointer-events-none"
			role="region"
			aria-label="Cookie consent"
		>
			<div className="ocs-cookie-card pointer-events-auto w-full rounded-xl border border-light-contrast/20 bg-background/95 backdrop-blur-md shadow-2xl shadow-black/40 p-4 sm:p-5">
				{/* Header */}
				<div className="flex items-center gap-2.5 mb-2.5">
					<div className="w-7 h-7 shrink-0 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
						<Cookie className="w-4 h-4 text-light-contrast" />
					</div>
					<div className="flex-1 min-w-0">
						<h2 className="text-white font-bold text-sm sm:text-base leading-tight">
							{view === "banner"
								? "We value your privacy"
								: "Cookie preferences"}
						</h2>
					</div>
					{view === "customise" && (
						<button
							type="button"
							onClick={close}
							aria-label="Close"
							className="shrink-0 -mt-1 -mr-1 p-1.5 rounded-md text-text/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
						>
							<X className="w-4 h-4" />
						</button>
					)}
				</div>

				{view === "banner" ? (
					<>
						<p className="text-text/70 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
							We use cookies to run the site and, with your consent, to measure
							traffic and improve OctiSight. Read our{" "}
							<Link
								href="/legal/cookies"
								className="text-accent hover:text-light-contrast underline underline-offset-2 transition-colors"
							>
								Cookie Policy
							</Link>
							.
						</p>

						{/* Accept / Reject — equal weight (EU requirement) */}
						<div className="grid grid-cols-2 gap-2">
							<button
								type="button"
								onClick={acceptAll}
								className="px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-accent hover:bg-light-contrast transition-colors duration-200 cursor-pointer"
							>
								Accept all
							</button>
							<button
								type="button"
								onClick={rejectAll}
								className="px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 transition-colors duration-200 cursor-pointer"
							>
								Reject all
							</button>
						</div>

						{/* Customise — secondary path, not a consent decision */}
						<button
							type="button"
							onClick={() => setView("customise")}
							className="mt-2 w-full py-1 text-xs font-medium text-text/60 hover:text-light-contrast transition-colors duration-200 cursor-pointer"
						>
							Customise preferences
						</button>
					</>
				) : (
					<>
						<div className="space-y-2 mb-3 sm:mb-4">
							<CategoryRow
								title="Strictly necessary"
								description="Required for the site to function. Always on."
								checked
								disabled
							/>
							<CategoryRow
								title="Analytics"
								description="Help us understand how the site is used. No advertising."
								checked={analytics}
								onChange={setAnalytics}
							/>
							<CategoryRow
								title="Marketing"
								description="Measure campaigns and show relevant messaging."
								checked={marketing}
								onChange={setMarketing}
							/>
						</div>

						<div className="grid grid-cols-3 gap-2">
							<button
								type="button"
								onClick={rejectAll}
								className="px-2 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 transition-colors duration-200 cursor-pointer"
							>
								Reject all
							</button>
							<button
								type="button"
								onClick={acceptAll}
								className="px-2 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 transition-colors duration-200 cursor-pointer"
							>
								Accept all
							</button>
							<button
								type="button"
								onClick={saveChoices}
								className="px-2 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-accent hover:bg-light-contrast transition-colors duration-200 cursor-pointer"
							>
								Save
							</button>
						</div>

						<p className="mt-3 text-[0.7rem] text-text/45 leading-relaxed">
							Full details in our{" "}
							<Link
								href="/legal/cookies"
								className="text-accent/90 hover:text-light-contrast underline underline-offset-2 transition-colors"
							>
								Cookie Policy
							</Link>
							.
						</p>
					</>
				)}
			</div>

			<style jsx>{`
				.ocs-cookie-card {
					animation: ocs-cookie-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
				}
				@keyframes ocs-cookie-in {
					0% {
						opacity: 0;
						transform: translateY(12px);
					}
					100% {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}

function CategoryRow({
	title,
	description,
	checked,
	disabled = false,
	onChange,
}: {
	title: string;
	description: string;
	checked: boolean;
	disabled?: boolean;
	onChange?: (next: boolean) => void;
}) {
	return (
		<div className="flex items-start justify-between gap-3 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2.5">
			<div className="min-w-0">
				<p className="text-white text-[0.8rem] font-semibold">{title}</p>
				<p className="text-text/55 text-[0.7rem] leading-snug mt-0.5">
					{description}
				</p>
			</div>

			<button
				type="button"
				role="switch"
				aria-checked={checked}
				aria-label={title}
				disabled={disabled}
				onClick={() => onChange?.(!checked)}
				className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
					checked ? "bg-accent" : "bg-white/15"
				} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
			>
				<span
					className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
						checked ? "translate-x-4" : "translate-x-0"
					}`}
				/>
			</button>
		</div>
	);
}
