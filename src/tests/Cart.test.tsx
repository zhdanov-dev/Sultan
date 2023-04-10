import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import СatalogPage from '../pages/СatalogPage/СatalogPage';
import ProductPage from '../pages/ProductPage/ProductPage';
import CartPage from '../pages/CartPage/CartPage';
import AdminPage from '../pages/AdminPage/AdminPage';

describe('cart tests', () => {
	test('add product to the cart', () => {
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
		localStorage.clear();
		fireEvent.click(screen.getAllByTestId('button-addtocart')[0]);
		fireEvent.click(screen.getByTestId('cart-link'));
		expect(screen.getByTestId('cart-product')).toBeInTheDocument();
	});

	test('add three products to the cart', () => {
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
		localStorage.clear();
		fireEvent.click(screen.getAllByTestId('product-link')[0]);
		fireEvent.click(screen.getByTestId('increment-span'));
		fireEvent.click(screen.getByTestId('increment-span'));
		fireEvent.click(screen.getByTestId('button-addtocart'));
		fireEvent.click(screen.getByTestId('cart-link'));
		expect(screen.getByTestId('product-countcart').textContent).toBe('3');
	});

	test('remove a product from the cart', () => {
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
		localStorage.clear();
		fireEvent.click(screen.getAllByTestId('button-addtocart')[0]);
		fireEvent.click(screen.getByTestId('cart-link'));
		fireEvent.click(screen.getByTestId('delete-product'));
		expect(screen.queryByTestId('product-countcart')).toBe(null);
	});
});
