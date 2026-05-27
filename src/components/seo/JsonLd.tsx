/**
 * Renders one or more JSON-LD <script> blocks. Server component — the schema
 * is built server-side from our own trusted data, so dangerouslySetInnerHTML
 * carries no untrusted input.
 */
type Schema = Record<string, unknown>;

export function JsonLd({ schema }: { schema: Schema | Schema[] }) {
	const items = Array.isArray(schema) ? schema : [schema];
	return (
		<>
			{items.map((item) => (
				<script
					key={String(item["@type"] ?? JSON.stringify(item).slice(0, 32))}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
				/>
			))}
		</>
	);
}
