import type { NewsItem, NewsListItem } from "@/types/news";
import { newsData } from "@/lib/data/news";

export class NewsService {
	private static data: NewsItem[] = newsData;

	static async getAllNews(): Promise<NewsListItem[]> {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 100));

		return this.data.map(({ content, ...item }) => item);
	}

	static async getNewsBySlug(slug: string): Promise<NewsItem | null> {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 100));

		const news = this.data.find((item) => item.slug === slug);
		return news || null;
	}

	static async getLatestNews(limit: number = 4): Promise<NewsListItem[]> {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 100));

		return this.data.slice(0, limit).map(({ content, ...item }) => item);
	}
}
