import { Col, Row } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../../components/Loading/Loading'
import { isAuthenticated } from '../../Auth/auth'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'

const AdminLayout = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

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
