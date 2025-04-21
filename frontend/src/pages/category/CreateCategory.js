import React, {useState} from 'react';
import { create } from '../../api/category';

export default function CreateCategory() {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
    });

    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setMessage("");
        
        const response = await create(formData);

        if(response.errors) {
            setErrors(response.errors);
        } else if (response.message) {
            setMessage(response.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Category</h2>
            {
                errors.map((err, idx) => (
                    <p key={idx} style={{ color: 'red'}}>{err.msg}</p>
                ))
            }
            {message && <p style={{ color: 'green'}}>{message}</p>}

            <input name='title' placeholder='Enter Title' type='text' onChange={handleChange} />
            <input name='desc' placeholder='Enter Description' type='text' onChange={handleChange} />
            <button type='submit'>Create</button>
        </form>
    )
}