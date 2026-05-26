import { readFile } from "node:fs/promises";
import path from "node:path";
import { LEGAL_DOCS, type LegalSlug } from "./legal-docs";

/** Read a doc's raw markdown. Returns null if the slug is unknown. */
export async function getLegalDoc(
	slug: string,
): Promise<{ slug: LegalSlug; markdown: string } | null> {
	if (!(slug in LEGAL_DOCS)) return null;
	const typed = slug as LegalSlug;
	const filePath = path.join(
		process.cwd(),
		"src",
		"legal-docs",
		LEGAL_DOCS[typed].file,
	);
	const markdown = await readFile(filePath, "utf8");
	return { slug: typed, markdown };
}
