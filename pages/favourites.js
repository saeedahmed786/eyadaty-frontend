import { Col, Pagination, Row, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../components/Auth/auth'
import SearchCard from '../components/Cards/SearchCard'
import DownloadApp from '../components/Home/downloadApp'
import Subscribe from '../components/Home/subscribe'
import SearchInputs from '../components/Inputs/SearchInputs'
import MainLayout from '../components/Layouts/MainLayout'
import RightIcon from '../components/icons/righticon'
import specialitiesArray from '../assets/specialities.json'
import { ErrorMessage, SuccessMessage } from '../components/Messages/messages'
import { useTranslation } from 'react-i18next'
import DownArrow from "../assets/DownArrow.svg"
import Image from 'next/image'


const { Option } = Select;

const Favourites = () => {
    const { t, i18n } = useTranslation();
    const [favourites, setFavourites] = useState([]);
    const [filteredFavourites, setFilteredFavourites] = useState([]);
    const [filterText, setFilterText] = useState("");
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
                console.log(res.data.favourites)
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
            return <button className='prevBtn'>{t("Précédent")}</button>;
        }
        if (type === 'next') {
            return <button className='nextBtn'>{t("Suivant")}</button>;
        }
        return originalElement;
    };

    const filterFavourites = (val) => {
        let filterData = favourites.filter(f => f?.page?.specialisation === val)
        setFilteredFavourites(filterData);
        console.log(filterData)
    }


    return (
        <MainLayout navbar>
            <div className='Favourites px-4 xl:px-24 py-8'>
                <div className='flex gap-2 justify-start xl:justify-center items-center'>
                    <span>{t("Accueil")}</span> <RightIcon /> <button className='text-[#0094DA]'>{t("Favoris")} </button>
                </div>
                <h1 className='bigTitle xl:text-center pt-[32px] pb-[32px]'>{t("Favoris")}</h1>
                <Row>
                    <Col xs={24} lg={6}>
                        <div>
                            <label>{t("Chercher")}</label>
                            <SearchInputs />
                        </div>
                        <h1 className='bigTitle hidden lg:block text-center py-4'>{t("Catégories")}</h1>
                        <div className='mt-[24px]'>
                            <div className="w-full form-group block lg:hidden">
                                <label>{t("Catégories")}</label>
                                <Select onChange={(value) => setFilterText(value)} suffixIcon={<Image src={DownArrow} alt="Down Arrow" width={12} height={7} />} placeholder={t("Spécialité")} className='w-full searchFormSelect'>
                                    {specialitiesArray.map((spec) => (
                                        <Option key={spec.fr} value={spec.fr}>
                                            <div className='flex gap-2 items-center'>
                                                <div className='catImgSmall bg-white p-1 rounded-[50%]'>
                                                    <img src={i18n.language === "fr" ? spec?.img_f : spec?.img_h} className="w-[17px]" alt="Category" />
                                                </div>
                                                <div>{i18n.language === "fr" ? spec.fr : spec.ar}</div>
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className='hidden lg:block'>
                                {specialitiesArray.map((spec) => (
                                    <button className='catCard text-left my-4' onClick={() => setFilterText(spec.fr)}>
                                        <div className='name'>{i18n.language === "fr" ? spec.fr : spec.ar}</div>
                                        <div className='count'>{favourites.filter(f => f?.page?.specialisation === spec.fr).length}</div>
                                    </button>
                                ))
                                }
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} lg={18} className="xl:pl-12 pt-[48px]">
                        <Row gutter={[23, 32]}>
                            {
                                // filteredFavourites && filteredFavourites.length > 0 ?
                                //     filteredFavourites?.length > 0 && filteredFavourites?.map(fav => {
                                //         return (
                                //             <Col md={24}>
                                //                 <SearchCard removeFavourite={removeFavourite} page={fav.page} favourite={true} />
                                //             </Col>
                                //         )
                                //     })
                                //     :
                                favourites?.length > 0 && favourites?.filter(f => f?.page?.specialisation?.includes(filterText))?.map(fav => {
                                    return (
                                        <Col md={24}>
                                            <SearchCard removeFavourite={removeFavourite} page={fav.page} favourite={true} />
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
        </MainLayout >
    )
}

export default Favourites
