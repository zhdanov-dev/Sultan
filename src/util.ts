import { SyntheticEvent } from 'react';

export function minMax(products: Product[]) {
	let min = Infinity;
	let max = -Infinity;
	for (let i = 0; i < products.length; i++) {
		if (products[i].price < min) min = products[i].price;
		if (products[i].price > max) max = products[i].price;
	}
	return [min, max];
}

export function getFiltredProducs(
	products: Product[],
	minPrice: number,
	maxPrice: number,
	checkboxes: string[]
): Product[] {
	let filtredProducts: Product[] = [];
	for (let i = 0; i < products.length; i++) {
		if (
			minPrice <= products[i].price &&
			products[i].price <= maxPrice &&
			checkboxes.includes(products[i].fabric)
		)
			filtredProducts.push(products[i]);
	}
	return filtredProducts;
}

export function getFabric(products: Product[]) {
	let fabric: { [k: string]: number } = {};
	for (let i = 0; i < products.length; i++) {
		if (fabric.hasOwnProperty(products[i].fabric))
			fabric[products[i].fabric] += 1;
		else fabric[products[i].fabric] = 1;
	}
	return fabric;
}

export function getChangeCare(
	e: SyntheticEvent,
	products: Product[]
): Product[] {
	let filtredProducts: Product[] = [];
	for (let i = 0; i < products.length; i++) {
		products[i].typeCare.forEach(type => {
			if (
				type.toLocaleLowerCase() ===
				(e.target as HTMLElement).textContent!.toLocaleLowerCase()
			)
				filtredProducts.push(products[i]);
		});
	}
	return filtredProducts;
}

export function getSortingProducts(
	e: SyntheticEvent,
	products: Product[]
): Product[] {
	let filtredProducts = products;
	if ((e.target as HTMLOptionElement).value === 'a-z') {
		filtredProducts.sort((a, b) => {
			return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
		});
	}
	if ((e.target as HTMLOptionElement).value === 'z-a') {
		filtredProducts.sort((a, b) => {
			return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
		});
	}
	if ((e.target as HTMLOptionElement).value === 'min') {
		filtredProducts.sort((a, b) => {
			return a.price - b.price;
		});
	}
	if ((e.target as HTMLOptionElement).value === 'max') {
		filtredProducts.sort((a, b) => {
			return b.price - a.price;
		});
	}
	return filtredProducts;
}

export function addToCart(
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
	description: string,
	counter: number,
	cart: ProductCart[]
): ProductCart[] {
	let flag = false;
	cart.forEach(product => {
		if (product.name === name) {
			product.count += counter;
			flag = true;
		}
	});
	if (!flag) {
		cart = [
			...cart,
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
	localStorage.setItem('cart', JSON.stringify(cart));
	return cart
}
