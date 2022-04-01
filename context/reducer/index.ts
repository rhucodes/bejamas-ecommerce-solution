import { stat } from "fs";
import { ICartDetails } from "../../utility/interfaces";
import { ActionType, AppActions } from "../actions";
import { AppState } from "../state";

export const appReducer = (state: AppState, action: AppActions): AppState => {
    switch (action.type) {
        case ActionType.loadData:
            return {
                ...state,
                products: {
                    ...state.products,
                    filteredData: action.payload,
                }
            };
        case ActionType.getCategories:
            return {
                ...state,
                products: {
                    ...state.products,
                    categories: action.payload
                }
            };
        case ActionType.sortByPrice:
            return {
                ...state,
                products: {
                    ...state.products,
                    filteredData: action.payload,
                }
            };
        case ActionType.sortByAlphabet:
            return {
                ...state,
                products: {
                    ...state.products,
                    filteredData: action.payload,
                }
            };
        case ActionType.filterByCategories:
            return {
                ...state,
                products: {
                    ...state.products,
                    filteredData: action.payload,
                }
            };
        case ActionType.showFilters:
            return {
                ...state,
                products: {
                    ...state.products,
                    showFilters: !state.products.showFilters,
                }
            };
        case ActionType.filterByPrice:
            return {
                ...state,
                products: {
                    ...state.products,
                    filteredData: action.payload,
                }
            };
        case ActionType.setPriceFilter:
            return {
                ...state,
                products: {
                    ...state.products,
                    priceFilter: action.payload,
                }
            };
        case ActionType.resetPriceFilter:
            return {
                ...state,
                products: {
                    ...state.products,
                    priceFilter: [],
                }
            };
        case ActionType.setPriceRange:
            return {
                ...state,
                products: {
                    ...state.products,
                    priceRange: action.payload,
                }
            };
        case ActionType.setCategoryFilter:
            return {
                ...state,
                products: {
                    ...state.products,
                    categoryFilter: action.payload,
                }
            };
        case ActionType.resetCategoryFilter:
            return {
                ...state,
                products: {
                    ...state.products,
                    categoryFilter: [],
                }
            };
        /*======================================================================
            CART REDUCERS START
        =========================================================================*/
        case ActionType.showCart:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    showCart: true
                }
            };
        case ActionType.hideCart:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    showCart: false
                }
            };
        case ActionType.addToCart:
            const newItem = action.payload;
			const existItem = state.cart.cartDetails.find(
				(item) => item.id === newItem.id
			);
			const cartItems = existItem
				? state.cart.cartDetails.map((item) =>
						item.id === existItem.id ? newItem : item
				  )
				: [...state.cart.cartDetails, newItem];
            let total = 0;
            cartItems.map((item: ICartDetails) => ( total += item.quantity));
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartDetails: cartItems,
                    cartCount: total
                }
            };
        case ActionType.clearCart:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartDetails: [],
                    cartCount: 0
                }
            };
        default:
            return state;
    }
}