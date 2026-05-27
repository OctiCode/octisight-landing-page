import { ImageResponse } from "next/og";

// iOS home-screen icon — iOS applies its own rounded mask, so we go full-bleed.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "#ffffff",
				fontSize: 120,
				fontWeight: 800,
				background: "linear-gradient(135deg, #c530db 0%, #5b1166 100%)",
			}}
		>
			O
		</div>,
		{ ...size },
	);
}
