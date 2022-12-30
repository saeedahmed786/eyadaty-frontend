import { Col, Row } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../../components/Loading/Loading'
import { isAuthenticated } from '../../Auth/auth'
import AdminNavbar from './AdminNavbar'
// import RightIcon from '../../components/icons/righticon'
// import Footer from '../footer/footer'
// import DownloadApp from '../Home/downloadApp'
import AdminSidebar from './AdminSidebar'

const AdminLayout = (props) => {
    const router = useRouter();
    const [admin, setAdmin] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // checks if the user is authenticated
        setLoading(true);
        if (isAuthenticated() && isAuthenticated().role === "1") {
            setAdmin(true);
            setLoading(false);
        }
        else {
            router.push("/login");
        }
    }, []);

    return (
        loading ?
            <Loading />
            :
            <>
                <div className='AdminLayout bg-[#F5F8FB] pb-24'>
                    {
                        props.sidebar ?
                            <Row className='mt-0'>
                                <Col md={4} className="bg-white">
                                    <AdminSidebar />
                                </Col>
                                <Col md={20} className="bg-[#F5F8FB]">
                                    <div className='p-5'>
                                        <AdminNavbar />
                                        <div>
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
