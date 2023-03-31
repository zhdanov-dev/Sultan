import stl from './СatalogPage.module.scss';
import LeftFilter from '../../components/filter/LeftFilter';
import MainFilter from '../../components/filter/MainFilter';
import Header from '../../components/header/Header';
import NavPanel from '../../components/nav/NavPanel';
import Product from '../../components/product/Product';
import SortPanel from '../../components/sort/SortPanel';
import Subheader from '../../components/subheader/Subheader';

import productsJSON from '../../products.json';
import { getFabric, minMax } from '../../util';
import { useMemo, useRef, useState } from 'react';
import Footer from '../../components/footer/Footer';

import Pagination from '../../components/pagination/Pagination';

function CatalogPage() {
	const [filtredProducts, setFiltredProducts] = useState<Product[]>(
		productsJSON.products
	);

	let PageSize = 12;

	const [currentPage, setCurrentPage] = useState(1);

	const currentPagesData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		console.log('asdas')
		return filtredProducts.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, filtredProducts]);

	const cart = useRef<ProductCart[]>([]);

	const [countCart, setCountCart] = useState(0);
	const [costCart, setCostCart] = useState(0);

	function getFiltredProducts(
		minPrice: number,
		maxPrice: number,
		checkboxes: string[]
	) {
		const products = productsJSON.products;
		let filtredProducts: Product[] = [];
		for (let i = 0; i < products.length; i++) {
			if (
				minPrice <= products[i].price &&
				products[i].price <= maxPrice &&
				checkboxes.includes(products[i].fabric)
			)
				filtredProducts.push(products[i]);
		}
		setFiltredProducts(filtredProducts);
	}

	function getAllProducts() {
		setFiltredProducts(productsJSON.products);
	}

	function changeCare(e: any) {
		let products = productsJSON.products;
		const adminProducts = JSON.parse(
			localStorage.getItem('adminProducts') || '[]'
		);
		if (adminProducts.length !== 0) {
			products = [...adminProducts];
		}
		let localProducts: Product[] = [];
		for (let i = 0; i < products.length; i++) {
			products[i].typeCare.forEach(type => {
				if (
					type.toLocaleLowerCase() === e.target.textContent.toLocaleLowerCase()
				)
					localProducts.push(products[i]);
			});
		}
		setFiltredProducts(localProducts);
	}

	function changeSort(e: any) {
		let sorting = filtredProducts;
		if (e.target.value === 'a-z') {
			filtredProducts.sort((a, b) => {
				return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
			});
		}
		if (e.target.value === 'z-a') {
			filtredProducts.sort((a, b) => {
				return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
			});
		}
		if (e.target.value === 'min') {
			filtredProducts.sort((a, b) => {
				return a.price - b.price;
			});
		}
		if (e.target.value === 'max') {
			filtredProducts.sort((a, b) => {
				return b.price - a.price;
			});
		}
		setFiltredProducts([...sorting]);
	}

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
		typeCare: string[]
	) {
		let flag = false;
		cart.current.forEach(product => {
			if (product.name === name) {
				product.count += 1;
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
					description: '',
					count: 1,
				},
			];
		}
		let sum = 0;
		cart.current.forEach(product => {
			sum += product.price * product.count;
		});
		localStorage.setItem('cart', JSON.stringify(cart.current));
		setCostCart(sum);
		setCountCart(countCart + 1);
	}

	useMemo(() => {
		const adminProducts = JSON.parse(
			localStorage.getItem('adminProducts') || '[]'
		);
		if (adminProducts.length !== 0) {
			setFiltredProducts([...adminProducts]);
		}
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

	return (
		<div className={stl.container}>
			<Subheader />
			<hr className={stl.hr} />
			<Header countCart={String(countCart)} costCart={String(costCart)} />
			<hr className={stl.hr} />
			<NavPanel currentCrumb={''} />
			<main className={stl.main}>
				<div className={stl.head}>
					<h1>Косметика и гигиена</h1>
					<SortPanel changeSort={changeSort} />
				</div>
				<MainFilter changeCare={changeCare} />
				<div className={stl.content}>
					<LeftFilter
						range={minMax(filtredProducts)}
						fabric={getFabric(filtredProducts)}
						getFiltredProducts={getFiltredProducts}
						getAllProducts={getAllProducts}
						changeCare={changeCare}
					/>
					<section className={stl.products}>
						{currentPagesData.map((product, key: number) => {
							return (
								<Product
									id={product.id}
									imgUrl={product.imgUrl}
									name={product.name}
									typeSize={product.typeSize}
									size={product.size}
									code={product.code}
									fabric={product.fabric}
									brand={product.brand}
									price={product.price}
									typeCare={product.typeCare}
									addToCart={addToCart}
									description={product.description}
									key={key}
								/>
							);
						})}
					</section>
				</div>
				<div className={stl.pages}>
					<Pagination
						currentPage={currentPage}
						totalCount={filtredProducts.length}
						pageSize={12}
						onPageChange={(page: any) => setCurrentPage(page)}
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default CatalogPage;
