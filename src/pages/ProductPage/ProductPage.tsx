import { useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import NavPanel from '../../components/nav/NavPanel';
import Subheader from '../../components/subheader/Subheader';
import volume from '../../static/svg/volume.svg';
import weigth from '../../static/svg/weigth.svg';
import stl from './ProductPage.module.scss';

function ProductPage() {
	const location = useLocation();
	const [countCart, setCountCart] = useState(0);
	const [costCart, setCostCart] = useState(0);
	const [counter, setCounter] = useState(1);

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
	}, []);

	function addToCart(
		id: number,
		imgUrl: string,
		name: string,
		typeSize: string,
		size: string,
		code: number,
		fabric: string,
		brand: string,
		price: number,
		typeCare: string[],
		description: string
	) {
		let flag = false;
		cart.current.forEach(product => {
			if (product.name === name) {
				product.count += counter;
				flag = true;
			}
		});
		if (!flag) {
			cart.current = [
				...cart.current,
				{
					id: id,
					imgUrl: imgUrl,
					name: name,
					typeSize: typeSize,
					size: size,
					code: code,
					fabric: fabric,
					brand: brand,
					price: price,
					typeCare: typeCare,
					description: description,
					count: counter,
				},
			];
		}
		let sum = 0;
		cart.current.forEach(product => {
			sum += product.price * product.count;
		});
		localStorage.setItem('cart', JSON.stringify(cart.current));
		setCostCart(sum);
		setCountCart(countCart + counter);
	}

	return (
		<div className={stl.container}>
			<Subheader />
			<hr className={stl.hr} />
			<Header countCart={String(countCart)} costCart={String(costCart)} />
			<hr className={stl.hr} />
			<NavPanel currentCrumb={location.state.name} />
			<main className={stl.product}>
				<img className={stl.logo} src={location.state.imgUrl} alt='' />
				<div className={stl.description}>
					<span className={stl.nal}>В наличии</span>
					<span className={stl.name}>
						<strong>{location.state.name.split(' ')[0]}</strong>{' '}
						{location.state.name.split(' ').slice(1, 9e9).join(' ')}
					</span>
					<div className={stl.package}>
						{location.state.typeSize === 'volume' ? (
							<img src={volume} alt='' />
						) : (
							<img src={weigth} alt='' />
						)}
						<span className={stl.vol}>{location.state.size}</span>
					</div>
					<div className={stl.cart}>
						<span className={stl.price}>
							{location.state.price}
							{' ₸'}
						</span>
						<div className={stl.counter}>
							<span
								onClick={() => {
									if (counter >= 2) {
										setCounter(counter - 1);
									}
								}}
								className={stl.make}
							>
								-
							</span>
							<span className={stl.count}>{counter}</span>
							<span
								onClick={() => {
									setCounter(counter + 1);
								}}
								className={stl.make}
							>
								+
							</span>
						</div>
						<button
							onClick={() => {
								addToCart(
									location.state.id,
									location.state.imgUrl,
									location.state.name,
									location.state.typeSize,
									location.state.size,
									location.state.code,
									location.state.fabric,
									location.state.brand,
									location.state.price,
									location.state.typeCare,
									location.state.description
								);
							}}
						>
							В КОРЗИНУ
						</button>
					</div>
					<div className={stl.shareBlock}>
						<div className={stl.share}></div>
						<div className={stl.utp}>
							<span>
								При покупке от <strong>10 000 ₸</strong> бесплатная доставка по
								Кокчетаву и области
							</span>
						</div>
						<div className={stl.price}>
							<span>Прайс-лист</span>
						</div>
					</div>
					<div className={stl.spec}>
						<div className={stl.fabric}>
							<span className={stl.key}>Производитель:</span>
							<span>{location.state.fabric}</span>
						</div>
						<div className={stl.brand}>
							<span className={stl.key}>Бренд:</span>
							<span>{location.state.brand}</span>
						</div>
						<div className={stl.code}>
							<span className={stl.key}>Штрихкод:</span>
							<span>{location.state.code}</span>
						</div>
					</div>
					<div className={stl.descriptionText}>
						<span className={stl.title}>Описание</span>
						<span>{location.state.description}</span>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default ProductPage;
