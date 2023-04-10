import stl from './CartProduct.module.scss'
import volume from '../../../static/svg/volume.svg';
import weigth from '../../../static/svg/weigth.svg';

interface CartProps {
	id: number;
	imgUrl: string;
	typeSize: string;
	size: string;
	name: string;
	count: number;
	price: number;
	description: string;
	decrementProduct(id: number): void;
	incrementProduct(id: number): void;
	deleteProduct(id: number): void;
}

function CartProduct({id, imgUrl, typeSize, size, name, count, price, description, decrementProduct, incrementProduct, deleteProduct}: CartProps) {
	return (
		<div data-testid='cart-product' className={stl.productBlock}>
			<div className={stl.hhr}></div>
			<div className={stl.product}>
				<div className={stl.logoBlock}>
					<img className={stl.logo} src={imgUrl} alt='' />
				</div>

				<div className={stl.content}>
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
					<span className={stl.name}>{name}</span>
					<span className={stl.description}>{description}</span>
				</div>
				<div className={stl.counterBlock}>
					<div className={stl.vhr}></div>
					<div className={stl.counter}>
						<span
							onClick={() => decrementProduct(id)}
							className={stl.make}
						>
							-
						</span>
						<span data-testid='product-countcart' className={stl.count}>{count}</span>
						<span
							onClick={() => incrementProduct(id)}
							className={stl.make}
						>
							+
						</span>
					</div>
					<div className={stl.vhr}></div>
					<span className={stl.price}>
						{price * count}
						{' ₸'}
					</span>
					<div className={stl.vhr}></div>
					<button
					data-testid='delete-product'
						onClick={() => deleteProduct(id)}
						className={stl.delete}
					></button>
				</div>
			</div>
		</div>
	);
}

export default CartProduct