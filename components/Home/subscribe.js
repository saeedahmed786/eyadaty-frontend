import React, { Fragment } from 'react'
import Image from 'next/image'
import Logo from "/assets/Logo.svg"
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs"
import { useTranslation } from 'react-i18next';

export default function Subscribe() {
    const { t } = useTranslation();

    return (
        <div className='subscribeComp'>
            <section className="text-gray-600 body-font bg-[url('../assets/Background.svg')] bg-no-repeat bg-cover min-h-[600px] h-full w-full">
                <div className="container px-5 mx-auto py-16">
                    <div className={"text-center sm:text-left w-full sm:w-[50%]"}>
                        <Image src={Logo} alt={"Logo"} />
                        <h1 className={"text-5xl font-[700] text-dark__color py-8"}>
                            {t("Abonnez-vous pour toute mise à jour")}
                        </h1>
                        <div className={"flex gap-1 justify-between py-2 px-2 pl-6 bg-white border border-[#C0C5CE] rounded-[16px] max-w-[450px] w-full"}>
                            <input type={"email"} placeholder={t("Email")} className={"text-sm focus:outline-0 text-dark__color w-full"} />
                            <button type={"button"} className={"focus:outline-0 w-[120px] bg-[#0094DA] text-white rounded-[12px] p-3"}>{t("Abonnez")}</button>
                        </div>
                        <div className={'flex items-center mt-10 gap-4'}>
                            <p className={"text-gray__color text-sm font-semibold"}>{t("Suivez-nous sur")}</p>
                            {[BsFacebook, BsTwitter, BsInstagram, BsLinkedin].map((Icon, index) => {
                                return (
                                    <Fragment key={index}>
                                        <button className={"hover:opacity-90 bg-[#0094DA] w-[40px] h-[40px] rounded-full flex items-center justify-center"} type={"button"}>
                                            <span className={"text-lg text-white"}>
                                                <Icon />
                                            </span>
                                        </button>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
