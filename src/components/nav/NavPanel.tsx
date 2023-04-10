import stl from './NavPanel.module.scss';

interface NavPanelProps {
	currentCrumb: string
}

function NavPanel({currentCrumb}: NavPanelProps) {
	return (
		<ul className={stl.bread}>
			<li className={stl.crumb}>Главная</li>
			<li className={stl.crumb}>Косметика и гигиена</li>
			{currentCrumb === '' ? null : (
				<li data-testid='current-crumb' className={stl.crumb}>{currentCrumb}</li>
			)}
		</ul>
	);
}

export default NavPanel;
