import { gql } from '@apollo/client';
import client from './apollo-client';
import {
	ALL_PRODUCTS,
	FEATURED_PRODUCT,
	RELATED_PRODUCTS,
	ALL_CATEGORIES,
} from './queries';

export const getCategories = async () => {
	const { data } = await client.query({ query: ALL_CATEGORIES });

	return data.categories;
};

/*
    Products Queries
*/

export const getProducts = async () => {
	const { data } = await client.query({ query: ALL_PRODUCTS });

	return data.productsConnection.edges;
};

export const getFeaturedProduct = async () => {
	const { data } = await client.query({ query: FEATURED_PRODUCT });

	return data.products[0];
};

export const getRelatedProducts = async (Id: string, categoryName: string) => {
	const { data } = await client.query({
		query: RELATED_PRODUCTS,
		variables: { Id, categoryName },
	});

	return data.products;
};
