import { blogSection } from "@/content/home";
import { BlogService } from "@/lib/services/blogService";
import BlogCarousel from "./BlogCarousel";

export default async function LatestBlogsSection() {
	const blogs = await BlogService.getLatestBlogs(4);

	return (
		<section className="relative w-full pt-8 sm:pt-10 md:pt-14 pb-4 sm:pb-6 md:pb-8">
			<div className="relative z-10 mx-auto max-w-7xl h-full px-4 sm:px-6 flex items-center">
				<div className="flex flex-col items-center gap-3 sm:gap-4 w-full text-center py-4 sm:py-6">
					<div className="inline-flex">
						<span className="px-3 py-1.5 text-center sm:px-4 sm:py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs sm:text-sm font-book backdrop-blur-sm">
							{blogSection.headerTitle}
						</span>
					</div>

					<h2 className="text-2xl sm:text-3xl text-center md:text-4xl lg:text-5xl font-black leading-tight text-white max-w-4xl mt-1 mb-1">
						{blogSection.title}
					</h2>

					<p className="text-sm sm:text-base text-center md:text-lg text-text/90 max-w-2xl leading-relaxed px-1">
						{blogSection.paragraph}
					</p>

					<BlogCarousel blogs={blogs} />
				</div>
			</div>
		</section>
	);
}
