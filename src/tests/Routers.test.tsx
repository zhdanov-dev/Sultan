import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import СatalogPage from '../pages/СatalogPage/СatalogPage';
import ProductPage from '../pages/ProductPage/ProductPage';
import CartPage from '../pages/CartPage/CartPage';
import AdminPage from '../pages/AdminPage/AdminPage';

describe('render routes', () => {
	test('catalog to product route', () => {
		render(
			<MemoryRouter initialEntries={['/catalog']}>
				<Routes>
					<Route path='/catalog' element={<СatalogPage />} />
					<Route path='/product/:id' element={<ProductPage />} />
					<Route path='/cart' element={<CartPage />} />
					<Route path='/admin' element={<AdminPage />} />
				</Routes>
			</MemoryRouter>
		);
		const products = screen.getAllByTestId('product-link');
		fireEvent.click(products[0]);
		expect(screen.getByTestId('product-block')).toBeInTheDocument();
	});

	test('catalog to cart route', () => {
		render(
			<MemoryRouter initialEntries={['/catalog']}>
				<Routes>
					<Route path='/catalog' element={<СatalogPage />} />
					<Route path='/product/:id' element={<ProductPage />} />
					<Route path='/cart' element={<CartPage />} />
					<Route path='/admin' element={<AdminPage />} />
				</Routes>
			</MemoryRouter>
		);
		const cart = screen.getByTestId('cart-link');
		fireEvent.click(cart);
		expect(screen.getByTestId('cart-page')).toBeInTheDocument();
	});
});
