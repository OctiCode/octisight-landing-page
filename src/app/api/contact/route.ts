import { NextResponse } from "next/server";
import { verifyCsrfToken } from "@/lib/security/csrf";
import {
	validateContact,
	sanitizeContact,
	isValid,
	type ContactPayload,
} from "@/lib/validation/contact";

/* ─── Simple in-memory rate limiter (per IP, 5 requests / 15 min) ─── */
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

export async function POST(request: Request) {
	try {
		/* ── Rate limiting ── */
		const ip =
			request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
			"unknown";
		if (isRateLimited(ip)) {
			return NextResponse.json(
				{ error: "Too many requests. Please try again later." },
				{ status: 429 },
			);
		}

		/* ── CSRF verification ── */
		const csrfValid = await verifyCsrfToken(request);
		if (!csrfValid) {
			return NextResponse.json(
				{ error: "Invalid or missing CSRF token." },
				{ status: 403 },
			);
		}

		/* ── Parse body ── */
		let body: ContactPayload;
		try {
			body = await request.json();
		} catch {
			return NextResponse.json(
				{ error: "Invalid request body." },
				{ status: 400 },
			);
		}

		/* ── Server-side validation ── */
		const errors = validateContact(body);
		if (!isValid(errors)) {
			return NextResponse.json({ errors }, { status: 422 });
		}

		/* ── Sanitise (XSS prevention) ── */
		const safe = sanitizeContact(body);

		// TODO: Integrate with your email service (e.g. Resend, SendGrid, Nodemailer)
		console.log("[Contact Form Submission]", {
			...safe,
			ip,
			timestamp: new Date().toISOString(),
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("[Contact API] Unexpected error:", err);
		return NextResponse.json(
			{ error: "Failed to process contact form." },
			{ status: 500 },
		);
	}
}
