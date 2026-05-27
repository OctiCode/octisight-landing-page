import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Sitewide social card. Next emits both og:image and twitter:image from this.
export const alt = "OctiSight — Vulnerability management for small teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
	const root = process.cwd();

	// Embed the brand logo (falls back to a text wordmark if unreadable).
	let logoSrc: string | null = null;
	try {
		const logo = await readFile(
			join(root, "public/images/logo/octisight-white-logo.png"),
		);
		logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
	} catch {
		logoSrc = null;
	}

	// Load Gotham so the card is on-brand (falls back to default if unreadable).
	let fonts:
		| { name: string; data: ArrayBuffer | Buffer; weight: 700; style: "normal" }[]
		| undefined;
	try {
		const bold = await readFile(join(root, "public/fonts/Gotham-Bold.otf"));
		fonts = [{ name: "Gotham", data: bold, weight: 700, style: "normal" }];
	} catch {
		fonts = undefined;
	}

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				fontFamily: "Gotham",
				background:
					"linear-gradient(135deg, #130015 0%, #2d0533 60%, #5b1166 100%)",
				position: "relative",
			}}
		>
			{/* Accent glow */}
			<div
				style={{
					position: "absolute",
					top: 120,
					width: 720,
					height: 720,
					display: "flex",
					background:
						"radial-gradient(circle, rgba(197,48,219,0.35) 0%, rgba(197,48,219,0) 70%)",
				}}
			/>

			{logoSrc ? (
				// next/image isn't available inside ImageResponse — plain <img> is required.
				<img
					src={logoSrc}
					width={560}
					height={187}
					style={{ objectFit: "contain" }}
					alt=""
				/>
			) : (
				<div style={{ display: "flex", fontSize: 92, fontWeight: 700, color: "#ffffff" }}>
					OctiSight
				</div>
			)}

			<div
				style={{
					display: "flex",
					marginTop: 52,
					fontSize: 46,
					fontWeight: 700,
					color: "#f6f6f6",
				}}
			>
				Security from insight to action
			</div>
			<div
				style={{
					display: "flex",
					marginTop: 18,
					fontSize: 28,
					fontWeight: 700,
					color: "#e071f5",
				}}
			>
				Vulnerability management for small teams
			</div>
		</div>,
		{ ...size, ...(fonts ? { fonts } : {}) },
	);
}
