import stl from './СatalogPage.module.scss';
import LeftFilter from '../../components/filter/LeftFilter';
import MainFilter from '../../components/filter/MainFilter';
import Header from '../../components/header/Header';
import NavPanel from '../../components/nav/NavPanel';
import Product from '../../components/product/catalog/Product';
import SortPanel from '../../components/sort/SortPanel';
import Subheader from '../../components/subheader/Subheader';
import productsJSON from '../../products.json';
import { SyntheticEvent, useMemo, useRef, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Pagination from '../../components/pagination/Pagination';
import {
	getChangeCare,
	getFabric,
	getFiltredProducs,
	getSortingProducts,
	minMax,
} from '../../util';

function CatalogPage() {
	const [filtredProducts, setFiltredProducts] = useState<Product[]>(
		productsJSON.products
	);
	const cart = useRef<ProductCart[]>([]);
	const [countCart, setCountCart] = useState(0);
	const [costCart, setCostCart] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	const currentPagesData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * 12;
		const lastPageIndex = firstPageIndex + 12;
		return filtredProducts.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, filtredProducts]);

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

	function filtredProductsHandler(
		minPrice: number,
		maxPrice: number,
		checkboxes: string[]
	) {
		setFiltredProducts(
			getFiltredProducs(productsJSON.products, minPrice, maxPrice, checkboxes)
		);
	}

	function allProductsHandler() {
		setFiltredProducts(productsJSON.products);
	}

	function careHandler(e: SyntheticEvent) {
		setFiltredProducts(getChangeCare(e, productsJSON.products));
	}

	function sortHandler(e: SyntheticEvent) {
		setFiltredProducts([...getSortingProducts(e, filtredProducts)]);
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
					<SortPanel changeSort={sortHandler} />
				</div>
				<MainFilter changeCare={careHandler} />
				<div className={stl.content}>
					<LeftFilter
						range={minMax(filtredProducts)}
						fabric={getFabric(filtredProducts)}
						getFiltredProducts={filtredProductsHandler}
						getAllProducts={allProductsHandler}
						changeCare={careHandler}
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
						totalCount={productsJSON.products.length}
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
