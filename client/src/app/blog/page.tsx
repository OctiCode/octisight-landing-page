import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import { BlogService } from "@/lib/services/blogService";
import type { Metadata } from "next";

export const revalidate = BlogService.REVALIDATE;

export const metadata: Metadata = {
	title: "Blog | OctiSight",
	description:
		"Expert articles on vulnerability management, security trends, and OctiSight features.",
};

export default async function BlogPage() {
	const blogs = await BlogService.getAllBlogs();

	return (
		<div className="bg-background">
			<Navbar />

			<main className="relative w-full pt-10 pb-12 sm:pb-16 md:pb-20">
				<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
					<BackButton />
					<div className="flex flex-col items-center gap-3 sm:gap-4 w-full text-center mb-12 sm:mb-16">
						<h1 className="text-3xl sm:text-4xl md:text-5xl text-center lg:text-6xl font-black leading-tight text-white max-w-4xl">
							Security insights and best practices
						</h1>

						<p className="text-sm sm:text-base text-center md:text-lg text-text/90 max-w-2xl leading-relaxed">
							Expert articles on vulnerability management, security trends, and
							OctiSight features.
						</p>
					</div>

					{blogs.length === 0 ? (
						<p className="text-center text-text/60 text-lg py-20">
							No articles published yet. Check back soon.
						</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
							{blogs.map((item) => (
								<article key={item.id} className="group">
									<Link href={`/blog/${item.slug}`} className="block h-full">
										<div className="relative h-full rounded-2xl overflow-hidden border border-white/8 bg-white/3 hover:border-accent/30 transition-colors duration-300 flex flex-col">
											{item.image ? (
												<div className="relative w-full aspect-[2.4/1] overflow-hidden">
													<Image
														src={item.image}
														alt={item.title}
														fill
														className="object-cover pointer-events-none select-none group-hover:scale-105 transition-transform duration-700 ease-out"
														sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
														draggable={false}
													/>
													<span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[0.65rem] sm:text-xs font-semibold backdrop-blur-md">
														{item.category}
													</span>
												</div>
											) : (
												<div className="px-5 pt-5 sm:px-6 sm:pt-6">
													<span className="inline-flex px-2.5 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[0.65rem] sm:text-xs font-semibold">
														{item.category}
													</span>
												</div>
											)}

											<div className="flex flex-col grow p-5 sm:p-6 gap-3 sm:gap-4">
												<h2 className="text-white font-bold text-lg sm:text-xl leading-snug line-clamp-2 group-hover:text-accent/90 transition-colors duration-300">
													{item.title}
												</h2>

												{item.excerpt && (
													<p className="text-text/60 text-sm leading-relaxed line-clamp-3 grow">
														{item.excerpt}
													</p>
												)}

												<div className="flex items-center justify-end mt-auto pt-4 border-t border-white/6">
													<span className="flex items-center gap-1 text-accent/70 text-xs font-medium group-hover:text-accent group-hover:gap-1.5 transition-all duration-300">
														<BookOpen className="w-3.5 h-3.5" />
														Read
														<ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
													</span>
												</div>
											</div>
										</div>
									</Link>
								</article>
							))}
						</div>
					)}
				</div>
			</main>

			<Footer />
		</div>
	);
}
