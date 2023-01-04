import React, { useRef } from 'react'
import LeftIcon from '../../components/icons/lefticon'
import RightIcon from '../../components/icons/righticon'
import { AiOutlineCalendar } from "react-icons/ai";
import Slider from 'react-slick'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';


export default function BlogList({ blogs }) {
    const { t } = useTranslation();
    const slickRef = useRef();
    const router = useRouter();

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap justify-between w-full sm:mb-20">
                        <div className="lg:w-1/2 rtl:md:w-auto w-full mb-6 lg:mb-0">
                            <p className='text-sitegreen rtl:md:text-start font-medium text-center sm:text-left'>{t("Notre blog")}</p>
                            <h1 className="bigTitle text-center sm:text-left">{t("Voir notre dernier blog")}</h1>
                        </div>
                        <div className='w-full sm:w-[auto] flex justify-center sm:justify-center gap-2 space-x-2 my-6 sm:my-0'>
                            <button onClick={() => slickRef.current?.slickPrev()}>
                                <div> <LeftIcon /> </div>
                            </button>
                            <button onClick={() => slickRef.current?.slickNext()} >
                                <div style={{ transform: "rotate(180deg)" }}> <LeftIcon /> </div>
                            </button>
                        </div>
                    </div>
                    {/* <div className="mb-6 lg:mb-0">
                            <p className='text-sitegreen font-medium'>Notre blog</p>
                            <h1 className="sm:text-3xl text-2xl lg:text-6xl lg:font-extrabold font-medium title-font mb-2 text-gray-900">Voir notre dernier blog</h1>
                        </div>
                        <div className='flex flex-row justify-center space-x-2   '>
                            <button onClick={() => slickRef.current?.slickPrev()}>
                                <div> <LeftIcon /> </div>
                            </button>
                            <button onClick={() => slickRef.current?.slickNext()} >
                                <div style={{ transform: "rotate(180deg)" }}> <LeftIcon /> </div>
                            </button>
                        </div> */}
                    {/* </div> */}
                    <div className={""}>
                        <Slider {...settings} ref={slickRef}>
                            {
                                blogs && blogs?.length > 0 && blogs.map(blog => {
                                    return (
                                        <Link href={`blog/${blog._id}`} className="rounded-[16px]">
                                            <div style={{ backgroundImage: `url(${blog?.picture?.url})` }} className={`bg-no-repeat h-[480px] blogInner bg-cover overflow-hidden backdrop-opacity-25`}>
                                                <div className={'h-[480px] px-4 py-5 rounded-lg'} style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                                                    <div className="flex flex-col justify-between h-full">
                                                        <div className={"bg-white text-dark__color text-sm  w-fit px-5 h-[30px] rounded-[8px] flex items-center"}>
                                                            {blog?.category}
                                                        </div>
                                                        <div className={""}>
                                                            <p className={"text-sm text-white flex items-center gap-1 pb-2"}>
                                                                <span><AiOutlineCalendar /></span>
                                                                {moment(blog?.createdAt).format("DD/MM/YYYY")}
                                                            </p>
                                                            <h5 className={"text-3xl text-white font-bond pb-4"}>{blog?.title}</h5>
                                                            <div className={'flex items-center gap-2'}>
                                                                <img alt='Blog' className={"object-cover w-[24px] h-[24px] rounded-[50%]"} src={blog?.user?.picture?.url} />
                                                                <span className={"text-white text-sm"}>{blog?.user?.fullName}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                            {
                                blogs && blogs?.length > 0 && blogs.map(blog => {
                                    return (
                                        <Link href={`blog/${blog._id}`}>
                                            <div style={{ backgroundImage: `url(${blog?.picture?.url})` }} className={`bg-no-repeat h-[480px] bg-cover overflow-hidden backdrop-opacity-25`}>
                                                <div className={'h-[480px] px-4 py-5'} style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '16px' }}>
                                                    <div className="flex flex-col justify-between h-full">
                                                        <div className={"bg-white text-dark__color text-sm  w-fit px-5 h-[30px] rounded-[8px] flex items-center"}>
                                                            {blog?.category}
                                                        </div>
                                                        <div className={""}>
                                                            <p className={"text-sm text-white flex items-center gap-1 pb-2"}>
                                                                <span><AiOutlineCalendar /></span>
                                                                {moment(blog?.createdAt).format("DD/MM/YYYY")}
                                                            </p>
                                                            <h5 className={"text-3xl text-white font-bond pb-4"}>{blog?.title}</h5>
                                                            <div className={'flex items-center gap-2'}>
                                                                <img alt='Blog' className={"object-cover w-[24px] h-[24px] rounded-[50%]"} src={blog?.user?.picture?.url} />
                                                                <span className={"text-white text-sm"}>{blog?.user?.fullName}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                            {
                                blogs && blogs?.length > 0 && blogs.map(blog => {
                                    return (
                                        <Link href={`blog/${blog._id}`}>
                                            <div style={{ backgroundImage: `url(${blog?.picture?.url})` }} className={`bg-no-repeat h-[480px] bg-cover overflow-hidden backdrop-opacity-25`}>
                                                <div className={'h-[480px] px-4 py-5'} style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '16px' }}>
                                                    <div className="flex flex-col justify-between h-full">
                                                        <div className={"bg-white text-dark__color text-sm  w-fit px-5 h-[30px] rounded-[8px] flex items-center"}>
                                                            {blog?.category}
                                                        </div>
                                                        <div className={""}>
                                                            <p className={"text-sm text-white flex items-center gap-1 pb-2"}>
                                                                <span><AiOutlineCalendar /></span>
                                                                {moment(blog?.createdAt).format("DD/MM/YYYY")}
                                                            </p>
                                                            <h5 className={"text-3xl text-white font-bond pb-4"}>{blog?.title}</h5>
                                                            <div className={'flex items-center gap-2'}>
                                                                <img alt='Blog' className={"object-cover w-[24px] h-[24px] rounded-[50%]"} src={blog?.user?.picture?.url} />
                                                                <span className={"text-white text-sm"}>{blog?.user?.fullName}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                    <div className='w-full flex justify-center mt-10'>
                        <div className="flex w-full md:justify-center justify-center items-end ">
                            <button onClick={() => router.push("/blogs")} className="text-white text-left bg-siteblue border-0 py-2 px-16 focus:outline-none hover:bg-sitegreen rounded-xl text-lg flex items-center gap-3">{t("Voir tous les articles")} <RightIcon />  </button>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}
