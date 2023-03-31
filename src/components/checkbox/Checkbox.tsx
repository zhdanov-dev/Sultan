import stl from './Checkbox.module.scss';

interface CheckboxProps {
	fabric: string;
	count: number;
	changeCheckbox: React.ChangeEventHandler<HTMLInputElement>;
}

function Chechbox({ fabric, count, changeCheckbox }: CheckboxProps) {
	return (
		<div className={stl.checkbox}>
			<div>
				<input
					onChange={changeCheckbox}
					value={fabric}
					type='checkbox'
					id={stl.cbx}
					className={stl.inp}
				/>
				<label htmlFor={stl.cbx} className={stl.check}>
					<svg width='10px' height='10px' viewBox='0 0 18 18'>
						<path d='M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z'></path>
						<polyline points='1 9 7 14 15 4'></polyline>
					</svg>
				</label>
			</div>
			<div>
				<span className={stl.fab}>{fabric}</span>
				<span className={stl.count}>({count})</span>
			</div>
		</div>
	);
}

export default Chechbox;