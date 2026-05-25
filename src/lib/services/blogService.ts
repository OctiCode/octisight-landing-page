import type { BlogItem, BlogListItem } from "@/types/blog";

const REVALIDATE = 300;

export class BlogService {
	static async getAllBlogs(): Promise<BlogListItem[]> {
		return [];
	}

	static async getBlogBySlug(_slug: string): Promise<BlogItem | null> {
		return null;
	}

	static async getLatestBlogs(_limit = 4): Promise<BlogListItem[]> {
		return [];
	}

	static async getAllSlugs(): Promise<string[]> {
		return [];
	}

	static readonly REVALIDATE = REVALIDATE;
}
