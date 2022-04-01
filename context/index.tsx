import { useContext, useState } from 'react';
import { getCategories, getProducts } from '../services';
import { ICartDetails, ICategories, IProductData } from '../utility/interfaces';
import { ActionType } from './actions';
import { AppContext } from './context';

export const useAppContext = () => {
	const { state, dispatch } = useContext(AppContext);

	/*=========================================
		CART DISPATCHES
	===========================================*/
	const viewCart = () => {
		dispatch({ type: ActionType.showCart });
	};

	const hideCart = () => {
		dispatch({ type: ActionType.hideCart });
	};

	const clearCart = () => {
		dispatch({ type: ActionType.clearCart });
	};

	const addToCart = async (
		id: string,
		name: string,
		price: number,
		image: { url: string },
		currency: string
	) => {
		const existItem = state.cart.cartDetails.find((x) => x.id === id);
		const quantity = existItem ? existItem.quantity + 1 : 1;

		const product: ICartDetails = {
			id: id,
			name: name,
			price: price,
			quantity,
			image: {
				url: image.url,
			},
			currency: currency,
		};

		viewCart();

		dispatch({
			type: ActionType.addToCart,
			payload: product,
		});
	};

	/*=========================================
		CART DISPATCHES
	===========================================*/
	const showFilter = () => {
		dispatch({ type: ActionType.showFilters });
	};

	const sortByAlphabet = (direction: string) => {
		const items = state.products.filteredData.slice();
		if (direction !== '') {
			items.sort((a, b) =>
				direction === 'asc'
					? a.node.name > b.node.name
						? 1
						: -1
					: a.node.name < b.node.name
					? 1
					: -1
			);
		}

		dispatch({
			type: ActionType.sortByPrice,
			payload: items,
		});
	};

	const filterByCategory = (products: IProductData[], categories: string[]) => {
		let output: IProductData[] = [];
		let data: any[] = [];

		categories.map((category) => {
			products.map((product) => {
				if (product.node.category.name.includes(category)) {
					data = [...output, output.push(product)];
				}
			});
		});

		dispatch({
			type: ActionType.filterByCategories,
			payload: data,
		});
	};

	const sortByPrice = (direction: string) => {
		const items: IProductData[] = state.products.filteredData.slice();
		if (direction !== '') {
			items.sort((a, b) =>
				direction === 'asc'
					? a.node.price > b.node.price
						? 1
						: -1
					: a.node.price < b.node.price
					? 1
					: -1
			);
		}
		dispatch({
			type: ActionType.sortByPrice,
			payload: items,
		});
	};

	const loadData = async () => {
		const res = await getProducts();
		dispatch({
			type: ActionType.loadData,
			payload: res,
		});
	};

	const loadCategories = async () => {
		const res = await getCategories();
		dispatch({
			type: ActionType.getCategories,
			payload: res,
		});
	};

	const filterByPrice = (products: IProductData[], range: string) => {
		let output: IProductData[] = [];
		let data: any[] = [];

		if (range !== '') {
			if (range === '0-20') {
				products.map((product) => {
					if (product.node.price >= 0 && product.node.price <= 20) {
						data = [...output, output.push(product)];
					}
				});
			} else if (range === '20-100') {
				products.map((product) => {
					if (product.node.price >= 20 && product.node.price <= 100) {
						data = [...output, output.push(product)];
					}
				});
			} else if (range === '100-200') {
				products.map((product) => {
					if (product.node.price >= 100 && product.node.price <= 200) {
						data = [...output, output.push(product)];
					}
				});
			} else {
				products.map((product) => {
					if (product.node.price > 200) {
						data = [...output, output.push(product)];
					}
				});
			}
		}
		dispatch({
			type: ActionType.filterByPrice,
			payload: data,
		});
	};

	const priceCheckBoxes = (name: string) => {
		for (const c of state.products.priceFilter) {
			dispatch({
				type: ActionType.setPriceFilter,
				payload: state.products.priceFilter.filter(
					(checked_name) => checked_name !== c
				),
			});
		}
		dispatch({
			type: ActionType.setPriceFilter,
			payload: [name],
		});
		dispatch({
			type: ActionType.setPriceRange,
			payload: name,
		});
		filterByPrice(state.products.filteredData, name);
	};

	// const [allChecked, setAllChecked] = useState(false);
	const categoryCheckBoxes = (name: string) => {
		if (state.products.categoryFilter.includes(name)) {
			dispatch({
				type: ActionType.setCategoryFilter,
				payload: state.products.categoryFilter.filter((checked_name) => checked_name !== name)
			});
		}
		state.products.categoryFilter.push(name);
		dispatch({
			type: ActionType.setCategoryFilter,
			payload: [...state.products.categoryFilter]
		});

		filterByCategory(state.products.filteredData, state.products.categoryFilter);
	}

	const resetFilters = () => {
		dispatch({
			type: ActionType.resetCategoryFilter,
		});

		dispatch({
			type: ActionType.resetPriceFilter
		});
	}

	return {
		sortByPrice,
		state,
		loadData,
		loadCategories,
		sortByAlphabet,
		filterByCategory,
		filterByPrice,
		showFilter,
		viewCart,
		hideCart,
		clearCart,
		addToCart,
		priceCheckBoxes,
		categoryCheckBoxes,
		resetFilters
	};
};
