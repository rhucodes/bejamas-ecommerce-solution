import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getRelatedProducts } from '../services';
import { useAppContext } from '../context';
import styles from '../styles/components/FeaturedCard.module.css';
import { IProducts } from '../utility/interfaces';

type CompProps = {
	featuredProduct: IProducts;
};

const FeaturedCard = (props: CompProps) => {
	const { featuredProduct } = props;
	const { addToCart } = useAppContext();
	const [relatedProducts, setRelatedProducts] = useState<IProducts[]>([]);

	//FETCH RELATED PRODUTS ON COMPONENT MOUNT
	const fetchRelatedProducts = async () => {
		const response = await getRelatedProducts(
			featuredProduct.id,
			featuredProduct.category.name
		);
		setRelatedProducts(response);
	};

	useEffect(() => {
		fetchRelatedProducts();
	}, [relatedProducts]);

	//CONVERTING KB TO MB
	const imageSize = featuredProduct.image.size / 1024 / 1024;
	const imageSizeRounded = Math.round(imageSize * 100) / 100;

	//  ADD PRODUCT TO CART HANDLER
	const addToCartHandler = async (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		addToCart(
			featuredProduct.id,
			featuredProduct.name,
			featuredProduct.price,
			featuredProduct.image,
			featuredProduct.currency
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.item__desc}>
				<div className={styles.header}>
					<h2>{featuredProduct.name}</h2>
				</div>
				<div className={styles.image__container}>
					<div className={styles.image}>
						<Image
							src={featuredProduct.image.url}
							layout='fill'
							objectFit='cover'
							alt={featuredProduct.name}
						/>
					</div>
					<div className={styles.image__text}>
						<h2>Photo of the day</h2>
					</div>
				</div>
				<div className={styles.button__container}>
					<button className='btn-bg' onClick={addToCartHandler}>
						ADD TO CART
					</button>
				</div>
			</div>
			<div className={styles.item__details}>
				<div className={styles.about}>
					<h3>About the {featuredProduct.name}</h3>
					<h4>Category</h4>
					<p>{featuredProduct.description}</p>
				</div>
				<div className={styles.popular__items}>
					<h4>People also Buy</h4>
					<div className={styles.items__cards}>
						{relatedProducts.map((product) => (
							<div className={styles.item__card} key={product.id}>
								<Image
									src={product.image.url}
									layout='fill'
									objectFit='cover'
									alt=''
								/>
							</div>
						))}
					</div>
					<div className={styles.product__details}>
						<h4>Details</h4>
						<div className={styles.details}>
							<p>
								Size: {featuredProduct.image.height}x
								{featuredProduct.image.width} pixel
							</p>
							<p>Size: {imageSizeRounded}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeaturedCard;
