import { MessageCircleQuestion } from "lucide-react";
import { objectionHandlingSection } from "@/content/home";

export default function ObjectionHandlingSection() {
	const { items } = objectionHandlingSection;

	return (
		<section className="relative w-full py-10 sm:py-14 md:py-16 lg:py-20">
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
				{/* ─── Header ─── */}
				<div className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-14">
					<div className="inline-flex">
						<span className="px-4 py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-sm font-book backdrop-blur-sm">
							{objectionHandlingSection.headerTitle}
						</span>
					</div>

					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-3xl">
						{objectionHandlingSection.title}
					</h2>
				</div>

				{/* ─── 2×2 Q&A Grid ─── */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full">
					{items.map((item) => {
						const isYes = item.answerOpener === "Yes,";

						return (
							<div
								key={item.id}
								className="group relative bg-linear-to-br from-primary/10 to-contrast/20 backdrop-blur-sm border border-light-contrast/40 rounded-2xl p-6 sm:p-7 md:p-8 hover:border-light-contrast/80 hover:from-primary/15 hover:to-contrast/25 transition-all duration-300 overflow-hidden"
							>
								{/* Decorative glow */}
								<div className="pointer-events-none absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-accent/8 blur-2xl group-hover:bg-accent/15 transition-colors duration-500" />

								{/* Question row */}
								<div className="flex items-start gap-3 mb-4 sm:mb-5">
									<div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/40 border border-light-contrast/30 flex items-center justify-center mt-0.5">
										<MessageCircleQuestion className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-light-contrast/70" />
									</div>
									<p className="text-base sm:text-lg md:text-xl font-black text-white leading-snug">
										{item.question}
									</p>
								</div>

								{/* Divider */}
								<div className="h-px bg-linear-to-r from-light-contrast/20 to-transparent mb-4 sm:mb-5" />

								{/* Answer */}
								<p className="text-sm sm:text-base text-text/70 leading-relaxed">
									<span
										className={`font-bold ${
											isYes ? "text-green-400" : "text-accent"
										}`}
									>
										{item.answerOpener}
									</span>{" "}
									{item.answerRest}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
