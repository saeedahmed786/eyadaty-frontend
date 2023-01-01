import React from 'react'
import Image from 'next/image'
import heroimg from '/assets/himg.svg'
import heroimgAr from '/assets/arabic-header.svg'
import { useTranslation } from 'react-i18next';

export default function HeroPage() {
    const { t, i18n } = useTranslation();

    return (
        <header>
            <section className={`text-gray-600 body-font pb-12 bg-fieldwhite `}>
                <div className="container mx-auto flex px-5 sm:py-12 sm:pb-24 md:flex-row flex-col items-center">
                    <div className="block sm:hidden lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ltr">
                        <Image
                            style={{ maxHeight: "500px" }}
                            src={heroimg}
                            alt="Image of doctor"
                            className=''
                        />
                    </div>
                    <div className="sm:p-3 lg:flex-grow md:w-1/2 ltr:lg:pr-24 ltr:md:pr-16 flex flex-col md:items-start ltr:md:text-left sm:mb-16 md:mb-0 items-center text-end rtl:text-start ltr:sm:text-center">
                        <h1 className="bigTitle">{t("Retrouver la belle vie par une bonne santé.")}
                        </h1>
                        {/* <h1 className="sm:text-4xl lg:text-[72px] leading-[100px] ltr:lg:text-6xl text-4xl mb-4 font-extrabold text-gray-900">{t("Retrouver la belle vie par une bonne santé.")}
                        </h1> */}
                        <p className="mb-8 rtl:mt-10 leading-relaxed text-[16px] font-[400]">{t("Nous éliminons les conjectures pour trouver les bons médecins, hôpitaux et soins pour vous et votre famille.")}</p>
                    </div>
                    <div className="hidden sm:block lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        {
                            i18n.language === "ar" ?
                                <Image
                                    style={{ maxHeight: "500px" }}
                                    src={heroimgAr}
                                    alt="Image of doctor"
                                />
                                :
                                <Image
                                    style={{ maxHeight: "500px" }}
                                    src={heroimg}
                                    alt="Image of doctor"
                                />
                        }
                    </div>
                </div>
            </section>
        </header>
    )
}
