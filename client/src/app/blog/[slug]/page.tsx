import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Home } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import { BlogService } from "@/lib/services/blogService";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = BlogService.REVALIDATE;

type PageProps = { params: Promise<{ slug: string }> };

/** Pre-generate pages for all published posts at build time */
export async function generateStaticParams() {
	const slugs = await BlogService.getAllSlugs();
	return slugs.map((slug) => ({ slug }));
}

/** Dynamic SEO metadata per post */
export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const blog = await BlogService.getBlogBySlug(slug);

	if (!blog) {
		return { title: "Post Not Found | OctiSight" };
	}

	return {
		title: `${blog.title} | OctiSight Blog`,
		description: blog.excerpt,
		openGraph: {
			title: blog.title,
			description: blog.excerpt,
			type: "article",
			publishedTime: blog.date,
			images: blog.image ? [{ url: blog.image }] : [],
		},
	};
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
};

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;
	const blog = await BlogService.getBlogBySlug(slug);

	if (!blog) {
		notFound();
	}

	return (
		<div className="bg-background min-h-screen">
			<Navbar />

			<article className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
				<div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
					<div className="flex items-center gap-4 mb-8">
						<BackButton />
						<Link
							href="/"
							className="inline-flex items-center gap-2 text-text/70 hover:text-accent transition-colors duration-300 cursor-pointer"
						>
							<Home className="w-4 h-4" />
							<span>Home</span>
						</Link>
					</div>

					<div className="mb-8">
						<span className="inline-flex px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs sm:text-sm font-medium mb-4">
							{blog.category}
						</span>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
							{blog.title}
						</h1>

						{blog.image && (
							<div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
								<Image
									src={blog.image}
									alt={blog.title}
									fill
									className="object-cover"
									priority
								/>
							</div>
						)}

						<div className="flex flex-wrap items-center gap-4 sm:gap-6 text-text/70 text-sm">
							{blog.date && (
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4" />
									<time dateTime={blog.date}>{formatDate(blog.date)}</time>
								</div>
							)}
							{blog.readTime && (
								<div className="flex items-center gap-2">
									<Clock className="w-4 h-4" />
									<span>{blog.readTime}</span>
								</div>
							)}
							{blog.author.name && (
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 border-2 border-white/10 flex items-center justify-center overflow-hidden">
										{blog.author.avatar ? (
											<Image
												src={blog.author.avatar}
												alt={blog.author.name}
												width={32}
												height={32}
												className="object-cover"
											/>
										) : (
											<span className="text-white font-bold text-xs">
												{blog.author.name.charAt(0)}
											</span>
										)}
									</div>
									<p className="text-white text-sm font-medium">
										{blog.author.name}
									</p>
								</div>
							)}
						</div>
					</div>

					<div
						className="wp-content prose prose-invert prose-lg max-w-none
							prose-headings:font-bold prose-headings:text-white prose-headings:leading-tight
							prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:mt-10 prose-h1:mb-6
							prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-10 prose-h2:mb-5
							prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:mb-4
							prose-h4:text-lg prose-h4:sm:text-xl prose-h4:mt-6 prose-h4:mb-3
							prose-p:text-text/85 prose-p:leading-relaxed prose-p:mb-5
							prose-a:text-accent prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-accent/80
							prose-strong:text-white prose-strong:font-bold
							prose-em:text-text/90
							prose-ul:text-text/85 prose-ul:mb-5 prose-ul:pl-5 prose-ul:list-disc
							prose-ol:text-text/85 prose-ol:mb-5 prose-ol:pl-5 prose-ol:list-decimal
							prose-li:mb-2 prose-li:leading-relaxed
							prose-blockquote:border-l-4 prose-blockquote:border-accent/40 prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-text/70
							prose-code:text-accent/90 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
							prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-white/[0.08] prose-pre:rounded-xl prose-pre:p-5 prose-pre:overflow-x-auto
							prose-img:rounded-xl prose-img:w-full prose-img:my-8
							prose-figure:my-8
							prose-figcaption:text-center prose-figcaption:text-text/50 prose-figcaption:text-sm prose-figcaption:mt-3
							prose-table:w-full prose-table:text-sm
							prose-th:text-left prose-th:text-white prose-th:font-bold prose-th:pb-3 prose-th:border-b prose-th:border-white/10
							prose-td:py-3 prose-td:border-b prose-td:border-white/[0.06] prose-td:text-text/80
							prose-hr:border-white/10 prose-hr:my-10"
						dangerouslySetInnerHTML={{ __html: blog.content }}
					/>

					<div className="mt-12 pt-8 border-t border-light-contrast/20">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 border-2 border-white/10 flex items-center justify-center overflow-hidden">
								{blog.author.avatar ? (
									<Image
										src={blog.author.avatar}
										alt={blog.author.name}
										width={48}
										height={48}
										className="object-cover"
									/>
								) : (
									<span className="text-white font-bold text-base">
										{blog.author.name.charAt(0)}
									</span>
								)}
							</div>
							<p className="text-white font-bold">{blog.author.name}</p>
						</div>
					</div>
				</div>
			</article>

			<Footer />
		</div>
	);
}
