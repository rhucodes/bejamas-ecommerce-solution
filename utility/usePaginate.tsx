import { useState } from "react";
import { IProductData } from "./interfaces";


export const usePaginate = (pageData: IProductData[]) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
	const [postsPerPage] = useState<number>(6);

    const indexOfLastPost: number = currentPage * postsPerPage;
	const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
	const currentPosts: IProductData[] = pageData.slice(
		indexOfFirstPost,
		indexOfLastPost
	);
	const TotalPosts: number = pageData.length;

	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

    return {TotalPosts, paginate, currentPosts, currentPage, postsPerPage};
}