import stl from './LeftFilter.module.scss';
import search from '../../static/svg/search.svg';
import Chechbox from '../checkbox/Checkbox';
import { useRef, useState } from 'react';

interface LeftFilterProps {
	range: number[];
	fabric: { [k: string]: number };
	getFiltredProducts: (
		minPrice: number,
		maxPrice: number,
		checkboxes: string[]
	) => void;
	getAllProducts: React.MouseEventHandler<HTMLButtonElement>;
	changeCare: React.MouseEventHandler<HTMLSpanElement>;
}

function LeftFilter({
	range,
	fabric,
	getFiltredProducts,
	getAllProducts,
	changeCare,
}: LeftFilterProps) {
	const [showAll, setShowAll] = useState(false);
	const [serachValue, setSearchValue] = useState('');
	const [filtredFabric, setFiltredFabric] = useState(fabric);

	const [minPrice, setMinPrice] = useState(range[0]);
	const [maxPrice, setMaxPrice] = useState(range[1]);

	const checkboxes = useRef<string[]>([])

	function getFilterFabric() {
		const obj: { [k: string]: number } = {};
		Object.entries(fabric)
			.reverse()
			.map(x => {
				if (
					x[0].toLocaleLowerCase().includes(serachValue.toLocaleLowerCase()) ||
					serachValue.toLocaleLowerCase().includes(x[0].toLocaleLowerCase())
				)
					obj[x[0]] = x[1];
			});
		setFiltredFabric(obj);
	}

	function getCheckboxes(e: any) {
		let index = 0;
		if (e.target.checked) {
			checkboxes.current.push(e.target.value);
		} else {
			index = checkboxes.current.indexOf(e.target.value);
			checkboxes.current.splice(index, 1);
		}
	}

	return (
		<section className={stl.container}>
			<h4>ПОДБОР ПО ПАРАМЕТРАМ</h4>
			<div className={stl.price}>
				<div>
					<span className={stl.spanPrice}>Цена</span>
					<span className={stl.t}>₸</span>
				</div>
				<div className={stl.betweenPrice}>
					<input
						className={stl.input}
						type='number'
						maxLength={2}
						value={minPrice}
						onChange={e => {
							setMinPrice(Number(e.target.value));
						}}
					/>
					<span>-</span>
					<input
						className={stl.input}
						type='number'
						maxLength={String(range[1]).length}
						value={maxPrice}
						onChange={e => {
							setMaxPrice(Number(e.target.value));
						}}
					/>
				</div>
			</div>
			<div className={stl.fabric}>
				<h4>Производитель</h4>
				<div className={stl.search}>
					<input
						value={serachValue}
						onChange={e => {
							setSearchValue(e.target.value);
						}}
						className={stl.input}
						type='text'
						placeholder='Поиск...'
					/>
					<img
						onClick={() => {
							getFilterFabric();
						}}
						className={stl.icon}
						src={search}
						alt=''
					/>
				</div>
				<div className={stl.checkboxes}>
					{showAll
						? Object.entries(filtredFabric)
								.reverse()
								.map((x, key: number) => {
									return (
										<Chechbox
											fabric={x[0]}
											count={x[1]}
											key={key}
											changeCheckbox={getCheckboxes}
										/>
									);
								})
						: Object.entries(filtredFabric)
								.reverse()
								.slice(0, 4)
								.map((x, key: number) => {
									return (
										<Chechbox
											fabric={x[0]}
											count={x[1]}
											key={key}
											changeCheckbox={getCheckboxes}
										/>
									);
								})}
				</div>
				{Object.entries(filtredFabric).length <= 4 ? null : (
					<button
						onClick={() => {
							setShowAll(!showAll);
						}}
						className={stl.showall}
					>
						Показать все
					</button>
				)}
			</div>
			<div className={stl.buttons}>
				<button
					onClick={() => getFiltredProducts(minPrice, maxPrice, checkboxes.current)}
					className={stl.show}
				>
					Показать
				</button>
				<button onClick={getAllProducts} className={stl.delete}></button>
			</div>
			<div className={stl.main}>
				<span onClick={changeCare}>Уход за телом</span>
				<span onClick={changeCare}>Уход за руками</span>
				<span onClick={changeCare}>Уход за ногами</span>
				<span onClick={changeCare}>Уход за лицом</span>
				<span onClick={changeCare}>Уход за волосами</span>
				<span onClick={changeCare}>Средства для загара</span>
				<span onClick={changeCare}>Средства для бритья</span>
				<span onClick={changeCare}>Подарочные наборы</span>
				<span onClick={changeCare}>Гигиеническая продукция</span>
				<span onClick={changeCare}>Гигиена полости рта</span>
				<span onClick={changeCare}>Бумажная продукция</span>
			</div>
		</section>
	);
}

export default LeftFilter;
