import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { NewsService } from "@/lib/services/newsService";

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
};

export default async function NewsPage() {
	const news = await NewsService.getAllNews();

	return (
		<div className="bg-background">
			<Navbar />

			<main className="relative w-full pt-10 pb-12 sm:pb-16 md:pb-20">
				<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
					<div className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full text-center mb-12 sm:mb-16">
						<div className="inline-flex">
							<span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/40 border border-light-contrast/30 text-light-contrast text-xs sm:text-sm font-book backdrop-blur-sm">
								Latest News
							</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white max-w-4xl">
							Stay updated with OctiSight news
						</h1>

						<p className="text-sm sm:text-base md:text-lg text-text/90 max-w-2xl leading-relaxed">
							Industry insights, product updates, and company announcements.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
						{news.map((item) => (
							<article key={item.id} className="group">
								<Link href={`/news/${item.slug}`} className="block h-full">
									<div className="relative bg-gradient-to-br from-primary/10 to-contrast/20 backdrop-blur-sm border border-light-contrast/40 rounded-2xl overflow-hidden hover:border-light-contrast/70 transition-all duration-300 h-full flex flex-col">
										<div className="relative w-full aspect-[16/10] bg-gradient-to-br from-primary/20 to-contrast/30 overflow-hidden">
											<Image
												src={item.image}
												alt={item.title}
												fill
												className="object-cover pointer-events-none select-none"
												sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
												draggable={false}
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

											<div className="absolute bottom-0 text-left left-0 right-0 p-5 sm:p-6 flex flex-col gap-3">
												<time
													dateTime={item.date}
													className="text-text/70 text-xs sm:text-sm font-medium"
												>
													{formatDate(item.date)}
												</time>

												<h2 className="text-white font-bold text-lg sm:text-xl leading-tight line-clamp-2">
													{item.title}
												</h2>
											</div>
										</div>

										<div className="p-5 sm:p-6 flex flex-col gap-3 flex-grow">
											<span className="inline-flex self-start px-2.5 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-medium">
												{item.category}
											</span>

											<p className="text-text/75 text-sm leading-relaxed line-clamp-3 flex-grow">
												{item.excerpt}
											</p>

											<div className="flex items-center gap-1.5 text-accent text-sm font-medium group-hover:gap-2 transition-all duration-300 mt-auto">
												<span>Read more</span>
												<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
											</div>
										</div>
									</div>
								</Link>
							</article>
						))}
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
