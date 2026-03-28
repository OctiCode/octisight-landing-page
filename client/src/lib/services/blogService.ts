import type {
	BlogItem,
	BlogListItem,
	WPPostBySlugResponse,
	WPPostNode,
	WPPostsResponse,
} from "@/types/blog";
import { wpClient } from "@/lib/graphql/client";
import {
	GET_ALL_SLUGS,
	GET_POSTS,
	GET_POST_BY_SLUG,
} from "@/lib/graphql/queries";

/** Revalidation period in seconds (ISR) — 5 minutes */
const REVALIDATE = 300;

/** Extract the first <img> src from HTML content */
function extractFirstImage(html: string): string {
	const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
	return match?.[1] ?? "";
}

/** Remove the first image (and its wrapping figure/p tag) from HTML content */
function removeFirstImage(html: string): string {
	return html
		.replace(/<figure[^>]*>\s*<img[^>]*>[\s\S]*?<\/figure>/i, "")
		.replace(/<p[^>]*>\s*<img[^>]*>\s*<\/p>/i, "")
		.replace(/<img[^>]*>/i, "")
		.trim();
}

/** Strip HTML tags and decode common entities */
function stripHtml(html: string): string {
	return html
		.replace(/<[^>]*>/g, "")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&nbsp;/g, " ")
		.trim();
}

/** Estimate reading time from HTML content */
function estimateReadTime(html: string): string {
	const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.ceil(words / 225));
	return `${minutes} min read`;
}

/** Map a raw WP post node to the app-level BlogListItem (lightweight) */
function mapPostToListItem(node: WPPostNode): BlogListItem {
	return {
		id: node.id,
		title: node.title,
		slug: node.slug,
		category: node.categories.nodes[0]?.name ?? "Uncategorized",
		image:
			node.featuredImage?.node.sourceUrl ??
			extractFirstImage(node.content ?? ""),
		excerpt: stripHtml(node.excerpt ?? ""),
	};
}

/** Map a raw WP post node to the full BlogItem (detail page) */
function mapPostToItem(node: WPPostNode): BlogItem {
	const listItem = mapPostToListItem(node);
	const rawContent = node.content ?? "";
	const content = listItem.image ? removeFirstImage(rawContent) : rawContent;

	return {
		...listItem,
		date: node.date ?? "",
		excerpt: stripHtml(node.excerpt ?? ""),
		content,
		readTime: estimateReadTime(node.content ?? node.excerpt ?? ""),
		author: {
			name: node.author?.node.name ?? "",
			avatar: node.author?.node.avatar?.url ?? "",
		},
	};
}

export class BlogService {
	/** Fetch all published posts (latest first) */
	static async getAllBlogs(): Promise<BlogListItem[]> {
		try {
			const data = await wpClient.request<WPPostsResponse>(GET_POSTS, {
				first: 50,
			});
			return data.posts.nodes.map(mapPostToListItem);
		} catch (error) {
			console.error("[BlogService] Failed to fetch all blogs:", error);
			return [];
		}
	}

	/** Fetch a single post by slug — returns null if not found */
	static async getBlogBySlug(slug: string): Promise<BlogItem | null> {
		try {
			const data = await wpClient.request<WPPostBySlugResponse>(
				GET_POST_BY_SLUG,
				{ slug },
			);
			if (!data.post) return null;
			return mapPostToItem(data.post);
		} catch (error) {
			console.error(`[BlogService] Failed to fetch blog "${slug}":`, error);
			return null;
		}
	}

	/** Fetch the N most recent posts for the landing page carousel */
	static async getLatestBlogs(limit = 4): Promise<BlogListItem[]> {
		try {
			const data = await wpClient.request<WPPostsResponse>(GET_POSTS, {
				first: limit,
			});
			return data.posts.nodes.map(mapPostToListItem);
		} catch (error) {
			console.error("[BlogService] Failed to fetch latest blogs:", error);
			return [];
		}
	}

	/** Fetch all slugs for generateStaticParams */
	static async getAllSlugs(): Promise<string[]> {
		try {
			const data = await wpClient.request<{
				posts: { nodes: { slug: string }[] };
			}>(GET_ALL_SLUGS);
			return data.posts.nodes.map((n) => n.slug);
		} catch (error) {
			console.error("[BlogService] Failed to fetch slugs:", error);
			return [];
		}
	}

	/** Revalidation period (exported for page-level revalidate) */
	static readonly REVALIDATE = REVALIDATE;
}
