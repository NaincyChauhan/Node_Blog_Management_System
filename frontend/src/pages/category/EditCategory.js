import React, {useEffect, useState} from 'react';
import { update, category as getCategory } from '../../api/category';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState();
    const [formData, setFormData] = useState({
        id: '',
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
        
        const response = await update(formData);

        if(response.errors) {
            setErrors(response.errors);
        } else if (response.message) {
            setMessage(response.message);
        }
    };

    useEffect(() => {
        if(id){
            const getCategoryData = async () => {
                const response = await getCategory({ id });

                if(response.errors){
                    setErrors(response.errors);
                }else{
                    setCategory(response.category);
                    setMessage(response.message);
                }
            }
            getCategoryData();
            formData.id= id;
        }
    },[id]);

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Category</h2>
            {
                errors.map((err, idx) => (
                    <p key={idx} style={{ color: 'red'}}>{err.msg}</p>
                ))
            }
            {message && <p style={{ color: 'green'}}>{message}</p>}

            <input name='title' placeholder='Enter Title' value={category?.name ? category.name : ""} type='text' onChange={handleChange} />
            <input name='desc' placeholder='Enter Description' value={category?.desc ? category.desc : ""} type='text' onChange={handleChange} />
            <button type='submit'>Create</button>
        </form>
    )
}