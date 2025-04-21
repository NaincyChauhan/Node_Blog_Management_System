import React, {useState} from 'react';
import { register } from "../../api/auth";
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
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
        
        const response = await register(formData);

        if(response.errors) {
            setErrors(response.errors);
        } else if (response.message) {
            setMessage(response.message);
            navigate('/register');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {
                errors.map((err, idx) => (
                    <p key={idx} style={{ color: 'red'}}>{err.msg}</p>
                ))
            }
            {message && <p style={{ color: 'green'}}>{message}</p>}

            <input name='firstName' placeholder='First Name' type='text' onChange={handleChange} />
            <input name='lastName' placeholder='Last Name' type='text' onChange={handleChange} />
            <input name='email' placeholder='Email' type='email' onChange={handleChange} />
            <input name='password' placeholder='Password' type='password' onChange={handleChange} />
            <button type='submit'>Register</button>
        </form>
    )
}