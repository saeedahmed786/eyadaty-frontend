import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ErrorMessage } from '../../Messages/messages';

const BlogCategory = ({ category }) => {
    const [blogs, setBlogs] = useState("");

    const getLimitedBlogsByCategory = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/category/limited/0`, { category }).then(res => {
            if (res.statusText === "OK") {
                setBlogs(res.data.count);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    useEffect(() => {
        getLimitedBlogsByCategory();
        return () => {
        }
    }, []);

    return (
        <div>
            {blogs}
        </div>
    )
}

export default BlogCategory
