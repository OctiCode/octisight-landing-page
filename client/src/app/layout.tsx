import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────
// next/font/local handles preloading, subsetting, and font-display automatically.
const gotham = localFont({
	src: [
		{
			path: "../../public/fonts/Gotham-Light.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/Gotham-Book.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/Gotham-Medium.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/Gotham-Bold.otf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../../public/fonts/Gotham-Black.otf",
			weight: "900",
			style: "normal",
		},
		{
			path: "../../public/fonts/Gotham-Ultra.otf",
			weight: "950",
			style: "normal",
		},
	],
	variable: "--font-gotham",
	display: "swap",
});

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#130015",
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
	metadataBase: new URL("https://octisight.io"),

	title: {
		default: "OctiSight — Security from Insight to Action",
		template: "%s | OctiSight",
	},
	description:
		"OctiSight connects to your systems, maps vulnerabilities to your real stack, and delivers AI-powered remediation — so your business stays protected without needing a security team.",
	keywords: [
		"cybersecurity",
		"vulnerability management",
		"AI security",
		"SMB security",
		"vulnerability scanning",
		"penetration testing",
		"risk assessment",
	],
	authors: [{ name: "OctiSight", url: "https://octisight.io" }],

	openGraph: {
		type: "website",
		siteName: "OctiSight",
		url: "/",
		title: "OctiSight — Security from Insight to Action",
		description:
			"Real-time vulnerability mapping, AI remediation, and continuous monitoring for businesses of all sizes.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "OctiSight — Security Platform Dashboard",
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		title: "OctiSight — Security from Insight to Action",
		description:
			"Real-time vulnerability mapping, AI remediation, and continuous monitoring.",
		images: ["/og-image.png"],
	},

	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
	},

	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true, "max-snippet": -1 },
	},
};

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`scroll-smooth ${gotham.variable}`}>
			<body>{children}</body>
		</html>
	);
}
