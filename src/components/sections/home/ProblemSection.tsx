"use client";

import {
	Area,
	CartesianGrid,
	ComposedChart,
	Line,
	ReferenceArea,
	XAxis,
	YAxis,
} from "recharts";
import {
	ArrowDown,
	ArrowRight,
	BellRing,
	ChevronRight,
	FileText,
	Hourglass,
	ListChecks,
	type LucideIcon,
	MessageSquare,
	Rss,
	TriangleAlert,
} from "lucide-react";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/components/ui/chart";
import { problemSection } from "@/content/home";
import { useLandingStats } from "@/components/providers/LandingStatsProvider";
import { useTimeAgo } from "@/hooks/useTimeAgo";
import { formatApproxThousands, formatCount } from "@/lib/landing-stats";

/* ─── Chart palette ─────────────────────────────────────────────────────── */
const ACCENT = "#c530db"; // total CVEs (area + line)
const KEV_COLOR = "#fb923c"; // actively exploited — warm orange, signals danger

/** Chart shows the recent, dramatic stretch only. */
const CHART_START_YEAR = 2016;

const chartConfig = {
	count: { label: "CVEs published", color: ACCENT },
	kev: { label: "Actively exploited (KEV)", color: KEV_COLOR },
} satisfies ChartConfig;

type ChartRow = {
	year: number;
	displayCount: number;
	/** Solid area — null at the partial current year so it doesn't dip. */
	count: number | null;
	/** Dashed area — only the last (full→partial) segment. */
	partial: number | null;
	/** KEV count for the year (small relative to total — that's the point). */
	kev: number;
};

const ICONS: Record<string, LucideIcon> = {
	Rss,
	BellRing,
	FileText,
	MessageSquare,
	ListChecks,
	Hourglass,
};

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function ProblemSection() {
	const {
		eyebrow,
		title,
		description,
		chart,
		annotations,
		insights,
		beforePipeline,
		conclusion,
	} = problemSection;

	const { stats: live, lastUpdatedAt } = useLandingStats();
	const problem = live?.problem;
	const updatedAgo = useTimeAgo(lastUpdatedAt);

	const currentYear = new Date().getFullYear();

	/* Live trajectory or static fallback — both share { year, count, kev }. */
	const allPoints: ReadonlyArray<{
		year: number;
		count: number;
		kev: number;
	}> = problem?.yearlyTrajectory ?? chart.data;

	const points = allPoints.filter((p) => p.year >= CHART_START_YEAR);

	const lastIndex = points.length - 1;
	const isPartialLast =
		points.length > 0 && points[lastIndex].year === currentYear;

	/* Split solid + dashed for the partial current year so it doesn't read
	   as a decline. */
	const chartData: ChartRow[] = points.map((p, i) => {
		const base = { year: p.year, displayCount: p.count, kev: p.kev };
		if (!isPartialLast) {
			return { ...base, count: p.count, partial: null };
		}
		const isLast = i === lastIndex;
		const isPrev = i === lastIndex - 1;
		return {
			...base,
			count: isLast ? null : p.count,
			partial: isLast || isPrev ? p.count : null,
		};
	});

	const totalVulns =
		problem?.totalVulns ?? allPoints.reduce((s, p) => s + p.count, 0);

	const caption = `${formatCount(totalVulns)} CVEs since ${allPoints[0]?.year ?? 2010} · ${formatApproxThousands(problem?.averageCvesPerYear ?? totalVulns / Math.max(allPoints.length, 1))} new every year`;

	return (
		<section
			id="problem"
			aria-labelledby="problem-heading"
			className="relative w-full py-12 sm:py-16 md:py-20"
		>
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
				{/* ── Header ── */}
				<div className="text-center mb-10 sm:mb-12 md:mb-14">
					<div className="inline-flex mb-4 sm:mb-5">
						<span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] uppercase backdrop-blur-sm">
							{eyebrow}
						</span>
					</div>

					<h2
						id="problem-heading"
						className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.15] text-white max-w-4xl mx-auto mb-5 sm:mb-6"
					>
						{title.lead}{" "}
						<span className="bg-linear-to-r from-accent via-light-contrast to-accent bg-clip-text text-transparent">
							{title.accent}
						</span>
					</h2>

					<p className="text-sm sm:text-base md:text-lg text-text/75 max-w-3xl mx-auto leading-relaxed">
						{description}
					</p>
				</div>

				{/* ── Chart card ── */}
				<div className="relative rounded-2xl border border-light-contrast/15 bg-background/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-xl shadow-primary/10">
					{/* Chart header */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-5 sm:mb-6">
						<div>
							<h3 className="text-base sm:text-lg font-bold text-white leading-tight">
								{chart.title}
							</h3>
						</div>
						<div className="flex items-center gap-2 self-start sm:self-auto">
							<span className="relative flex h-2 w-2 shrink-0">
								<span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
								<span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
							</span>
							<span className="text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] uppercase text-success">
								Live
							</span>
							<span className="text-[0.65rem] sm:text-xs text-text/45">
								· Updated {updatedAgo}
							</span>
						</div>
					</div>

					{/* Chart */}
					<ChartContainer
						config={chartConfig}
						className="aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5] w-full"
					>
						<ComposedChart
							data={chartData}
							margin={{ top: 16, right: 16, left: 0, bottom: 4 }}
						>
							<defs>
								<linearGradient id="fillTrend" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={ACCENT} stopOpacity={0.7} />
									<stop offset="95%" stopColor={ACCENT} stopOpacity={0.05} />
								</linearGradient>
							</defs>

							<CartesianGrid
								vertical={false}
								stroke="rgba(255,255,255,0.06)"
								strokeDasharray="3 3"
							/>

							{/* Annotation zones — subtle tints behind the curve. */}
							<ReferenceArea
								x1={2020}
								x2={2021}
								fill="rgba(197,48,219,0.08)"
								stroke="rgba(197,48,219,0.25)"
								strokeDasharray="2 4"
								ifOverflow="visible"
							/>
							<ReferenceArea
								x1={2024}
								x2={2025}
								fill="rgba(251,146,60,0.08)"
								stroke="rgba(251,146,60,0.30)"
								strokeDasharray="2 4"
								ifOverflow="visible"
							/>

							<XAxis
								dataKey="year"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								interval="preserveStartEnd"
								minTickGap={24}
								tick={{ fill: "rgba(246,246,246,0.45)", fontSize: 11 }}
								tickFormatter={(v: number) =>
									v === currentYear && isPartialLast ? `${v} YTD` : String(v)
								}
							/>
							<YAxis
								tickLine={false}
								axisLine={false}
								width={42}
								tick={{ fill: "rgba(246,246,246,0.35)", fontSize: 10 }}
								tickFormatter={(v: number) =>
									v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
								}
							/>

							<ChartTooltip
								cursor={{ stroke: "rgba(224,113,245,0.4)", strokeWidth: 1 }}
								content={({ active, payload }) => {
									if (!active || !payload?.length) return null;
									const row = payload[0]?.payload as ChartRow | undefined;
									if (!row) return null;
									const ytd = isPartialLast && row.year === currentYear;
									return (
										<div className="rounded-lg border border-light-contrast/20 bg-background/95 backdrop-blur-md px-3 py-2 shadow-lg shadow-black/30 min-w-[170px]">
											<p className="text-[0.7rem] text-text/55 mb-1">
												{row.year}
												{ytd ? " · year to date" : ""}
											</p>
											<div className="flex items-center gap-2">
												<span
													className="inline-block w-2 h-2 rounded-full"
													style={{ background: ACCENT }}
												/>
												<span className="text-sm font-bold text-white tabular-nums">
													{formatCount(row.displayCount)}
												</span>
												<span className="text-[0.7rem] text-text/55">
													CVEs
												</span>
											</div>
											<div className="flex items-center gap-2 mt-1">
												<span
													className="inline-block w-2 h-2 rounded-full"
													style={{ background: KEV_COLOR }}
												/>
												<span className="text-sm font-bold text-white tabular-nums">
													{formatCount(row.kev)}
												</span>
												<span className="text-[0.7rem] text-text/55">
													actively exploited
												</span>
											</div>
										</div>
									);
								}}
							/>

							{/* Solid area — total CVEs through full years */}
							<Area
								yAxisId={0}
								dataKey="count"
								type="monotone"
								fill="url(#fillTrend)"
								stroke={ACCENT}
								strokeWidth={2.5}
								dot={false}
								connectNulls={false}
								isAnimationActive
								animationDuration={1400}
								animationEasing="ease-out"
							/>

							{/* Dashed area — partial current-year segment */}
							<Area
								yAxisId={0}
								dataKey="partial"
								type="monotone"
								fill="transparent"
								stroke={ACCENT}
								strokeWidth={2.5}
								strokeDasharray="5 4"
								dot={false}
								connectNulls
								isAnimationActive={false}
							/>

							{/* KEV line — small relative to total; the sliver IS the story. */}
							<Line
								yAxisId={0}
								dataKey="kev"
								type="monotone"
								stroke={KEV_COLOR}
								strokeWidth={2}
								dot={{ r: 2, fill: KEV_COLOR, stroke: KEV_COLOR }}
								activeDot={{
									r: 4,
									fill: KEV_COLOR,
									stroke: "#ffffff",
									strokeWidth: 2,
								}}
								isAnimationActive
								animationDuration={1400}
								animationEasing="ease-out"
							/>

							{/* Pulsing "live" dot at the latest point of the total */}
							<Area
								yAxisId={0}
								dataKey="displayCount"
								type="monotone"
								fill="transparent"
								stroke="transparent"
								isAnimationActive={false}
								legendType="none"
								dot={(props) => {
									const { cx, cy, index, key } = props as {
										cx?: number;
										cy?: number;
										index?: number;
										key?: string;
									};
									if (cx == null || cy == null || index !== lastIndex) {
										return <g key={key} aria-hidden="true" />;
									}
									return (
										<g key={key}>
											<circle cx={cx} cy={cy} r={6} fill={ACCENT} opacity={0.4}>
												<animate
													attributeName="r"
													values="6;16;6"
													dur="1.8s"
													repeatCount="indefinite"
												/>
												<animate
													attributeName="opacity"
													values="0.55;0;0.55"
													dur="1.8s"
													repeatCount="indefinite"
												/>
											</circle>
											<circle
												cx={cx}
												cy={cy}
												r={4.5}
												fill={ACCENT}
												stroke="#ffffff"
												strokeWidth={2}
											/>
										</g>
									);
								}}
							/>
						</ComposedChart>
					</ChartContainer>

					{/* Caption */}
					<p className="mt-4 text-center text-xs sm:text-sm text-text/55">
						{caption}
					</p>

					{/* Legend + annotation key */}
					<div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-light-contrast/10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
						<div className="space-y-2">
							<p className="text-[0.6rem] uppercase tracking-[0.2em] text-text/40 font-bold">
								Series
							</p>
							<LegendRow
								color={ACCENT}
								label="Total CVEs published"
								description="Annual count, NVD."
							/>
							<LegendRow
								color={KEV_COLOR}
								label="Actively exploited (CISA KEV)"
								description="The small subset attackers actually weaponize."
							/>
						</div>

						<div className="space-y-2">
							<p className="text-[0.6rem] uppercase tracking-[0.2em] text-text/40 font-bold">
								What you&apos;re seeing
							</p>
							{annotations.map((a) => (
								<AnnotationRow
									key={a.label}
									tone={a.tone as "neutral" | "warn" | "muted"}
									label={a.label}
									body={a.body}
								/>
							))}
						</div>
					</div>
				</div>

				{/* ── "Before OctiSight" pipeline ── */}
				<div className="mt-10 sm:mt-12">
					<p className="text-[0.65rem] sm:text-xs font-bold tracking-[0.2em] uppercase text-text/45 text-center mb-4 sm:mb-5">
						{beforePipeline.title}
					</p>

					<div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-2 sm:gap-3 lg:gap-2">
						{beforePipeline.steps.map((step, i) => {
							const Icon = ICONS[step.icon];
							const isLast = i === beforePipeline.steps.length - 1;
							return (
								<div key={step.label} className="contents lg:contents">
									<div className="flex items-center gap-3 lg:flex-col lg:items-center lg:text-center lg:gap-2 lg:flex-1 lg:max-w-[140px] px-3 py-2.5 lg:px-2 lg:py-3 rounded-xl border border-white/8 bg-white/[0.02]">
										{Icon ? (
											<div className="w-9 h-9 lg:w-10 lg:h-10 shrink-0 rounded-lg bg-white/[0.04] border border-white/8 flex items-center justify-center">
												<Icon className="w-4 h-4 lg:w-5 lg:h-5 text-text/55" />
											</div>
										) : null}
										<span className="text-xs sm:text-sm lg:text-[0.75rem] text-text/65 leading-tight">
											{step.label}
										</span>
									</div>

									{!isLast && (
										<>
											<ArrowDown
												className="lg:hidden self-center w-4 h-4 text-text/30 my-0.5"
												aria-hidden="true"
											/>
											<ChevronRight
												className="hidden lg:block w-4 h-4 text-text/25 shrink-0"
												aria-hidden="true"
											/>
										</>
									)}
								</div>
							);
						})}
					</div>

					<div className="mt-4 sm:mt-5 flex items-center justify-center gap-2">
						<TriangleAlert
							className="w-4 h-4 text-red-400/80"
							aria-hidden="true"
						/>
						<p className="text-sm sm:text-base font-semibold text-red-300/90">
							{beforePipeline.footer}
						</p>
					</div>
				</div>

				{/* ── Insight cards ── */}
				<div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
					{insights.map((card) => (
						<article
							key={card.headline}
							className="flex flex-col rounded-xl border border-white/8 bg-white/[0.025] hover:border-light-contrast/30 transition-colors duration-300 p-5 sm:p-6"
						>
							<h3 className="text-lg sm:text-xl font-black leading-snug text-white mb-3">
								{card.headline}
							</h3>
							<p className="text-sm text-text/75 leading-relaxed flex-1">
								{card.body}
							</p>
							{card.footnote ? (
								<p className="mt-4 pt-3 border-t border-white/8 text-[0.7rem] sm:text-xs text-text/45 leading-relaxed">
									{card.footnote}
								</p>
							) : null}
						</article>
					))}
				</div>

				{/* ── Conclusion — bridge to OctiSight ── */}
				<div className="mt-10 sm:mt-12 md:mt-14 max-w-3xl mx-auto text-center">
					<p className="text-base sm:text-lg md:text-xl text-text/80 leading-relaxed">
						{conclusion.problem}
					</p>

					<div
						className="my-5 sm:my-6 flex items-center justify-center text-text/30"
						aria-hidden="true"
					>
						<ArrowRight className="w-5 h-5 rotate-90" />
					</div>

					<p className="text-base sm:text-lg md:text-xl font-semibold leading-relaxed">
						<span className="bg-linear-to-r from-accent via-light-contrast to-accent bg-clip-text text-transparent">
							{conclusion.solution}
						</span>
					</p>
				</div>
			</div>
		</section>
	);
}

/* ─── Sub-components ────────────────────────────────────────────────────── */

function LegendRow({
	color,
	label,
	description,
}: {
	color: string;
	label: string;
	description: string;
}) {
	return (
		<div className="flex items-start gap-2.5">
			<span
				className="mt-1.5 inline-block w-3 h-1.5 rounded-sm shrink-0"
				style={{ background: color }}
				aria-hidden="true"
			/>
			<div className="min-w-0">
				<p className="text-[0.78rem] sm:text-sm font-semibold text-white leading-tight">
					{label}
				</p>
				<p className="text-[0.7rem] sm:text-xs text-text/55 leading-snug mt-0.5">
					{description}
				</p>
			</div>
		</div>
	);
}

function AnnotationRow({
	tone,
	label,
	body,
}: {
	tone: "neutral" | "warn" | "muted";
	label: string;
	body: string;
}) {
	const swatch =
		tone === "neutral"
			? "bg-light-contrast/40 border-light-contrast/50"
			: tone === "warn"
				? "bg-orange-400/40 border-orange-400/50"
				: "bg-white/15 border-white/25";
	const labelColor =
		tone === "neutral"
			? "text-light-contrast"
			: tone === "warn"
				? "text-orange-300"
				: "text-text/65";

	return (
		<div className="flex items-start gap-2.5">
			<span
				className={`mt-1 inline-block w-3 h-3 rounded-sm border shrink-0 ${swatch}`}
				aria-hidden="true"
			/>
			<div className="min-w-0">
				<p
					className={`text-[0.78rem] sm:text-sm font-semibold leading-tight ${labelColor}`}
				>
					{label}
				</p>
				<p className="text-[0.7rem] sm:text-xs text-text/55 leading-snug mt-0.5">
					{body}
				</p>
			</div>
		</div>
	);
}
