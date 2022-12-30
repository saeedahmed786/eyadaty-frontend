import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Col, Pagination, Row } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BlogCategory from '../components/Blogs/BlogCategory'
import BlogsSearch from '../components/Blogs/BlogsSearch'
import BlogCard from '../components/Cards/BlogCard'
import DownloadApp from '../components/Home/downloadApp'
import Subscribe from '../components/Home/subscribe'
import MainLayout from '../components/Layouts/MainLayout'
import RightIcon from '../components/icons/righticon'
import { ErrorMessage } from '../components/Messages/messages'
import specialitiesArray from "../assets/specialities.json"


const Blogs = () => {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    const [current, setCurrent] = useState(1);
    const [totalBlogs, setTotalBlogs] = useState();
    const [categories, setCategories] = useState([]);
    const [gridCol, setGridCol] = useState(12);

    const getAllCategories = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/get`).then(res => {
            if (res.statusText === "OK") {
                setCategories(res.data);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }


    const getAllBlogs = async (curr) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/limited/${curr - 1}`).then(res => {
            if (res.statusText === "OK") {
                setBlogs(res.data.blogs);
                setTotalBlogs(res.data.count);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    const getLimitedBlogsByCategory = async (curr, cat) => {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/category/limited/${curr}`, { category: cat }).then(res => {
            if (res.statusText === "OK") {
                setBlogs(res.data.blogs);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    useEffect(() => {
        getAllBlogs(current);
        getAllCategories();

        return () => {

        }
    }, [])

    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return <button className='prevBtn'>Précédent</button>;
        }
        if (type === 'next') {
            return <button className='nextBtn'>Suivant</button>;
        }
        return originalElement;
    };


    return (
        <MainLayout navbar>
            <div className='blogsPage px-0 sm:px-24 py-8'>
                <div className='flex gap-2 justify-center items-center py-4'>
                    <span>Accueil</span> <RightIcon /> <button className='text-[#0094DA]' href="/faq">Blog</button>
                </div>
                <h1 className='bigTitle text-center py-3'>Voir notre  < br />dernier blog</h1>
                <div className='flex flex-wrap justify-between items-center gap-8 mt-8'>
                    <div className='flex gap-8'>
                        <BlogsSearch changeBlogId={(val) => console.log(val)} />
                        <div className='searchBox relative'>
                            <label>Trier par</label>
                            <br />
                            <select placeholder='Plus recent'>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center filterBtn'>
                        <span>Affichage</span>
                        <div>
                            <button className={`btn ${gridCol === 12 && "focused"}`} onClick={() => setGridCol(12)}>
                                <AppstoreOutlined />
                            </button>
                        </div>
                        <div>
                            <button className={`btn ${gridCol === 24 && "focused"}`} onClick={() => setGridCol(24)}>
                                <UnorderedListOutlined />
                            </button>
                        </div>
                    </div>
                </div>
                <Row>
                    <Col md={6}>
                        <h1 className='bigTitle text-center py-3'>Catégories</h1>
                        <div className='mt-8'>
                            {
                                specialitiesArray && specialitiesArray?.length > 0 && specialitiesArray.map(cat => {
                                    return (
                                        <button className='catCard text-left my-4' onClick={() => getLimitedBlogsByCategory(0, cat.fr)}>
                                            <div className='name'>{cat?.fr}</div>
                                            <div className='count'>
                                                <BlogCategory category={cat.fr} />
                                            </div>
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </Col>
                    <Col md={18} className="pl-12 pt-8">
                        <Row gutter={[23, 32]}>
                            {
                                blogs && blogs?.length > 0 && blogs.map(blog => {
                                    return (
                                        <Col md={gridCol}>
                                            <button className='w-full' onClick={() => router.push(`/blog/${blog._id}`)}>
                                                <BlogCard blog={blog} />
                                            </button>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <div className='paginationCon my-12'>
                            <Pagination total={totalBlogs} itemRender={itemRender} showSizeChanger={false} onChange={(curr) => { setCurrent(curr); console.log(curr); getAllBlogs(curr) }} />
                            {/* <Pagination total={500} itemRender={itemRender} showSizeChanger={false} /> */}
                        </div>
                    </Col>
                </Row>
            </div>
            <DownloadApp noMargin={true} />
            <Subscribe noMargin={true} />
        </MainLayout>
    )
}

export default Blogs
