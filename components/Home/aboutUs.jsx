import React from 'react'
import Image from 'next/image'
import aboutimg from '/assets/aboutusimage.svg'
import RightIcon from '../../icons/righticon'

export default function AboutUs() {
    return (
        <section className="text-gray-600 sm:bg-[url('../assets/Lines.png')] bg-cover bg-no-repeat  body-font">
            <div className="container mx-auto flex px-3 sm:px-5 py-24 md:flex-row flex-col items-center justify-center ">
                <div className="hidden sm:block lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <Image src={aboutimg} alt="Image of doctor" width={420} height={428.03} />
                    {/* <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"> */}
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <p className="text-sm  text-sitegreen font-bold mb-5 w-full">À propos de nous</p>
                    <h1 className="text-[46px] sm:text-[56px] mb-4 leading-[45px] font-extrabold text-gray-900">Qui sommes nous?</h1>
                    <p className="mb-8 leading-relaxed">Chillwave portland ugh, knausgaard fam polaroid iPhone. Man braid swag typewriter affogato,
                        Chillwave portland ugh, knausgaard fam polaroid iPhone. Man braid swag typewriter affogato,
                        Chillwave portland ugh, knausgaard fam polaroid iPhone. Man braid swag typewriter affogato, hella selvage wolf narwhal dreamcatcher.</p>
                    <div className="flex w-full justify-center text-center md:justify-start items-end">
                        <button className="w-[100%] sm:w-[auto] text-white bg-siteblue border-0 py-2 px-10 focus:outline-none hover:bg-sitegreen rounded-xl text-lg flex justify-center items-center gap-3"><span>Voir Plus</span>  <RightIcon /></button>
                    </div>
                    <div className="flex justify-between items-center overflow-hidden gap-7 mt-10 w-full sm:w-[80%]">
                        <div className="box sm:space-y-2 align-middle">
                            <button className="inline-flex sm:py-3 rounded-lg items-center md:ml-0 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                                <span className="flex items-start flex-col leading-none p-2">
                                    <span className="w-full sm:w-[auto]  font-extrabold text-3xl text-black">3600 <span className='text-sitegreen'> + </span></span>
                                    <span className="text-[#65737E] mt-2">Patients Heurex</span>
                                </span>

                            </button>
                        </div>
                        <div className="box space-y-2 place-items-center">
                            <button className="inline-flex py-3 rounded-lg items-center md:ml-0 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                                <span className="flex items-start flex-col leading-none p-2">
                                    <span className="w-full sm:w-[auto]  font-extrabold text-3xl text-black">1200 <span className='text-sitegreen'> + </span></span>
                                    <span className="text-[#65737E] mt-2">Rendez-vous en ligne</span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center overflow-hidden gap-7 sm:mt-10 w-full sm:w-[80%]">
                        <div className="box space-y-2">
                            <button className="inline-flex py-3 rounded-lg items-center md:ml-0 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                                <span className="flex items-start flex-col leading-none p-2">
                                    {/* <div className='flex justify-center w-full'> */}
                                    <span className="w-full sm:w-[auto] font-extrabold text-3xl text-black">20 <span className='text-sitegreen'> + </span></span>
                                    {/* </div> */}
                                    <span className="text-[#65737E] mt-2">Des années d'expérience</span>
                                </span>
                            </button>
                        </div>
                        <div className="box space-y-2">
                            <button className="inline-flex py-3 rounded-lg items-center md:ml-0 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                                <span className="flex items-start flex-col leading-none p-2">
                                    <span className="w-full sm:w-[auto]  font-extrabold text-3xl text-black">200 <span className='text-sitegreen'> + </span></span>
                                    <span className="text-[#65737E] mt-2">Médecins et Cliniques</span>
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* </div> */}
                </div>

            </div>
        </section >
    )
}
