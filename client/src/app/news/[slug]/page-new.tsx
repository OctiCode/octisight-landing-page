"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

type NewsItem = {
	id: string | number;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	category: string;
	image: string;
	slug: string;
	author: {
		name: string;
		role: string;
	};
};

async function fetchNewsArticle(slug: string): Promise<NewsItem | null> {
	try {
		const response = await fetch(`/api/news/${slug}`);
		if (!response.ok) return null;
		return await response.json();
	} catch (error) {
		console.error("Error fetching news article:", error);
		return null;
	}
}

export default function NewsPostPage({ params }: { params: { slug: string } }) {
	const [news, setNews] = useState<NewsItem | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchNewsArticle(params.slug).then((data) => {
			setNews(data);
			setLoading(false);
		});
	}, [params.slug]);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};

	if (loading) {
		return (
			<div className="bg-background min-h-screen">
				<Navbar />
				<main className="relative w-full pt-24 pb-12">
					<div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
						<div className="animate-pulse">
							<div className="h-8 bg-primary/20 rounded w-1/2 mx-auto mb-4"></div>
							<div className="h-4 bg-primary/10 rounded w-3/4 mx-auto"></div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}

	if (!news) {
		return (
			<div className="bg-background min-h-screen">
				<Navbar />
				<main className="relative w-full pt-24 pb-12">
					<div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
						<h1 className="text-3xl font-black text-white mb-4">
							Article Not Found
						</h1>
						<Link href="/news" className="text-accent hover:underline">
							← Back to News
						</Link>
					</div>
				</main>
				<Footer />
			</div>
		);
	}

	return (
		<div className="bg-background min-h-screen">
			<Navbar />

			<article className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
				<div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
					<Link
						href="/news"
						className="inline-flex items-center gap-2 text-text/70 hover:text-accent transition-colors duration-300 mb-8"
					>
						<ArrowLeft className="w-4 h-4" />
						<span>Back to News</span>
					</Link>

					<div className="mb-8">
						<span className="inline-flex px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs sm:text-sm font-medium mb-4">
							{news.category}
						</span>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
							{news.title}
						</h1>

						<div className="flex items-center gap-6 text-text/70 text-sm">
							<div className="flex items-center gap-2">
								<Calendar className="w-4 h-4" />
								<time dateTime={news.date}>{formatDate(news.date)}</time>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-light-contrast/25 flex items-center justify-center">
									<span className="text-white font-bold text-xs">
										{news.author.name.charAt(0)}
									</span>
								</div>
								<div>
									<p className="text-white text-sm font-medium">
										{news.author.name}
									</p>
									<p className="text-text/50 text-xs">{news.author.role}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12">
						<Image
							src={news.image}
							alt={news.title}
							fill
							className="object-cover"
							priority
						/>
					</div>

					<div
						className="prose prose-invert prose-lg max-w-none
							prose-headings:font-black prose-headings:text-white
							prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
							prose-p:text-text/85 prose-p:leading-relaxed prose-p:mb-6
							prose-ul:text-text/85 prose-ul:mb-6
							prose-li:mb-2
							prose-strong:text-white prose-strong:font-bold"
						dangerouslySetInnerHTML={{ __html: news.content }}
					/>

					<div className="mt-12 pt-8 border-t border-light-contrast/20">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-light-contrast/25 flex items-center justify-center">
									<span className="text-white font-bold text-base">
										{news.author.name.charAt(0)}
									</span>
								</div>
								<div>
									<p className="text-white font-bold">{news.author.name}</p>
									<p className="text-text/70 text-sm">{news.author.role}</p>
								</div>
							</div>

							<button
								className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-light-contrast/40 text-text/70 hover:text-white hover:border-light-contrast/70 transition-all duration-300"
								onClick={() => {
									if (navigator.share) {
										navigator.share({
											title: news.title,
											text: news.excerpt,
											url: window.location.href,
										});
									}
								}}
							>
								<Share2 className="w-4 h-4" />
								<span className="text-sm">Share</span>
							</button>
						</div>
					</div>
				</div>
			</article>

			<Footer />
		</div>
	);
}
