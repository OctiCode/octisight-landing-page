"use client";

import { useState, useRef, useCallback } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

// ─── Security helpers ─────────────────────────────────────────────────────────

/**
 * Strip HTML tags, null bytes, and leading/trailing whitespace before sending
 * to the server. The server re-validates and sanitises again — this is just a
 * first line of defence to keep the payload small and obviously benign.
 */
function sanitize(value: string, maxLength = 2000): string {
	return value
		.trim()
		.replace(/<[^>]*>/g, "")
		.replace(/\0/g, "")
		.replace(/javascript:/gi, "")
		.slice(0, maxLength);
}

/** Client-side rate limiting — 60-second cooldown between sends. */
const RL_KEY = "ocs_contact_ts";
const RL_MS = 60_000;

function isRateLimited(): boolean {
	try {
		const ts = localStorage.getItem(RL_KEY);
		return ts !== null && Date.now() - Number(ts) < RL_MS;
	} catch {
		return false;
	}
}
function stampRateLimit(): void {
	try {
		localStorage.setItem(RL_KEY, String(Date.now()));
	} catch {}
}

// ─── Validation ───────────────────────────────────────────────────────────────

interface Fields {
	name: string;
	email: string;
	company: string;
	message: string;
}
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
	const e: Errors = {};
	if (!f.name.trim()) e.name = "Name is required.";
	else if (f.name.trim().length < 2) e.name = "At least 2 characters.";

	if (!f.email.trim()) e.email = "Email is required.";
	else if (!EMAIL_RE.test(f.email.trim()))
		e.email = "Please enter a valid email.";

	if (!f.message.trim()) e.message = "Message is required.";
	else if (f.message.trim().length < 10) e.message = "At least 10 characters.";

	return e;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
	if (!message) return null;
	return (
		<p
			role="alert"
			className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
		>
			{message}
		</p>
	);
}

/** Green success banner — replaces the form and announces via aria-live. */
function SuccessState() {
	return (
		<div
			role="status"
			aria-live="polite"
			className="ocs-success flex flex-col items-center justify-center gap-3 sm:gap-4 py-8 sm:py-10 px-4 text-center rounded-2xl border-2 border-success/50 bg-success/12 shadow-lg shadow-success/15"
		>
			<div className="relative">
				<span
					aria-hidden="true"
					className="absolute inset-0 rounded-full bg-success/30 blur-md animate-pulse"
				/>
				<CheckCircle2
					className="relative w-14 h-14 sm:w-16 sm:h-16 text-success"
					strokeWidth={1.75}
				/>
			</div>

			<div className="space-y-1">
				<p className="text-white font-extrabold text-lg sm:text-xl">
					Message sent!
				</p>
				<p className="text-success-contrast text-xs sm:text-sm font-medium uppercase tracking-[0.15em]">
					Delivered successfully
				</p>
			</div>

			<p className="text-text/75 text-sm leading-relaxed max-w-sm">
				Thanks for reaching out. We&apos;ll get back to you within one business
				day.
			</p>

			<style jsx>{`
				.ocs-success {
					animation: ocs-success-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
				}
				@keyframes ocs-success-in {
					0% {
						opacity: 0;
						transform: translateY(6px) scale(0.985);
					}
					100% {
						opacity: 1;
						transform: translateY(0) scale(1);
					}
				}
			`}</style>
		</div>
	);
}

// ─── Main form ────────────────────────────────────────────────────────────────

const INITIAL: Fields = { name: "", email: "", company: "", message: "" };
const INPUT_BASE =
	"w-full px-4 py-3 rounded-lg bg-white/[0.06] border text-white placeholder:text-text/40 focus:outline-none focus:ring-1 transition-colors duration-200 text-sm";
const INPUT_OK =
	"border-white/[0.12] focus:border-accent/60 focus:ring-accent/30";
const INPUT_ERR =
	"border-red-400/60 focus:border-red-400 focus:ring-red-400/30";

export default function ContactForm() {
	const [formData, setFormData] = useState<Fields>(INITIAL);
	const [errors, setErrors] = useState<Errors>({});
	const [touched, setTouched] = useState<Set<string>>(new Set());
	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");
	const [serverError, setServerError] = useState("");
	// Honeypot ref — must stay empty; bots fill it
	const honeypotRef = useRef<HTMLInputElement>(null);

	const inputClass = (field: keyof Fields) =>
		`${INPUT_BASE} ${errors[field] ? INPUT_ERR : INPUT_OK}`;

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = e.target;
			const next = { ...formData, [name]: value };
			setFormData(next);
			if (touched.has(name)) {
				const errs = validate(next);
				setErrors((prev) => ({ ...prev, [name]: errs[name as keyof Fields] }));
			}
		},
		[formData, touched],
	);

	const handleBlur = useCallback(
		(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name } = e.target;
			setTouched((prev) => new Set(prev).add(name));
			const errs = validate(formData);
			setErrors((prev) => ({
				...prev,
				[name]: errs[name as keyof Fields],
			}));
		},
		[formData],
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setServerError("");

		// ① Honeypot — bots fill the hidden field
		if (honeypotRef.current?.value) return;

		// ② Client-side rate limit
		if (isRateLimited()) {
			setServerError("Please wait a moment before sending another message.");
			setStatus("error");
			return;
		}

		// ③ Full validation
		const allTouched = new Set<string>(["name", "email", "company", "message"]);
		setTouched(allTouched);
		const errs = validate(formData);
		setErrors(errs);
		if (Object.keys(errs).length > 0) return;

		setStatus("submitting");

		// ④ Light sanitisation before the wire — server re-validates anyway
		const payload = {
			name: sanitize(formData.name, 100),
			email: sanitize(formData.email, 254),
			company: sanitize(formData.company, 200),
			message: sanitize(formData.message, 2000),
		};

		try {
			// ⑤ Fetch a fresh CSRF token (sets HttpOnly cookie + returns token body)
			const csrfRes = await fetch("/api/csrf", {
				credentials: "same-origin",
				cache: "no-store",
			});
			if (!csrfRes.ok) throw new Error("Could not initialise the request.");
			const { token: csrfToken } = (await csrfRes.json()) as { token: string };

			// ⑥ Submit through our Mailgun-backed API route
			const res = await fetch("/api/contact", {
				method: "POST",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
					"x-csrf-token": csrfToken,
				},
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const data = (await res
					.json()
					.catch(() => ({}) as Record<string, unknown>)) as {
					error?: string;
				};
				throw new Error(
					data.error ?? "Something went wrong. Please try again.",
				);
			}

			stampRateLimit();
			setStatus("success");
			setFormData(INITIAL);
			setTouched(new Set());
			setErrors({});
		} catch (err) {
			setServerError(
				err instanceof Error
					? err.message
					: "Something went wrong. Please try again or email us directly.",
			);
			setStatus("error");
		}
	};

	if (status === "success") return <SuccessState />;

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-5"
			noValidate
			aria-label="Contact form"
		>
			{/* Honeypot — bots fill it */}
			<input
				ref={honeypotRef}
				type="text"
				name="_hp"
				tabIndex={-1}
				autoComplete="off"
				aria-hidden="true"
				className="absolute -left-2499.75 w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
			/>

			{/* Name */}
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-white mb-1.5"
				>
					Full name{" "}
					<span className="text-accent" aria-hidden="true">
						*
					</span>
				</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					autoComplete="name"
					maxLength={100}
					placeholder="John Doe"
					value={formData.name}
					onChange={handleChange}
					onBlur={handleBlur}
					className={inputClass("name")}
					aria-describedby={errors.name ? "name-error" : undefined}
					aria-invalid={!!errors.name}
				/>
				<FieldError message={errors.name} />
			</div>

			{/* Email */}
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-white mb-1.5"
				>
					Email address{" "}
					<span className="text-accent" aria-hidden="true">
						*
					</span>
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					autoComplete="email"
					maxLength={254}
					placeholder="you@company.com"
					value={formData.email}
					onChange={handleChange}
					onBlur={handleBlur}
					className={inputClass("email")}
					aria-invalid={!!errors.email}
				/>
				<FieldError message={errors.email} />
			</div>

			{/* Company */}
			<div>
				<label
					htmlFor="company"
					className="block text-sm font-medium text-white mb-1.5"
				>
					Company{" "}
					<span className="text-text/40 text-xs font-normal">(optional)</span>
				</label>
				<input
					type="text"
					id="company"
					name="company"
					autoComplete="organization"
					maxLength={200}
					placeholder="Octicode"
					value={formData.company}
					onChange={handleChange}
					onBlur={handleBlur}
					className={inputClass("company")}
				/>
				<FieldError message={errors.company} />
			</div>

			{/* Message */}
			<div>
				<label
					htmlFor="message"
					className="block text-sm font-medium text-white mb-1.5"
				>
					Message{" "}
					<span className="text-accent" aria-hidden="true">
						*
					</span>
				</label>
				<textarea
					id="message"
					name="message"
					required
					rows={4}
					maxLength={2000}
					placeholder="Tell us more about your inquiry…"
					value={formData.message}
					onChange={handleChange}
					onBlur={handleBlur}
					className={`${inputClass("message")} resize-none`}
					aria-invalid={!!errors.message}
				/>
				<FieldError message={errors.message} />
			</div>

			{/* Submit */}
			<button
				type="submit"
				disabled={status === "submitting"}
				className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-linear-to-r from-accent to-primary text-white font-bold text-sm sm:text-base hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:pointer-events-none mt-1 cursor-pointer"
			>
				{status === "submitting" ? (
					<>
						<Loader2 className="w-4 h-4 animate-spin" />
						Sending…
					</>
				) : (
					<>
						Send Message
						<Send className="w-4 h-4" />
					</>
				)}
			</button>

			{/* Server error */}
			{status === "error" && serverError && (
				<p
					role="alert"
					className="text-red-400 text-sm text-center leading-relaxed"
				>
					{serverError}
				</p>
			)}
		</form>
	);
}
