import Image from 'next/image';
import React, { useCallback, useContext, useState } from 'react';
import { useAppContext } from '../context';
import styles from '../styles/components/CartItems.module.css';

type CartItemsProps = {
	handleCartExit: () => void;
};

const CartItems = ({ handleCartExit }: CartItemsProps) => {
	const { state, clearCart } = useAppContext();
	const {
		cart: { cartDetails },
	} = state;

	const handleClearCart = useCallback(() => {
		clearCart();
	}, []);

	return (
		<>
			<div className={styles.container}>
				<button className={styles.exit} onClick={handleCartExit}>
					<img src='/cross.svg' alt='' />
				</button>
				{cartDetails.length > 0 ? (
					<>
						{cartDetails.map((item) => (
							<div className={styles.cart__item} key={item.id}>
								<div className={styles.cart__content}>
									<h3>{item.name}</h3>
									<p>$ {item.price}</p>
								</div>
								<div className={styles.cart__image}>
									<Image
										src={item.image.url}
										layout='fill'
										objectFit='cover'
										alt=''
									/>
								</div>
							</div>
						))}
						<button className={styles.cart__button} onClick={handleClearCart}>
							CLEAR
						</button>
					</>
				) : (
					<p>No Cart Items</p>
				)}
			</div>
		</>
	);
};

export default CartItems;
