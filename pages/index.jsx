import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import PageLoader from "../components/common/loader/page-loader";
import MainLayout from '../components/Layouts/MainLayout';
import axios from "axios"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { isAuthenticated } from '../components/Auth/auth';
import LocationComp from '../components/Location';
import specialitiesArray from "../specialities.json"
import { CustomErrorMessage, CustomSuccessMessage, ErrorMessage } from '../Messages/messages';

const HeroPage = dynamic(() => import('../components/Home/hero'), {
    suspense: true,
})
const SearchForm = dynamic(() => import('../components/Home/searchForm'), {
    suspense: true,
})
const AboutUs = dynamic(() => import('../components/Home/aboutUs'), {
    suspense: true,
})
const Categories = dynamic(() => import('../components/Home/categories'), {
    suspense: true,
})
const ClinicsSection = dynamic(() => import('../components/Home/clinicsSection'), {
    suspense: true,
})
const LabSection = dynamic(() => import('../components/Home/labSection'), {
    suspense: true,
})
const BlogList = dynamic(() => import('../components/Home/blogList'), {
    suspense: true,
})
const Doctor = dynamic(() => import('../components/Home/doctor'), {
    suspense: true,
})

const Subscribe = dynamic(() => import('../components/Home/subscribe'), {
    suspense: true,
})
const DownloadApp = dynamic(() => import('../components/Home/downloadApp'), {
    suspense: true,
})

export default function Home() {
    // const [user, setuser] = useState(second)
    const [clinics, setClinics] = useState([]);
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [userAuth, setUserAuth] = useState({});

    const getAllCategories = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/get`).then(res => {
            if (res.statusText === "OK") {
                setCategories(res.data);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    const getClinics = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics`).then(res => {
            if (res.statusText === "OK") {
                setClinics(res.data);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };


    const getAllBlogs = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`).then(res => {
            if (res.statusText === "OK") {
                setBlogs(res.data);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    useEffect(() => {
        getClinics();
        setUserAuth(isAuthenticated());
        getAllCategories();
        getAllBlogs();

        return () => {

        }
    }, [])


    return (
        <MainLayout navbar>
            <Suspense fallback={<PageLoader />}>
                <div className='homepage'>
                    {/* <CustomSuccessMessage />
                    <CustomErrorMessage /> */}
                    <LocationComp />
                    <HeroPage />
                    <SearchForm />
                    <AboutUs />
                    <Categories categories={specialitiesArray} />
                    <DownloadApp />
                    <ClinicsSection clinics={clinics.filter(c => c.type === "Clinique")} />
                    <LabSection clinics={clinics.filter(c => c.type === "Laboratory")} />
                    <Doctor clinics={clinics.filter(c => c.type === "Clinique")} />
                    <BlogList blogs={blogs} />
                    <Subscribe />
                </div>
            </Suspense>
        </MainLayout>
    )
} 
