import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import RightIcon from '../../components/icons/righticon'
import Check from "../../assets/Checkmark.svg"
import Image from 'next/image'
import cap from "../../assets/graduationcap.svg"
import services from "../../assets/cross.case.svg"
import building from "../../assets/building 1.svg"
import timeClock from "../../assets/Time Circle.svg"
import calendar from "../../assets/Calendar.svg"
import notes from "../../assets/Document.svg"
import Facebook from "../../assets/Facebook-blue.svg"
import Twitter from "../../assets/Twitter_blue.svg"
import Instagram from "../../assets/Instagram_blue.svg"
import Messenger from "../../assets/Messenger_blue.svg"
import Doc from "../../assets/doc.jpg"
import Boomark from "../../assets/Bookmark.svg"
import Link from "../../assets/link.svg"
import Send from "../../assets/Send.svg"
import Message from "../../assets/Message.svg"
import specialitiesArray from "../../assets/specialities.json"
import CommentCard from '../../components/Cards/CommentCard'
import AddComment from '../../components/Cards/AddComment'
import { DislikeFilled, DislikeOutlined, EnvironmentTwoTone, EyeTwoTone, HeartTwoTone, LikeFilled, LikeOutlined, MessageTwoTone, StarTwoTone } from '@ant-design/icons'
import Phone from '../../components/icons/Phone'
import MainLayout from '../../components/Layouts/MainLayout'
import axios from 'axios'
import { ErrorMessage, SuccessMessage } from '../../components/Messages/messages'
import { isAuthenticated } from '../../components/Auth/auth'
import formatStringNumbers from '../../components/FormatNumbers'
import ReplyCommentCard from '../../components/Cards/ReplyCommentCard'
import { Loading } from '../../components/Loading/Loading'
import LocationComp from '../../components/Location'
import { useTranslation } from 'react-i18next'
import StarIcon from '../../components/icons/staricon'
import EyeIcon from '../../components/icons/EyeIcon'
import CommentIcon from '../../components/icons/CommentIcon'
import DislikeIcon from '../../components/icons/DislikeIcon'
import LikeIcon from '../../components/icons/LikeIcon'


const IndDoctor = () => {
    const { t, i18n } = useTranslation();
    const [userId, setUserId] = useState("")
    const [clinic, setClinic] = useState({});
    const [comments, setComments] = useState([]);
    const [pageId, setPageId] = useState("");
    const [favouriteAdded, setFavouriteAdded] = useState();
    const [favourites, setFavourites] = useState([]);
    const [recommended, setRecommended] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gpsDataLoading, setgpsDataLoading] = useState(true);
    const [notRecommended, setNotRecommended] = useState(false);

    const getClinic = async (id) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/get/${id}`).then(res => {
            if (res.statusText === "OK") {
                setClinic(res.data);
                // setGpsData(clinic?.gpsData?.replace(/\s+/g, '').split(",")[0], clinic?.gpsData?.replace(/\s+/g, '').split(",")[1])
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const updateView = async (id) => {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/views/${id}`, { userId: isAuthenticated()._id }, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                // SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

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

    const getFavourites = async (id) => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/favourite/${id}`, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            setLoading(false);
            // setFavouriteAdded(res.data.filter(f => f.page._id === id));
            if (res.statusText === "OK") {
                setFavourites(res.data);
                setFavouriteAdded(res.data.filter(f => f.page._id === id).length > 0);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    useEffect(() => {
        setUserId(isAuthenticated()._id)
        setPageId(window.location.pathname.split("doctor/")[1])
        getClinic(window.location.pathname.split("doctor/")[1]);
        updateView(window.location.pathname.split("doctor/")[1]);
        getAllComments(window.location.pathname.split("doctor/")[1]);
        setRecommended(clinic?.recommendations?.includes(isAuthenticated()._id))
        setNotRecommended(clinic?.notrecommendations?.includes(isAuthenticated()._id))
        getFavourites(window.location.pathname.split("doctor/")[1])

        return () => {

        }
    }, []);


    const recommendClinic = async () => {
        setRecommended(true);
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/recommend/${pageId}`, { id: "" }, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                // SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const handleAddToFavourite = async () => {
        setFavouriteAdded(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/favourite/add/${pageId}`, { id: "" }, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const removeFavourite = async () => {
        setFavouriteAdded(false);
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/delete/favourite/${pageId}`, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const removeRecommendation = async () => {
        setRecommended(false);
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/remove/recommend/${pageId}`, { id: "" }, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                // SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const notRecommendClinic = async () => {
        setNotRecommended(true);
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/notrecommend/${pageId}`, { id: "" }, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                // SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const removeNotRecommendation = async () => {
        setNotRecommended(false);
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/remove/notrecommend/${pageId}`, { id: "" }, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                // SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };


    const handleFavourites = () => {
        if (isAuthenticated()) {
            favouriteAdded ? removeFavourite() : handleAddToFavourite()
        } else {
            ErrorMessage("Please login first");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setgpsDataLoading(false);
        }, 2000);

        return () => {

        }
    }, [])

    let tod = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', timeZone: 'UTC' }).format(new Date());
    const filterFirstSpec = specialitiesArray?.filter(f => f.fr === clinic?.specialisation)[0];

    return (
        <MainLayout navbar>
            <div className='DoctorDetails px-4 py-12 pt-[80px] xl:px-24'>
                <div>
                    <div>
                        {
                            loading ?
                                <Loading />
                                :
                                <>
                                    <div className='flex gap-2 justify-start items-center pb-[40px]'>
                                        <span>{t("Accueil")}</span>
                                        <RightIcon />
                                        <button>{t("Cliniques")}</button>
                                        <RightIcon />
                                        <button>{i18n.language === "fr" ? filterFirstSpec?.fr : filterFirstSpec?.ar}</button>
                                        <RightIcon />
                                        <button className='text-[#0094DA]'>{clinic?.firstName} {clinic?.lastName}</button>
                                    </div>
                                    <div className='flex justify-between flex-wrap'>
                                        <div>
                                            <div className='nameAndPic flex items-center gap-2'>
                                                <div className='profileImg'>
                                                    <Image src={Doc} alt="Doctor" width={41} height={41} className="rounded-[50%]" />
                                                </div>
                                                <div className='w-full'>
                                                    <div className='flex gap-3'>
                                                        <h1 className='bigTitle'>{clinic?.firstName} {clinic?.lastName}</h1>
                                                        <Image src={Check} width="40px" alt="Checkmark" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='iconsContainter my-4 sm:my-0'>
                                            <div className={` ${favouriteAdded ? "bg-[#0094DA] text-[white]" : "text-[#0094DA]"}`}>
                                                <button onClick={handleFavourites}>
                                                    {/* <Image src={Heart} width="20px" alt="Heart" /> */}
                                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2345 1.03912C11.8605 0.0111182 14.0205 -0.272882 15.8865 0.325118C19.9455 1.63412 21.2055 6.05912 20.0785 9.58012C18.3395 15.1101 10.9125 19.2351 10.5975 19.4081C10.4855 19.4701 10.3615 19.5011 10.2375 19.5011C10.1135 19.5011 9.99047 19.4711 9.87847 19.4101C9.56547 19.2391 2.19247 15.1751 0.395468 9.58112C0.394468 9.58112 0.394468 9.58012 0.394468 9.58012C-0.733532 6.05812 0.522469 1.63212 4.57747 0.325118C6.48147 -0.290882 8.55647 -0.0198818 10.2345 1.03912ZM5.03747 1.75312C1.75647 2.81112 0.932468 6.34012 1.82347 9.12312C3.22547 13.4851 8.76447 17.0121 10.2365 17.8851C11.7135 17.0031 17.2925 13.4371 18.6495 9.12712C19.5405 6.34112 18.7135 2.81212 15.4275 1.75312C13.8355 1.24212 11.9785 1.55312 10.6965 2.54512C10.4285 2.75112 10.0565 2.75512 9.78647 2.55112C8.42847 1.53012 6.65447 1.23112 5.03747 1.75312ZM14.4675 3.73902C15.8305 4.18002 16.7855 5.38702 16.9025 6.81402C16.9355 7.22702 16.6285 7.58902 16.2155 7.62202C16.1945 7.62402 16.1745 7.62502 16.1535 7.62502C15.7665 7.62502 15.4385 7.32802 15.4065 6.93602C15.3405 6.11402 14.7905 5.42002 14.0075 5.16702C13.6125 5.03902 13.3965 4.61602 13.5235 4.22302C13.6525 3.82902 14.0715 3.61502 14.4675 3.73902Z" fill="currentColor" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div>
                                                <Image src={Boomark} width="20px" alt="Bookmart" />
                                            </div>
                                            <div>
                                                <Image src={Link} width="20px" alt="link" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='icons flex flex-wrap gap-[26px] mt-[24px] items-center'>
                                        <button className='flex gap-[5px] items-center'>
                                            <EyeIcon />
                                            <span>{formatStringNumbers(clinic?.views?.length)}</span>
                                        </button>
                                        <button className='flex gap-[5px] items-center'>
                                            <svg width="15" height="13" viewBox="0 0 15 13" fill="#0094DA" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.65656 0.692669C8.74056 0.00733582 10.1806 -0.181998 11.4246 0.216669C14.1306 1.08934 14.9706 4.03934 14.2192 6.38667C13.0599 10.0733 8.10856 12.8233 7.89856 12.9387C7.82389 12.98 7.74122 13.0007 7.65856 13.0007C7.57589 13.0007 7.49389 12.9807 7.41922 12.94C7.21056 12.826 2.29522 10.1167 1.09722 6.38734C1.09656 6.38734 1.09656 6.38667 1.09656 6.38667C0.344556 4.03867 1.18189 1.088 3.88522 0.216669C5.15456 -0.193998 6.53789 -0.0133309 7.65656 0.692669ZM4.19189 1.16867C2.00456 1.874 1.45522 4.22667 2.04922 6.082C2.98389 8.99 6.67656 11.3413 7.65789 11.9233C8.64256 11.3353 12.3619 8.958 13.2666 6.08467C13.8606 4.22734 13.3092 1.87467 11.1186 1.16867C10.0572 0.828002 8.81922 1.03534 7.96456 1.69667C7.78589 1.834 7.53789 1.83667 7.35789 1.70067C6.45256 1.02 5.26989 0.820669 4.19189 1.16867ZM10.4786 2.4926C11.3872 2.7866 12.0239 3.59127 12.1019 4.5426C12.1239 4.81794 11.9192 5.05927 11.6439 5.08127C11.6299 5.0826 11.6166 5.08327 11.6026 5.08327C11.3446 5.08327 11.1259 4.88527 11.1046 4.62394C11.0606 4.07594 10.6939 3.61327 10.1719 3.4446C9.90856 3.35927 9.76456 3.07727 9.84922 2.81527C9.93522 2.5526 10.2146 2.40994 10.4786 2.4926Z" fill="#0094DA" />
                                            </svg>
                                            <span>{favourites?.length}</span>
                                        </button>
                                        <div className='flex gap-[8px] items-center'>
                                            <button className='flex gap-[5px] items-center'>
                                                <span className='text-[#0094DA]'><StarIcon /></span>
                                                <span>{
                                                    clinic?.recommendations?.length > 0 ? clinic?.recommendations?.length * 5 : 5 / clinic?.notrecommendations?.length > 0 ? clinic?.notrecommendations?.length : 1
                                                }
                                                </span>
                                            </button>
                                            <button className='flex gap-[5px] items-center text-[#0094DA]'>
                                                ({clinic?.recommendations?.length + clinic?.notrecommendations?.length} {t("Avis")})
                                            </button>
                                        </div>
                                        <a href='#commentSection' className='flex gap-[5px] items-center w-full sm:w-auto'>
                                            <CommentIcon />
                                            <span>{comments.length} {t("Commentaires")}</span>
                                        </a>
                                    </div>
                                    <Row gutter={[15, 15]} className='imagesContainer mt-12'>
                                        <Col md={10} className='mainImg'>
                                            <img src={clinic?.pictures && clinic?.pictures[0]?.url} alt="Doctor" className='max-h-[524px] w-full object-cover' />
                                        </Col>
                                        <Col md={14} className='smallImages flex flex-wrap items-start gap-4'>
                                            <Row wrap gutter={[15, 15]}>
                                                {
                                                    clinic?.pictures && clinic.pictures?.map((pic, index) => {
                                                        return (
                                                            index > 0 &&
                                                            <Col>
                                                                <img src={pic?.url} alt="Doctor" className='w-full' />
                                                            </Col>
                                                        )
                                                    })
                                                }
                                                {/* <Col>
                                        <Image src={Doc} alt="Doctor" />
                                    </Col>
                                    <Col>
                                        <Image src={Doc} alt="Doctor" />
                                    </Col>
                                    <Col>
                                        <Image src={Doc} alt="Doctor" />
                                    </Col> */}
                                            </Row>
                                        </Col>
                                    </Row>
                                    <div className='likeContantainer'>
                                        <div>
                                            <p className='normalPara'>{t("D'après votre expérience, recommandez-vous de visiter la clinique ?")}</p>
                                            <div className='flex sm:justify-center flex-wrap mt-4 gap-6 w-full'>
                                                {
                                                    notRecommended ?
                                                        <button className='flex gap-1 items-center' onClick={removeNotRecommendation}>
                                                            <DislikeFilled />
                                                            <span>{t("Non")}</span>
                                                        </button>
                                                        :
                                                        <button className='flex gap-1 items-center' onClick={() => { notRecommendClinic(); removeRecommendation() }}>
                                                            <DislikeOutlined />
                                                            {/* <DislikeIcon /> */}
                                                            <span>{t("Non")}</span>
                                                        </button>
                                                }
                                                {
                                                    recommended ?
                                                        <button className='flex gap-[7px] items-center' onClick={removeRecommendation}>
                                                            <LikeFilled />
                                                            <span className='text-[16px] font-[500] text-white'>{t("Oui")}</span>
                                                        </button>
                                                        :
                                                        <button className='flex gap-[7px] items-center' onClick={() => { recommendClinic(); removeNotRecommendation() }}>
                                                            <LikeOutlined />
                                                            <span className='text-[16px] font-[500] text-white'>{t("Oui")}</span>
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='lowerSection'>
                                        <section className='mt-[40px]'>
                                            <div className='header'>
                                                <Image src={cap} alt="cap" />
                                                <h4>{t("Bio")}</h4>
                                            </div>
                                            <p className='normalPara px-4'>
                                                {clinic?.bio}
                                            </p>
                                        </section>
                                        <section className="mt-[40px]">
                                            <div className='header'>
                                                <Image src={building} alt="coo" />
                                                <h4>{t("Coordonnées")}</h4>
                                            </div>
                                            <Row className='sm:px-4 block sm:flex' gutter={[20, 20]}>
                                                <Col md={12}>
                                                    <div className='mt-8'>
                                                        <button className='flex justify-between items-center w-full'>
                                                            <div className='flex gap-2 items-center w-[80%] text-left'>
                                                                <EnvironmentTwoTone style={{ fontSize: "21px" }} />
                                                                <span>{clinic?.user?.city}, {clinic?.user?.state}</span>
                                                            </div>
                                                            <div>
                                                                <Image src={Send} alt="Send" />
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div className='mt-8'>
                                                        <a href={`tel:${clinic?.phone}`} className='flex justify-between items-center w-full'>
                                                            <div className='flex gap-2 items-center w-[100%] text-left'>
                                                                <div className='text-[#0094DA]'>
                                                                    <Phone />
                                                                </div>
                                                                <span>{clinic?.phone}</span>
                                                            </div>
                                                            <div className='text-[#93C01F]'>
                                                                <Phone />
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className='mt-8'>
                                                        <button className='flex gap-2 items-center'>
                                                            <Image src={Message} alt="Message" className='text-[#fff]' />
                                                            <span>{clinic?.email}</span>
                                                        </button>
                                                    </div>
                                                    <div className='mt-8'>
                                                        <p>{t("Réseaux sociaux")}</p>
                                                        <div className='flex gap-3 mt-4 items-center'>
                                                            {
                                                                clinic?.facebookLink &&
                                                                <a href={clinic?.facebookLink} target="_blank">
                                                                    <Image src={Facebook} alt="Facebook" className='text-red' style={{ color: "red" }} />
                                                                </a>
                                                            }
                                                            {
                                                                clinic?.twitter &&
                                                                <a href={clinic?.twitter} target="_blank">
                                                                    <Image src={Twitter} alt="Twitter" />
                                                                </a>
                                                            }
                                                            {
                                                                clinic?.instagram &&
                                                                <a href={clinic?.instagram} target="_blank">
                                                                    <Image src={Instagram} alt="Instagram" />
                                                                </a>
                                                            }
                                                            {
                                                                clinic?.messenger &&
                                                                <a href={clinic?.messenger} target="_blank">
                                                                    <Image src={Messenger} alt="Messenger" />
                                                                </a>
                                                            }
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={12} className="relative">
                                                    {/* {
                                                    gpsDataLoading ?
                                                        <Loading />
                                                        : */}
                                                    <LocationComp coords={[clinic?.gpsData?.replace(/\s+/g, '').split(",")[0], clinic?.gpsData?.replace(/\s+/g, '').split(",")[1]]} />
                                                    {/* } */}
                                                </Col>
                                            </Row>
                                        </section>
                                        <section className="mt-[40px]">
                                            <div className='header'>
                                                <Image src={services} alt="services" />
                                                <h4>{t("Services")}</h4>
                                            </div>
                                            <ul className='px-4'>
                                                {
                                                    clinic?.services && clinic.services?.map((service) => {
                                                        return (
                                                            <li>
                                                                {t(service)}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </section>
                                        <section className="mt-[40px]">
                                            <div className='header flex justify-between flex-wrap items-center'>
                                                <div className='flex gap-2'>
                                                    <Image src={timeClock} alt="timeClock" />
                                                    <h4>{t("Horaire de travail")}</h4>
                                                </div>
                                                <div className='text-[#29C773] font-[600]'>{clinic?.schedule?.filter(f => f.day?.toLowerCase() == tod)[0] && t("Ouvert")}</div>
                                            </div>
                                            <div className='px-4 calendar flex gap-10 flex-wrap'>
                                                {
                                                    clinic?.schedule && clinic.schedule?.map((sch) => {
                                                        return (
                                                            <div className='min-w-[100px]'>
                                                                <Image src={calendar} alt="calendar" />
                                                                <h5>{t(sch.day)}</h5>
                                                                <div className='flex flex-wrap items-center'>
                                                                    <p>{sch.open}  -  {sch.close}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </section>
                                        <section className="mt-[40px]">
                                            <div className='header'>
                                                <Image src={notes} alt="notes" />
                                                <h4>{t("Notes")}</h4>
                                            </div>
                                            <ul className='px-4'>
                                                {
                                                    clinic?.notes && clinic.notes?.map((note) => {
                                                        return (
                                                            <li>
                                                                {t(note)}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </section>
                                        <section className="mt-[40px]">
                                            <div className='header flex items-center'>
                                                <MessageTwoTone style={{ fontSize: "28px" }} />
                                                <h4>{t("Commentaires")}</h4>
                                                <div className='count'>{comments.length}</div>
                                            </div>
                                            <div className='sm:px-4' id='commentSection'>
                                                {
                                                    comments?.length > 0 && comments.map(comment => {
                                                        return (
                                                            <>
                                                                {
                                                                    !comment.responseTo &&
                                                                    <div className='my-[32px]'>
                                                                        <CommentCard pageId={pageId} comment={comment} handleUpdate={() => getAllComments(pageId)} />
                                                                        <ReplyCommentCard pageId={pageId} parentId={comment?._id} comments={comments} handleUpdate={() => getAllComments(pageId)} />
                                                                    </div>
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }
                                                <div className='my-12'>
                                                    <AddComment pageId={pageId} handleUpdate={() => getAllComments(pageId)} />
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default IndDoctor
