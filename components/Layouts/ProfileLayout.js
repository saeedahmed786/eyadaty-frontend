import { Col, Row } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import RightIcon from '../../components/icons/righticon'
import { Loading } from '../../components/Loading/Loading'
import Footer from '../footer/footer'
import DownloadApp from '../Home/downloadApp'
import TopNavbar from '../topNavbar'
import Navbar from '../navbar'
import { isAuthenticated } from '../Auth/auth'


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
