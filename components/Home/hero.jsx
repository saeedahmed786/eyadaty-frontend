import React from 'react'
import Image from 'next/image'
import heroimg from '/assets/himg.svg'
import heroimgMob from '/assets/MobileBanner.svg'
import heroimgAr from '/assets/arabic-header.svg'
import { useTranslation } from 'react-i18next';

export default function HeroPage() {
    const { t, i18n } = useTranslation();

    return (
        <header>
            <section className={`text-gray-600 body-font pb-12 bg-fieldwhite `}>
                <div className="container sm:mx-auto flex sm:px-5 sm:py-[79px] sm:pb-24 md:flex-row flex-col items-center">
                    <div className="block sm:hidden w-full lg:max-w-lg lg:w-full md:w-1/2">
                        <Image
                            // style={{ maxHeight: "500px" }}
                            src={heroimgMob}
                            alt="Image of doctor"
                        />
                    </div>
                    {/* <div className="block sm:hidden w-full">
                        <Image
                            style={{ maxHeight: "500px" }}
                            src={heroimgMob}
                            alt="Image of doctor"
                        />
                    </div> */}
                    <div className="sm:p-3 px-3 sm:px-0 mt-12 sm:mt-0 lg:flex-grow md:w-1/2 ltr:lg:pr-24 ltr:md:pr-16 flex flex-col md:items-start md:text-left sm:mb-16 md:mb-0 items-center text-start sm:text-end rtl:justify-start rtl:text-start">
                        <h1 className="bigTitle rtl:pl-12">{t("Retrouver la belle vie par une bonne santé.")}
                        </h1>
                        {/* <h1 className="sm:text-4xl lg:text-[72px] leading-[100px] ltr:lg:text-6xl text-4xl mb-4 font-extrabold text-[#333B42]">{t("Retrouver la belle vie par une bonne santé.")}
                        </h1> */}
                        <p className="mb-8 mt-4 rtl:mt-6 leading-relaxed text-[16px] font-[400]">{t("Nous éliminons les conjectures pour trouver les bons médecins, hôpitaux et soins pour vous et votre famille.")}</p>
                    </div>
                    <div className="hidden sm:block lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        {
                            i18n.language === "ar" ?
                                <div>
                                    <div className='hidden sm:block'>
                                        <Image
                                            style={{ maxHeight: "500px" }}
                                            src={heroimgAr}
                                            alt="Image of doctor"
                                        />
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='hidden sm:block'>
                                        <Image
                                            style={{ maxHeight: "500px" }}
                                            src={heroimg}
                                            alt="Image of doctor"
                                        />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </section>
        </header>
    )
}
