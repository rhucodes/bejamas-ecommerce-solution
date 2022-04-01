import { gql } from '@apollo/client';

export const CORE_PRODUCT_FIELDS = gql`
	fragment CoreProductFields on Product {
		name
		price
		featured
		id
		description
		currency
		bestseller
		category {
			id
			name
		}
		image {
			id
			size
			url
			width
			height
		}
	}
`;

export const CORE_CATEGORY_FIELDS = gql`
	fragment CoreCategoryFields on Category {
		name
		id
		slug
	}
`;
