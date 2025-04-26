import React, { useEffect, useState } from 'react';
import { create } from '../../api/crud';
import { categories as getCategories } from '../../api/category';

export default function CreateBlog() {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        tags: '',
        long_text: '',
        category_id: '',
    });
    const [categories, setCategories] = useState();

    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setMessage("");

        const response = await create(formData, 'blog');

        if (response.errors) {
            setErrors(response.errors);
        } else if (response.message) {
            setMessage(response.message);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();

            if (response.message === 'Success') {
                setCategories(response.categories);
                setMessage(response.message);
            } else {
                setErrors(response.errors)
            }
        }
        fetchCategories();
    },[])

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Category</h2>
            {
                errors.map((err, idx) => (
                    <p key={idx} style={{ color: 'red' }}>{err.msg}</p>
                ))
            }
            {message && <p style={{ color: 'green' }}>{message}</p>}

            <input name='title' placeholder='Enter Title' type='text' onChange={handleChange} />
            <br />
            <input name='desc' placeholder='Enter Description' type='text' onChange={handleChange} />
            <br />
            <select name='category_id' onChange={handleChange} required>
                <option>Select Category</option>
                {
                    categories ? (
                        <>
                            {
                                categories.map((category, idx) => (
                                    <option key={idx} value={category.id}> {category.title} </option>
                                ))
                            }
                        </>
                    ) : ""
                }
            </select>
            <br />
            <textarea name='long_text' placeholder='Enter Content' onChange={handleChange}></textarea>
            <br />
            <textarea name='tags' placeholder='Enter Tags' onChange={handleChange}></textarea>
            <br />
            <button type='submit'>Create</button>
        </form>
    )
}