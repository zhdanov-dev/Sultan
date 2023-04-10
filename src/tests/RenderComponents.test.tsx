import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Subheader from '../components/subheader/Subheader';
import Header from '../components/header/Header';
import { MemoryRouter } from 'react-router-dom';
import NavPanel from '../components/nav/NavPanel';
import SortPanel from '../components/sort/SortPanel';
import { ChangeEvent } from 'react';
import MainFilter from '../components/filter/MainFilter';

describe('render components', () => {
	test('render subheader', () => {
		render(<Subheader />);
		expect(
			screen.getByAltText(/location/i)
		).toBeInTheDocument();
		expect(
			screen.getByAltText(/dash/i)
		).toBeInTheDocument();
		expect(
			screen.getByAltText(/email/i)
		).toBeInTheDocument();
		expect(
			screen.getByText(/г. Кокчетав, ул. Ж. Ташенова 129Б/i)
		).toBeInTheDocument();
		expect(
			screen.getByText(/(Рынок Восточный)/i)
		).toBeInTheDocument();
		expect(
			screen.getByText(/opt.sultan@mail.ru/i)
		).toBeInTheDocument();
		expect(
			screen.getByText(/На связи в любое время/i)
		).toBeInTheDocument();
		expect(screen.getByText(/О компании/i)).toBeInTheDocument();
		expect(screen.getByText(/Доставка и оплата/i)).toBeInTheDocument();
		expect(screen.getByText(/Возврат/i)).toBeInTheDocument();
		expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
	});

	test('render header', () => {
		const costCart = '200'
		const countCart = '2'
		render(
			<MemoryRouter>
				<Header countCart={countCart} costCart={costCart} />
			</MemoryRouter>
		);
		expect(screen.getByTestId('catalog-link')).toBeInTheDocument();
		expect(screen.getByTestId('cart-link')).toBeInTheDocument();
		expect(screen.getByText(`${countCart}`)).toBeInTheDocument();
		expect(screen.getByText(`${costCart} ₸`)).toBeInTheDocument();
	});

	test('render navpanel', () => {
		const currentCrumb = 'Товар';
		render(
			<MemoryRouter>
				<NavPanel currentCrumb={currentCrumb} />
			</MemoryRouter>
		);
		expect(screen.getByTestId('current-crumb')).toBeInTheDocument();
		expect(screen.getByTestId('current-crumb').textContent).toBe(currentCrumb);
	});

	test('render sortpanel', () => {
		render(
			<MemoryRouter>
				<SortPanel changeSort={() => {}}/>
			</MemoryRouter>
		);
		expect(screen.getByTestId('select')).toBeInTheDocument();
	});

	test('render mainfilter', () => {
		render(
			<MemoryRouter>
				<MainFilter changeCare={() => {}}/>
			</MemoryRouter>
		);
		expect(screen.getAllByTestId('care').length).toBe(11)
	});
});
