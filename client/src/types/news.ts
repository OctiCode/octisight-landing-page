export type NewsItem = {
	id: string;
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

export type NewsListItem = Omit<NewsItem, "content">;
