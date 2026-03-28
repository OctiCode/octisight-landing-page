/* ─── App-level types (consumed by components) ─────────────────── */

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

/* ─── WordPress GraphQL raw response shapes ────────────────────── */

export type WPPostNode = {
	id: string;
	title: string;
	slug: string;
	date?: string;
	excerpt?: string;
	content?: string;
	featuredImage: {
		node: {
			sourceUrl: string;
		};
	} | null;
	categories: {
		nodes: { name: string; slug: string }[];
	};
	author?: {
		node: {
			name: string;
			avatar: { url: string } | null;
		};
	};
};

export type WPPostsResponse = {
	posts: { nodes: WPPostNode[] };
};

export type WPPostBySlugResponse = {
	post: WPPostNode | null;
};
