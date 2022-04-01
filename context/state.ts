import {
	ICartDetails,
	ICategories,
	IProductData,
	IProducts,
} from '../utility/interfaces';

export interface IFilteredData {
	filteredData: IProductData[];
	categories: ICategories[];
	showFilters: boolean;
	priceFilter: string[];
	categoryFilter: string[];
	priceRange: string,
}

export interface ICart {
	showCart: boolean;
	cartDetails: ICartDetails[];
	cartCount: number;
}

export interface AppState {
	cart: ICart;
	products: IFilteredData;
}

export const initialAppState: AppState = {
	cart: {
		showCart: false,
		cartDetails: [],
		cartCount: 0,
	},
	products: {
		filteredData: [],
		categories: [],
		showFilters: false,
		priceFilter: [],
		priceRange: '',
		categoryFilter: [],
	},
};
