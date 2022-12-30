import React, { useEffect, useState } from 'react'
import CategoryCard from '../components/Home/categoryCard';
import RightIcon from '../components/icons/righticon';
import DownloadApp from '../components/Home/downloadApp'
import MainLayout from '../components/Layouts/MainLayout'
import { ErrorMessage } from '../components/Messages/messages';
import axios from 'axios';
import specialitiesArray from "../components/assets/specialities.jsonn"

const Categories = () => {
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

        return () => {

        }
    }, []);


    return (
        <MainLayout navbar>
            <div className='CategoriesPage container px-5 mx-auto pb-24 pt-6'>
                <div className='text-center'>
                    <div className='flex gap-2 justify-center items-center py-4'>
                        <span>Accueil</span> <RightIcon /> <button className='text-[#0094DA]'>Catégories</button>
                    </div>
                    <h1 className='bigTitle'>Catégories</h1>
                </div>
                <div className='flex flex-wrap gap-6 mt-12'>
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
