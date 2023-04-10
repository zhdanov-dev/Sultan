import stl from './MainFilter.module.scss';

interface MainFilterProps {
	changeCare: React.MouseEventHandler<HTMLLIElement>;
}

function MainFilter({ changeCare }: MainFilterProps) {
	return (
		<ul className={stl.container}>
			<li data-testid='care' onClick={changeCare} className={stl.filter}>
				Уход за телом
			</li>
			<li data-testid='care' onClick={changeCare} className={stl.filter}>
				Уход за руками
			</li>
			<li data-testid='care' onClick={changeCare} className={stl.filter}>
				Уход за ногами
			</li>
			<li data-testid='care' onClick={changeCare} className={stl.filter}>
				Уход за лицом
			</li>
			<li data-testid='care' onClick={changeCare} className={stl.filter}>
				Уход за волосами
			</li>
			<li data-testid='care' onClick={changeCare} className={stl.filter}>
				Средства для загара
			</li>
			<li data-testid='care' onClick={changeCare} className={stl.filter}>
				Средства для бритья
			</li>
			<li data-testid='care' onClick={changeCare} className={stl.filter}>
				Подарочные наборы
			</li>
			<li data-testid='care' onClick={changeCare} className={stl.filter}>
				Гигиеническая продукция
			</li>
			<li data-testid='care' onClick={changeCare} className={stl.filter}>
				Гигиена полости рта
			</li>
			<li data-testid='care' onClick={changeCare} className={stl.filter}>
				Бумажная продукция
			</li>
		</ul>
	);
}

export default MainFilter;
