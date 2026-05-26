"use client";

import {
	Area,
	AreaChart,
	CartesianGrid,
	type DotItemDotProps,
	XAxis,
	YAxis,
} from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { problemSection } from "@/content/home";

const chartConfig = {
	cves: {
		label: "CVEs published",
		color: "#c530db",
	},
} satisfies ChartConfig;

const lastDataIndex = problemSection.chart.data.length - 1;

function LiveDot(props: DotItemDotProps) {
	const { cx, cy, index } = props;
	if (cx == null || cy == null) return <g aria-hidden="true" />;
	if (index !== lastDataIndex) return <g aria-hidden="true" />;

	return (
		<g>
			{/* Pulsing halo */}
			<circle cx={cx} cy={cy} r={6} fill="#c530db" opacity={0.4}>
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
			{/* Solid core */}
			<circle
				cx={cx}
				cy={cy}
				r={4.5}
				fill="#c530db"
				stroke="#ffffff"
				strokeWidth={2}
			/>
		</g>
	);
}

export default function ProblemSection() {
	const { eyebrow, title, description, chart, stats } = problemSection;
	const data = chart.data;
	const latestYear = data[lastDataIndex].year;
	const latestCount = data[lastDataIndex].cves;

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
								· {latestYear}: {latestCount.toLocaleString("en-US")}
							</span>
						</div>
					</div>

					{/* Chart */}
					<ChartContainer
						config={chartConfig}
						className="aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5] w-full"
					>
						<AreaChart
							data={data}
							margin={{ top: 12, right: 12, left: 0, bottom: 4 }}
						>
							<defs>
								<linearGradient id="fillCves" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="var(--color-cves)"
										stopOpacity={0.7}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-cves)"
										stopOpacity={0.05}
									/>
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
								content={
									<ChartTooltipContent
										indicator="line"
										labelFormatter={(label) => `Year ${label}`}
										formatter={(value) => [
											`${Number(value).toLocaleString("en-US")} CVEs`,
											"",
										]}
									/>
								}
							/>
							<Area
								dataKey="cves"
								type="monotone"
								fill="url(#fillCves)"
								stroke="var(--color-cves)"
								strokeWidth={2.5}
								dot={false}
								activeDot={{
									r: 5,
									fill: "var(--color-cves)",
									stroke: "#ffffff",
									strokeWidth: 2,
								}}
								isAnimationActive
								animationDuration={1400}
								animationEasing="ease-out"
							/>
							{/* Overlay the pulsing latest dot via a second invisible series */}
							<Area
								dataKey="cves"
								type="monotone"
								fill="transparent"
								stroke="transparent"
								dot={LiveDot}
								activeDot={false}
								isAnimationActive={false}
								legendType="none"
							/>
						</AreaChart>
					</ChartContainer>
				</div>

				{/* Stats */}
				<div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
					{stats.map((stat) => (
						<div
							key={stat.label}
							className="rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 sm:px-4 sm:py-3.5"
						>
							<div className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-none mb-1 sm:mb-1.5 tabular-nums">
								{stat.value}
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
