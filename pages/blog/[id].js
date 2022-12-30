import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import RightIcon from '../../components/icons/righticon'
import facebook from "../../assets/Facebook_icon.svg"
import twitter from "../../assets/Twitter_icon.svg"
import instagram from "../../assets/Instagram_icon.svg"
import link from "../../assets/Link_icon.svg"
import Image from 'next/image'
import Clinic from "../../assets/clinicimage1.png"
import SearchIcon from "../../assets/search.svg"
import SmallBlogCard from '../../components/Cards/SmallBlogCard'
import Doc from "../../assets/doc.jpg"
import CommentCard from '../../components/Cards/CommentCard'
import AddComment from '../../components/Cards/AddComment'
import DownloadApp from '../../components/Home/downloadApp'
import Subscribe from '../../components/Home/subscribe'
import MainLayout from '../../components/Layouts/MainLayout'
import axios from 'axios'
import { ErrorMessage } from '../../components/Messages/messages'
import { useRouter } from 'next/router'
import { isAuthenticated } from '../../components/Auth/auth'
import ReplyCommentCard from '../../components/Cards/ReplyCommentCard'
import Link from 'next/link'
import BlogsSearch from '../../components/Blogs/BlogsSearch'


const Blog = () => {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    const [blog, setBlog] = useState({});
    const [blogId, setBlogId] = useState("");
    const [comments, setComments] = useState([]);

    const getBlogById = async (id) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/get/${id}`).then(res => {
            if (res.statusText === "OK") {
                setBlog(res.data);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }


    const getAllBlogs = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`).then(res => {
            if (res.statusText === "OK") {
                setBlogs(res.data);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }


    const getAllComments = async (id) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/get/${id}`, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                setComments(res.data);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    useEffect(() => {
        setBlogId(window.location.pathname.split("blog/")[1])
        getAllBlogs();
        getBlogById(window.location.pathname.split("blog/")[1]);
        getAllComments(window.location.pathname.split("blog/")[1]);

        return () => {

        }
    }, [blogId])

    const filteredArray = blogs.filter((obj, index) => {
        // Check if there are any other objects in the array with the same value for the specified key
        return blogs.findIndex((otherObj) => otherObj?.category === obj?.category) === index;
    });

    return (
        <MainLayout navbar>
            <div className='Blog px-4 py-12 sm:px-24'>
                <Row gutter={[23, 23]}>
                    <Col md={16}>
                        <div className='flex gap-2 justify-start items-center py-4'>
                            <span>Accueil</span>
                            <RightIcon />
                            <button>Blog</button>
                            <RightIcon />
                            <button>Cardiologie</button>
                            <RightIcon />
                            <button className='text-[#0094DA]' href="/">{blog?.title}</button>
                        </div>
                        <h1 className='bigTitle'>
                            {blog?.title}
                        </h1>
                        <div className='py-12 socialCon flex gap-3 items-center'>
                            <div>Partagez cet article</div>
                            <div><Image src={facebook} alt="Facebook" width={32} /></div>
                            <div><Image src={twitter} alt="twitter" width={32} /></div>
                            <div><Image src={instagram} alt="instagram" width={32} /></div>
                            <div><Image src={link} alt="link" width={32} /></div>
                        </div>
                        <div className='blogDetails'>
                            <div className='mainImg'>
                                <img src={blog?.picture?.url} alt="Blog" />
                            </div>
                        </div>
                        <div className='mt-8'>
                            <div className='detailsText'>
                                <div dangerouslySetInnerHTML={{ __html: blog?.description }}></div>
                            </div>
                            {/* <p className='normalPara'>
                                Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad.  Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.
                            </p>
                            <h3>Une inflammation cutanée</h3>
                            <p className='normalPara'>
                                Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad.  Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.
                            </p>
                            <h3>Une pathologie très fréquente</h3>
                            <p className='normalPara'>
                                Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad.  Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.
                            </p>
                            <h3>Les symptômes</h3>
                            <p className='normalPara'>
                                Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad.  Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.
                            </p>
                            <h3>L’utilisation de substances irritantes</h3>
                            <p className='normalPara'>
                                Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad.  Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.
                            </p>
                            <div className='bg-[#F5F8FB] rounded-[8px] p-6 my-8'>
                                <p className='italic'>
                                    Bien se laver les mains
                                    Si votre enfant présente un érythème fessier, pensez à bien vous laver les mains avant de le changer et d’appliquer les soins. La peau peut être à vif et donc plus sensible aux bactéries extérieures que vous pourriez avoir sur les mains.
                                </p>
                            </div> */}
                            <h3>
                                A propos de lauteur
                            </h3>
                            <div className='flex namAndPic gap-4'>
                                <div>
                                    <img src={blog?.user?.picture?.url} alt='name' className='object-cover inline rounded-[50%] w-[71px] h-[71px]' />
                                </div>
                                <div>
                                    <strong>{blog?.user?.fullName}</strong>
                                    <p className='normalPara my-2'>{blog?.category}</p>
                                    <p className='normalPara mt-4'>{blog?.user?.bio}</p>
                                </div>
                            </div>
                            <div className='my-12'>
                                <h3>Commentaires</h3>
                                {
                                    comments?.length > 0 && comments.map(comment => {
                                        return (
                                            <>
                                                {
                                                    !comment.responseTo &&
                                                    <div className='my-8'>
                                                        <CommentCard pageId={blogId} comment={comment} handleUpdate={() => getAllComments(blogId)} />
                                                        <ReplyCommentCard pageId={blogId} parentId={comment?._id} comments={comments} handleUpdate={() => getAllComments(blogId)} />
                                                    </div>
                                                }
                                            </>
                                        )
                                    })
                                }
                                <div className='my-12'>
                                    <AddComment pageId={blogId} handleUpdate={() => getAllComments(blogId)} />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        {/* <div className='searchBox relative'>
                            <span>Chercher</span>
                            <br />
                            <input placeholder='Chercher...' />
                            <div className='absolute right-4 top-10'>
                                <Image src={SearchIcon} alt="Search" />
                            </div>
                        </div> */}
                        <BlogsSearch changeBlogId={(value) => setBlogId(value)} />
                        <div className='my-12 sm:my-8'>
                        <h3>Nos articles les plus lus</h3>
                            {
                                blogs && blogs?.length > 0 && blogs.filter(b => b._id !== blogId).slice(0, 6).map(blog => {
                                    return (
                                        <button onClick={() => { router.push(`/blog/${blog._id}`); setBlogId(blog._id) }}>
                                            <div className="mb-8">
                                                <SmallBlogCard blog={blog} />
                                            </div>
                                        </button>
                                    )
                                })
                            }
                            {/* <SmallBlogCard />
                            <SmallBlogCard /> */}
                        </div>
                        <div className='keywords px-4'>
                            <h3>
                                Mot clés
                            </h3>
                            <div className='flex flex-wrap items-center gap-2 mt-4'>
                                {
                                    filteredArray && filteredArray?.length > 0 && filteredArray.slice(0, 8).map(blog => {
                                        return (
                                            <Link href={`/blog/${blog._id}`} onClick={() => document.location.reload()}>
                                                <button>{blog?.category}</button>
                                            </Link>
                                        )
                                    })
                                }
                                {/* <button>Chirurgie esthétique</button>
                                <button>Cardiologie</button>
                                <button>Chirurgie dentaire</button> */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <DownloadApp noMargin={true} />
            <Subscribe noMargin={true} />
        </MainLayout>
    )
}

export default Blog
