import { NextResponse } from "next/server";
import { generateCsrfToken } from "@/lib/security/csrf";

/** GET /api/csrf — issue a fresh CSRF token (set as cookie, returned in body) */
export async function GET() {
	const token = await generateCsrfToken();
	return NextResponse.json({ token });
}
