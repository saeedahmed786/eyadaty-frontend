import { MobileFilled } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../../components/Loading/Loading'
import { isAuthenticated } from '../../Auth/auth'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'
import MobileNav from './MobileNav'

const AdminLayout = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [mask, setMask] = useState(false);

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
                <div className={`AdminLayout bg-[#F5F8FB] pb-24 ${mask && "blackMask"}`}>
                    {
                        props.sidebar ?
                            <Row className='block md:flex mt-0'>
                                <Col md={4} className="hidden md:block bg-white">
                                    <AdminSidebar />
                                </Col>
                                <Col md={20} className="md:bg-[#F5F8FB]">
                                    <div className='md:p-5'>
                                        <div className='hidden md:block'>
                                            <AdminNavbar />
                                        </div>
                                        <div className='block md:hidden bg-white' style={{ zIndex: "1000" }}>
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
