import React, { Fragment } from "react";
import Logo from "/assets/Logo.svg"
import Image from "next/image";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsEnvelope, BsWhatsapp } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5"
import { FiPhoneCall } from "react-icons/fi"
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";

const FooterTop = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className={" border-b border-[#333B42] mb-[44px] pb-[40px] gap-8 grid px-4 md:grid-cols-footer__columns md__custom:grid-cols-footer__columns__lg sm__custom:text-center sm__custom:grid-cols-footer__columns__sm"}>
                <div className={"flex flex-col items-start gap-5 "}>
                    <Image src={Logo} alt="Logo Image" className={" object-contain"} />
                    <p className={"text-[#A7ADBA]  text-[12px] font-[400] tracking-wide"}>
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
                <div className="hidden sm:block">
                    <h2 className={"text-white font-[700] text-[16px] leading-[24px]"}>{t("Liens")}</h2>
                    <ul className={"flex flex-col gap-3 mt-[16px]"}>
                        {/* {['Accueil', 'À propos de nous', 'Rozaliss', 'Termes et conditions', 'Politique de confidentialité'].map(text => {
                            return (
                                <Fragment key={text}> */}
                        <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                            <Link href="/">{t("Accueil")}</Link>
                        </li>
                        <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                            <Link href="/about-us">{t("À propos de nous")}</Link>
                        </li>
                        <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                            <Link href="/">{t("Rozaliss")}</Link>
                        </li>
                        <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                            <Link href="/terms-and-conditions">{t("Termes et conditions")}</Link>
                        </li>
                        <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                            <Link href="/privacy-policy">{t("Politique de confidentialité")}</Link>
                        </li>
                    </ul>
                </div>
                <div className="hidden sm:block">
                    <h2 className={"opacity-0 pointer-events-none"}>Liens</h2>
                    <ul className={"flex flex-col gap-3 mt-[16px]"}>
                        <li className={"text-[#A7ADBA]  text-[12px] font-[400] tracking-wide"}>
                            <Link href="/blogs">{t("Blog")}</Link>
                        </li>
                        <li className={"text-[#A7ADBA]  text-[12px] font-[400] tracking-wide"}>
                            <Link href="/contact-us">{t("Contactez-nous")}</Link>
                        </li>
                        <li className={"text-[#A7ADBA]  text-[12px] font-[400] tracking-wide"}>
                            <Link href="/our-partners">{t("Notre partenaires")}</Link>
                        </li>
                        <li className={"text-[#A7ADBA]  text-[12px] font-[400] tracking-wide"}>
                            <Link href="/faq">{t("FAQ")}</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-between mt-[30px]">
                    <div>
                        <h2 className={"text-white font-[700] text-[16px] leading-[24px]"}>{t("Liens")}</h2>
                        <ul className={"flex flex-col gap-3 mt-[16px]"}>
                            <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                                <Link href="/">{t("Accueil")}</Link>
                            </li>
                            <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                                <Link href="/about-us">{t("À propos de nous")}</Link>
                            </li>
                            <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                                <Link href="/">{t("Rozaliss")}</Link>
                            </li>
                            <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                                <Link href="/terms-and-conditions">{t("Termes et conditions")}</Link>
                            </li>
                            <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                                <Link href="/privacy-policy">{t("Politique de confidentialité")}</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className={"opacity-0 pointer-events-none"}>Liens</h2>
                        <ul className={"flex flex-col gap-3 mt-[16px]"}>
                            <li className={"text-[#A7ADBA]  text-[12px] font-[400] tracking-wide"}>
                                <Link href="/blogs">{t("Blog")}</Link>
                            </li>
                            <li className={"text-[#A7ADBA]  text-[12px] font-[400] tracking-wide"}>
                                <Link href="/contact-us">{t("Contactez-nous")}</Link>
                            </li>
                            <li className={"text-[#A7ADBA]  text-[12px] font-[400] tracking-wide"}>
                                <Link href="/our-partners">{t("Notre partenaires")}</Link>
                            </li>
                            <li className={"text-[#A7ADBA]  text-[12px] font-[400] tracking-wide"}>
                                <Link href="/faq">{t("FAQ")}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h2 className={"text-white font-[700] text-[16px] leading-[24px]"}>{t("Contactez-nous")}</h2>
                    <div className={"flex flex-col gap-3 mt-[16px] sm__custom:items-center"}>
                        {[{ Icon: BsEnvelope, text: 'Eyadaty@email.com' }, { Icon: FiPhoneCall, text: '+213540070124' }, { Icon: IoLocationOutline, text: 'Algiers, Algeria' }, { Icon: BsWhatsapp, text: '+213540070124' }].map(el => {
                            return (
                                <Fragment key={el.text}>
                                    <div className={"flex items-center gap-2"}>
                                        <button className={"hover:opacity-90 p-[7px] bg-transparent w-[24px] h-[24px] rounded-full border border-white flex items-center justify-center"} type={"button"}>
                                            <span className={"text-[10px] text-white"}>
                                                <el.Icon />
                                            </span>
                                        </button>
                                        <p className={"text-[#A7ADBA]  text-[12px] font-[400] tracking-wide"}>{el.text}</p>
                                    </div>
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h2 className={"text-white font-[700] text-[16px] leading-[24px]"}>{t("Abonnez-nous")}</h2>
                    <div className={"flex flex-col gap-[8px] mt-[16px]"}>
                        <input type="email" placeholder={t("E-mail")} className="font-[400] text-[16px] focus:outline-0 text-[#A7ADBA]  w-full bg-transparent px-[16px] rounded-[12px] h-[48px] border border-[#65737E]" />
                        <button type="button" className="focus:outline-0 bg-[#0094DA] text-white h-[48px] rounded-[12px] font-[500] text-[16px] leading-[24px]">{t("Abonnez")}</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FooterTop
