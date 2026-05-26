"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/components/ui/chart";
import { problemSection } from "@/content/home";
import { useLandingStats } from "@/components/providers/LandingStatsProvider";
import { useTimeAgo } from "@/hooks/useTimeAgo";
import {
	formatApproxThousands,
	formatCount,
	formatDays,
	formatPercentExploited,
} from "@/lib/landing-stats";

const ACCENT = "#c530db";

const chartConfig = {
	count: { label: "CVEs published", color: ACCENT },
} satisfies ChartConfig;

type ChartRow = {
	year: number;
	displayCount: number;
	/** Solid line — null at the partial current year so it doesn't dip. */
	count: number | null;
	/** Dashed line — only the last (full→partial) segment. */
	partial: number | null;
};

export default function ProblemSection() {
	const { eyebrow, title, description, chart, stats } = problemSection;
	const { stats: live, lastUpdatedAt } = useLandingStats();
	const problem = live?.problem;
	const updatedAgo = useTimeAgo(lastUpdatedAt);

	const currentYear = new Date().getFullYear();

	// Live trajectory (key: count) or static fallback (key: cves → count).
	const points: { year: number; count: number }[] =
		problem?.yearlyTrajectory ??
		chart.data.map((d) => ({ year: d.year, count: d.cves }));

	const lastIndex = points.length - 1;
	const isPartialLast =
		points.length > 0 && points[lastIndex].year === currentYear;

	// Split into solid (full years) + dashed (final partial segment) so a low
	// year-to-date number reads as "in progress", never as a decline.
	const chartData: ChartRow[] = points.map((p, i) => {
		if (!isPartialLast) {
			return { year: p.year, displayCount: p.count, count: p.count, partial: null };
		}
		const isLast = i === lastIndex;
		const isPrev = i === lastIndex - 1;
		return {
			year: p.year,
			displayCount: p.count,
			count: isLast ? null : p.count,
			partial: isLast || isPrev ? p.count : null,
		};
	});

	// Stat-card values (live, else static strings).
	const statValues = problem
		? [
				formatApproxThousands(problem.averageCvesPerYear),
				formatDays(problem.averageTimeToExploitDays),
				formatPercentExploited(problem.percentActivelyExploited),
			]
		: stats.map((s) => s.value);

	const totalVulns =
		problem?.totalVulns ?? points.reduce((sum, p) => sum + p.count, 0);
	const caption = problem
		? `${formatCount(totalVulns)} vulnerabilities tracked · ${formatApproxThousands(problem.averageCvesPerYear)} new every year`
		: `${formatCount(totalVulns)} vulnerabilities tracked`;

	return (
		<section
			id="problem"
			aria-labelledby="problem-heading"
			className="relative w-full py-0"
		>
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
				{/* Header */}
				<div className="text-center mb-10 sm:mb-12 md:mb-14">
					<div className="inline-flex mb-4 sm:mb-5">
						<span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] uppercase backdrop-blur-sm">
							{eyebrow}
						</span>
					</div>

					<h2
						id="problem-heading"
						className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-white max-w-4xl mx-auto mb-5 sm:mb-6"
					>
						<span className="block">{title.line1}</span>
						<span className="block">{title.line2}</span>
						<span className="block bg-linear-to-r from-accent via-light-contrast to-accent bg-clip-text text-transparent">
							{title.line3}
						</span>
					</h2>

					<p className="text-sm sm:text-base md:text-lg text-text/75 max-w-2xl mx-auto leading-relaxed">
						{description}
					</p>
				</div>

				{/* Chart card */}
				<div className="relative rounded-2xl border border-light-contrast/15 bg-background/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-xl shadow-primary/10">
					{/* Chart header */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-5 sm:mb-6">
						<div>
							<h3 className="text-base sm:text-lg font-bold text-white leading-tight">
								{chart.title}
							</h3>
							<p className="text-xs sm:text-[0.7rem] text-text/45 mt-1">
								{chart.source}
							</p>
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
						<AreaChart
							data={chartData}
							margin={{ top: 12, right: 12, left: 0, bottom: 4 }}
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
							<XAxis
								dataKey="year"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								interval="preserveStartEnd"
								minTickGap={24}
								tick={{ fill: "rgba(246,246,246,0.45)", fontSize: 11 }}
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
										<div className="rounded-lg border border-light-contrast/20 bg-background/95 backdrop-blur-md px-3 py-2 shadow-lg shadow-black/30">
											<p className="text-[0.7rem] text-text/55">
												{row.year}
												{ytd ? " · year to date" : ""}
											</p>
											<p className="text-sm font-bold text-white tabular-nums">
												{formatCount(row.displayCount)} CVEs
											</p>
										</div>
									);
								}}
							/>
							{/* Solid — full years */}
							<Area
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
							{/* Dashed — partial current-year segment */}
							<Area
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
							{/* Invisible overlay carrying the pulsing "live" dot on the last point */}
							<Area
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
						</AreaChart>
					</ChartContainer>

					{/* Caption */}
					<p className="mt-4 text-center text-xs sm:text-sm text-text/55">
						{caption}
						{isPartialLast ? (
							<span className="text-text/40">
								{" "}
								· {currentYear} year to date
							</span>
						) : null}
					</p>
				</div>

				{/* Stats */}
				<div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
					{stats.map((stat, i) => (
						<div
							key={stat.label}
							className="rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 sm:px-4 sm:py-3.5"
						>
							<div className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-none mb-1 sm:mb-1.5 tabular-nums">
								{statValues[i]}
							</div>
							<div className="text-xs sm:text-[0.8rem] text-text/60 leading-snug">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
