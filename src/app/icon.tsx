import { ImageResponse } from "next/og";

// Favicon — Next emits <link rel="icon"> and serves it at /icon.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 14,
				color: "#ffffff",
				fontSize: 42,
				fontWeight: 800,
				background: "linear-gradient(135deg, #c530db 0%, #5b1166 100%)",
			}}
		>
			O
		</div>,
		{ ...size },
	);
}
