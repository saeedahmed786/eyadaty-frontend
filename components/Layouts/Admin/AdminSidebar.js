import Image from 'next/image'
import React from 'react'
import EyedatyLogo from '../../Home/eyedatyLogo'
import TwoCircle from "../../../assets/TwoCircle.svg"
import Logout from "../../../assets/Logout.svg"
import Link from 'next/link'
import { useRouter } from 'next/router'
import HomeIcon from '../../../components/icons/homeIcons'
import DocumentIcon from '../../../components/icons/documentIcon'
import UserIcon from '../../../components/icons/userIcon'
import EditIcon from '../../../components/icons/editIcon'
import PlusIcon from '../../../components/icons/plusIcon'
import { FiList } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const AdminSidebar = () => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className='AdminSidebar px-2 pt-4' style={{ height: "100vh" }}>
            <div className='flex justify-between items-center'>
                <EyedatyLogo />
                <div>
                    <Image src={TwoCircle} alt="Two Circles" />
                </div>
            </div>
            <div>
                <div className='mt-8 relative'>
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
                </div>
                <div className='absolute top-[90%] w-full left-0 px-2'>
                    <button className='gap-4 rounded-[12px] border border-[#FF6551] h-[48px] w-full flex justify-center items-center text-[#FF6551] text-[16px] font-[500]'>
                        <span className='text-[#FF6551] '>{t("Déconnexion")}</span>
                        <Image src={Logout} alt="Logout" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar
