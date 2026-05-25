export type BlogListItem = {
	id: string;
	title: string;
	slug: string;
	category: string;
	image: string;
	excerpt: string;
};

export type BlogItem = BlogListItem & {
	date: string;
	excerpt: string;
	content: string;
	readTime: string;
	author: {
		name: string;
		avatar: string;
	};
};
