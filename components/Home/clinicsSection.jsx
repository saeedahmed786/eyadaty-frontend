import React, { useRef } from 'react'
import ClinicCard from './clinicCard'
import 'react-quill/dist/quill.snow.css';
import LeftIcon from '../../components/icons/lefticon'
import RightIcon from '../../components/icons/righticon'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'

export default function ClinicsSection({ clinics }) {
  const slickRef = useRef();
  const { t } = useTranslation();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      }
    ]
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 sm:py-24 mx-auto">
          <div className="flex flex-wrap justify-between w-full sm:mb-20">
            <div className="lg:w-1/2 rtl:md:w-auto w-full mb-6 lg:mb-0">
              <p className='text-sitegreen font-medium text-center rtl:md:text-start sm:text-left'>{t("Explorez tous les")}</p>
              <h1 className="bigTitle text-center sm:text-left">{t("Cliniques")}</h1>
            </div>
            <div className='w-full sm:w-[auto] flex justify-center sm:justify-center gap-2 space-x-2'>
              <button onClick={() => slickRef.current?.slickPrev()}>
                <div> <LeftIcon /> </div>
              </button>
              <button onClick={() => slickRef.current?.slickNext()} >
                <div style={{ transform: "rotate(180deg)" }}> <LeftIcon /> </div>
              </button>
            </div>
          </div>
          <div className="sm:m-4">
            <Slider {...settings} ref={slickRef}>
              {
                clinics && clinics?.length > 0 && clinics.map(clinic => {
                  return (
                    <div>
                      <ClinicCard clinic={clinic} />
                    </div>
                  )
                })
              }
            </Slider>
          </div>

        </div>
        <div className='flex justify-center mt-6 sm:mt-0'>
          <button className="text-white text-left bg-siteblue w-auto border-0 py-2 px-5 sm:px-16 focus:outline-none hover:bg-sitegreen rounded-xl text-lg flex items-center gap-3">{t("Voir tous les Cliniques")} <RightIcon /> </button>
        </div>
      </section>
    </div>
  )
}
