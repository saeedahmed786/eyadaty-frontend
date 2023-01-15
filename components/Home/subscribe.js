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
                <div className="lg:container px-5 mx-auto py-[90px]">
                    <div className={"text-center sm:text-left w-full lg:w-[50%]"}>
                        <Image src={Logo} alt={"Logo"} width={166} height={168} />
                        <h1 className={"text-[32px] leading-[40px] sm:text-[48px] sm:leading-[56px] font-[700] text-[#1C2126] pt-[44px]"}>
                            {t("Abonnez-vous pour toute mise à jour")}
                        </h1>
                        <div className={"flex gap-1 justify-between h-[64px] mt-[32px] pl-0 bg-white border border-[#C0C5CE] rounded-[12px] max-w-[450px] w-full"}>
                            <input type={"email"} placeholder={t("Email")} className={"text-[12px] font-[400] p-[24px] focus:outline-0 text-[#1C2126] rounded-[12px] w-full"} />
                            <button type={"button"} className={"focus:outline-0 w-[119px] h-[48px] bg-[#0094DA] text-white text-[16px] font-[500] rounded-[12px] m-[8px]"}>{t("Abonnez")}</button>
                        </div>
                        <div className={'flex items-center mt-[48px] gap-[16px]'}>
                            <p className={"text-[#333B42]  text-[12px] font-[500]"}>{t("Suivez-nous sur")}</p>
                            <div className='flex items-center gap-[8px]'>
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
                </div>
            </section>
        </div>
    )
}
