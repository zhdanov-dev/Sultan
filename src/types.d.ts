declare type Product = {
	id: number;
	imgUrl: string;
	name: string;
	typeSize: string;
	size: string;
	code: number;
	fabric: string;
	brand: string;
	description: string;
	price: number;
	typeCare: string[]
};

declare type ProductCart = {
	id: number;
	imgUrl: string;
	name: string;
	typeSize: string;
	size: string;
	code: number;
	fabric: string;
	brand: string;
	description: string;
	price: number;
	typeCare: string[];
	count: number;
};