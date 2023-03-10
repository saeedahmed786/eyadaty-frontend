import React, { useEffect, useState } from 'react'
import CategoryCard from '../components/Home/categoryCard';
import RightIcon from '../components/icons/righticon';
import DownloadApp from '../components/Home/downloadApp'
import MainLayout from '../components/Layouts/MainLayout'
import { ErrorMessage } from '../components/Messages/messages';
import axios from 'axios';
import specialitiesArray from "../assets/specialities.json"
import { useTranslation } from 'react-i18next';

const Categories = () => {
    const { t, i18n } = useTranslation();
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

    useEffect(() => {
        getAllCategories();
        console.log(i18n)

        return () => {

        }
    }, []);


    return (
        <MainLayout navbar>
            <div className='CategoriesPage container px-4 mx-auto pb-24 pt-6'>
                <div className='text-center'>
                    <div className='flex gap-2 justify-center items-center pt-4'>
                        <span>{t("Accueil")}</span> <RightIcon /> <button className='text-[#0094DA]'>{t("Catégories")}</button>
                    </div>
                    <h1 className='bigTitle mt-[32px]'>{t("Catégories")}</h1>
                </div>
                <div className='flex justify-center flex-wrap gap-2 sm:gap-6 mt-[64px]'>
                    {
                        specialitiesArray && specialitiesArray?.map(cat => {
                            return (
                                <div>
                                    <CategoryCard cat={cat} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <DownloadApp noMargin />
        </MainLayout>
    )
}

export default Categories
