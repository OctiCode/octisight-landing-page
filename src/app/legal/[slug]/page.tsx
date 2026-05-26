import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
	LEGAL_DOCS,
	LEGAL_SLUGS,
	getLegalGroups,
	slugFromHref,
} from "@/lib/legal-docs";
import { getLegalDoc } from "@/lib/legal-docs.server";

type PageProps = { params: Promise<{ slug: string }> };

/** Pre-render every legal route at build time. */
export function generateStaticParams() {
	return LEGAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	if (!(slug in LEGAL_DOCS)) return { title: "Not found | OctiSight" };
	const meta = LEGAL_DOCS[slug as keyof typeof LEGAL_DOCS];
	return {
		title: `${meta.title} | OctiSight`,
		description: meta.description,
		openGraph: { title: meta.title, description: meta.description },
		robots: { index: true, follow: true },
	};
}

/**
 * Rewrite intra-doc links like `./imprint.md` or `imprint.md` into the
 * correct `/legal/<slug>` routes so the cross-references inside the
 * markdown work in the browser.
 */
function rewriteHref(href: string | undefined): string {
	if (!href) return "#";
	if (
		href.startsWith("http://") ||
		href.startsWith("https://") ||
		href.startsWith("mailto:") ||
		href.startsWith("#")
	) {
		return href;
	}
	const slug = slugFromHref(href);
	return slug ? `/legal/${slug}` : href;
}

export default async function LegalDocPage({ params }: PageProps) {
	const { slug } = await params;
	const doc = await getLegalDoc(slug);
	if (!doc) notFound();

	const meta = LEGAL_DOCS[doc.slug];

	return (
		<div className="bg-background min-h-screen">
			<Navbar />

			<main className="relative w-full pt-10 sm:pt-12 md:pt-14 pb-12 sm:pb-16 md:pb-20">
				<div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
					<div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-12">
						{/* Sidebar (lg+) — quick switch between legal docs, grouped */}
						<aside className="hidden lg:block lg:sticky lg:top-24 self-start">
							<nav aria-label="Legal documents" className="space-y-5">
								{getLegalGroups().map(({ group, title, slugs }) => (
									<div key={group}>
										<p className="px-3 mb-2 text-[0.62rem] uppercase tracking-[0.2em] text-text/45 font-bold">
											{title}
										</p>
										<div className="space-y-1">
											{slugs.map((slug) => {
												const meta = LEGAL_DOCS[slug];
												const isActive = slug === doc.slug;
												return (
													<Link
														key={slug}
														href={`/legal/${slug}`}
														className={`block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
															isActive
																? "bg-accent/15 text-white border border-accent/30"
																: "text-text/65 hover:text-light-contrast hover:bg-white/[0.03]"
														}`}
													>
														{meta.shortTitle ?? meta.title}
													</Link>
												);
											})}
										</div>
									</div>
								))}

								<Link
									href="/trust"
									className="block px-3 py-2 rounded-md text-sm text-light-contrast hover:text-white hover:bg-accent/15 border border-light-contrast/20 hover:border-accent/40 transition-colors duration-200"
								>
									Trust Center →
								</Link>
							</nav>
						</aside>

						{/* Article */}
						<article className="min-w-0">
							<Link
								href="/"
								className="inline-flex items-center gap-2 text-sm text-text/65 hover:text-light-contrast transition-colors duration-200 mb-6"
							>
								<ArrowLeft className="w-4 h-4" />
								Back to home
							</Link>

							<div
								className="prose prose-invert prose-lg max-w-none
									prose-headings:font-bold prose-headings:text-white prose-headings:leading-tight prose-headings:scroll-mt-24
									prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mt-0 prose-h1:mb-3 prose-h1:font-black
									prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-light-contrast/15
									prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-light-contrast
									prose-h4:text-base sm:prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-text/90
									prose-p:text-text/80 prose-p:leading-relaxed prose-p:mb-4
									prose-a:text-accent prose-a:underline prose-a:underline-offset-2 prose-a:decoration-accent/40 hover:prose-a:text-light-contrast hover:prose-a:decoration-light-contrast
									prose-strong:text-white prose-strong:font-bold
									prose-em:text-text/90
									prose-ul:text-text/80 prose-ul:my-4 prose-ul:pl-5 prose-ul:list-disc
									prose-ol:text-text/80 prose-ol:my-4 prose-ol:pl-5 prose-ol:list-decimal
									prose-li:my-1.5 prose-li:leading-relaxed prose-li:marker:text-light-contrast/60
									prose-blockquote:border-l-2 prose-blockquote:border-accent/40 prose-blockquote:bg-white/[0.02] prose-blockquote:pl-5 prose-blockquote:py-1 prose-blockquote:italic prose-blockquote:text-text/75 prose-blockquote:not-italic
									prose-code:text-light-contrast prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.85em] prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
									prose-pre:bg-white/[0.04] prose-pre:border prose-pre:border-white/8 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
									prose-hr:border-light-contrast/15 prose-hr:my-10
									prose-table:w-full prose-table:text-sm prose-table:my-6
									prose-thead:border-b prose-thead:border-light-contrast/20
									prose-th:text-left prose-th:text-white prose-th:font-bold prose-th:py-2 prose-th:px-3
									prose-td:py-2 prose-td:px-3 prose-td:border-b prose-td:border-white/[0.06] prose-td:text-text/75 prose-td:align-top"
							>
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									components={{
										a: ({ href, children, ...props }) => {
											const finalHref = rewriteHref(href);
											const isExternal = /^https?:/i.test(finalHref);
											return (
												<a
													{...props}
													href={finalHref}
													{...(isExternal
														? {
																target: "_blank",
																rel: "noopener noreferrer",
															}
														: {})}
												>
													{children}
												</a>
											);
										},
									}}
								>
									{doc.markdown}
								</ReactMarkdown>
							</div>

							{/* Small contact CTA at the bottom */}
							<div className="mt-12 pt-8 border-t border-light-contrast/15">
								<p className="text-sm text-text/55 leading-relaxed">
									Questions about this document?{" "}
									<Link
										href="/#contact"
										className="text-accent hover:text-light-contrast underline underline-offset-2 transition-colors duration-200"
									>
										Get in touch
									</Link>
									.
								</p>
							</div>
						</article>
					</div>

					{/* Mobile-only legal nav (below the article) */}
					<nav
						aria-label="Other legal documents"
						className="lg:hidden mt-12 pt-8 border-t border-light-contrast/15 space-y-6"
					>
						{getLegalGroups().map(({ group, title, slugs }) => {
							const others = slugs.filter((s) => s !== doc.slug);
							if (others.length === 0) return null;
							return (
								<div key={group}>
									<p className="text-[0.62rem] uppercase tracking-[0.2em] text-text/45 font-bold mb-3">
										{title}
									</p>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
										{others.map((slug) => {
											const meta = LEGAL_DOCS[slug];
											return (
												<Link
													key={slug}
													href={`/legal/${slug}`}
													className="block px-3 py-2.5 rounded-lg text-sm text-text/70 hover:text-light-contrast hover:bg-white/[0.04] border border-white/[0.06] transition-colors duration-200"
												>
													{meta.title}
												</Link>
											);
										})}
									</div>
								</div>
							);
						})}

						<Link
							href="/trust"
							className="block px-3 py-3 rounded-lg text-sm text-light-contrast hover:text-white hover:bg-accent/15 border border-light-contrast/20 hover:border-accent/40 transition-colors duration-200 text-center font-medium"
						>
							Visit Trust Center →
						</Link>
					</nav>

					{/* Visually hidden but available for SR — uses the configured meta */}
					<span className="sr-only">{meta.description}</span>
				</div>
			</main>

			<Footer />
		</div>
	);
}
