import React, { useEffect, useState } from 'react';
import { destroy, blogs as getBlogs } from '../../api/blog';
import { Link } from 'react-router-dom';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");

    const deleteBlog = async (blog_id) => {
        const response = await destroy(blog_id);

        if (response.errors) {
            setErrors(response.errors);
        } else if (response.message) {
            setMessage(response.message);
            const element = document.getElementById(`blog${blog_id}`);
            element ? element.remove() : console.log("something went wrong: To remove blog element.");
        }
    }

    useEffect(() => {
        const getBlogsData = async () => {
            const response = await getBlogs();

            if (response.message === 'Success') {
                setBlogs(response.blogs);
                setMessage(response.message);
            } else {
                setErrors(response.errors)
            }
        }
        getBlogsData();
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
                        blogs ? (
                            <>
                                {
                                    blogs.map((blog, idx) => (
                                        <li style={{ margin: '15px' }} key={idx} id={`blog${blog.id}`} >
                                            {blog.title}
                                            <>
                                                <button
                                                    style={{
                                                        marginLeft: '5px',
                                                        cursor: 'pointer',
                                                        backgroundColor: 'red',
                                                        padding: '5px', color: 'white'
                                                    }} type='button'
                                                    onClick={() => deleteBlog(blog.id)}>
                                                    Delete
                                                </button>
                                                <Link
                                                    to={`/blog/update/${blog.id}`}
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
                                                <Link
                                                    to={`/blog/view/${blog.id}`}
                                                    style={{
                                                        marginLeft: '5px',
                                                        cursor: 'pointer',
                                                        backgroundColor: 'green',
                                                        padding: '5px',
                                                        color: 'white'
                                                    }}
                                                >
                                                    view
                                                </Link>
                                            </>
                                        </li>
                                    ))

                                }
                            </>
                        ) : (
                            <>
                                Data not found.
                            </>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}