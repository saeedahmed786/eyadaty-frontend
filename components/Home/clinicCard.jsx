import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ViewIcon from '../../components/icons/viewicon'
import StarIcon from '../../components/icons/staricon'
import LocationIcon from '../../components/icons/locationicon'
import HeartIcon from '../../components/icons/hearticon'
import checkmark from '/assets/checkmark.png'
import RightIcon from '../../components/icons/righticon'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ErrorMessage } from '../../components/Messages/messages'
import formatStringNumbers from '../FormatNumbers'
import { isAuthenticated } from '../Auth/auth'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import specialitiesArray from "../../assets/specialities.json"


export default function ClinicCard({ clinic }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [favourites, setFavourites] = useState([]);

  const getFavourites = async (id) => {
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/favourite/${id}`, {
      headers: {
        "authorization": "Bearer " + isAuthenticated()?.token
      }
    }).then(res => {
      if (res.statusText === "OK") {
        setFavourites(res.data);
      }
      else {
        ErrorMessage(res.data.errorMessage);
      }
    })
  };

  useEffect(() => {
    getFavourites(clinic?._id)

    return () => {

    }
  }, []);

  const filterFirstSpec = specialitiesArray?.filter(f => f.fr === clinic?.specialisation)[0];

  return (
    <div className="p-4">
      <div className="">
        <div className="rounded-[16px] shadow-lg bg-white max-w-sm">
          <div className='relative'>
            <Link href={"/doctor/" + clinic._id}>
              <img src={clinic?.picture?.url} alt="clinic image" className='object-cover w-full h-[341px] rounded-t-[16px]' />
              {/* <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt=""/> */}
            </Link>
            <div className='catImg'>
              <img src={i18n.language === "fr" ? filterFirstSpec?.img_f : filterFirstSpec?.img_h} alt="Category" />
            </div>
          </div>
          <div className="p-6">
            <div className='flex flex-row rtl:gap-2 space-x-2'>
              <div>
                <h5 className="text-gray-900 text-xl font-medium mb-2">{clinic?.firstName} {clinic?.lastName}</h5>
              </div>
              <div className='py-1'>
                <Image src={checkmark} alt="checkmark" />
              </div>
            </div>
            <p className="text-gray-700 text-base mb-4">
              {i18n.language === "fr" ? filterFirstSpec?.fr : filterFirstSpec?.ar}
            </p>
            <div className='flex flex-row '>
              <div className=' py-3 px-2'>
                <LocationIcon />
              </div>
              <div className=' p-2'>
                <p className="text-gray-700 text-base mb-4">
                  {clinic?.user?.city}, {clinic?.user?.state}
                </p>
              </div>
            </div>
            <div className='flex flex-row rtl:gap-4  p-4 justify-start space-x-3'>
              <div className='flex flex-row items-center rtl:gap-2 space-x-1 '>
                <div className='py-1'>
                  <ViewIcon />
                </div>
                <div>{formatStringNumbers(clinic?.views?.length)}</div>
              </div>
              <div className='flex flex-row items-center rtl:gap-2 space-x-1'>
                <div className='  py-1'>
                  <HeartIcon />
                </div>
                <div>{favourites.length}</div>
              </div>
              <div className='flex flex-row items-center rtl:gap-2 space-x-1'>
                <div className='py-1'>
                  <StarIcon />
                </div>
                <div>
                  {
                    clinic?.recommendations?.length > 0 ? clinic?.recommendations?.length * 5 : 5 / clinic?.notrecommendations?.length > 0 ? clinic?.notrecommendations?.length : 1
                  }
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <button onClick={() => router.push(`/doctor/${clinic?._id}`)} type="button" className="sm:px-16 w-full text-center justify-center py-4 bg-white border-2 border-siteblue  text-siteblue font-medium text-sm leading-tight uppercase rounded-xl shadow-md hover:bg-siteblue hover:text-white hover:shadow-lg focus:bg-siteblue focus:shadow-lg focus:outline-none focus:ring-0 active:bg-siteblue active:shadow-lg transition duration-150 ease-in-out flex items-center gap-3">{t("Voir Plus")} <RightIcon /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
