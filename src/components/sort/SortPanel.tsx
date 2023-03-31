import stl from './SortPanel.module.scss';

interface SortPanelProps {
	changeSort: React.ChangeEventHandler<HTMLSelectElement>;
}

function SortPanel({changeSort}: SortPanelProps) {
	return (
		<div className={stl.container}>
			<span>Сортировка:</span>
			<select onChange={changeSort} className={stl.sort} name='' id=''>
				<option value='a-z'>Название (А - Я)</option>
				<option value='z-a'>Название (Я - А)</option>
				<option value='min'>Сначала дешевые</option>
				<option value='max'>Сначала дорогие</option>
			</select>
		</div>
	);
}

export default SortPanel;
