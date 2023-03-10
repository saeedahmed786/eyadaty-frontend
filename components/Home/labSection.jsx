import React, { useRef } from 'react'
import ClinicCard from './clinicCard'
import clinicimage from '/assets/clinicimage.png'
import LeftIcon from '../../components/icons/lefticon'
import RightIcon from '../../components/icons/righticon'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'

export default function LabSection({ clinics }) {
  const slickRef = useRef();
  const { t } = useTranslation();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true
        }
      },
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
          initialSlide: 1
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
      <section className="body-font mt-[172px] clinicsSection">
        <div className="lg:container px-5 sm:py-[48px] mx-auto">
          <div className="flex flex-wrap justify-between w-full mb-[48px]">
            <div className="lg:w-1/2 rtl:md:w-auto w-full sm:w-auto mb-6 lg:mb-0">
              <p className='text-[16px]  text-[#93C01F] font-[500]  text-center rtl:md:text-start sm:text-left'>{t("Explorez tous les")}</p>
              <h1 className="bigTitle text-center sm:text-left">{t("Laboratoires")}</h1>
            </div>
            <div className='w-full sm:w-[auto] flex flex-row justify-center gap-2 space-x-2'>
              <button onClick={() => slickRef.current?.slickPrev()}>
                <div> <LeftIcon /> </div>
              </button>
              <button onClick={() => slickRef.current?.slickNext()} >
                <div style={{ transform: "rotate(180deg)" }}> <LeftIcon /> </div>
              </button>
            </div>
          </div>
          <div>
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
        <div className='flex justify-center mt-[48px] sm:mt-0'>
          <button className="text-white text-left bg-siteblue border-0 py-2 px-[20px] focus:outline-none hover:bg-sitegreen rounded-xl text-[16px] font-[500] flex items-center gap-3">{t("Voir tous les Laboratoires")} <RightIcon /> </button>
        </div>
      </section>
    </div>
  )
}
