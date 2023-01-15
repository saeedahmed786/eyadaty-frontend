import { BellOutlined } from '@ant-design/icons'
import { Badge, Dropdown } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FiList } from 'react-icons/fi'
import { ErrorMessage } from '../../../components/Messages/messages'
import { isAuthenticated } from '../../Auth/auth'
import EyedatyLogo from '../../Home/eyedatyLogo'
import BurgerMenuIcon from '../../icons/burgermenuicon'
import DocumentIcon from '../../icons/documentIcon'
import EditIcon from '../../icons/editIcon'
import HomeIcon from '../../icons/homeIcons'
import PlusIcon from '../../icons/plusIcon'
import UserIcon from '../../icons/userIcon'
import SearchInputs from '../../Inputs/SearchInputs'
import doctor from '/assets/doc.jpg'
import Logout from "../../../assets/Logout.svg"
import { useTranslation } from 'react-i18next'

const MobileNav = ({ handleMask }) => {
    const { t } = useTranslation()
    const [show, setShow] = useState(false);
    const router = useRouter();
    const [userAuth, setUserAuth] = useState();
    const [notifications, setNotifications] = useState([]);


    const getAllNotifications = async (auth) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/notifications`, {
            headers: {
                "authorization": "Bearer " + auth?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                setNotifications(res.data);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    const markRead = async (auth) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/mark-read`, {
            headers: {
                "authorization": "Bearer " + auth?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                // SuccessMessage(res.data.successMessage);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }


    useEffect(() => {
        setUserAuth(isAuthenticated());
        getAllNotifications(isAuthenticated());
        return () => {
        }
    }, []);


    const menu = (
        <div className='notificationPanel p-4 bg-white w-[200px] shadow-lg min-w-[220px]'>
            {
                notifications && notifications?.length > 0 ? notifications?.map(not => {
                    return (
                        <button onClick={() => router.push(not?.link)} className='flex gap-2 items-center mb-4'>
                            {
                                not?.user ?
                                    <img src={not?.user?.picture?.url} width={43} className="rounded-[50%] object-cover h-[43px]" alt="Profile" />
                                    :
                                    <Image src={doctor} alt="Doc" width={36} height={36} className="rounded-[50%]" />
                            }
                            <div>{not?.text}</div>
                        </button>
                    )
                })
                    :
                    <div className='text-center'>No Notifications!</div>
            }
        </div>
    )

    return (
        <div className='pb-6 adminMobileNav'>
            <div className="w-full px-2 py-2 flex justify-between lg:hidden" style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)" }}>
                <div className='w-1/2 py-3'>
                    <button onClick={() => { setShow(!show); handleMask(!show) }} >
                        <BurgerMenuIcon />
                    </button>
                </div>
                <a className="flex title-font font-medium items-center  text-[#333B42] mb-4 md:mb-0">
                    <EyedatyLogo />
                </a>
            </div>
            <div>
                <div className='relative mt-[16px]'>
                    {
                        show &&
                        <div className='px-2 relative w-full bg-white z-[1000]'>
                            <div className='mt-0 pb-10 relative'>
                                <div className='mb-6'>
                                    <Link href="/admin">
                                        <button className={`${router.pathname === "/admin" ? "hyperlink text-[#0094DA] flex gap-3 items-center" : "flex gap-3 items-center text-[#65737E]"}`}>
                                            <HomeIcon />
                                            <span>{t("Panneau de contrôle")}</span>
                                        </button>
                                    </Link>
                                </div>
                                <div className='mb-6'>
                                    <Link href="/admin/pages">
                                        <button className={`${router.pathname === "/admin/pages" ? "hyperlink text-[#0094DA] flex gap-3 items-center" : "flex gap-3 items-center text-[#65737E]"}`}>
                                            <DocumentIcon />
                                            <span>{t("Les pages")}</span>
                                        </button>
                                    </Link>
                                </div>
                                <div className='mb-6'>
                                    <Link href="/admin/users">
                                        <button className={`${router.pathname === "/admin/users" ? "hyperlink text-[#0094DA] flex gap-3 items-center" : "flex gap-3 items-center text-[#65737E]"}`}>
                                            <UserIcon />
                                            <span>{t("Utilisateurs")}</span>
                                        </button>
                                    </Link>
                                </div>
                                <div className='mb-6'>
                                    <Link href="/admin/articles">
                                        <button className={`${router.pathname === "/admin/articles" ? "hyperlink text-[#0094DA] flex gap-3 items-center" : "flex gap-3 items-center text-[#65737E]"}`}>
                                            <EditIcon />
                                            <span>{t("Articles")}</span>
                                        </button>
                                    </Link>
                                </div>
                                <div className='mb-6'>
                                    <Link href="/admin/categories">
                                        <button className={`${router.pathname === "/admin/categories" ? "hyperlink text-[#0094DA] flex gap-3 items-center" : "flex gap-3 items-center text-[#65737E]"}`}>
                                            <FiList className='text-[23px]' />
                                            <span>{t("Categories")}</span>
                                        </button>
                                    </Link>
                                </div>
                                <div className='mb-6'>
                                    <Link href="/admin/create-page">
                                        <button className={`${router.pathname === "/admin/create-page" ? "hyperlink text-[#0094DA] flex gap-3 items-center" : "flex gap-3 items-center text-[#65737E]"}`}>
                                            <PlusIcon />
                                            <span>{t("Créer un page")}</span>
                                        </button>
                                    </Link>
                                </div>
                                <div className='w-full left-0 px-2'>
                                    <button className='gap-4 rounded-[12px] border border-[#FF6551] h-[48px] w-full flex justify-center items-center text-[#FF6551] text-[16px] font-[500]'>
                                        <span className='text-[#FF6551] '>{("Déconnexion")}</span>
                                        <Image src={Logout} alt="Logout" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className='flex px-2 justify-between items-center'>
                    <Dropdown
                        trigger={['click']}
                        overlay={menu}>
                        <Badge color='#0094DA' count={notifications && notifications?.length > 0 && notifications?.filter(n => n.readStatus === "false")?.length}>
                            <BellOutlined onClick={() => markRead(isAuthenticated())} style={{ fontSize: "21px" }} />
                        </Badge>
                    </Dropdown>
                    <div className='flex items-center gap-2'>
                        <div className='text-end'>
                            <h4 className='font-[500] text-[#333B42]'>{userAuth?.fullName}</h4>
                            <p className='text-[12px] text-[#65737E]'>Admin</p>
                        </div>
                        <div>
                            <Badge offset={[-6, 32]} dot color='#29C773' count={5}>
                                {
                                    userAuth?.picture ?
                                        <img src={userAuth?.picture?.url} width={43} className="rounded-[50%] object-cover h-[43px]" alt="Profile" />
                                        :
                                        <Image src={doctor} alt="Doc" width={36} height={36} className="rounded-[50%]" />
                                }
                                {/* <Image objectFit='cover' src={doctor} width={36} height={36} className="rounded-[50%]" alt="doctor" /> */}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className='w-[100%] mt-[21px] px-2'>
                    <SearchInputs placeholder="Chercher..." />
                </div>
            </div >
        </div >
    )
}

export default MobileNav
