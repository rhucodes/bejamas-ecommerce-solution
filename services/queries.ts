import { gql } from '@apollo/client';
import { CORE_CATEGORY_FIELDS, CORE_PRODUCT_FIELDS } from './fragments';

export const ALL_CATEGORIES = gql`
	${CORE_CATEGORY_FIELDS}
	query GetCategories {
		categories {
			...CoreCategoryFields
		}
	}
`;

export const ALL_PRODUCTS = gql`
	${CORE_PRODUCT_FIELDS}
	query GetProducts {
		productsConnection {
			edges {
				node {
					...CoreProductFields
				}
			}
		}
	}
`;

export const FEATURED_PRODUCT = gql`
	${CORE_PRODUCT_FIELDS}
	query GetFeaturedProduct {
		products(where: { featured: true }) {
			...CoreProductFields
		}
	}
`;

export const RELATED_PRODUCTS = gql`
	${CORE_PRODUCT_FIELDS}
	query getRelatedProducts($Id: ID!, $categoryName: String!) {
		products(
			where: { id_not: $Id, AND: { category: { name: $categoryName } } }
			first: 3
		) {
			...CoreProductFields
		}
	}
`;
