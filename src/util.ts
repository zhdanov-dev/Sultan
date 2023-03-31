export function minMax(products: Product[]) {
	let min = Infinity;
	let max = -Infinity;
	for (let i = 0; i < products.length; i++) {
		if (products[i].price < min) min = products[i].price;
		if (products[i].price > max) max = products[i].price;
	}
	return [min, max];
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