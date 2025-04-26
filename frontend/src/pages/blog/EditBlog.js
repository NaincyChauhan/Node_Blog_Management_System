import React, { useEffect, useState } from 'react';
import { show, update } from '../../api/crud';
import { categories as getCategories } from '../../api/category';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
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

        const response = await update(formData, id, 'blog');

        if (response.errors) {
            setErrors(response.errors);
        } else if (response.message) {
            setMessage(response.message);
            navigate('/blogs');
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

        const fetchBlog = async () => {
            const response = await show(id, 'blog');

            if (response.message === 'Success') {
                setMessage(response.success);
                const blog = response.blog;
                
                setFormData({
                    title: blog.title,
                    desc: blog.desc,
                    tags: blog.tags,
                    long_text: blog.long_text,
                    category_id: blog.category_id,
                });
            } else {
                setErrors(response.errors);
            }
        }
        fetchCategories();
        fetchBlog();
    }, [id])

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Category</h2>
            {
                errors.map((err, idx) => (
                    <p key={idx} style={{ color: 'red' }}>{err.msg}</p>
                ))
            }
            {message && <p style={{ color: 'green' }}>{message}</p>}

            <input name='title' placeholder='Enter Title' type='text' value={formData.title} onChange={handleChange} />
            <br />
            <input name='desc' placeholder='Enter Description' type='text' value={formData.desc} onChange={handleChange} />
            <br />
            <select name='category_id' value={formData.category_id} onChange={handleChange} required>
                <option>Select Category</option>
                {
                    categories ? (
                        <>
                            {
                                categories.map((category, idx) => (
                                    <option  key={idx} value={category.id}>
                                        {category.title}
                                    </option>
                                ))
                            }
                        </>
                    ) : ""
                }
            </select>
            <br />
            <textarea name='long_text' placeholder='Enter Content' value={formData.long_text} onChange={handleChange}></textarea>
            <br />
            <textarea name='tags' placeholder='Enter Tags' value={formData.tags} onChange={handleChange}></textarea>
            <br />
            <button type='submit'>Update</button>
        </form>
    )
}