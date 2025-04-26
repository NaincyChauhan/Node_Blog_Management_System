import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { show } from "../../api/crud";


export default function BlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState();
    const [errors, setErrors] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        const getBlogData = async () => {
            const response = await show(id, 'blog');

            if (response.message === 'Success') {
                setBlog(response.blog);
                setMessage(response.message);
            } else {
                setErrors(response.errors);
            }
        }
        getBlogData();
    }, [id]);

    return (
        <div>
            {
                message ? (
                    <p style={{ color: 'green' }} >{message}</p>
                ) : (
                    errors && (
                        errors.map((error, idx) => (
                            <li style={{ color: 'red' }} >{error.msg}</li>
                        )
                        )
                    )
                )
            }
            <div>
                {
                    blog ? (
                        <>
                            <h5> <b>Title:</b> {blog.title}</h5>
                            <p> <b>Desc: </b>{blog.desc}</p>
                            <p> <b>Logn Text: </b> {blog.long_text}</p>
                            <small> <b>Tags: </b> {blog.tags}</small>
                        </>
                    ) : ("Blog Not Found.")
                }
            </div>
        </div>
    )
}