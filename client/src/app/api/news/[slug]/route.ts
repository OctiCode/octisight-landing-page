import { NextResponse } from "next/server";
import { NewsService } from "@/lib/services/newsService";

export async function GET(
	request: Request,
	{ params }: { params: { slug: string } },
) {
	try {
		const news = await NewsService.getNewsBySlug(params.slug);

		if (!news) {
			return NextResponse.json(
				{ error: "News article not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(news);
	} catch (error) {
		console.error("Error fetching news article:", error);
		return NextResponse.json(
			{ error: "Failed to fetch news article" },
			{ status: 500 },
		);
	}
}
