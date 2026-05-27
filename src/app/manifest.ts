import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "OctiSight — Security from insight to action",
		short_name: "OctiSight",
		description:
			"Vulnerability management built for small teams. Connect a repo and get findings in 90 seconds — AI-prioritized by what's actually exploited.",
		start_url: "/",
		display: "standalone",
		background_color: "#130015",
		theme_color: "#130015",
		icons: [
			{ src: "/icon", sizes: "64x64", type: "image/png" },
			{ src: "/apple-icon", sizes: "180x180", type: "image/png" },
		],
	};
}
