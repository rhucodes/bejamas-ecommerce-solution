import React, { useCallback, useEffect, useState } from 'react';
import {
	MdOutlineArrowBackIosNew,
	MdOutlineArrowForwardIos,
} from 'react-icons/md';
import styles from '../styles/components/Pagination.module.css';

type CompProps = {
	TotalPosts: number;
	postsPerPage: number;
	currentPage: number;
	paginate: (pageNumber: number) => void;
};

const Pagination = (props: CompProps) => {
	const { TotalPosts, postsPerPage, currentPage, paginate } = props;
	const pageNumbers: number[] = [];
	const [disablePrevButton, setDisablePrevButton] = useState<boolean>(true);
	const [disableNextButton, setDisableNextButton] = useState<boolean>(false);

	for (let i = 1; i <= Math.ceil(TotalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	//Use buttons to toggle
	const nextPage = useCallback(() => {
		if (currentPage < Math.ceil(TotalPosts / postsPerPage)) {
			let nextPage = currentPage + 1;
			if (nextPage > pageNumbers.length) {
				setDisableNextButton(true);
				paginate(currentPage);
			} else {
				paginate(currentPage + 1);
			}
		}
	}, [pageNumbers, TotalPosts, postsPerPage]);

	const prevPage = useCallback(() => {
		let prevPage = currentPage - 1;
		if (currentPage > 1) {
			paginate(prevPage);
			setDisablePrevButton(false);
		}
	}, [currentPage]);

	//Effect to set disable prev button and next button
	useEffect(() => {
		//Prevent user from going to next page if it is the last page
		if (currentPage + 1 > pageNumbers.length) {
			setDisableNextButton(true);
		} else {
			setDisableNextButton(false);
		}

		//preventing the user from going to the previous page if the current page is the first page
		if (currentPage === 1) {
			setDisablePrevButton(true);
		} else {
			setDisablePrevButton(false);
		}
	}, [currentPage, pageNumbers]);
	return (
		<div className={styles.container}>
			<button
				className={styles.next__prev__button}
				onClick={prevPage}
				disabled={disablePrevButton}
			>
				<MdOutlineArrowBackIosNew />
			</button>
			<div className={styles.number__buttons}>
				{pageNumbers.map((item, index) => {
					return (
						<button
							key={index}
							className={`${styles.page__btn} ${
								item === currentPage ? styles.active__btn : null
							}`}
							onClick={() => paginate(item)}
						>
							{item}
						</button>
					);
				})}
			</div>
			<button
				className={styles.next__prev__button}
				onClick={nextPage}
				disabled={disableNextButton}
			>
				<MdOutlineArrowForwardIos />
			</button>
		</div>
	);
};

export default Pagination;
