import React from 'react'
import Image from 'next/image'
import aboutimg from '/assets/aboutusimage.svg'
import RightIcon from '../../components/icons/righticon'
import { useTranslation } from 'react-i18next'

export default function AboutUs() {
    const { t } = useTranslation();
    return (
        <section className="text-gray-600 sm:bg-[url('../assets/Lines.png')] bg-cover bg-no-repeat  body-font aboutUsComp">
            <div className="lg:container mx-auto flex-wrap lg:flex-nowrap flex px-3 sm:px-5 pt-[80px] md:py-[122px] md:flex-row flex-col items-center justify-center ">
                <div className="hidden sm:block lg:max-w-lg mb-10 lg:mb-0 md:w-full lg:w-1/2 w-5/6">
                    <Image src={aboutimg} alt="Image of doctor" width={420} height={428.03} />
                    {/* <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"> */}
                </div>
                <div className="inner lg:flex-grow md:w-full lg:pl-16 flex flex-col md:items-start justify-start text-end md:text-left md:mb-0 items-center">
                    <p className="text-center md:text-start rtl:md:text-start text-[16px]  text-[#93C01F] font-[500] mb-2 w-full">{t("À propos de nous")}</p>
                    <div className='text-left rtl:md:ml-auto rtl:md:mb-6 '>
                        <h1 className="text-[46px] sm:text-[56px] mb-[24px] leading-[45px] font-[700] text-[#1C2126]">{t("Qui sommes nous?")}</h1>
                    </div>
                    <p className="mb-8 text-left rtl:md:text-start leading-relaxed">
                        {t("Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad. Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.")}
                    </p>
                    <div className="flex w-full justify-center text-center md:justify-start items-end">
                        <button className="w-[100%] sm:w-[auto] text-white bg-siteblue border-0 h-[48px] px-10 focus:outline-none hover:bg-sitegreen rounded-[12px] text-[16px] font-[500] flex justify-center items-center gap-3"><span>{t("Voir Plus")}</span>  <RightIcon /></button>
                    </div>
                    <div className="flex justify-between flex-wrap items-center overflow-hidden gap-7 mt-10 w-full sm:w-[80%]">
                        <div className="box sm:space-y-2 align-middle w-[34%] sm:w-[auto]">
                            <button className="inline-flex sm:py-3 rounded-lg items-center md:ml-0 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                                <span className="sm:text-left">
                                    <div className="w-full sm:w-[auto] font-[700] text-[32px] text-[#1C2126]">3600 <span className='text-[#93C01F]'> + </span></div>
                                    <div className="text-[#65737E] text-[14px] sm:text-[16px] font-[400] mt-[8px]">{t("Patients Heurex")}</div>
                                </span>
                            </button>
                        </div>
                        <div className="box space-y-2 place-items-center">
                            <button className="inline-flex py-3 rounded-lg items-center md:ml-0 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                                <span className="sm:text-left">
                                    <div className="w-full sm:w-[auto] font-[700] text-[32px] text-[#1C2126]">1200 <span className='text-[#93C01F]'> + </span></div>
                                    <div className="text-[#65737E] text-[14px] sm:text-[16px] font-[400] mt-[8px]">{t("Rendez-vous en ligne")}</div>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center overflow-hidden gap-7 sm:mt-[40px] w-full sm:w-[80%]">
                        <div className="box space-y-2">
                            <button className="inline-flex py-3 rounded-lg items-center md:ml-0 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                                <span className="sm:text-left">
                                    {/* <div className='flex justify-center w-full'> */}
                                    <div className="w-full sm:w-[auto] font-[700] text-[32px] text-[#1C2126]">20 <span className='text-[#93C01F]'> + </span></div>
                                    {/* </div> */}
                                    <div className="text-[#65737E] text-[14px] sm:text-[16px] font-[400] mt-[8px]">{t("Des années d'expérience")}</div>
                                </span>
                            </button>
                        </div>
                        <div className="box space-y-2">
                            <button className="inline-flex py-3 rounded-lg items-center md:ml-0 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                                <span className="sm:text-left">
                                    <div className="w-full sm:w-[auto]  font-[700] text-[32px] text-[#1C2126]">200 <span className='text-[#93C01F]'> + </span></div>
                                    <div className="text-[#65737E] text-[14px] sm:text-[16px] font-[400] mt-[8px]">{t("Médecins et Cliniques")}</div>
                                </span>
                            </button>
                        </div>
                        {/* </div> */}
                        {/* </div> */}
                        {/* </div> */}
                    </div>
                </div>

            </div>
        </section >
    )
}
