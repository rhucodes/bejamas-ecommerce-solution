import Image from 'next/image';
import { useAppContext } from '../context';
import styles from '../styles/components/ProductCard.module.css';
import { IProducts } from '../utility/interfaces';

type PageProps = {
	product: IProducts;
};

const ProductCard = ({ product }: PageProps) => {
	const { id, name, image, price, currency, bestseller, category } = product;

	const { addToCart } = useAppContext();

	const addToCartHandler = async (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		addToCart(id, name, price, image, currency);
	};
	return (
		<div className={styles.container}>
			<div className={styles.image}>
				<Image src={image.url} layout='fill' objectFit='cover' alt={name} />
				{bestseller && (
					<div className={styles.best__seller}>
						<h6>Best Seller</h6>
					</div>
				)}
				<button
					className={`${styles.checkout__btn}  btn-bg `}
					onClick={addToCartHandler}
				>
					ADD TO CART
				</button>
			</div>

			<div className={styles.content}>
				<h5>{category.name}</h5>
				<h3>{name}</h3>
				<p>$ {price}</p>
			</div>
		</div>
	);
};

export default ProductCard;
