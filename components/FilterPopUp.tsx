import React, { useCallback } from 'react';
import { useAppContext } from '../context';
import styles from '../styles/components/FilterPopUp.module.css';
import Filters from './Filters';


const FilterPopUp = () => {
	const {
		showFilter,
		resetFilters,
		state: {
			products: { filteredData },
		},
	} = useAppContext();
	const handlePopUp = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		showFilter();
	}, []);

	const handleFilterSave = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			showFilter();
		},
		[]
	);

	const handleFilterReset = useCallback( (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		resetFilters();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.filter}></div>
			<div className={styles.filters__container}>
				<div className={styles.top__container}>
					<h4>Filter</h4>
					<div className={styles.cross} onClick={handlePopUp}>
						<img src='/cross.svg' alt='' />
					</div>
				</div>
				<div className="filtes">
					<Filters />
				</div>
				<div className={styles.buttons}>
					<button className='btn-clear' onClick={handleFilterReset}>CLEAR</button>
					<button className='btn-bg' onClick={handleFilterSave}>
						SAVE
					</button>
				</div>
				<div className={styles.filter}></div>
			</div>
		</div>
	);
};

export default FilterPopUp;
