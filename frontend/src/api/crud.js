import { getToken } from "../auth/token";

const API_URL = 'http://127.0.0.1:5000';

// View Model
export const views = async (route_) => {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/${route_}/views`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    return res.json();
}

// Create Model
export const create = async ( data, route_ ) => {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/${route_}/create`, {
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

// Update Model
export const update = async ( data, id, route_ ) => {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/${route_}/update/${id}`, {
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

// Update Model
export const destroy = async ( id, route_ ) => {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/${route_}/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    return res.json();
}

// Get Single Model
export const show = async ( id, route_ ) => {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/${route_}/show/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    return res.json();
}
