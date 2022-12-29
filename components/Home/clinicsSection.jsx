import React, { useRef } from 'react'
import ClinicCard from './clinicCard'
import clinicimage from '/assets/clinicimage.png'
import LeftIcon from '../../icons/lefticon'
import RightIcon from '../../icons/righticon'
import Slider from 'react-slick'

export default function ClinicsSection({ clinics }) {
  const slickRef = useRef();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
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
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 sm:py-24 mx-auto">
          <div className="flex flex-wrap justify-between  w-full sm:mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <p className='text-sitegreen font-medium text-center sm:text-left'>Explorez tous les</p>
              <h1 className="bigTitle text-center sm:text-left">Cliniques</h1>
            </div>
            <div className='w-full sm:w-[auto] flex justify-center sm:justify-center space-x-2'>
              <button onClick={() => slickRef.current?.slickPrev()}>
                <div> <LeftIcon /> </div>
              </button>
              <button onClick={() => slickRef.current?.slickNext()} >
                <div style={{ transform: "rotate(180deg)" }}> <LeftIcon /> </div>
              </button>
            </div>
          </div>
          <div className="m-4">
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
        <div className='w-full flex justify-center'>
          <div className="flex w-full md:justify-center justify-center items-end ">
            <button className="text-white text-left bg-siteblue border-0 py-2 px-16 focus:outline-none hover:bg-sitegreen rounded-xl text-lg flex items-center gap-3">Voir tous les cliniques <RightIcon /> </button>
          </div>
        </div>
      </section>
    </div>
  )
}
