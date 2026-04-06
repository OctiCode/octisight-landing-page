/** ─── Shared validation & sanitisation for the contact form ─── */

/** Max lengths to enforce on both client & server */
export const LIMITS = {
	name: 100,
	email: 254,
	company: 120,
	message: 2000,
} as const;

/** Email regex — RFC 5322 simplified */
const EMAIL_RE =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/** Patterns that should never appear in user input (XSS vectors) */
const DANGEROUS_PATTERNS = [
	/<script[\s>]/i,
	/javascript:/i,
	/on\w+\s*=/i,
	/<iframe/i,
	/<object/i,
	/<embed/i,
	/<link/i,
	/<img[^>]+onerror/i,
];

export type ContactFieldErrors = {
	name?: string;
	email?: string;
	company?: string;
	message?: string;
};

export type ContactPayload = {
	name: string;
	email: string;
	company: string;
	message: string;
};

/** Strip HTML tags */
function stripTags(str: string): string {
	return str.replace(/<[^>]*>/g, "");
}

/** Encode HTML entities to prevent stored XSS */
function encodeEntities(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

/** Check for dangerous patterns */
function containsDangerousContent(str: string): boolean {
	return DANGEROUS_PATTERNS.some((re) => re.test(str));
}

/**
 * Validate a contact form payload.
 * Returns an object of field → error message (empty = valid).
 */
export function validateContact(data: ContactPayload): ContactFieldErrors {
	const errors: ContactFieldErrors = {};

	// Name
	const name = data.name?.trim() ?? "";
	if (!name) {
		errors.name = "Full name is required.";
	} else if (name.length < 2) {
		errors.name = "Name must be at least 2 characters.";
	} else if (name.length > LIMITS.name) {
		errors.name = `Name must be under ${LIMITS.name} characters.`;
	} else if (containsDangerousContent(name)) {
		errors.name = "Name contains invalid characters.";
	}

	// Email
	const email = data.email?.trim() ?? "";
	if (!email) {
		errors.email = "Email address is required.";
	} else if (email.length > LIMITS.email) {
		errors.email = `Email must be under ${LIMITS.email} characters.`;
	} else if (!EMAIL_RE.test(email)) {
		errors.email = "Please enter a valid email address.";
	}

	// Company (optional — only validate if provided)
	const company = data.company?.trim() ?? "";
	if (company.length > LIMITS.company) {
		errors.company = `Company must be under ${LIMITS.company} characters.`;
	} else if (company && containsDangerousContent(company)) {
		errors.company = "Company contains invalid characters.";
	}

	// Message
	const message = data.message?.trim() ?? "";
	if (!message) {
		errors.message = "Message is required.";
	} else if (message.length < 10) {
		errors.message = "Message must be at least 10 characters.";
	} else if (message.length > LIMITS.message) {
		errors.message = `Message must be under ${LIMITS.message} characters.`;
	} else if (containsDangerousContent(message)) {
		errors.message = "Message contains invalid content.";
	}

	return errors;
}

/** Returns true when the error object has zero keys */
export function isValid(errors: ContactFieldErrors): boolean {
	return Object.keys(errors).length === 0;
}

/**
 * Sanitise a contact payload (server-side).
 * Strips tags, trims, and HTML-encodes every field.
 */
export function sanitizeContact(data: ContactPayload): ContactPayload {
	return {
		name: encodeEntities(stripTags(data.name.trim())),
		email: data.email.trim().toLowerCase(),
		company: encodeEntities(stripTags(data.company.trim())),
		message: encodeEntities(stripTags(data.message.trim())),
	};
}
