import stl from './Product.module.scss';
import volume from '../../static/svg/volume.svg';
import weigth from '../../static/svg/weigth.svg';
import { NavLink } from 'react-router-dom';

interface ProductProps {
	id: number;
	imgUrl: string;
	name: string;
	typeSize: string;
	size: string;
	code: number;
	fabric: string;
	brand: string;
	price: number;
	typeCare: string[];
	description: string;
	addToCart: (
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
	) => void;
}

function Product({
	id,
	imgUrl,
	name,
	typeSize,
	size,
	code,
	fabric,
	brand,
	price,
	typeCare,
	addToCart,
	description
}: ProductProps) {
	return (
		<div className={stl.container}>
			<img className={stl.logo} src={imgUrl} alt='' />
			<div className={stl.package}>
				{typeSize === 'volume' ? (
					<>
						<img src={volume} alt='' />
						<span className={stl.vol}>
							{size}
							{' мл'}
						</span>
					</>
				) : (
					<>
						<img src={weigth} alt='' />
						<span className={stl.vol}>
							{size}
							{' г'}
						</span>
					</>
				)}
			</div>
			<div className={stl.content}>
				<NavLink
					to={{ pathname: '/product/' + code }}
					state={{
						imgUrl,
						name,
						typeSize,
						size,
						code,
						fabric,
						brand,
						price,
						typeCare,
						description
					}}
				>
					<span>
						<strong>{name.split(' ')[0]}</strong>{' '}
						{name.split(' ').slice(1, 9e9).join(' ')}
					</span>
				</NavLink>

				<div className={stl.spec}>
					<div>
						<span className={stl.key}>Штрихкод:</span>
						<span>{code}</span>
					</div>
					<div>
						<span className={stl.key}>Производитель:</span>
						<span>{fabric}</span>
					</div>
					<div>
						<span className={stl.key}>Бренд:</span>
						<span>{brand}</span>
					</div>
					<div>
						<span className={stl.key}>Тип ухода:</span>
						<span>
							{typeCare.length === 1 ? typeCare : typeCare.join(', ')}
						</span>
					</div>
				</div>
				<div className={stl.buy}>
					<span>
						{price}
						{' ₸'}
					</span>
					<button
						onClick={() => {
							addToCart(
								id,
								imgUrl,
								name,
								typeSize,
								size,
								code,
								fabric,
								brand,
								price,
								typeCare,
								description
							);
						}}
					>
						В КОРЗИНУ
					</button>
				</div>
			</div>
		</div>
	);
}

export default Product;
