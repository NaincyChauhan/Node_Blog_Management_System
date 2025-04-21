import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { profile } from "./api/auth";
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/slices/userSlice';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { getToken } from './auth/token';
import CategoryPage from './pages/category/CategoryPage';
import CreateCategory from './pages/category/CreateCategory';
import EditCategory from './pages/category/EditCategory';

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const token = getToken();
        // manage expire

        if (token != null) {
            // Get user data
            const userData = async () => {
                const response = await profile();
                if (response.message === 'Success') {
                    dispatch(login({data: response.data}))
                } else {
                    console.log("something went wrong:", response);
                }
            }
            userData();
        }
    }, [dispatch]);


    return (
        <Routes>
            {
                user.isAuthenticated ? (
                    <>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/categories' element={<CategoryPage />} />
                        <Route path='/categories/create' element={<CreateCategory />} />
                        <Route path='/edit-category/:id' element={<EditCategory />} />
                    </>
                ) : (
                    <>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                    </>
                )
            }
        </Routes>
    );
}

export default App;
