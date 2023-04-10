import { useMemo, useRef, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import CartProduct from '../../components/product/cart/CartProduct';
import Subheader from '../../components/subheader/Subheader';
import stl from './CartPage.module.scss';

function ProductPage() {
	const [countCart, setCountCart] = useState(0);
	const [costCart, setCostCart] = useState(0);
	const [alert, setAlert] = useState('');
	const cart = useRef<ProductCart[]>([]);

	useMemo(() => {
		const carts: ProductCart[] = JSON.parse(
			localStorage.getItem('cart') || '{}'
		);
		if (Object.entries(carts).length !== 0) {
			cart.current = carts;
			let sum = 0;
			let count = 0;
			carts.forEach(product => {
				sum += product.price * product.count;
				count += product.count;
			});
			setCostCart(sum);
			setCountCart(count);
		}
	}, [costCart]);

	function changeCart() {
		let sum = 0;
		cart.current.forEach(product => {
			sum += product.price * product.count;
		});
		localStorage.setItem('cart', JSON.stringify(cart.current));
		setCostCart(sum);
	}

	function incrementProduct(id: number) {
		cart.current.forEach(product => {
			if (product.id === id) product.count += 1;
		});
		changeCart();
		setCountCart(countCart + 1);
	}

	function decrementProduct(id: number) {
		cart.current.forEach(product => {
			if (product.id === id) {
				if (product.count >= 2) product.count -= 1;
			}
		});
		changeCart();
		setCountCart(countCart - 1);
	}

	function deleteProduct(id: number) {
		for (let i = 0; i < cart.current.length; i++) {
			if (cart.current[i].id === id) cart.current.splice(i, 1);
		}
		changeCart();
		setCountCart(countCart - 1);
	}

	function getOrder() {
		cart.current = [];
		changeCart();
		setCountCart(0);
		setAlert('Спасибо за заказ');
	}

	return (
		<div className={stl.container}>
			<Subheader />
			<hr className={stl.hr} />
			<Header countCart={String(countCart)} costCart={String(costCart)} />
			<hr className={stl.hr} />
			<main data-testid='cart-page' className={stl.cart}>
				<span className={stl.title}>Корзина</span>
				{cart.current.map((product, key) => {
					return (
						<CartProduct
							id={product.id}
							imgUrl={product.imgUrl}
							typeSize={product.typeSize}
							size={product.size}
							name={product.name}
							count={product.count}
							price={product.price}
							description={product.description}
							decrementProduct={decrementProduct}
							incrementProduct={incrementProduct}
							deleteProduct={deleteProduct}
							key={key}
						/>
					);
				})}
				{alert ? (
					<h1>{alert}</h1>
				) : cart.current.length === 0 ? (
					<h1>{'Корзина пуста'}</h1>
				) : (
					<>
						<div className={stl.hhr}></div>
						<div className={stl.order}>
							<button onClick={getOrder}>Оформить заказ</button>
							<span>
								{costCart}
								{' ₸'}
							</span>
						</div>
					</>
				)}
			</main>
			<Footer />
		</div>
	);
}

export default ProductPage;
