import { Col, Pagination, Row } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../components/Auth/auth'
import SearchCard from '../components/Cards/SearchCard'
import DownloadApp from '../components/Home/downloadApp'
import Subscribe from '../components/Home/subscribe'
import SearchInputs from '../components/Inputs/SearchInputs'
import MainLayout from '../components/Layouts/MainLayout'
import RightIcon from '../components/icons/righticon'
import { ErrorMessage, SuccessMessage } from '../components/Messages/messages'

const Favourites = () => {
    const router = useRouter();
    const [favourites, setFavourites] = useState([]);
    const [current, setCurrent] = useState(1);
    const [totalFavourites, setTotalFavourites] = useState();
    const [categories, setCategories] = useState([]);

    const getAllCategories = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/get`).then(res => {
            if (res.statusText === "OK") {
                setCategories(res.data);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }


    const getAllFavourites = async (curr) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/user/favourite/${curr - 1}`, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                setFavourites(res.data.favourites);
                setTotalFavourites(res.data.count);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    const getLimitedFavouritesByCategory = async (curr, cat) => {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/favourites/category/limited/${curr}`, { category: cat }).then(res => {
            if (res.statusText === "OK") {
                setFavourites(res.data.favourites);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }


    const removeFavourite = async (pgId) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/delete/favourite/${pgId}`, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                getAllFavourites(current);
                SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    useEffect(() => {
        getAllFavourites(current);
        getAllCategories();

        return () => {

        }
    }, [])

    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return <button className='prevBtn'>Précédent</button>;
        }
        if (type === 'next') {
            return <button className='nextBtn'>Suivant</button>;
        }
        return originalElement;
    };
    return (
        <MainLayout navbar>
            <div className='Favourites px-0 sm:px-24 py-8'>
                <div className='flex gap-2 justify-center items-center py-4'>
                    <span>Accueil</span> <RightIcon /> <button className='text-[#0094DA]'>Favoris </button>
                </div>
                <h1 className='bigTitle text-center py-3'>Favoris</h1>
                <Row>
                    <Col md={6}>
                        <div>
                            <label>Chercher</label>
                            <SearchInputs />
                        </div>
                        <h1 className='bigTitle text-center py-4'>Catégories</h1>
                        <div className='mt-8'>
                            <button className='catCard my-4'>
                                <div className='name'>Généraliste</div>
                                <div className='count'>100</div>
                            </button>
                            <button className='catCard my-4'>
                                <div className='name'>Chirurgie dentaire</div>
                                <div className='count'>100</div>
                            </button>
                            <button className='catCard my-4'>
                                <div className='name'>Chirurgie dentaire</div>
                                <div className='count'>100</div>
                            </button>
                            <button className='catCard my-4'>
                                <div className='name'>Chirurgie dentaire</div>
                                <div className='count'>100</div>
                            </button>
                            <button className='catCard my-4'>
                                <div className='name'>Chirurgie dentaire</div>
                                <div className='count'>100</div>
                            </button>
                            <button className='catCard my-4'>
                                <div className='name'>Chirurgie dentaire</div>
                                <div className='count'>100</div>
                            </button>
                            <button className='catCard my-4'>
                                <div className='name'>Chirurgie dentaire</div>
                                <div className='count'>100</div>
                            </button>
                            <button className='catCard my-4'>
                                <div className='name'>Chirurgie dentaire</div>
                                <div className='count'>100</div>
                            </button>
                        </div>
                    </Col>
                    <Col md={18} className="pl-12 pt-8">
                        <Row gutter={[23, 32]}>
                            {
                                favourites?.length > 0 && favourites.map(fav => {
                                    return (
                                        <Col md={24}>
                                            {/* <button onClick={() => router.push(`/doctor/${fav?.page?._id}`)}> */}
                                            <SearchCard removeFavourite={removeFavourite} page={fav.page} favourite={true} />
                                            {/* </button> */}
                                        </Col>
                                    )
                                })
                            }
                            {/* <Col md={24}>
                                <SearchCard favourite={true} />
                            </Col>
                            <Col md={24}>
                                <SearchCard favourite={true} />
                            </Col>
                            <Col md={24}>
                                <SearchCard favourite={true} />
                            </Col> */}
                        </Row>
                        <div className='paginationCon my-12'>
                            <Pagination total={totalFavourites} itemRender={itemRender} showSizeChanger={false} onChange={(curr) => { setCurrent(curr); console.log(curr); getAllFavourites(curr) }} />
                        </div>
                    </Col>
                </Row>
            </div>
            <DownloadApp noMargin={true} />
            <Subscribe noMargin={true} />
        </MainLayout>
    )
}

export default Favourites
