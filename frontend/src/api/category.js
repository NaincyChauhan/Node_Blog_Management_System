import { getToken } from "../auth/token";

const API_URL = 'http://127.0.0.1:5000';

// Fetch Categories
export const categories = async () => {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/categories/views`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    return res.json();
}

// Create Category
export const create = async ( data ) => {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/categories/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    return res.json();
}

// Update Category
export const update = async ( data ) => {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/categories/update`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    return res.json();
}

// Update Category
export const destroy = async ( data ) => {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/categories/delete`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    return res.json();
}

// get Category
export const category = async ( data ) => {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/categories/show`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    return res.json();
}
