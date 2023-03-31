import { useMemo, useRef, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Subheader from '../../components/subheader/Subheader';
import volume from '../../static/svg/volume.svg';
import weigth from '../../static/svg/weigth.svg';
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
		setAlert('Спасибо за заказ')
	}

	return (
		<div className={stl.container}>
			<Subheader />
			<hr className={stl.hr} />
			<Header countCart={String(countCart)} costCart={String(costCart)} />
			<hr className={stl.hr} />
			<main className={stl.cart}>
				<span className={stl.title}>Корзина</span>
				{cart.current.map((product, key) => {
					return (
						<div className={stl.productBlock} key={key}>
							<div className={stl.hhr}></div>
							<div className={stl.product}>
								<div className={stl.logoBlock}>
									<img className={stl.logo} src={product.imgUrl} alt='' />
								</div>

								<div className={stl.content}>
									<div className={stl.package}>
										{product.typeSize === 'volume' ? (
											<>
												<img src={volume} alt='' />
												<span className={stl.vol}>
													{product.size}
													{' мл'}
												</span>
											</>
										) : (
											<>
												<img src={weigth} alt='' />
												<span className={stl.vol}>
													{product.size}
													{' г'}
												</span>
											</>
										)}
									</div>
									<span className={stl.name}>{product.name}</span>
									<span className={stl.description}>{product.description}</span>
								</div>
								<div className={stl.counterBlock}>
									<div className={stl.vhr}></div>
									<div className={stl.counter}>
										<span
											onClick={() => decrementProduct(product.id)}
											className={stl.make}
										>
											-
										</span>
										<span className={stl.count}>{product.count}</span>
										<span
											onClick={() => incrementProduct(product.id)}
											className={stl.make}
										>
											+
										</span>
									</div>
									<div className={stl.vhr}></div>
									<span className={stl.price}>
										{product.price * product.count}
										{' ₸'}
									</span>
									<div className={stl.vhr}></div>
									<button
										onClick={() => deleteProduct(product.id)}
										className={stl.delete}
									></button>
								</div>
							</div>
						</div>
					);
				})}
				{alert ? (
					<h1>{alert}</h1>
				) : cart.current.length === 0 ? <h1>{'Корзина пуста'}</h1> : (
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
