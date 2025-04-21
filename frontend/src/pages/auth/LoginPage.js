import React, {useState} from 'react';
import { login } from "../../api/auth";
import { login as loginReducer } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { storeToken } from '../../auth/token';

export default function LoginPage() {
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({ email: "", password: ""});
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setMessage("");

        const response = await login(credentials);

        if(response.message){
            setMessage(response.message);
            storeToken(response.token)

            dispatch(loginReducer( response.data, response.token));
        }else{
            setErrors(['Invalid credentials or server error.']);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {
                errors.map((err,idx) => (
                    <p key={idx} style={{ color: 'red' }}>{err}</p>
                ))
            }
            {message && <p style={{ color: 'green' }}>{message}</p>}

            <input type='email' name='email' placeholder='Email' onChange={handleChange} />
            <input type='password' name='password' placeholder='Password' onChange={handleChange} />
            <button type='submit' >Login</button>
        </form>
    )
}