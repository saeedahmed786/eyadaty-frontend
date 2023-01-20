import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Check from "../../assets/Checkmark.svg"
import Delete from "../../assets/Button.svg"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from 'swiper';
import { EnvironmentTwoTone, EyeTwoTone, HeartTwoTone, StarTwoTone } from '@ant-design/icons'
import DeleteModal from '../DeleteModal'
import formatStringNumbers from '../FormatNumbers'
import axios from 'axios'
import { ErrorMessage } from '../../components/Messages/messages'
import { isAuthenticated } from '../Auth/auth'
import { useRouter } from 'next/router';
import { Col, Row } from 'antd';

const SearchCard = ({ gridCol, favourite, page, removeFavourite }) => {
    const router = useRouter()
    const [swiperObj, setSwiperObj] = useState();
    const [favourites, setFavourites] = useState([]);

    const getFavourites = async (id) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/favourite/${id}`, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                setFavourites(res.data);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    useEffect(() => {
        getFavourites(page?._id)

        return () => {

        }
    }, []);

    return (
        <div className='SearchCard'>
            <div className='flex flex-wrap'>
                <div style={gridCol === 12 ? { minWidth: "228px", width: "100%" } : { maxWidth: "30%", width: "30%" }}>
                    <Swiper onSwiper={(swiper) => setSwiperObj(swiper)} pagination={true} modules={[Pagination]} className="mySwiper">
                        {
                            page && page?.pictures && page?.pictures?.map(picture => {
                                return (
                                    <SwiperSlide>
                                        <img className='object-contain' src={picture?.url} alt="Doctor" />
                                    </SwiperSlide>
                                )
                            })
                        }
                        {/* <SwiperSlide>
                            <Image src={Doc} alt="Doctor" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={Clinic} alt="Doctor" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={Clinic} alt="Doctor" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={Clinic} alt="Doctor" />
                        </SwiperSlide> */}
                    </Swiper>
                    <div className='thumbImages'>
                        <div>
                            {
                                page && page?.pictures && page?.pictures?.map((picture, index) => {
                                    return (
                                        <button onClick={() => swiperObj.slideTo(index)}>
                                            <img src={picture?.url} alt="Doctor" />
                                        </button>
                                    )
                                })
                            }
                            {/* <button onClick={() => swiperObj.slideTo(0)}>
                                <Image src={Doc} alt="Doctor" />
                            </button>
                            <button onClick={() => swiperObj.slideTo(1)}>
                                <Image src={Clinic} alt="Doctor" />
                            </button>
                            <button onClick={() => swiperObj.slideTo(2)}>
                                <Image src={Clinic} alt="Doctor" />
                            </button>
                            <button onClick={() => swiperObj.slideTo(3)}>
                                <Image src={Clinic} alt="Doctor" />
                            </button> */}
                        </div>
                    </div>
                </div>
                <div className='inner mt-4 rtl:pr-12' style={gridCol === 12 ? { paddingLeft: "0px", width: "100%" } : { paddingLeft: "15px", width: "70%" }}>
                    <div className='nameAndPic w-full flex justify-between rtl:pl-6 rtl:pr-0 pr-6'>
                        <button className='w-[80%]' onClick={() => router.push(`/doctor/${page._id}`)}>
                            <div className='flex items-center gap-2'>
                                <div className='profileImg'>
                                    <img src={page?.picture?.url} alt="Doctor" className="rounded-[50%] object-cover h-[32px] w-[36px]" />
                                </div>
                                <div className='w-full'>
                                    <div className='flex gap-2'>
                                        <h6>{page?.firstName}{page?.lastName}</h6>
                                        <Image src={Check} alt="Checkmark" />
                                    </div>
                                    <p className='mt-2 rtl:text-start text-left'>{page?.specialisation}</p>
                                </div>
                            </div>
                        </button>
                        {
                            favourite &&
                            <div>
                                <DeleteModal deleteFun={removeFavourite} id={page?._id} deleteBtn={<Image src={Delete} alt="Delete" />} />
                            </div>
                        }
                    </div>
                    <div className='flex mt-8 gap-1'>
                        <EnvironmentTwoTone />
                        <p className='w-full rtl:text-start text-left'>{page?.fullAddress}, {page?.city}, {page?.state}</p>
                    </div>
                    <div className='flex gap-2 mt-8 items-end'>
                        <button className='flex gap-1 items-center'>
                            <EyeTwoTone />
                            <span>{formatStringNumbers(page?.views?.length)}</span>
                        </button>
                        <button className='flex gap-1 items-center'>
                            <HeartTwoTone />
                            <span>{favourites.length}</span>
                        </button>
                        <button className='flex gap-1 items-center'>
                            <StarTwoTone />
                            <span>
                                {
                                    page?.recommendations?.length > 0 ? page?.recommendations?.length * 5 : 5 / page?.notrecommendations?.length > 0 ? page?.notrecommendations?.length : 1
                                }
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchCard
