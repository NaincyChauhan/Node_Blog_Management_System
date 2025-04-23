import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { profile } from "../api/auth";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/userSlice';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import { getToken } from '../auth/token';
import CategoryPage from '../pages/category/CategoryPage';
import CreateCategory from '../pages/category/CreateCategory';
import EditCategory from '../pages/category/EditCategory';
import { ProtectedRoute, PublicRoute } from './ProtectedRoute';
import NotFound from '../pages/errors/NotFound';
import BlogsPage from '../pages/blog/BlogsPage';
import CreateBlog from '../pages/blog/CreateBlog';
import EditBlog from '../pages/blog/EditBlog';
import BlogPage from '../pages/blog/BlogPage';

function Router() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const token = getToken();

        if (token != null) {
            // Get user data
            const userData = async () => {
                const response = await profile();
                if (response.message === 'Success') {
                    dispatch(login({ data: response.data }))
                } else {
                    console.log("something went wrong:", response);
                }
            }
            userData();
        }
    }, [dispatch]);


    return (
        <Routes>
            {/* Public Routes */}
            <Route
                element={
                    <PublicRoute isAuthenticated={user.isAuthenticated} />
                }>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Route>


            {/* Protected Routes */}
            <Route
                element={
                    <ProtectedRoute isAuthenticated={user.isAuthenticated} />
                }>
                <Route path='/dashboard' element={<Dashboard />} />

                {/* Category Routes */}
                <Route path='/categories' element={<CategoryPage />} />
                <Route path='/categories/create' element={<CreateCategory />} />
                <Route path='/edit-category/:id' element={<EditCategory />} />

                {/* Blog Routes */}
                <Route path='/blogs' element={<BlogsPage />} />
                <Route path='/blog/create' element={<CreateBlog />} />
                <Route path='/blog/update/:id' element={<EditBlog />} />
                <Route path='/blog/view/:id' element={<BlogPage />} />
            </Route>

            {/* Page Not Found */}
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default Router;
