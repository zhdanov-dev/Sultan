import { useMemo, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminProduct from '../../components/product/admin/AdminProduct';
import stl from './AdminPage.module.scss';

const CARE = [
	'Уход за телом',
	'Уход за руками',
	'Уход за ногам',
	'Уход за лицом',
	'Уход за волосами',
];

function AdminPage() {
	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [code, setCode] = useState('');
	const [size, setSize] = useState('');
	const [fabric, setFabric] = useState('');
	const [brand, setBrand] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [typeSize, setTypeSize] = useState('volume');

	const [expanded, setExpanded] = useState(false);
	const [typesCare, setTypesCare] = useState<string[]>([]);

	const products = useRef<Product[]>([]);
	const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

	const [alert, setAlert] = useState('');

	useMemo(() => {
		products.current = JSON.parse(
			localStorage.getItem('adminProducts') || '[]'
		);
		setCurrentProducts(products.current);
	}, []);

	function toggleExpanded() {
		if (!expanded) setTypesCare([]);
		setExpanded(!expanded);
	}

	function handleChange(e: any) {
		if (e.target.checked) {
			return setTypesCare([...typesCare, e.target.name]);
		}
		const filtered = typesCare.filter(name => name !== e.target.name);
		return setTypesCare(filtered);
	}

	function handleSubmit(e: any) {
		e.preventDefault();
		console.log('Submitted! Values selected are', typesCare);
	}

	function addProduct(e: any) {
		e.preventDefault();
		if (
			!name ||
			!image ||
			!size ||
			!code ||
			!fabric ||
			!brand ||
			!price ||
			typesCare.length === 0 ||
			!description
		) {
			setAlert('Заполните все поля');
		} else {
			products.current = [
				...products.current,
				{
					id: Date.now(),
					imgUrl: image,
					name: name,
					typeSize: typeSize,
					size: size,
					code: Number(code),
					fabric: fabric,
					brand: brand,
					price: Number(price),
					typeCare: typesCare,
					description: description,
				},
			];
			localStorage.setItem('adminProducts', JSON.stringify(products.current));
			setCurrentProducts([...products.current]);
		}
	}

	function deleteProduct(id: number) {
		for (let i = 0; i < products.current.length; i++) {
			if (products.current[i].id === id) products.current.splice(i, 1);
		}
		localStorage.setItem('adminProducts', JSON.stringify(products.current));
		setCurrentProducts([...products.current]);
	}

	return (
		<div className={stl.container}>
			<form className={stl.product__form}>
				<h1>Список продуктов:</h1>
				{alert && (
					<div className={stl.alert}>
						<span>{alert}</span>
					</div>
				)}
				<div className={stl.form__input}>
					<input
						className={stl.input__name}
						value={name}
						onChange={e => {
							setName(e.target.value);
							setAlert('');
						}}
						type='text'
						required
					/>
					<label>Name</label>
				</div>
				<div className={stl.form__input}>
					<input
						className={stl.input__name}
						value={image}
						onChange={e => {
							setImage(e.target.value);
							setAlert('');
						}}
						type='text'
						required
					/>
					<label>Image Url</label>
				</div>
				<div>
					<span>Type size: </span>
					<select
						onChange={e => {
							setTypeSize(e.target.value);
							setAlert('');
						}}
						className={stl.size}
						name=''
						id=''
					>
						<option value='volume'>volume</option>
						<option value='volume'>weigth</option>
					</select>
				</div>

				<div className={stl.form__input}>
					<input
						className={stl.input__date}
						value={size}
						onChange={e => {
							setSize(e.target.value);
							setAlert('');
						}}
						type='number'
						required
					/>
					<label>Size</label>
				</div>
				<div className={stl.form__input}>
					<input
						className={stl.input__date}
						value={code}
						onChange={e => {
							setCode(e.target.value);
							setAlert('');
						}}
						type='number'
						required
					/>
					<label>Code</label>
				</div>
				<div className={stl.form__input}>
					<input
						className={stl.input__date}
						value={fabric}
						onChange={e => {
							setFabric(e.target.value);
							setAlert('');
						}}
						type='text'
						required
					/>
					<label>Fabric</label>
				</div>
				<div className={stl.form__input}>
					<input
						className={stl.input__date}
						value={brand}
						onChange={e => {
							setBrand(e.target.value);
							setAlert('');
						}}
						type='text'
						required
					/>
					<label>Brand</label>
				</div>
				<div className={stl.form__input}>
					<input
						className={stl.input__date}
						value={price}
						onChange={e => {
							setPrice(e.target.value);
							setAlert('');
						}}
						type='number'
						required
					/>
					<label>Price</label>
				</div>
				<div className={stl.form__input}>
					<textarea
						className={stl.input__text}
						value={description}
						onChange={e => {
							setDescription(e.target.value);
							setAlert('');
						}}
						required
					></textarea>
					<label>Description</label>
				</div>
				<div onSubmit={handleSubmit} className={stl.type__con}>
					<div onClick={toggleExpanded} className={stl.type__care}>
						<span className={stl.title}>Type of care:</span>
						<div className={stl.value}>
							{typesCare.length
								? typesCare.map((name, i) => (
										<span key={i}>
											{i ? ', ' : null}
											{name}
										</span>
								  ))
								: 'Не выбрано'}
						</div>
					</div>
					{expanded && (
						<div className={stl.types}>
							{CARE.map(care => (
								<label key={care}>
									<input
										type='checkbox'
										name={care}
										value={care}
										onChange={handleChange}
									/>
									{care}
								</label>
							))}
						</div>
					)}
				</div>
				<div className={stl.buttons}>
					<NavLink to={'/catalog'}>
						<button type='submit' className={stl.form__button}>
							Назад к каталогу
						</button>
					</NavLink>

					<button
						onClick={addProduct}
						type='submit'
						className={stl.form__button}
					>
						Добавить
					</button>
				</div>
			</form>
			<div className={stl.products}>
				{currentProducts.map((product, key) => (
					<AdminProduct
						id={product.id}
						imgUrl={product.imgUrl}
						typeSize={product.typeSize}
						size={product.size}
						name={product.name}
						code={product.code}
						fabric={product.fabric}
						brand={product.brand}
						typeCare={product.typeCare}
						price={product.price}
						description={product.description}
						deleteProduct={deleteProduct}
					/>
				))}
			</div>
		</div>
	);
}

export default AdminPage;
