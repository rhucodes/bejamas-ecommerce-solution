import type { GetStaticProps } from 'next';
import Head from 'next/head';
import {
	FeaturedCard,
	FilterPopUp,
	Filters,
	Navbar,
	Pagination,
	ProductCard,
} from '../components';
import styles from '../styles/Home.module.css';
import { useCallback, useEffect, useState } from 'react';
import { getFeaturedProduct } from '../services';
import { IProducts } from '../utility/interfaces';
import { BiSortAlt2 } from 'react-icons/bi';
import { useAppContext } from '../context';
import { usePaginate } from '../utility/usePaginate';

export interface PageProps {
	featuredProduct: IProducts;
}

const Home = ({ featuredProduct }: PageProps) => {
	const {
		sortByPrice,
		sortByAlphabet,
		loadData,
		state,
		loadCategories,
		showFilter,
	} = useAppContext();
	const { products } = state;
	const { filteredData, showFilters } = products;

	useEffect(() => {
		loadData();
		loadCategories();
	}, []);

	const handleSelect = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			event.preventDefault();
			let value = event.target.value;
			let direction = value.endsWith('_asc') ? 'asc' : 'desc';
			if (value.startsWith('price')) {
				sortByPrice(direction);
			} else {
				sortByAlphabet(direction);
			}
		},
		[filteredData]
	);

	/*======================================
		SET PAGINATING VARIABLES
	========================================*/
	const { TotalPosts, paginate, currentPosts, currentPage, postsPerPage } =
		usePaginate(filteredData);

	/*===================================
		MOBILE FILTER POPUP
	=====================================*/
	const handlePopUp = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		showFilter();
	}, []);

	/*=======================================
		HANDLE SELECT CLICK AND FILTER
	==========================================*/

	return (
		<>
			<Head>
				<title>Bejamas ecommerce</title>
				<meta name='description' content='Bejamas online store' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navbar />
			<main className={styles.container}>
				<FeaturedCard featuredProduct={featuredProduct} />
				<section className={styles.product__list__container}>
					<div className={styles.products__header}>
						<div className={styles.header__text}>
							<h4>Photography /</h4>
							<p>Premium Photos</p>
						</div>
						<div className={styles.header__sort}>
							<div className={styles.mobile__sort} onClick={handlePopUp}>
								<img
									className={styles.mobile__sort__image}
									src='/filter.svg'
									alt=''
								/>
							</div>
							<div className={styles.desktop__sort}>
								<div className={styles.desktop__sort__left}>
									<BiSortAlt2 className={styles.icon} />
									<p>Sort by</p>
								</div>
								<div className={styles.desktop__sort_right}>
									<select onChange={handleSelect} className={styles.desktop__sort__select}>
										<option value=''>Price</option>
										<option value='price_asc'>Lowest Price</option>
										<option value='price_desc'>Highest Price</option>
										<option value=''>Alphabet</option>
										<option value='name_asc'>A -Z </option>
										<option value='name_desc'>Z - A</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.product__content}>
						<aside className={styles.desktop__filters}>
							<Filters />
						</aside>
						<div className={styles.product__list__container}>
							<div className={styles.product__list}>
								{currentPosts.length > 0 ? (
									currentPosts.map((product) => (
										<ProductCard key={product.node.id} product={product.node} />
									))
								) : (
									<div className={styles.no__products}>
										<h4>No products found</h4>
									</div>
								)}
							</div>
							<Pagination
								postsPerPage={postsPerPage}
								TotalPosts={TotalPosts}
								paginate={paginate}
								currentPage={currentPage}
							/>
						</div>
					</div>
				</section>
				{showFilters && <FilterPopUp />}
			</main>
		</>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	const featuredProduct = (await getFeaturedProduct()) || [];

	return {
		props: { featuredProduct },
	};
};
