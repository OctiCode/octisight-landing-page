"use client";

import { faqSection } from "@/content/home";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQSection() {
	const [openId, setOpenId] = useState<string | null>(null);

	const toggleFaq = (id: string) => {
		setOpenId(openId === id ? null : id);
	};

	return (
		<section className="relative w-full py-4 sm:py-6 md:py-8">
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
				<div className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full text-center">
					<div className="inline-flex">
						<span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] uppercase backdrop-blur-sm">
							{faqSection.headerTitle}
						</span>
					</div>

					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-4xl mt-1 mb-1">
						{faqSection.title}
					</h2>

					<p className="text-sm sm:text-base md:text-lg text-text/90 max-w-2xl leading-relaxed px-1">
						{faqSection.paragraph}
					</p>

					<div className="w-full mt-6 sm:mt-8 md:mt-10">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 items-start">
							{faqSection.faqs.map((faq) => {
								const isOpen = openId === faq.id;

								return (
									<div
										key={faq.id}
										className="relative bg-linear-to-br from-primary/10 to-contrast/20 backdrop-blur-sm border border-light-contrast/40 rounded-xl overflow-hidden hover:border-light-contrast/70 transition-colors duration-300"
									>
										<button
											type="button"
											onClick={() => toggleFaq(faq.id)}
											className="w-full text-left p-4 sm:p-5 md:p-6 flex items-start justify-between gap-3 cursor-pointer"
											aria-expanded={isOpen}
										>
											<span className="text-white font-bold text-sm sm:text-base leading-tight flex-1">
												{faq.question}
											</span>
											<ChevronDown
												className={`w-5 h-5 text-light-contrast shrink-0 transition-transform duration-300 ${
													isOpen ? "rotate-180" : ""
												}`}
											/>
										</button>

										<div
											className={`grid transition-all duration-300 ease-in-out ${
												isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
											}`}
										>
											<div className="overflow-hidden">
												<div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0">
													<p className="text-text/75 text-left text-sm sm:text-base leading-relaxed">
														{faq.answer}
													</p>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
