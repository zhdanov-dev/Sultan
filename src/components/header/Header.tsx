import stl from './Header.module.scss';
import logo from '../../static/svg/logo.svg';
import search from '../../static/svg/search.svg';
import call from '../../static/img/call.png';
import dash from '../../static/svg/dash.svg';
import bag from '../../static/svg/bag.svg';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
	countCart: string;
	costCart: string;
}

function Header({ countCart, costCart }: HeaderProps) {
	return (
		<header className={stl.container}>
			<div className={stl.leftside}>
				<img src={logo} alt='' />
				<NavLink data-testid='catalog-link' to={'/catalog'}>
					<button className={stl.button}>Каталог</button>
				</NavLink>

				<div className={stl.input}>
					<input className={stl.search} type='text' placeholder='Поиск...' />
					<img className={stl.icon} src={search} alt='' />
				</div>
			</div>
			<div className={stl.rightside}>
				<div className={stl.call}>
					<div className={stl.content}>
						<span className={stl.number}>+7 (777) 490-00-91</span>
						<span className={stl.time}>время работы: 9:00-20:00</span>
						<span className={stl.takecall}>Заказать звонок</span>
					</div>
					<img src={call} alt='' />
				</div>
				<img className={stl.dash} src={dash} alt='' />
				<button className={stl.button}>Прайс-лист</button>
				<img className={stl.dash} src={dash} alt='' />
				<NavLink data-testid='cart-link' to={'/cart'}>
					<div className={stl.bag}>
						<div className={stl.count}>
							<img src={bag} alt='' />
							<span>{countCart}</span>
						</div>

						<div className={stl.content}>
							<span className={stl.bags}>Корзина</span>
							<span className={stl.price}>
								{costCart}
								{' ₸'}
							</span>
						</div>
					</div>
				</NavLink>
			</div>
		</header>
	);
}

export default Header;
