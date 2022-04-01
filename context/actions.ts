import {
	ICartDetails,
	ICategories,
	IProductData,
	IProducts,
} from '../utility/interfaces';

export enum ActionType {
	showCart,
	hideCart,
	addToCart,
	clearCart,
	loadData,
	getCategories,
	sortByPrice,
	sortByAlphabet,
	filterByPrice,
	filterByCategories,
	disableLoading,
	sortByName,
	showFilters,
	setPriceFilter,
	resetPriceFilter,
	setPriceRange,
	setCategoryFilter,
	resetCategoryFilter,
}

export interface ShowCart {
	type: ActionType.showCart;
}

export interface HideCart {
	type: ActionType.hideCart;
}

export interface AddToCart {
	type: ActionType.addToCart;
	payload: ICartDetails;
}

export interface ClearCart {
	type: ActionType.clearCart;
}

export interface LoadData {
	type: ActionType.loadData;
	payload: IProductData[];
}

export interface GetCategories {
	type: ActionType.getCategories;
	payload: ICategories[];
}

export interface SortByPrice {
	type: ActionType.sortByPrice;
	payload: IProductData[];
}

export interface SortByAlphabet {
	type: ActionType.sortByAlphabet;
	payload: IProductData[];
}

export interface FilterByPrice {
	type: ActionType.filterByPrice;
	payload:    IProductData[]
}

export interface FilterByCategories {
	type: ActionType.filterByCategories;
	payload: IProductData[];
}

export interface DisableLoading {
	type: ActionType.disableLoading;
}

export interface SortByName {
	type: ActionType.sortByName;
	payload: {
		products: IProductData[];
		direction: string;
	};
}

export interface ShowFilters {
	type: ActionType.showFilters;
}

export interface SetPriceFilter {
	type: ActionType.setPriceFilter;
	payload: string[];
}

export interface ResetPriceFilter {
	type: ActionType.resetPriceFilter;
}

export interface SetPriceRange {
	type: ActionType.setPriceRange;
	payload: string
}

export interface SetCategoryFilter {
	type: ActionType.setCategoryFilter;
	payload: string[];
}

export interface ResetCategoryFilter {
	type: ActionType.resetCategoryFilter;
}

export type AppActions =
	| ShowCart
	| AddToCart
	| HideCart
	| ClearCart
	| SortByName
	| ShowFilters
	| LoadData
	| GetCategories
	| SortByPrice
	| FilterByCategories
	| DisableLoading
	| SortByAlphabet
	| FilterByPrice
	| SetPriceFilter
	| ResetPriceFilter
	| SetPriceRange
	| SetCategoryFilter
	| ResetCategoryFilter;
