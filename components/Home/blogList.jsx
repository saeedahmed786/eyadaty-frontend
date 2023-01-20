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
        // speed: 500,
        // slidesToShow: 1,
        // slidesToScroll: 1,
        // initialSlide: 1,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    };


    return (
        <div>
            <section className="text-gray-600 body-font blogList">
                <div className="lg:container px-5 py-[80px] mx-auto">
                    <div className="flex flex-wrap justify-between w-full sm:mb-[48px]">
                        <div className="lg:w-[80%] rtl:md:w-auto w-full sm:w-auto mb-6 lg:mb-0">
                            <p className='text-[16px]  text-[#93C01F] font-[500]  text-center rtl:md:text-start sm:text-left'>{t("Notre blog")}</p>
                            <h1 className="bigTitle text-center sm:text-left">{t("Voir notre dernier blog")}</h1>
                        </div>
                        <div className='w-full md:w-auto flex justify-center sm:justify-center gap-[17px] my-6 sm:my-0'>
                            <button onClick={() => slickRef.current?.slickPrev()}>
                                <div> <LeftIcon /> </div>
                            </button>
                            <button onClick={() => slickRef.current?.slickNext()} >
                                <div style={{ transform: "rotate(180deg)" }}> <LeftIcon /> </div>
                            </button>
                        </div>
                    </div>
                    {/* <div className="mb-6 lg:mb-0">
                            <p className='text-[#93C01F] font-medium'>Notre blog</p>
                            <h1 className="sm:text-3xl text-2xl lg:text-6xl lg:font-extrabold font-medium title-font mb-2 text-[#333B42]">Voir notre dernier blog</h1>
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
                    <div>
                        <Slider {...settings} ref={slickRef}>
                            {
                                blogs && blogs?.length > 0 && blogs.map(blog => {
                                    return (
                                        <div>
                                            <Link href={`blog/${blog._id}`} className="rounded-[16px]">
                                                <div style={{ backgroundImage: `url(${blog?.picture?.url})` }} className={`bg-no-repeat h-[480px] blogInner bg-cover overflow-hidden backdrop-opacity-25`}>
                                                    <div className={'h-[480px] p-[20px] rounded-lg'} style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                                                        <div className="flex flex-col justify-between h-full">
                                                            <div className={"bg-white text-[#1C2126] tracking-wide text-[16px] font-[500] w-fit px-[12px] h-[30px] rounded-[8px] flex items-center"}>
                                                                {blog?.category}
                                                            </div>
                                                            <div className={""}>
                                                                <p className={"text-[16px] font-[400] text-white leading-[16px] flex items-center gap-[5px] pb-[8px] tracking-wide"}>
                                                                    <span><AiOutlineCalendar /></span>
                                                                    {moment(blog?.createdAt).format("DD/MM/YYYY")}
                                                                </p>
                                                                <h5 className={"text-[32px] text-white font-[700] leading-[40px] pb-[18px]"}>{blog?.title}</h5>
                                                                <div className={'flex items-center gap-2'}>
                                                                    <img alt='Blog' className={"object-cover w-[24px] h-[24px] rounded-[50%]"} src={blog?.user?.picture?.url} />
                                                                    <span className={"text-white text-sm"}>{blog?.user?.fullName}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
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
                                                        <div className={"bg-white text-[#1C2126]  text-sm  w-fit px-5 h-[30px] rounded-[8px] flex items-center"}>
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
                                                        <div className={"bg-white text-[#1C2126]  text-sm  w-fit px-5 h-[30px] rounded-[8px] flex items-center"}>
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
                    <div className='w-full flex justify-center mt-[48px]'>
                        <div className="flex w-full md:justify-center justify-center items-end">
                            <button onClick={() => router.push("/blogs")} className="text-white text-left bg-[#0094DA] border-0 px-[12px] h-[48px] focus:outline-none hover:bg-[#93C01F] rounded-[12px] text-[16px] font-[500] flex items-center gap-[11px]">{t("Voir tous les articles")} <RightIcon />  </button>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}
