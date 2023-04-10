import stl from './Subheader.module.scss';
import location from '../../static/svg/location.svg';
import mail from '../../static/svg/mail.svg';
import dash from '../../static/svg/dash.svg';

function Subheader() {
	return (
		<header className={stl.container}>
			<div className={stl.leftside}>
				<div className={stl.location}>
					<img src={location} alt='location' />
					<div className={stl.content}>
						<span className={stl.content__main}>
							г. Кокчетав, ул. Ж. Ташенова 129Б
						</span>
						<span className={stl.content__sub}>(Рынок Восточный)</span>
					</div>
				</div>
				<img className={stl.dash} src={dash} alt='dash' />
				<div className={stl.mail}>
					<img src={mail} alt='email' />
					<div className={stl.content}>
						<span className={stl.content__main}>opt.sultan@mail.ru</span>
						<span className={stl.content__sub}>На связи в любое время</span>
					</div>
				</div>
			</div>
			<div className={stl.rightside}>
				<nav className={stl.navbar}>
					<a className={stl.navlink} href='/'>
						О компании
					</a>
					<img className={stl.dash} src={dash} alt='' />
					<a className={stl.navlink} href='/'>
						Доставка и оплата
					</a>
					<img className={stl.dash} src={dash} alt='' />
					<a className={stl.navlink} href='/'>
						Возврат
					</a>
					<img className={stl.dash} src={dash} alt='' />
					<a className={stl.navlink} href='/'>
						Контакты
					</a>
				</nav>
			</div>
		</header>
	);
}

export default Subheader;
