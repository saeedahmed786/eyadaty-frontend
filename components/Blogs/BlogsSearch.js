import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import SearchIcon from "../../assets/search.svg"

const BlogsSearch = ({ changeBlogId }) => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [results, setResults] = useState([]);

    const search = (searchTerm) => {
        return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/search?term=${searchTerm}`);
    }


    const handleSearch = (value) => {
        search(value).then((response) => {
            setResults(response.data);
        });
    }

    return (
        <div className='searchBox relative z-1000' onMouseLeave={() => setShow(false)} >
            <div>
                <label>Chercher</label>
                <br />
                <input placeholder='Chercher...' onClick={() => setShow(true)} onChange={(e) => { handleSearch(e.target.value); setShow(true) }} />
                <div className='absolute right-4 top-10'>
                    <Image src={SearchIcon} alt="Search" />
                </div>
                {
                    show &&
                    <div className='results absolute w-full p-4 shadow-sm bg-white' style={{ zIndex: "1000" }}>
                        {
                            results?.length > 0 ? results.map(res => {
                                return (
                                    <div>
                                        <button onClick={() => { router.push(`/blog/${res._id}`); changeBlogId(res._id) }} className='text-[16px]'>
                                            {res.title}
                                        </button>
                                    </div>
                                )
                            })
                                :
                                <div className=''>No Blogs Found!</div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default BlogsSearch
