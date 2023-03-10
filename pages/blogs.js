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
import { useTranslation } from 'react-i18next'
import SelectBoxWidthSearch from '../components/Inputs/SelectBox'


const Blogs = () => {
    const { t, i18n } = useTranslation();
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
            return <button className='prevBtn'>{t("Pr??c??dent")}</button>;
        }
        if (type === 'next') {
            return <button className='nextBtn'>{t("Suivant")}</button>;
        }
        return originalElement;
    };


    return (
        <MainLayout navbar>
            <div className='lg:container mx-auto blogsPage px-4 xl:px-0 py-8'>
                <div className='flex gap-2 justify-center items-center py-4'>
                    <span>{t("Accueil")}</span> <RightIcon /> <button className='text-[#0094DA]' href="/faq">{t("Blog")}</button>
                </div>
                <div className='flex justify-center'>
                    <div className='lg:w-[40%]'>
                        <h1 className='bigTitle text-center py-3'>{t("Voir notre dernier blog")}</h1>
                    </div>
                </div>
                <div className='flex-nowrap justify-between items-center gap-8 mt-8'>
                    <div className='flex flex-wrap md:flex-nowrap gap-8'>
                        <BlogsSearch changeBlogId={(val) => console.log(val)} />
                        <div className='searchBox relative min-w-[200px] w-full'>
                            <label>{t("Trier par")}</label>
                            <br />
                            <select placeholder='Plus recent'>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </select>
                        </div>
                    </div>
                    <div className='hidden xl:flex gap-2 items-center filterBtn'>
                        <span>{t("Affichage")}</span>
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
                    <Col xs={24} lg={6} className="rtl:mt-8">
                        <div className='block lg:hidden'>
                            <SelectBoxWidthSearch data={specialitiesArray} prevValue={specialitiesArray[0].fr} handleUpdate={(value) => getLimitedBlogsByCategory(0, value)} placeholder="Cat??gorie" />
                        </div>
                        <div className='hidden lg:block'>
                            <h1 className='bigTitle text-start py-3'>{t("Cat??gories")}</h1>
                            <div className='mt-8 lg'>
                                {
                                    specialitiesArray && specialitiesArray?.length > 0 && specialitiesArray.map(cat => {
                                        return (
                                            <button className='catCard text-left my-4' onClick={() => getLimitedBlogsByCategory(0, cat.fr)}>
                                                <div className='name'>{i18n.language === "fr" ? cat?.fr : cat.ar}</div>
                                                <div className='count'>
                                                    <BlogCategory category={cat.fr} />
                                                </div>
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} lg={18} className="lg:pl-12 pt-8">
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
