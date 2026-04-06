import { randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const CSRF_COOKIE = "csrf_token";
const CSRF_HEADER = "x-csrf-token";
const TOKEN_BYTES = 32;

/** Generate a cryptographically secure CSRF token and set it as an HttpOnly cookie */
export async function generateCsrfToken(): Promise<string> {
	const token = randomBytes(TOKEN_BYTES).toString("hex");
	const cookieStore = await cookies();
	cookieStore.set(CSRF_COOKIE, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
		maxAge: 60 * 60, // 1 hour
	});
	return token;
}

/** Verify the CSRF token from the request header matches the cookie */
export async function verifyCsrfToken(request: Request): Promise<boolean> {
	const headerToken = request.headers.get(CSRF_HEADER);
	if (!headerToken) return false;

	const cookieStore = await cookies();
	const cookieToken = cookieStore.get(CSRF_COOKIE)?.value;
	if (!cookieToken) return false;

	try {
		const a = Buffer.from(headerToken, "utf8");
		const b = Buffer.from(cookieToken, "utf8");
		if (a.length !== b.length) return false;
		return timingSafeEqual(a, b);
	} catch {
		return false;
	}
}

export { CSRF_HEADER };
