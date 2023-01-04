import React, { Fragment } from "react";
import Logo from "/assets/Logo.svg"
import Image from "next/image";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsEnvelope, BsWhatsapp } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5"
import { FiPhoneCall } from "react-icons/fi"
import Link from "next/link";
import { useTranslation } from "react-i18next";

const FooterTop = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className={" border-b border-gray__color mb-10 pb-10 gap-8 grid p-4 md:grid-cols-footer__columns md__custom:grid-cols-footer__columns__lg sm__custom:text-center sm__custom:grid-cols-footer__columns__sm"}>
                <div className={"flex flex-col items-start gap-5 "}>
                    <Image src={Logo} alt="Logo Image" className={" object-contain"} />
                    <p className={"text-light__gray__color text-sm"}>
                        {t("Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon.")}
                    </p>
                    <div className={'flex items-center gap-4'}>
                        {[BsFacebook, BsTwitter, BsInstagram, BsLinkedin].map((Icon, index) => {
                            return (
                                <Fragment key={index}>
                                    <button className={"hover:opacity-90 bg-transparent w-[40px] h-[40px] rounded-full border border-light__gray__color flex items-center justify-center"} type={"button"}>
                                        <span className={"text-lg text-white"}>
                                            <Icon />
                                        </span>
                                    </button>
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h2 className={"text-white font-bold"}>{t("Liens")}</h2>
                    <ul className={"flex flex-col gap-3 mt-4"}>
                        {/* {['Accueil', 'À propos de nous', 'Rozaliss', 'Termes et conditions', 'Politique de confidentialité'].map(text => {
                            return (
                                <Fragment key={text}> */}
                        <li className={"text-light__gray__color text-sm"}>
                            <Link href="/">{t("Accueil")}</Link>
                        </li>
                        <li className={"text-light__gray__color text-sm"}>
                            <Link href="/about-us">{t("À propos de nous")}</Link>
                        </li>
                        <li className={"text-light__gray__color text-sm"}>
                            <Link href="/">{t("Rozaliss")}</Link>
                        </li>
                        <li className={"text-light__gray__color text-sm"}>
                            <Link href="/terms-and-conditions">{t("Termes et conditions")}</Link>
                        </li>
                        <li className={"text-light__gray__color text-sm"}>
                            <Link href="/privacy-policy">{t("Politique de confidentialité")}</Link>
                        </li>
                        {/* </Fragment>
                            )
                        })} */}

                    </ul>
                </div>
                <div>
                    <h2 className={"text-white font-bold opacity-0 pointer-events-none"}>{t("Liens")}</h2>
                    <ul className={"flex flex-col gap-3 mt-4"}>
                        <li className={"text-light__gray__color text-sm"}>
                            <Link href="/blogs">{t("Blog")}</Link>
                        </li>
                        <li className={"text-light__gray__color text-sm"}>
                            <Link href="/contact-us">{t("Contactez-nous")}</Link>
                        </li>
                        <li className={"text-light__gray__color text-sm"}>
                            <Link href="/our-partners">{t("Notre partenaires")}</Link>
                        </li>
                        <li className={"text-light__gray__color text-sm"}>
                            <Link href="/faq">{t("FAQ")}</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className={"text-white font-bold"}>{t("Contactez-nous")}</h2>
                    <div className={"flex flex-col gap-3 mt-4 sm__custom:items-center"}>
                        {[{ Icon: BsEnvelope, text: 'Eyadaty@email.com' }, { Icon: FiPhoneCall, text: '+213540070124' }, { Icon: IoLocationOutline, text: 'Algiers, Algeria' }, { Icon: BsWhatsapp, text: '+213540070124' }].map(el => {
                            return (
                                <Fragment key={el.text}>
                                    <div className={"flex items-center gap-2"}>
                                        <button className={"hover:opacity-90 p-1 bg-transparent w-[24px] h-[24px] rounded-full border border-light__gray__color flex items-center justify-center"} type={"button"}>
                                            <span className={"text-xs text-white"}>
                                                <el.Icon />
                                            </span>
                                        </button>
                                        <p className={"text-light__gray__color text-sm"}>{el.text}</p>
                                    </div>
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h2 className={"text-white font-bold"}>{t("Abonnez-nous")}</h2>
                    <div className={"flex flex-col gap-2 mt-4"}>
                        <input type="email" placeholder={t("E-mail")} className="text-sm focus:outline-0 text-dark__color w-full bg-transparent p-4 rounded-[12px] border border-light__gray__color" />
                        <button type="button" className="focus:outline-0 bg-[#0094DA] text-white rounded-[12px] p-3">{t("Abonnez")}</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FooterTop
