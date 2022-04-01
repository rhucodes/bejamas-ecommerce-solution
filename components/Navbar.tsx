import React, { useCallback } from 'react';
import { useAppContext } from '../context';
import styles from '../styles/components/Navbar.module.css';
import CartItems from './CartItems';

const Navbar = () => {
	const { state, hideCart, viewCart } = useAppContext();
	const {
		cart: { showCart, cartDetails, cartCount },
	} = state;

	const handleShowCart = useCallback(() => {
		viewCart();
	}, [showCart]);

	const handleHideCart = useCallback(() => {
		hideCart();
	}, [showCart]);

	return (
		<>
			<nav className={styles.container}>
				<div className={styles.logo}>
					<img src='/logo.svg' alt='' />
				</div>
				<div className={styles.cart} onClick={handleShowCart}>
					<div className={styles.cart__image}>
						<img src='/cart.svg' alt='' />
					</div>
					{cartDetails.length > 0 && (
						<div className={styles.cart__count}>
							<p className={styles.cart__count__number}>{cartCount}</p>
						</div>
					)}
				</div>
			</nav>
			{showCart ? <CartItems handleCartExit={handleHideCart} /> : null}
		</>
	);
};

export default Navbar;
