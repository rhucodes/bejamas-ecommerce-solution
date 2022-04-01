export interface ICategories {
	id : string,
	name: string,
	slug?: string,
}

export interface IProducts {
	name : string,
	price: number,
	featured: boolean,
	id: string,
	description: string,
	currency: string,
	bestseller: boolean,
	category: {
		id : string,
		name: string
	},
	image: {
		id: string,
		size: number,
		url: string,
		width: number,
		height: number
	}
}

export interface IProductData {
	node: IProducts;
}

export interface ICartDetails {
    name : string,
	price: number,
	id: string,
	currency: string,
	image: {
		url: string,
	},
    quantity: number
}