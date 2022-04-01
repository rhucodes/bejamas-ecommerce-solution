import React, { useCallback, useState } from 'react';
import { useAppContext } from '../context';
import styles from '../styles/components/Filters.module.css';

const prices = [
	{
		id: 1,
		value: '0-20',
		label: 'Lower than $20',
	},
	{
		id: 2,
		value: '20-100',
		label: '$20 - $100',
	},
	{
		id: 3,
		value: '100-200',
		label: '$100 - $200',
	},
	{
		id: 4,
		value: '200+',
		label: 'More than $200',
	},
]

const Filters = () => {
	const [allChecked, setAllChecked] = useState(false);
	const [categoryChecked, setCategoryChecked] = useState<string[]>([]);
	const {
		priceCheckBoxes,
		categoryCheckBoxes,
		state: {
			products: { categories, filteredData, priceRange, priceFilter, categoryFilter },
		},
	} = useAppContext();

	const handleAllCheck = (e: any) => {
		if (allChecked) {
			setAllChecked(false);
			return setCategoryChecked([]);
		}
		setAllChecked(true);
		setCategoryChecked(categories.map(({ id }) => id));
	};
	

	const handlePriceRange = useCallback( (e: React.ChangeEvent<HTMLInputElement>) => {
		//uncheck all prices
		let name = e.target.name;
		priceCheckBoxes(name);
	}, [priceRange, priceFilter, filteredData]);


	const handleCategoryClick = useCallback( (e: React.ChangeEvent<HTMLInputElement>) => {
		let name = e.target.name;
		categoryCheckBoxes(name);
	}, [categoryFilter, filteredData]);

	return (
		<div className={styles.container}>
			<div className={styles.filter__category}>
				<h5>Category</h5>
				<form className={styles.filter__items}>
					{categories.map((category) => (
						<div className={styles.filter__item} key={category.id}>
							<input
								type='checkbox'
								name={category.name}
								checked={categoryChecked.includes(category.name)}
								onChange={handleCategoryClick }
							/>
							<label>{category.name}</label>
						</div>
					))}
				</form>
			</div>
			<div className={styles.filter__price}>
				<h5>Price range</h5>
				<div className={styles.filter__items}>
					{prices.map((item) => (
						<div className={styles.filter__item} key={item.id}>
							<input
								type='checkbox'
								name={item.value}
								checked={priceFilter.includes(item.value)}
								onChange={handlePriceRange}
							/>
							<label htmlFor={item.value}>{item.label}</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Filters;
