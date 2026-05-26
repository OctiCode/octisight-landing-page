import { NextResponse } from "next/server";
import { verifyCsrfToken } from "@/lib/security/csrf";
import {
	type ContactPayload,
	isValid,
	validateContact,
} from "@/lib/validation/contact";

/* ─── Simple in-memory rate limiter (per IP, 5 requests / 15 min) ───────── */
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const entry = hits.get(ip);

	if (!entry || now > entry.reset) {
		hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
		return false;
	}

	entry.count += 1;
	return entry.count > RATE_MAX;
}

/* ─── Mailgun configuration ─────────────────────────────────────────────── */
const MAILGUN_BASE_URL =
	process.env.MAILGUN_BASE_URL ?? "https://api.eu.mailgun.net";
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN ?? "mg.octisight.com";
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY ?? "";
const MAILGUN_FROM =
	process.env.MAILGUN_FROM ??
	`OctiSight Contact <contact@${MAILGUN_DOMAIN}>`;
const MAILGUN_TO = process.env.MAILGUN_TO ?? "contact@octisight.com";

/* ─── Email-safe text helpers (don't reuse HTML-encoded sanitiser) ──────── */
function stripTags(s: string): string {
	return s.replace(/<[^>]*>/g, "");
}

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

/* ─── Mailgun send ──────────────────────────────────────────────────────── */
async function sendViaMailgun(payload: {
	name: string;
	email: string;
	company: string;
	message: string;
}): Promise<{ ok: true } | { ok: false; status: number; detail: string }> {
	const subject = `New contact from ${payload.name}`;

	const text = [
		`Name:    ${payload.name}`,
		`Email:   ${payload.email}`,
		`Company: ${payload.company || "—"}`,
		"",
		"Message:",
		payload.message,
	].join("\n");

	const html = `
		<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#222;">
			<h2 style="margin:0 0 16px;">New contact from the OctiSight landing page</h2>
			<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
				<tr><td style="padding:4px 12px 4px 0;color:#666;"><strong>Name</strong></td><td>${escapeHtml(payload.name)}</td></tr>
				<tr><td style="padding:4px 12px 4px 0;color:#666;"><strong>Email</strong></td><td>${escapeHtml(payload.email)}</td></tr>
				<tr><td style="padding:4px 12px 4px 0;color:#666;"><strong>Company</strong></td><td>${escapeHtml(payload.company || "—")}</td></tr>
			</table>
			<p style="margin-top:20px;color:#666;"><strong>Message</strong></p>
			<p style="white-space:pre-wrap;line-height:1.5;">${escapeHtml(payload.message)}</p>
		</div>
	`.trim();

	const form = new URLSearchParams();
	form.set("from", MAILGUN_FROM);
	form.set("to", MAILGUN_TO);
	form.set("h:Reply-To", payload.email);
	form.set("subject", subject);
	form.set("text", text);
	form.set("html", html);

	const auth = Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64");

	const res = await fetch(
		`${MAILGUN_BASE_URL}/v3/${MAILGUN_DOMAIN}/messages`,
		{
			method: "POST",
			headers: {
				Authorization: `Basic ${auth}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: form.toString(),
		},
	);

	if (!res.ok) {
		const detail = await res.text().catch(() => "");
		return { ok: false, status: res.status, detail };
	}

	return { ok: true };
}

/* ─── POST /api/contact ─────────────────────────────────────────────────── */
export async function POST(request: Request) {
	try {
		/* Rate limiting */
		const ip =
			request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
			"unknown";
		if (isRateLimited(ip)) {
			return NextResponse.json(
				{ error: "Too many requests. Please try again later." },
				{ status: 429 },
			);
		}

		/* CSRF verification */
		const csrfValid = await verifyCsrfToken(request);
		if (!csrfValid) {
			return NextResponse.json(
				{ error: "Invalid or missing CSRF token." },
				{ status: 403 },
			);
		}

		/* Parse body */
		let body: ContactPayload;
		try {
			body = await request.json();
		} catch {
			return NextResponse.json(
				{ error: "Invalid request body." },
				{ status: 400 },
			);
		}

		/* Server-side validation */
		const errors = validateContact(body);
		if (!isValid(errors)) {
			return NextResponse.json({ errors }, { status: 422 });
		}

		/* Sanitise for email — strip tags, no HTML encoding (escapeHtml runs per
		   destination context: plain-text body skips it, HTML body applies it). */
		const safe = {
			name: stripTags(body.name).trim(),
			email: body.email.trim().toLowerCase(),
			company: stripTags(body.company).trim(),
			message: stripTags(body.message).trim(),
		};

		/* Misconfigured deployment — surface a 500 so the client can react */
		if (!MAILGUN_API_KEY) {
			console.error(
				"[Contact API] Missing MAILGUN_API_KEY env var — cannot send email.",
			);
			return NextResponse.json(
				{ error: "Email service is not configured." },
				{ status: 500 },
			);
		}

		/* Send via Mailgun */
		const result = await sendViaMailgun(safe);
		if (!result.ok) {
			console.error(
				"[Contact API] Mailgun error:",
				result.status,
				result.detail,
			);
			return NextResponse.json(
				{ error: "Failed to send email. Please try again shortly." },
				{ status: 502 },
			);
		}

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("[Contact API] Unexpected error:", err);
		return NextResponse.json(
			{ error: "Failed to process contact form." },
			{ status: 500 },
		);
	}
}
