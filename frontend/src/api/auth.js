import { getToken } from "../auth/token";

const API_URL = 'http://127.0.0.1:5000';

// Register new user
export const register = async ( userData) => {
    const res = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userData),
    });

    return res.json();
}


// Login User
export const login = async (credentials) => {
    const res = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    return res.json();
}

// Logout user
export const logout = async () => {
    await fetch(`${API_URL}/api/users/logout`, {
        method: 'GET',
        credentials: 'include',
    })
}

// dashbord
export const profile = async () => {
    const token = getToken();
    if(!token) return false;
    const res = await fetch(`${API_URL}/api/users/profile`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })

    return res.json();
}