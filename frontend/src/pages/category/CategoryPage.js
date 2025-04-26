import React, { useEffect, useState } from 'react';
import { destroy, views as getCategories } from '../../api/crud';
import { Link } from 'react-router-dom';

export default function CategoryPage() {
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");

    const deleteCategory = async (category_id) => {
        const response = await destroy(category_id, 'categories');

        if (response.errors) {
            setErrors(response.errors);
        } else if (response.message) {
            setMessage(response.message);
            const element = document.getElementById(`category${category_id}`);
            element ? element.remove() : console.log("something went wrong: To remove cateogry element.");
        }
    }

    useEffect(() => {
        const getCategoriesData = async () => {
            const response = await getCategories('categories');

            if (response.message === 'Success') {
                setCategories(response.categories);
                setMessage(response.message);
            } else {
                setErrors(response.errors)
            }
        }
        getCategoriesData();
    }, [])

    return (
        <div>

            {message && <p style={{ color: 'green' }}>{message}</p>}

            {
                errors.map((err, idx) => (
                    <p key={idx} style={{ color: 'red' }}>{err.msg}</p>
                ))
            }

            <div>
                <ul>
                    {
                        categories ? (
                            <>
                                {
                                    categories.map((category, idx) => (
                                        <li style={{ margin: '15px' }} key={idx} id={`category${category.id}`} >
                                            {category.title}
                                            <>
                                                <a
                                                    style={{
                                                        marginLeft: '5px',
                                                        cursor: 'pointer',
                                                        backgroundColor: 'red',
                                                        padding: '5px', color: 'white'
                                                    }} type='button'
                                                    href='#'
                                                    onClick={() => deleteCategory(category.id)}>
                                                    Delete
                                                </a>
                                                <Link
                                                    to={`/edit-category/${category.id}`}
                                                    style={{
                                                        marginLeft: '5px',
                                                        cursor: 'pointer',
                                                        backgroundColor: 'green',
                                                        padding: '5px',
                                                        color: 'white'
                                                    }}
                                                >
                                                    Update
                                                </Link>
                                            </>
                                        </li>
                                    ))

                                }
                            </>
                        ) : (
                            <>
                                No Data Found.
                            </>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}