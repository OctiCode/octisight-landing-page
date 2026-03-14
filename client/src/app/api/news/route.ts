import { NextResponse } from "next/server";
import { NewsService } from "@/lib/services/newsService";

export async function GET() {
	try {
		const news = await NewsService.getAllNews();
		return NextResponse.json(news);
	} catch (error) {
		console.error("Error fetching news:", error);
		return NextResponse.json(
			{ error: "Failed to fetch news" },
			{ status: 500 },
		);
	}
}
