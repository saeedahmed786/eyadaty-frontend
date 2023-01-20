import { MobileFilled } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { Loading } from '../../../components/Loading/Loading'
import { isAuthenticated } from '../../Auth/auth'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'
import MobileNav from './MobileNav'

const AdminLayout = (props) => {
    const router = useRouter();
    const cookies = new Cookies;
    const [loading, setLoading] = useState(true);
    const [mask, setMask] = useState(false);
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
        if (lng === "ar") {
            document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
        } else {
            document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
        }
    };

    useEffect(() => {
        // if (i18n.language === "ar") {
        setTimeout(() => {
            changeLanguage(cookies.get("language"));
        }, 1000);

        return () => {

        }
    }, [])

    useEffect(() => {
        // checks if the user is authenticated
        if (isAuthenticated() && isAuthenticated().role === "1") {
            setLoading(false);
        }
        else {
            router.push("/login");
            setLoading(false);
        }
    }, []);

    return (
        loading ?
            <Loading />
            :
            <>
                <div className={`lg:container mx-auto AdminLayout bg-[#F5F8FB] pb-24 ${mask && "blackMask"}`}>
                    {
                        props.sidebar ?
                            <Row className='block md:flex mt-0'>
                                <Col xs={24} lg={4} className="hidden lg:block bg-white">
                                    <AdminSidebar />
                                </Col>
                                <Col xs={24} lg={20} className="md:bg-[#F5F8FB]">
                                    <div className='md:p-5'>
                                        <div className='hidden lg:block'>
                                            <AdminNavbar />
                                        </div>
                                        <div className='block lg:hidden bg-white' style={{ zIndex: "1000" }}>
                                            <MobileNav handleMask={(val) => setMask(val)} />
                                        </div>
                                        <div className={`mx-2`}>
                                            {props.children}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            :
                            props.children
                    }
                </div>
            </>
    )
}

export default AdminLayout
