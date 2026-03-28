import { gql } from "graphql-request";

/** Fetch posts for the blog list / carousel — lightweight */
export const GET_POSTS = gql`
	query GetPosts($first: Int!) {
		posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
			nodes {
				id
				title
				slug
				excerpt
				content
				categories {
					nodes {
						name
						slug
					}
				}
				featuredImage {
					node {
						sourceUrl
					}
				}
			}
		}
	}
`;

/** Fetch a single post by slug — full data for detail page */
export const GET_POST_BY_SLUG = gql`
	query GetPostBySlug($slug: ID!) {
		post(id: $slug, idType: SLUG) {
			id
			title
			slug
			date
			excerpt
			content
			categories {
				nodes {
					name
					slug
				}
			}
			featuredImage {
				node {
					sourceUrl
				}
			}
			author {
				node {
					name
					avatar {
						url
					}
				}
			}
		}
	}
`;

/** Fetch all slugs for static generation */
export const GET_ALL_SLUGS = gql`
	query GetAllSlugs {
		posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
			nodes {
				slug
			}
		}
	}
`;
