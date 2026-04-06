"use client";

import { useState, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { Send, Loader2 } from "lucide-react";

// ─── Environment ──────────────────────────────────────────────────────────────
const EJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EJS_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

// ─── Security helpers ─────────────────────────────────────────────────────────

/**
 * Strip HTML tags, null bytes, and leading/trailing whitespace.
 * Prevents XSS content being forwarded through the email template.
 */
function sanitize(value: string, maxLength = 2000): string {
	return value
		.trim()
		.replace(/<[^>]*>/g, "") // strip HTML tags
		.replace(/\0/g, "") // strip null bytes
		.replace(/javascript:/gi, "") // strip JS protocol
		.slice(0, maxLength);
}

/**
 * Client-side rate limiting — 60-second cooldown between sends.
 * Secondary defence; EmailJS enforces its own server-side limits.
 */
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

/** Animated SVG checkmark drawn on success */
function SuccessState() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 py-6 text-center animate-fade-in">
			<svg viewBox="0 0 52 52" className="w-16 h-16" aria-hidden="true">
				<circle
					cx="26"
					cy="26"
					r="24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					className="text-accent"
					style={{
						strokeDasharray: 166,
						strokeDashoffset: 166,
						animation: "draw-circle 0.5s cubic-bezier(0.65,0,0.45,1) forwards",
					}}
				/>
				<path
					fill="none"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M14 27 l8 8 l16 -16"
					className="text-accent"
					style={{
						strokeDasharray: 48,
						strokeDashoffset: 48,
						animation:
							"draw-check 0.35s cubic-bezier(0.65,0,0.45,1) 0.5s forwards",
					}}
				/>
			</svg>

			<p className="text-white font-bold text-lg">Message sent!</p>
			<p className="text-text/60 text-sm leading-relaxed max-w-xs">
				Thanks for reaching out. We&apos;ll get back to you within one business
				day.
			</p>

			<style jsx>{`
				@keyframes draw-circle {
					to { stroke-dashoffset: 0; }
				}
				@keyframes draw-check {
					to { stroke-dashoffset: 0; }
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
			// Live-validate only touched fields
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

		// ① Honeypot check — bots fill the hidden field
		if (honeypotRef.current?.value) return;

		// ② Rate limit
		if (isRateLimited()) {
			setServerError("Please wait a moment before sending another message.");
			return;
		}

		// ③ Full validation
		const allTouched = new Set<string>(["name", "email", "company", "message"]);
		setTouched(allTouched);
		const errs = validate(formData);
		setErrors(errs);
		if (Object.keys(errs).length > 0) return;

		setStatus("submitting");

		// ④ Sanitize every field before sending
		const safe = {
			from_name: sanitize(formData.name, 100),
			from_email: sanitize(formData.email, 254),
			company: sanitize(formData.company, 200),
			message: sanitize(formData.message, 2000),
			reply_to: sanitize(formData.email, 254),
		};

		try {
			await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, safe, {
				publicKey: EJS_KEY,
			});
			stampRateLimit();
			setStatus("success");
			setFormData(INITIAL);
			setTouched(new Set());
			setErrors({});
		} catch {
			setServerError(
				"Something went wrong. Please try again or email us directly.",
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
			{/* ── Honeypot (invisible to humans, bots fill it) ── */}
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
					placeholder="you@gmail.com"
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
