import stl from './Footer.module.scss';
import logo from '../../static/svg/logoW.svg';
import arrow from '../../static/svg/arrow.svg';
import watsapp from '../../static/svg/watsapp.svg';
import telegram from '../../static/svg/telegram.svg';
import visa from '../../static/svg/visa.svg';
import master from '../../static/svg/master.svg';

function Footer() {
	return (
		<footer className={stl.container}>
			<div className={stl.footer}>
				<div className={stl.logo}>
					<img src={logo} alt='' />
					<span className={stl.title}>
						Компания «Султан» — снабжаем розничные магазины товарами "под ключ"
						в Кокчетаве и Акмолинской области
					</span>
					<div>
						<span>Подпишись на скидки и акции</span>
						<div className={stl.input}>
							<input
								className={stl.email}
								type='email'
								placeholder='Введите ваш E-mail'
							/>
							<img className={stl.icon} src={arrow} alt='' />
						</div>
					</div>
				</div>
				<div className={stl.menu}>
					<span className={stl.title}>Меню сайта:</span>
					<nav>
						<a href='/'>О компании</a>
						<a href='/'>Доставка и оплата</a>
						<a href='/'>Возврат</a>
						<a href='/'>Контакты</a>
					</nav>
				</div>
				<div className={stl.catigories}>
					<span className={stl.title}>Категории:</span>
					<nav>
						<a href='/'>Бытовая химия</a>
						<a href='/'>Косметика и гигиена</a>
						<a href='/'>Товары для дома</a>
						<a href='/'>Товары для детей и мам</a>
						<a href='/'>Посуда</a>
					</nav>
				</div>
				<div className={stl.price}>
					<span className={stl.title}>Скачать прайс-лист:</span>
					<button className={stl.button}>Прайс-лист</button>
					<div className={stl.mess}>
						<span>Связь в мессенджерах:</span>
						<div>
							<img src={watsapp} alt='' />
							<img src={telegram} alt='' />
						</div>
					</div>
				</div>
				<div className={stl.contacts}>
					<span className={stl.title}>Контакты:</span>
					<div className={stl.call}>
						<span className={stl.number}>+7 (777) 490-00-91</span>
						<span className={stl.time}>время работы: 9:00-20:00</span>
						<span className={stl.getCall}>Заказать звонок</span>
					</div>
					<div className={stl.contact}>
						<span className={stl.email}>opt.sultan@mail.ru</span>
						<span className={stl.subtitle}>На связи в любое время</span>
					</div>
					<div className={stl.cards}>
						<img src={visa} alt='' />
						<img src={master} alt='' />
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
