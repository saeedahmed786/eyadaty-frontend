import { Col, Row } from 'antd'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import RightIcon from '../../components/icons/righticon'
import { Loading } from '../../components/Loading/Loading'
import { isAuthenticated } from '../Auth/auth'
// import { isAuthenticated } from '../Auth/auth'
import Footer from '../footer/footer'
import DownloadApp from '../Home/downloadApp'
// import Navbar from '../navbar'
// import TopNavbar from '../topNavbar'

const TopNavbar = dynamic(() => import('../topNavbar'), {
    suspense: true,
});
const Navbar = dynamic(() => import('../navbar'), {
    suspense: true,
});

const ProfileLayout = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated()) {
            setLoading(false);
        } else {
            router.push("/login");
            setLoading(false);
        }

        return () => {

        }
    }, [])

    return (
        loading ?
            <Loading />
            :
            <>
                <TopNavbar />
                <Navbar />
                <div className='ProfileLayout container px-5 mx-auto pb-24 pt-6'>
                    <div className='text-center'>
                        <div className='flex gap-2 justify-center items-center py-4'>
                            <span>Accueil</span> <RightIcon /> <button className='text-[#0094DA]'>Profile</button>
                        </div>
                        <h1 className='bigTitle'>Profile</h1>
                    </div>
                    {
                        props.sidebar ?
                            <Row className='mt-12'>
                                <Col md={8}>
                                    <h1 className='bigTitle'>Mon compte</h1>
                                    <div className='mt-8'>
                                        <Link href="/profile">
                                            <button className={`${router?.pathname === "/profile" ? "hyperlink text-[#0094DA]" : ""}`}>Information personel</button>
                                        </Link>
                                    </div>
                                    <div className='mt-5'>
                                        <Link href="/profile/create-page">
                                            <button className={`${router?.pathname === "/profile/create-page" ? "hyperlink text-[#0094DA]" : ""}`}>Créer un page</button>
                                        </Link>
                                    </div>
                                    <div className='mt-5'>
                                        <Link href="/profile/invite">
                                            <button className={`${router?.pathname === "/profile/invite" ? "hyperlink text-[#0094DA]" : ""}`}>Inviter des amis</button>
                                        </Link>
                                    </div>
                                </Col>
                                <Col md={15}>
                                    {props.children}
                                </Col>
                            </Row>
                            :
                            props.children
                    }
                </div>
                <DownloadApp noMargin />
                <Footer />
            </>
    )
}

export default ProfileLayout
