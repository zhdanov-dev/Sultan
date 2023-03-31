import stl from './MainFilter.module.scss';

interface MainFilterProps {
	changeCare: React.MouseEventHandler<HTMLLIElement>;
}

function MainFilter({ changeCare }: MainFilterProps) {
	return (
		<ul className={stl.container}>
			<li onClick={changeCare} className={stl.filter}>
				Уход за телом
			</li>
			<li onClick={changeCare} className={stl.filter}>
				Уход за руками
			</li>
			<li onClick={changeCare} className={stl.filter}>
				Уход за ногами
			</li>
			<li onClick={changeCare} className={stl.filter}>
				Уход за лицом
			</li>
			<li onClick={changeCare} className={stl.filter}>
				Уход за волосами
			</li>
			<li onClick={changeCare} className={stl.filter}>
				Средства для загара
			</li>
			<li onClick={changeCare} className={stl.filter}>
				Средства для бритья
			</li>
			<li onClick={changeCare} className={stl.filter}>
				Подарочные наборы
			</li>
			<li onClick={changeCare} className={stl.filter}>
				Гигиеническая продукция
			</li>
			<li onClick={changeCare} className={stl.filter}>
				Гигиена полости рта
			</li>
			<li onClick={changeCare} className={stl.filter}>
				Бумажная продукция
			</li>
		</ul>
	);
}

export default MainFilter;
