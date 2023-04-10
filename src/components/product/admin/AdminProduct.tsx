import stl from './AdminProduct.module.scss'

interface AdminProps {
	id: number;
	imgUrl: string;
	typeSize: string;
	size: string;
	name: string;
	code: number;
	fabric: string;
	brand: string;
	typeCare: string[];
	price: number;
	description: string;
	deleteProduct(id: number): void;
}

function AdminProduct({id, imgUrl, typeSize, size, name, code, fabric, brand, typeCare, price, description, deleteProduct}: AdminProps) {
	return (
			<div className={stl.product}>
				<div onClick={() => deleteProduct(id)} className={stl.delete}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						height='24'
						viewBox='0 96 960 960'
						width='24'
						fill='currentColor'
					>
						<path d='M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z' />
					</svg>
				</div>

				<img className={stl.logo} src={imgUrl} alt='' />
				<div className={stl.content}>
					<div className={stl.spec}>
						<div>
							<span className={stl.key}>Имя:</span>
							<span>{name}</span>
						</div>
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
								{typeCare.length === 1
									? typeCare
									: typeCare.join(', ')}
							</span>
						</div>
						<div className={stl.package}>
							{typeSize === 'volume' ? (
								<>
									<span className={stl.key}>Объем:</span>
									<span className={stl.vol}>
										{size}
										{' мл'}
									</span>
								</>
							) : (
								<>
									<span className={stl.key}>Вес:</span>
									<span className={stl.vol}>
										{size}
										{' г'}
									</span>
								</>
							)}
						</div>
						<div>
							<span className={stl.key}>Описание:</span>
							<span>{description}</span>
						</div>
						<div>
							<span className={stl.key}>Цена:</span>
							<span>{price}</span>
						</div>
					</div>
				</div>
			</div>
	);
}

export default AdminProduct;