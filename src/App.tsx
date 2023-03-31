import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import СatalogPage from './pages/СatalogPage/СatalogPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import AdminPage from './pages/AdminPage/AdminPage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/catalog' element={<СatalogPage />} />
				<Route path='/' element={<Navigate to='/catalog' replace />} />
				<Route path='/product/:id' element={<ProductPage />} />
				<Route path='/cart' element={<CartPage />} />
				<Route path='/admin' element={<AdminPage />} />
			</Routes>
		</Router>
	);
}

export default App;
