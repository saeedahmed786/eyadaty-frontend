import React, { useEffect, useRef, useState } from 'react'
import icon from '/assets/Icon.png'
import LeftIcon from '../../components/icons/lefticon'
import RightIcon from '../../components/icons/righticon'
import CategoryCard from './categoryCard'
import { useRouter } from 'next/router'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'


export default function Categories({ categories }) {
  const router = useRouter();
  const slickRef = useRef();
  // const [language, setLanguage] = useState("fr");
  const { t, i18n } = useTranslation();


  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false
        }
      }
    ]
  };


  return (
    <section className="text-[#1C2126] body-font categoriesComp bg-[url('../assets/Lines-alt.png')] bg-cover bg-no-repeat categoriesSection">
      <div className="lg:container py-[160px] px-5 pb-[80px] md:py-[125px] mx-auto ">
        <div className="flex flex-wrap justify-center sm:justify-between px-0 w-full mb-20">
          <div className="w-full sm:w-auto lg:w-1/2 rtl:lg:w-auto mb-6 lg:mb-0">
            <p className='rtl:md:text-start text-center sm:text-left pl-1 text-[16px]  text-[#93C01F] font-[500]'>{t("Explorez tous les")}</p>
            <h1 className="text-[46px] sm:text-[56px] mb-[24px] leading-[45px] font-[700] text-[#1C2126] mt-2 text-center sm:text-left">{t("Catégories")}</h1>
          </div>
          <div className='flex flex-row justify-center gap-2 space-x-1'>
            <button onClick={() => slickRef.current?.slickPrev()}>
              <div> <LeftIcon /> </div>
            </button>
            <button onClick={() => slickRef.current?.slickNext()} >
              <div style={{ transform: "rotate(180deg)" }}> <LeftIcon /> </div>
            </button>
          </div>
        </div>
        <div>
          {/* <div className="flex gap-4 text-center overflow-x-auto mb-12"> */}
          <Slider {...settings} ref={slickRef}>
            {
              categories && categories?.map(cat => {
                return (
                  <div>
                    <CategoryCard cat={cat} />
                  </div>
                )
              })
            }
          </Slider>
          {/* <CategoryCard imagevar={icon1} cattitle="Chirugie Dentaire" />
          <CategoryCard imagevar={icon2} cattitle="ORL" />
          <CategoryCard imagevar={icon3} cattitle="Ophtalmologie" />
          <CategoryCard imagevar={icon4} cattitle="Cardiolgie" />
          <CategoryCard imagevar={icon5} cattitle="Chirugie Esthetique" /> */}
        </div>
        <div className='w-full flex justify-center mt-[48px]'>
          <div className="flex w-full md:justify-center justify-center items-end ">
            <button onClick={() => router.push("/categories")} className="text-white text-left bg-siteblue border-0 py-2 px-[20px] focus:outline-none hover:bg-sitegreen rounded-xl text-[16px] font-[500] flex items-center gap-3"><span>{t("Voir tous les catégorie")} </span> <RightIcon /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
